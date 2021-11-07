import { Agent } from '@aries-framework/core'
import { Get, JsonController } from 'routing-controllers'
import { Inject, Service } from 'typedi'

@JsonController('/agent')
@Service()
export class AgentController {
  @Inject()
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve basic agent information
   */
  @Get('/')
  public async getAgentInfo() {
    return {
      label: this.agent.config.label,
      endpoints: this.agent.config.endpoints,
      isInitialized: this.agent.isInitialized,
      publicDid: this.agent.publicDid,
    }
  }
}
