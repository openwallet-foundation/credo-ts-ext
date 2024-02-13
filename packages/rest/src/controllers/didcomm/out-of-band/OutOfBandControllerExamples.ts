import type { ApiOutOfBandRecord, OutOfBandInvitationJson } from './OutOfBandControllerTypes'

import { OutOfBandRole, OutOfBandState } from '@credo-ts/core'

export const outOfBandInvitationExample = {
  '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/out-of-band/1.1/invitation',
  '@id': 'd6472943-e5d0-4d95-8b48-790ed5a41931',
  label: 'Aries Test Agent',
  accept: ['didcomm/aip1', 'didcomm/aip2;env=rfc19'],
  handshake_protocols: ['https://didcomm.org/didexchange/1.0', 'https://didcomm.org/connections/1.0'],
  services: [
    {
      id: '#inline-0',
      serviceEndpoint: 'https://6b77-89-20-162-146.ngrok.io',
      type: 'did-communication',
      recipientKeys: ['did:key:z6MkmTBHTWrvLPN8pBmUj7Ye5ww9GiacXCYMNVvpScSpf1DM'],
      routingKeys: [],
    },
  ],
} satisfies OutOfBandInvitationJson

export const outOfBandRecordExample = {
  outOfBandInvitation: outOfBandInvitationExample,
  metadata: {},
  id: '42a95528-0e30-4f86-a462-0efb02178b53',
  createdAt: '2022-01-01T00:00:00.000Z',
  role: OutOfBandRole.Sender,
  state: OutOfBandState.PrepareResponse,
  reusable: false,
} satisfies ApiOutOfBandRecord
