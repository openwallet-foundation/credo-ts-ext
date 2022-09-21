import 'reflect-metadata'
import type { ServerConfig } from './utils/ServerConfig'
import type { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import type { Exception } from 'tsoa'

import { Agent } from '@aries-framework/core'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { serve, generateHTML } from 'swagger-ui-express'
import { ValidateError } from 'tsoa'
import { container } from 'tsyringe'

import { basicMessageEvents } from './events/BasicMessageEvents'
import { connectionEvents } from './events/ConnectionEvents'
import { credentialEvents } from './events/CredentialEvents'
import { proofEvents } from './events/ProofEvents'
import { RegisterRoutes } from './routes/routes'

export const setupServer = async (agent: Agent, config: ServerConfig) => {
  container.registerInstance(Agent, agent)

  const app = config.app ?? express()
  if (config.cors) app.use(cors())

  if (config.socketServer || config.webhookUrl) {
    basicMessageEvents(agent, config)
    connectionEvents(agent, config)
    credentialEvents(agent, config)
    proofEvents(agent, config)
  }

  // Use body parser to read sent json payloads
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())
  app.use('/docs', serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(generateHTML(await import('./routes/swagger.json')))
  })

  RegisterRoutes(app)

  app.use((req, res, next) => {
    if (req.url == '/') {
      res.redirect('/docs')
      return
    }
    next()
  })

  app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
    if (err instanceof ValidateError) {
      agent.config.logger.warn(`Caught Validation Error for ${req.path}:`, err.fields)
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      })
    }

    if (err instanceof Error) {
      const exceptionError = err as Exception
      if (exceptionError.status === 400) {
        return res.status(400).json({
          message: `Bad Request`,
          details: err.message,
        })
      }

      agent.config.logger.error('Internal Server Error.', err)
      return res.status(500).json({
        message: 'Internal Server Error. Check server logging.',
      })
    }
    next()
  })

  app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
      message: 'Not Found',
    })
  })

  return app
}
