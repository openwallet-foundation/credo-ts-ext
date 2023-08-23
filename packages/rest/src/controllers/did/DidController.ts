import type { DidCreateResult, DidResolutionResultProps } from '../types'

import { Agent, AriesFrameworkError, ImportDidOptions } from '@aries-framework/core'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { Did, DidRecordExample, DidStateExample } from '../examples'
import { DidCreateOptions } from '../types'

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
   * Resolves did and returns did resolution result
   * @param did Decentralized Identifier
   * @returns DidResolutionResult
   */
  @Example<DidResolutionResultProps>(DidRecordExample)
  @Get('/:did')
  public async getDidRecordByDid(@Path('did') did: Did) {
    const resolveResult = await this.agent.dids.resolve(did)

    if (!resolveResult.didDocument) {
      this.setStatus(500)
      return { resolveResult }
    }

    return { ...resolveResult, didDocument: resolveResult.didDocument.toJSON() }
  }

  /**
   * Import a Did to the Agent and return the did resolution result
   *
   * @param options
   * @returns DidResolutionResultProps
   */
  @Example<DidResolutionResultProps>(DidRecordExample)
  @Post('/import')
  public async importDid(
    @Body() options: ImportDidOptions,
    @Res() badRequestError: TsoaResponse<400, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      await this.agent.dids.import(options)
      return this.getDidRecordByDid(options.did)
    } catch (error) {
      if (error instanceof AriesFrameworkError) {
        return badRequestError(400, {
          reason: `Error importing Did - ${error.message}`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Create a Did and return the did resolution result
   *
   * @param options
   * @returns DidResolutionResultProps
   */
  @Example<DidCreateResult>(DidStateExample)
  @Post('/create')
  public async createDid(
    @Body() options: DidCreateOptions,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    const { didState } = await this.agent.dids.create(options)

    if (didState.state === 'failed') {
      return internalServerError(500, {
        message: `Error creating Did - ${didState.reason}`,
      })
    }

    return didState
  }
}
