import type { RestRootAgent } from '../../../../utils/agent'
import type { ConnectionStateChangedEvent } from '@credo-ts/core'

import { ConnectionEventTypes, DidExchangeState } from '@credo-ts/core'
import { randomUUID } from 'crypto'
import { type Express } from 'express'
import { filter, first, firstValueFrom, timeout } from 'rxjs'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupServer } from '../../../../server'

describe('OutOfBandController', () => {
  let app: Express
  let agent: RestRootAgent

  beforeAll(async () => {
    agent = await getTestAgent('DIDComm Out Of Band REST Agent Test')
    app = await setupServer(agent, { port: 3000 })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('Create connection using oob', async () => {
    const alias = randomUUID()
    const connectionCreated = firstValueFrom(
      agent.events.observable<ConnectionStateChangedEvent>(ConnectionEventTypes.ConnectionStateChanged).pipe(
        filter(
          (event) =>
            event.payload.connectionRecord.alias === alias &&
            event.payload.connectionRecord.state === DidExchangeState.Completed,
        ),
        first(),
        timeout(10000),
      ),
    )

    const createResponse = await request(app).post(`/didcomm/out-of-band/create-invitation`).send({
      alias,
    })
    expect(createResponse.statusCode).toBe(200)

    const receiveResponse = await request(app).post(`/didcomm/out-of-band/receive-invitation`).send({
      invitation: createResponse.body.invitationUrl,
    })
    expect(receiveResponse.statusCode).toBe(200)

    await connectionCreated
  })
})
