import type {
  DidResolveFailedResponse,
  DidResolveSuccessResponse,
  DidImportFailedResponse,
  DidCreateFinishedResponse,
  DidCreateFailedResponse,
  DidCreateActionResponse,
  DidCreateWaitResponse,
  DidDocumentJson,
} from './DidsControllerTypes'

import { Agent, DidDocument, JsonTransformer, TypedArrayEncoder } from '@credo-ts/core'
import { Body, Controller, Example, Get, Path, Post, Route, Tags, Response, SuccessResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { alternativeResponse } from '../../utils/response'

import {
  didResolveFailedResponseExample,
  didResolveSuccessResponseExample,
  didCreateFinishedResponseExample,
} from './DidsControllerExamples'
import { DidImportOptions, DidCreateOptions } from './DidsControllerTypes'

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
   */
  @Example<DidResolveSuccessResponse>(didResolveSuccessResponseExample)
  @Response<DidResolveFailedResponse>(404, 'Did not found', didResolveFailedResponseExample)
  @Response<DidResolveFailedResponse>(500, 'Error resolving did', didResolveFailedResponseExample)
  @Get('/:did')
  public async resolveDid(@Path('did') did: string): Promise<DidResolveSuccessResponse> {
    const resolveResult = await this.agent.dids.resolve(did)

    const response = { ...resolveResult, didDocument: resolveResult.didDocument?.toJSON() }

    if (resolveResult.didResolutionMetadata.error === 'notFound') {
      this.setStatus(404)
      return alternativeResponse<DidResolveFailedResponse>(response as DidResolveFailedResponse)
    }

    if (!resolveResult.didDocument) {
      this.setStatus(500)
      return alternativeResponse<DidResolveFailedResponse>(response as DidResolveFailedResponse)
    }

    return response as DidResolveSuccessResponse
  }

  /**
   * Import a did (with optional did document).
   *
   * If no did document is provided, the did will be resolved to fetch the did document.
   */
  @Post('/import')
  @SuccessResponse(201, 'Did imported successfully')
  public async importDid(@Body() options: DidImportOptions): Promise<void> {
    try {
      await this.agent.dids.import({
        did: options.did,
        didDocument: options.didDocument ? JsonTransformer.fromJSON(options.didDocument, DidDocument) : undefined,
        overwrite: options.overwrite,
        privateKeys: options.privateKeys?.map(({ keyType, privateKeyBase58 }) => ({
          keyType,
          privateKey: TypedArrayEncoder.fromBase58(privateKeyBase58),
        })),
      })
    } catch (error) {
      this.setStatus(500)
      return alternativeResponse<DidImportFailedResponse>({
        message: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  /**
   * Create a new did.
   */
  @Example<DidCreateFinishedResponse>(didCreateFinishedResponseExample)
  @Response<DidCreateFailedResponse>(500, 'Error creating did')
  @Response<DidCreateActionResponse>(200, 'Action required')
  @Response<DidCreateWaitResponse>(202, 'Wait for action to complete')
  @Post('/create')
  public async createDid(@Body() options: DidCreateOptions): Promise<DidCreateFinishedResponse> {
    const didResult = await this.agent.dids.create({
      ...options,
      didDocument:
        'didDocument' in options && options.didDocument
          ? JsonTransformer.fromJSON(options.didDocument, DidDocument)
          : undefined,
      secret: {
        ...options.secret,
        seed:
          typeof options.secret?.seedBase58 === 'string'
            ? TypedArrayEncoder.fromBase58(options.secret.seedBase58)
            : undefined,
        privateKey:
          typeof options.secret?.privateKeyBase58 === 'string'
            ? TypedArrayEncoder.fromBase58(options.secret.privateKeyBase58)
            : undefined,
      },
    })

    const didDocumentJson = didResult.didState.didDocument?.toJSON() as DidDocumentJson

    const { ...copiedSecret } = didResult.didState.secret
    copiedSecret.seedBase58 = copiedSecret.seed
      ? TypedArrayEncoder.toBase58(copiedSecret.seed as Uint8Array)
      : undefined
    copiedSecret.privateKeyBase58 = copiedSecret.privateKey
      ? TypedArrayEncoder.toBase58(copiedSecret.privateKey as Uint8Array)
      : undefined
    delete copiedSecret.seed
    delete copiedSecret.privateKey

    if (didResult.didState.state === 'failed') {
      this.setStatus(500)
      return alternativeResponse<DidCreateFailedResponse>({
        ...didResult,
        didState: {
          ...didResult.didState,
          didDocument: didDocumentJson,
          secret: copiedSecret,
        },
      })
    }

    if (didResult.didState.state === 'wait') {
      this.setStatus(2002)
      return alternativeResponse<DidCreateWaitResponse>({
        ...didResult,
        didState: {
          ...didResult.didState,
          didDocument: didDocumentJson,
          secret: copiedSecret,
        },
      })
    }

    if (didResult.didState.state === 'action') {
      return alternativeResponse<DidCreateActionResponse>({
        ...didResult,
        didState: {
          ...didResult.didState,
          didDocument: didDocumentJson,
          secret: copiedSecret,
        },
      })
    }

    return {
      ...didResult,
      didState: {
        ...didResult.didState,
        didDocument: didDocumentJson,
        secret: copiedSecret,
      },
    }
  }
}
