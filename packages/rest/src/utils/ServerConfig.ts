import type { Express } from 'express'
import type { Server } from 'ws'

export interface ServerConfig {
  port: number
  cors?: boolean
  app?: Express
  webhookUrl?: string
  /* Socket server is used for sending events over websocket to clients */
  socketServer?: Server
}
