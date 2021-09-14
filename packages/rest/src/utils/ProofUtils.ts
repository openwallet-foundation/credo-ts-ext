import type { Agent, ProofRecord } from '@aries-framework/core'

import { ProofRepository } from '@aries-framework/core'

export class ProofUtils {
  private agent: Agent
  private proofRepository: ProofRepository

  public constructor(agent: Agent) {
    this.agent = agent
    this.proofRepository = this.agent.injectionContainer.resolve(ProofRepository)
  }

  public async getProofByThreadId(threadId: string): Promise<ProofRecord> {
    return await this.proofRepository.getSingleByQuery({ threadId })
  }
}
