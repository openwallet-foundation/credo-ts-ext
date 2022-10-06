import type { Logger } from '@aries-framework/core'

import fetch from 'node-fetch'

export const sendWebhookEvent = async (webhookUrl: string, body: Record<string, unknown>, logger: Logger) => {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    logger.error(`Error sending ${body.type} webhook event to ${webhookUrl}`, {
      cause: error,
    })
  }
}
