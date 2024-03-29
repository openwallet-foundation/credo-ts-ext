import type { RestRootAgent } from '../../../../utils/agent'
import type { BasicMessageStateChangedEvent } from '@credo-ts/core'

import { BasicMessageEventTypes, BasicMessageRole } from '@credo-ts/core'
import express from 'express'
import { filter, first, firstValueFrom, timeout } from 'rxjs'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupApp } from '../../../../setup/setupApp'

describe('BasicMessagesController', () => {
  const app = express()
  let agent: RestRootAgent
  let inviterConnectionId: string
  let receiverConnectionId: string

  beforeAll(async () => {
    agent = await getTestAgent('Basic Message REST Agent Test')
    await setupApp({ agent, adminPort: 3000, baseApp: app })

    const inviterOutOfBandRecord = await agent.oob.createInvitation()
    let { connectionRecord: receiverConnection } = await agent.oob.receiveInvitation(
      inviterOutOfBandRecord.outOfBandInvitation,
    )

    receiverConnection = await agent.connections.returnWhenIsConnected(receiverConnection!.id)
    const [inviterConnection] = await agent.connections.findAllByOutOfBandId(inviterOutOfBandRecord.id)

    inviterConnectionId = inviterConnection.id
    receiverConnectionId = receiverConnection!.id
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  describe('Send basic message to connection', () => {
    test('should return 200 when message is sent', async () => {
      const messageReceived = firstValueFrom(
        agent.events.observable<BasicMessageStateChangedEvent>(BasicMessageEventTypes.BasicMessageStateChanged).pipe(
          filter(
            (event) =>
              event.payload.basicMessageRecord.role === BasicMessageRole.Receiver &&
              event.payload.basicMessageRecord.connectionId === receiverConnectionId,
          ),
          first(),
          timeout(10000),
        ),
      )

      const response = await request(app)
        .post(`/didcomm/basic-messages/send`)
        .send({ content: 'Hello!', connectionId: inviterConnectionId })

      expect(response.statusCode).toBe(200)

      await messageReceived
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app)
        .post(`/basic-messages`)
        .send({ content: 'Hello!', connectionId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Get basic messages', () => {
    test('should return list of basic messages filtered by connection id', async () => {
      const response = await request(app).get(`/didcomm/basic-messages`).query({ connectionId: inviterConnectionId })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([
        {
          connectionId: inviterConnectionId,
          content: 'Hello!',
          createdAt: expect.any(String),
          id: expect.any(String),
          role: 'sender',
          sentTime: expect.any(String),
          threadId: expect.any(String),
          type: 'BasicMessageRecord',
          updatedAt: expect.any(String),
        },
      ])
    })
  })
})
