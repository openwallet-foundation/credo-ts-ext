import 'reflect-metadata'
import type { RequestWithAgent } from './authentication'
import type { ApiError } from './error'
import type { ServerConfig } from './utils/ServerConfig'
import type { RestRootAgent, RestRootAgentWithTenants } from './utils/agent'
import type { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import type { Exception } from 'tsoa'

import { Agent } from '@credo-ts/core'
import { TenantAgent } from '@credo-ts/tenants/build/TenantAgent'
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
import { RegisterRoutes } from './generated/routes'

export const setupServer = async (agent: RestRootAgent | RestRootAgentWithTenants, config: ServerConfig) => {
  container.registerInstance(Agent, agent as Agent)

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
    }),
  )
  app.use(bodyParser.json())
  app.use('/docs', serve, async (_req: ExRequest, res: ExResponse, next: NextFunction) => {
    res.send(generateHTML(await import('./generated/swagger.json')))
    next()
  })

  RegisterRoutes(app)

  async function endTenantSessionIfActive(request: ExRequest) {
    if ('user' in request) {
      const agent = (request as RequestWithAgent)?.user?.agent
      if (agent instanceof TenantAgent) {
        agent.config.logger.debug('Ending tenant session')
        await agent.endSession()
      }
    }
  }

  app.use(async (req, res, next) => {
    // End tenant session if active
    await endTenantSessionIfActive(req)
    next()
  })

  app.use((req, res, next) => {
    if (req.url == '/') {
      res.redirect('/docs')
      return
    }
    next()
  })

  app.use(async function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction,
  ): Promise<ExResponse | void> {
    // End tenant session if active
    await endTenantSessionIfActive(req)

    if (err instanceof ValidateError) {
      agent.config.logger.warn(`Caught Validation Error for ${req.path}:`, err.fields)
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      } satisfies ApiError)
    }

    if (err instanceof Error) {
      const exceptionError = err as Exception
      if (exceptionError.status === 400) {
        return res.status(400).json({
          message: `Bad Request`,
          details: err.message,
        } satisfies ApiError)
      }

      if (exceptionError.status === 401) {
        return res.status(401).json({
          message: `Unauthorized`,
          details: err.message,
        } satisfies ApiError)
      }

      agent.config.logger.error('Internal Server Error.', err)
      return res.status(500).json({
        message: 'Internal Server Error. Check server logging.',
      } satisfies ApiError)
    }
    next()
  })

  return app
}
