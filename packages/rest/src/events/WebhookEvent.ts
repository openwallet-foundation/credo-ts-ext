import fetch from 'node-fetch'

export const sendWebhookEvent = async (webhookUrl: string, body: Record<string, unknown>) => {
  await fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}
