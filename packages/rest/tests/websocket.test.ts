/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Agent } from '@aries-framework/core'
import type { Server } from 'net'

import { BasicMessageEventTypes, ConnectionEventTypes } from '@aries-framework/core'
import WebSocket from 'ws'

import { startServer } from '../src/index'

import { getTestAgent } from './utils/helpers'

describe('WebSocketTests', () => {
  let aliceAgent: Agent
  let bobAgent: Agent
  let server: Server

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Webhook REST Agent Alice', 3045)
    bobAgent = await getTestAgent('Webhook REST Agent Bob', 3046)
    server = await startServer(aliceAgent, { port: 3000 })
  })

  test('should return broadcast message event sent from test agent to websocket client', async () => {
    expect.assertions(1)

    const client = new WebSocket('ws://localhost:3000')

    const aliceOutOfBandRecord = await aliceAgent.oob.createInvitation()
    let { connectionRecord: bobConnectionRecord } = await bobAgent.oob.receiveInvitation(
      aliceOutOfBandRecord.outOfBandInvitation
    )
    bobConnectionRecord = await bobAgent.connections.returnWhenIsConnected(bobConnectionRecord!.id)

    const [aliceConnectionRecord] = await aliceAgent.connections.findAllByOutOfBandId(aliceOutOfBandRecord.id)

    const waitForMessagePromise = new Promise((resolve) => {
      client.on('message', (data) => {
        const event = JSON.parse(data as string)

        if (event.type === BasicMessageEventTypes.BasicMessageStateChanged) {
          expect(event.payload.basicMessageRecord.connectionId).toBe(aliceConnectionRecord.id)
          client.terminate()
          resolve(undefined)
        }
      })
    })

    await bobAgent.basicMessages.sendMessage(bobConnectionRecord.id, 'Hello')
    await waitForMessagePromise
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
    server.close()
  })
})
