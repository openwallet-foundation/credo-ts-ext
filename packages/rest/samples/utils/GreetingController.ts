import { Agent, AgentConfig } from '@aries-framework/core'
import { Get, JsonController } from 'routing-controllers'
import { Inject, Service } from 'typedi'

@JsonController('/greeting')
@Service()
export class GreetingController {
  @Inject()
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
