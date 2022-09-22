// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import type { Agent } from '@aries-framework/core'
// import type { Server } from 'net'

// import { CredentialEventTypes, BasicMessageEventTypes, ConnectionEventTypes } from '@aries-framework/core'
// import request from 'supertest'
// import WebSocket from 'ws'

// import { startServer } from '../src/index'

// import { getTestAgent } from './utils/helpers'

// describe('WebSocketTests', () => {
//   let aliceAgent: Agent
//   let bobAgent: Agent
//   let server: Server

//   beforeAll(async () => {
//     aliceAgent = await getTestAgent('Webhook REST Agent Alice', 3045)
//     bobAgent = await getTestAgent('Webhook REST Agent Bob', 3046)
//     server = await startServer(aliceAgent, { port: 3000 })
//   })

//   test('should return basic message event sent from test agent to websocket client', async () => {
//     expect.assertions(1)

//     const client = new WebSocket('ws://localhost:3000')

//     const aliceOutOfBandRecord = await aliceAgent.oob.createInvitation()
//     let { connectionRecord: bobConnectionRecord } = await bobAgent.oob.receiveInvitation(
//       aliceOutOfBandRecord.outOfBandInvitation
//     )
//     bobConnectionRecord = await bobAgent.connections.returnWhenIsConnected(bobConnectionRecord!.id)

//     const [aliceConnectionRecord] = await aliceAgent.connections.findAllByOutOfBandId(aliceOutOfBandRecord.id)

//     const waitForMessagePromise = new Promise((resolve) => {
//       client.on('message', (data) => {
//         const event = JSON.parse(data as string)

//         if (event.type === BasicMessageEventTypes.BasicMessageStateChanged) {
//           expect(event.payload.basicMessageRecord.connectionId).toBe(aliceConnectionRecord.id)
//           client.terminate()
//           resolve(undefined)
//         }
//       })
//     })

//     await bobAgent.basicMessages.sendMessage(bobConnectionRecord.id, 'Hello')
//     await waitForMessagePromise
//   })

//   test('should return connection event sent from test agent to websocket client', async () => {
//     expect.assertions(1)

//     const client = new WebSocket('ws://localhost:3000')

//     const aliceOutOfBandRecord = await aliceAgent.oob.createInvitation()

//     const waitForMessagePromise = new Promise((resolve) => {
//       client.on('message', (data) => {
//         const event = JSON.parse(data as string)

//         expect(event.type).toBe(ConnectionEventTypes.ConnectionStateChanged)
//         client.terminate()
//         resolve(undefined)
//       })
//     })

//     await bobAgent.oob.receiveInvitation(aliceOutOfBandRecord.outOfBandInvitation)
//     await waitForMessagePromise
//   })

//   test('should return credential event sent from test agent to websocket client', async () => {
//     expect.assertions(1)

//     const client = new WebSocket('ws://localhost:3000')

//     const proposalRequest = {
//       connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
//       protocolVersion: 'v1',
//       credentialFormats: {
//         indy: {
//           credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
//           issuerDid: 'WghBqNdoFjaYh6F5N9eBF',
//           schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
//           schemaIssuerDid: 'WghBqNdoFjaYh6F5N9eBF',
//           schemaName: 'test',
//           schemaVersion: '1.0',
//           attributes: [
//             {
//               name: 'name',
//               value: 'test',
//             },
//           ],
//         },
//       },
//     }

//     const response = await request(server).post(`/credentials/propose-credential`).send(proposalRequest)

//     const waitForMessagePromise = new Promise((resolve) => {
//       client.on('message', (data) => {
//         const event = JSON.parse(data as string)

//         expect(event.type).toBe(CredentialEventTypes.CredentialStateChanged)
//         client.terminate()
//         resolve(undefined)
//       })
//     })

//     await request(server).post(`/credentials/${response.body.credentials[0].credentialRecordId}/accept-proposal`)
//     await waitForMessagePromise
//   })

//   afterAll(async () => {
//     await aliceAgent.shutdown()
//     await aliceAgent.wallet.delete()
//     await bobAgent.shutdown()
//     await bobAgent.wallet.delete()
//     server.close()
//   })
// })
