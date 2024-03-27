import type { IncomingHttpHeaders } from 'http'

import express, { json } from 'express'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const waitForHook = async (
  arr: WebhookData[],
  predicate: (webhook: WebhookData) => boolean,
  timeoutMs = 5000,
  pollMs = 100,
): Promise<WebhookData | null> => {
  for (let t = 0; t < timeoutMs; t += pollMs) {
    const match = arr.find(predicate)
    if (match) {
      return match
    }
    await sleep(pollMs)
  }
  return null
}

export interface WebhookData {
  receivedAt: string
  headers: IncomingHttpHeaders
  body: {
    type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any>
  }
}

export const webhookListener = async (port: number, webhooksReceived: WebhookData[]) => {
  const app = express()

  app.use(json())

  app.post('/', (req, res) => {
    const hookData: WebhookData = { receivedAt: Date(), headers: req.headers, body: req.body }
    webhooksReceived.push(hookData)
    res.sendStatus(200)
  })
  return app.listen(port)
}
