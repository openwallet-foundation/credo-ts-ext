import type { AgentInfo } from './AgentControllerTypes'

import { Agent } from '@credo-ts/core'
import { Controller, Get, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

@Tags('Agent')
@Route('/agent')
@injectable()
export class AgentController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Retrieve basic agent information
   */
  @Get('/')
  public async getAgentInfo(): Promise<AgentInfo> {
    return {
      label: this.agent.config.label,
      endpoints: this.agent.config.endpoints,
      isInitialized: this.agent.isInitialized,
    }
  }
}
