import type { CredoRestSetupAppConfig } from './CredoRestConfig'
import type { ApiError } from '../error'
import type { RequestWithAgent } from '../tenantMiddleware'
import type { NextFunction, Request, Response } from 'express'
import type { Server as HttpServer } from 'http'
import type { Socket } from 'net'
import type { Exception } from 'tsoa'

import { Agent } from '@credo-ts/core'
import { TenantAgent } from '@credo-ts/tenants/build/TenantAgent'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { serve, generateHTML } from 'swagger-ui-express'
import { ValidateError } from 'tsoa'
import { container } from 'tsyringe'
import { Server as WsServer } from 'ws'

import { didcommBasicMessageEvents } from '../events/didcommBasicMessageEvents'
import { didcommConnectionEvents } from '../events/didcommConnectionEvents'
import { didcommCredentialEvents } from '../events/didcommCredentialEvents'
import { didcommOutOfBandEvents } from '../events/didcommOutOfBandEvents'
import { didcommProofEvents } from '../events/didcommProofEvents'
import { openId4VcIssuanceSessionEvents } from '../events/openId4VcIssuanceSessionEvents'
import { openId4VcVerificationSessionEvents } from '../events/openId4VcVerificationSessionEvents'
import { RegisterRoutes } from '../generated/routes'

import { createRestAgent } from './createRestAgent'

/**
 * Setup the Credo REST server based on the provided configuration. It expects an agent to be provided
 * with all necessary modules and configurations. This agent can be constructed using the `createRestAgent`
 * method, or by manually constructing an agent with the necessary modules (advanced and complex).
 */
export async function setupApp(config: CredoRestSetupAppConfig) {
  const agent = config.agent instanceof Agent ? config.agent : await createRestAgent(config.agent)
  container.registerInstance(Agent, agent as Agent)

  const app = config.baseApp ?? express()
  if (config.enableCors) app.use(cors())

  // TODO: use an event to publish events that needs to be sent to external services
  // that will make it easier for extensions to hook into the webhook publishing
  const socketServer = config.enableWebsocketEvents ? new WsServer({ noServer: true }) : undefined
  if (config.enableWebsocketEvents || config.webhookUrl) {
    const emitEventConfig = {
      socketServer,
      webhookUrl: config.webhookUrl,
    }
    didcommBasicMessageEvents(agent, emitEventConfig)
    didcommConnectionEvents(agent, emitEventConfig)
    didcommCredentialEvents(agent, emitEventConfig)
    didcommProofEvents(agent, emitEventConfig)
    didcommOutOfBandEvents(agent, emitEventConfig)
    openId4VcIssuanceSessionEvents(agent, emitEventConfig)
    openId4VcVerificationSessionEvents(agent, emitEventConfig)
  }

  // Use body parser to read sent json payloads
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )
  app.use(bodyParser.json())
  app.use('/docs', serve, async (_req: Request, res: Response, next: NextFunction) => {
    res.send(generateHTML(await import('../generated/swagger.json')))
    next()
  })

  // TODO: allow to pass custom RegisterRoutes method (will allow extension using TSOA)
  RegisterRoutes(app)

  app.use(async (req, _, next) => {
    // End tenant session if active
    await endTenantSessionIfActive(req)
    next()
  })

  app.use((req, res, next) => {
    if (req.url == '/') {
      res.redirect('/docs')
    }
    next()
  })

  app.use(async function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
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

  let server: HttpServer | undefined = undefined

  return {
    app,
    agent,

    start: () => {
      if (server) throw new Error('Server already started')
      server = app.listen(config.adminPort)

      if (socketServer) {
        server.on('upgrade', (request, socket, head) => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          socketServer.handleUpgrade(request, socket as Socket, head, () => {})
        })
      }

      return server
    },

    shutdown: async () => {
      agent.config.logger.info('Shutdown initiated')
      if (server) server.close()
      if (agent.isInitialized) await agent.shutdown()
      agent.config.logger.info('Shutdown complete')
    },
  }
}

async function endTenantSessionIfActive(request: Request) {
  if ('user' in request) {
    const agent = (request as RequestWithAgent)?.user?.agent
    if (agent instanceof TenantAgent) {
      agent.config.logger.debug('Ending tenant session')
      await agent.endSession()
    }
  }
}
