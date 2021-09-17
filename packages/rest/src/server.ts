import 'reflect-metadata'
import type { Express } from 'express'

import { Agent } from '@aries-framework/core'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { createExpressServer, getMetadataArgsStorage, useContainer } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
import { Container } from 'typedi'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export const setupServer = async (agent: Agent) => {
  useContainer(Container)
  Container.set(Agent, agent)

  const app: Express = createExpressServer({
    controllers: [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js'],
    cors: true,
  })

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
      title: packageJson.name,
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
