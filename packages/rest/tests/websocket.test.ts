/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ServerConfig } from '../src/utils/ServerConfig'
import type { Agent } from '@aries-framework/core'

import WebSocket from 'ws'

import { startServer } from '../src/index'
import { sleep } from '../src/utils/webhook'

import { getTestAgent } from './utils/helpers'

describe('WebhookTest', () => {
  let aliceAgent: Agent
  let bobAgent: Agent
  let socketServer: WebSocket.Server

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Webhook REST Agent Alice', 3045)
    bobAgent = await getTestAgent('Webhook REST Agent Bob', 3046)
    socketServer = await startServer(aliceAgent, { port: 3000 } as ServerConfig)
  })

  test('should return message sent from websocket client back to websocket client', async () => {
    const client = new WebSocket('ws://localhost:3000')
    client.on('open', function () {
      client.send('My name is Alice')
    })

    client.on('message', (event) => {
      expect(event).toEqual('My name is Alice')
      client.terminate()
    })
  })

  test('should return broadcast message sent from test agent to websocket client', async () => {
    const { outOfBandInvitation } = await aliceAgent.oob.createInvitation()
    const { connectionRecord } = await bobAgent.oob.receiveInvitation(outOfBandInvitation)
    const connection = await bobAgent.connections.returnWhenIsConnected(connectionRecord!.id)

    const client = new WebSocket('ws://localhost:3000')

    client.on('message', (data) => {
      expect(data).toContain(connectionRecord?.threadId)
      client.terminate()
    })

    /*
     * A sleep is placed here to wait for the listener to have attached
     * to the client first before sending the broadcast
     */
    await sleep(100)

    await bobAgent.basicMessages.sendMessage(connection.id, 'Hello')
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
    socketServer.close()
  })
})
