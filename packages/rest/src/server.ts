import 'reflect-metadata'
import type { ServerConfig } from './utils/ServerConfig'
import type { Express } from 'express'

import { Agent, AgentConfig } from '@aries-framework/core'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { createExpressServer, getMetadataArgsStorage, useContainer } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
import { Container } from 'typedi'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export const setupServer = async (agent: Agent, config?: ServerConfig) => {
  useContainer(Container)
  Container.set(Agent, agent)

  // eslint-disable-next-line @typescript-eslint/ban-types
  let controllers: Array<Function | string> = [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js']

  if (config?.controllers) {
    controllers = [...controllers, ...config?.controllers]
  }

  const app: Express = createExpressServer({
    controllers: controllers as unknown as string[],
    cors: true,
  })

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  })

  const agentConf = agent.injectionContainer.resolve(AgentConfig)
  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, undefined, {
    components: {
      schemas,
    },
    info: {
      description: packageJson.description,
      title: agentConf.label,
      version: packageJson.version,
    },
  })

  app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

  app.get('/', (_req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.json(spec)
  })

  return app
}
