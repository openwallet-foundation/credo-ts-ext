import 'reflect-metadata'
import type { ServerConfig } from './utils/ServerConfig'
import type { Express } from 'express'

import { Agent } from '@aries-framework/core'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { createExpressServer, getMetadataArgsStorage, useContainer, useExpressServer } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
import { Container } from 'typedi'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export const setupServer = async (agent: Agent, config: ServerConfig, app?: Express) => {
  useContainer(Container)
  Container.set(Agent, agent)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const controllers: Array<Function | string> = [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js']

  let server: Express

  if (app) {
    server = useExpressServer(app, {
      controllers: controllers as unknown as string[],
      cors: config.cors ?? true,
    })
  } else {
    server = createExpressServer({
      controllers: controllers as unknown as string[],
      cors: config.cors ?? true,
    })
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
