import 'reflect-metadata'
import type { ServerConfig } from './utils/ServerConfig'
import type { Express } from 'express'

import { Agent } from '@aries-framework/core'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { createExpressServer, getMetadataArgsStorage, useContainer, useExpressServer } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
import { container } from 'tsyringe'

import { basicMessageEvents } from './events/BasicMessageEvents'
import { connectionEvents } from './events/ConnectionEvents'
import { credentialEvents } from './events/CredentialEvents'
import { proofEvents } from './events/ProofEvents'
import TsyringeAdapter from './utils/TsyringeAdapter'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export const setupServer = async (agent: Agent, config: ServerConfig) => {
  container.registerInstance(Agent, agent)
  useContainer(new TsyringeAdapter(container))

  // eslint-disable-next-line @typescript-eslint/ban-types
  const controllers = [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js']

  let server: Express

  if (config.app) {
    server = useExpressServer(config.app, {
      controllers: controllers,
    })
  } else {
    server = createExpressServer({
      controllers: controllers,
      cors: config.cors ?? true,
    })
  }

  if (config.webhookUrl) {
    basicMessageEvents(agent, config)
    connectionEvents(agent, config)
    credentialEvents(agent, config)
    proofEvents(agent, config)
  }

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  })

  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, undefined, {
    components: {
      schemas,
    },
    info: {
      description: packageJson.description,
      title: agent.config.label,
      version: packageJson.version,
    },
  })

  server.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

  server.get('/', (_req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.json(spec)
  })

  return server
}
