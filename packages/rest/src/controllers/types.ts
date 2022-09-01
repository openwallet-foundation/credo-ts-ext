export interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
  publicDid?: {
    did: string
    verkey: string
  }
}
