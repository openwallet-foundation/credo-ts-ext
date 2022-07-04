import type { AgentInfo } from '../types'

import { Agent } from '@aries-framework/core'
import { Controller, Get, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

@Tags('Agent')
@Route('/agent')
@injectable()
export class AgentController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
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
      publicDid: this.agent.publicDid,
    }
  }
}
