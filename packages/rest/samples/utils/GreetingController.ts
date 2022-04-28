import { Agent, AgentConfig } from '@aries-framework/core'
import { Get, JsonController } from 'routing-controllers'
import { injectable } from 'tsyringe'

@JsonController('/greeting')
@injectable()
export class GreetingController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Greet agent
   */
  @Get('/')
  public async greeting() {
    const config = this.agent.injectionContainer.resolve(AgentConfig)

    return `Hello, ${config.label}!`
  }
}
