import { Agent, AgentConfig } from '@aries-framework/core'
import { Get, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

@Tags('Greetings')
@Route('/greeting')
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
