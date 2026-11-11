import { fileURLToPath } from 'node:url'
import type { UserConfig } from 'tsdown'

export type UserConfigEntry = Exclude<UserConfig, Array<unknown>>

const tsconfig = fileURLToPath(new URL('./tsconfig.build.json', import.meta.url))

const baseConfig: UserConfigEntry[] = [
  {
    entry: ['src/index.ts'],
    outDir: 'build',
    unbundle: true,
    format: 'esm',
    target: 'es2020',
    tsconfig,
    dts: {
      sourcemap: true,
      tsconfig,
    },
    platform: 'neutral',
    logLevel: 'error',
    failOnWarn: true,
  },
]

export default baseConfig
