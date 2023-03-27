import type { Agent } from '@aries-framework/core'

export const createProofRequest = async (agent: Agent) => {
  return await agent.proofs.createRequest({
    protocolVersion: 'v2',
    proofFormats: {
      indy: {
        name: 'test-proof-request',
        version: '1.0',
        nonce: '12345678901',
        requested_attributes: {
          name: {
            name: 'Name',
            restrictions: [
              {
                cred_def_id: 'Ehx3RZSV38pn3MYvxtHhbQ:3:CL:264697:default',
              },
            ],
          },
        },
      },
    },
  })
}
