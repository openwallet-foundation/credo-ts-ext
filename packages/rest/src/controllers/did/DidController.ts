import type { DidResolutionResultProps } from '../types'
import type { DidCreateResult } from '@credo-ts/core'

import { Agent, CredoError, TypedArrayEncoder } from '@credo-ts/core'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { DidRecordExample } from '../examples'
import { ImportDidOptions, DidCreateOptions } from '../types'

import { registerDidExample } from './examples'

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
  public async getDidRecordByDid(@Path('did') did: string) {
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
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const { privateKeys, ...rest } = options
      await this.agent.dids.import({
        ...rest,
        privateKeys: privateKeys?.map(({ keyType, privateKey }) => ({
          keyType,
          privateKey: TypedArrayEncoder.fromString(privateKey),
        })),
      })
      return this.getDidRecordByDid(options.did)
    } catch (error) {
      if (error instanceof CredoError) {
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
   * @returns DidCreateResult
   */
  @Example<DidCreateResult>(registerDidExample as unknown as DidCreateResult)
  @Post('/create')
  public async createDid(
    @Body() options: DidCreateOptions,
    @Res() internalServerError: TsoaResponse<500, DidCreateResult>,
  ): Promise<DidCreateResult> {
    const didResult = await this.agent.dids.create(options)

    if (didResult.didState.state === 'failed') {
      return internalServerError(500, didResult)
    }

    return didResult
  }
}
