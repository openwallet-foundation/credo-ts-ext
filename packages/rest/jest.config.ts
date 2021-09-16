import type { Config } from '@jest/types'

import base from '../../jest.config.base'

const config: Config.InitialOptions = {
  ...base,
  name: '@aries-framework/rest',
  displayName: '@aries-framework/rest',
  testTimeout: 120000,
}

export default config
