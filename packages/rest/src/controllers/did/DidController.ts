import type { DidResolutionResultProps } from '../types'

import { Agent } from '@aries-framework/core'
import { Controller, Example, Get, Path, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { Did, DidRecordExample } from '../examples'

@Tags('Dids')
@Route('/dids')
@injectable()
export class DidController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve did record by did
   * @param did Decentralized Identifier
   * @returns DidResolutionResultProps
   */
  @Example<DidResolutionResultProps>(DidRecordExample)
  @Get('/:did')
  public async getDidRecordByDId(@Path('did') did: Did) {
    const didRecord = await this.agent.dids.resolve(did)

    if (!didRecord.didDocument) {
      this.setStatus(500)
      return { didRecord }
    }

    return { ...didRecord, didDocument: didRecord.didDocument.toJSON() }
  }
}
