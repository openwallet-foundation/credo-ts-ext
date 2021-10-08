import { AutoAcceptCredential, LogLevel } from '@aries-framework/core'

import { setupAgent } from './agent'
import { TestLogger } from './logger'

export const getTestAgent = (name: string) =>
  setupAgent({
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    name: name,
    logger: new TestLogger(LogLevel.fatal),
    autoAcceptConnection: true,
    autoAcceptCredential: AutoAcceptCredential.ContentApproved,
  })
