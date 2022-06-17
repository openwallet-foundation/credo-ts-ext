import type { DidInfo } from '@aries-framework/core/build/wallet/Wallet'

export interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
  publicDid?: DidInfo
}
