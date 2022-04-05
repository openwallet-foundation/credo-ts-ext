import { Agent } from '@aries-framework/core'
import { Get, JsonController } from 'routing-controllers'
import { inject, injectable } from 'tsyringe'

@JsonController('/agent')
@injectable()
export class AgentController {
  private agent: Agent

  public constructor(@inject('agent') agent: Agent) {
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
