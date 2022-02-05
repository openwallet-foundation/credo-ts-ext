import type { Express } from 'express'

export interface ServerConfig {
  port: number
  cors?: boolean
  app?: Express
  webhookUrl?: string
}
