import type { AgentInfo } from './AgentControllerTypes'

// NOTE: using satisfies breaks the tsoa example generation
export const agentInfoExample: AgentInfo = {
  config: {
    label: 'Example Agent',
    endpoints: ['http://localhost:3000'],
  },
  isInitialized: true,
}
