import type { Config } from '@jest/types'

import { existsSync, readdirSync } from 'fs'
import path from 'path'

import base from './jest.config.base'

const packagesDirectory = path.join(__dirname, 'packages')
const projects = readdirSync(packagesDirectory)
  .map((name) => path.join(packagesDirectory, name, 'jest.config.ts'))
  .filter((configPath) => existsSync(configPath))

const config: Config.InitialOptions = {
  ...base,
  roots: ['<rootDir>'],
  projects,
}

export default config
