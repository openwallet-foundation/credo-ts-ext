import type { RestRootAgent, RestRootAgentWithTenants } from '../../src/utils/agent'

import { randomUUID } from 'crypto'

import { createRestAgent } from '../../src'
import { InMemoryAnonCredsRegistry } from '../../src/controllers/anoncreds/__tests__/InMemoryAnonCredsRegistry'
import {
  testAnonCredsCredentialDefinition,
  testAnonCredsSchema,
} from '../../src/controllers/anoncreds/__tests__/fixtures'
import { InternalOutboundTransport } from '../InternalOutboundTransport'

export async function getTestAgent<Multitenant extends boolean = false>(
  name: string,
  port?: number,
  multiTenant?: Multitenant,
) {
  const agent = await createRestAgent({
    // we need http endpoint for openid base url. We probably need to separate didcomm endpoint from openid endpoint
    endpoints: port ? [`http://localhost:${port}`] : ['internal', 'http://localhost:random'],
    inboundTransports: port ? [{ transport: 'http', port }] : [],
    // add some randomness to ensure test isolation
    label: `${name} (${randomUUID()})`,
    walletConfig: {
      id: `${name} (${randomUUID()})`,
      key: `${name} (${randomUUID()})`,
    },
    outboundTransports: ['ws', 'http'],
    multiTenant,
  })

  // Add extra anoncreds registry
  agent.modules.anoncreds.config.registries.push(
    new InMemoryAnonCredsRegistry({
      schemas: {
        [testAnonCredsSchema.schemaId]: testAnonCredsSchema.schema,
      },
      credentialDefinitions: {
        [testAnonCredsCredentialDefinition.credentialDefinitionId]:
          testAnonCredsCredentialDefinition.credentialDefinition,
      },
    }),
  )

  if (!port) {
    const internalOutboundTransport = new InternalOutboundTransport()
    await internalOutboundTransport.start(agent)
    agent.registerOutboundTransport(internalOutboundTransport)
  }

  return agent as Multitenant extends true ? RestRootAgentWithTenants : RestRootAgent
}
