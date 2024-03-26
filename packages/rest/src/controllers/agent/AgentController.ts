import type { AgentInfo } from './AgentControllerTypes'

import { Agent } from '@credo-ts/core'
import { Controller, Example, Get, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { agentInfoExample } from './AgentControllerExamples'

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
  @Example(agentInfoExample)
  public async getAgentInfo(): Promise<AgentInfo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { agentDependencies, walletConfig, logger, ...config } = this.agent.config.toJSON()

    return {
      config,
      isInitialized: this.agent.isInitialized,
    }
  }
}
