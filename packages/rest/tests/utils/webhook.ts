import type { IncomingHttpHeaders } from 'http'

import express from 'express'

export interface WebhookData {
  receivedAt: string
  headers: IncomingHttpHeaders
  body: {
    id: string
    state: string
    [key: string]: unknown
  }
  topic: string
}

export const webhookListener = async (port: number, webhooksReceived: WebhookData[]) => {
  const app = express()

  app.use(express.json())

  app.post('/:topic', (req, res) => {
    const hookData: WebhookData = { receivedAt: Date(), headers: req.headers, body: req.body, topic: req.params.topic }
    webhooksReceived.push(hookData)
    res.sendStatus(200)
  })
  return app.listen(port)
}
