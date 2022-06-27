import type { ProofRequestMessageResponse } from '../types'
import type { ProofRecordProps } from '@aries-framework/core'

import { Agent, JsonTransformer, PresentationPreview, RecordNotFoundError } from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { AcceptProofProposalRequest } from '../../schemas/AcceptProofProposalRequest'
import { PresentationProofRequest } from '../../schemas/PresentationProofRequest'
import { ProofPresentationRequest } from '../../schemas/ProofPresentationRequest'
import { ProofProposalRequest } from '../../schemas/ProofProposalRequest'
import { ProofRequestTemplate } from '../../schemas/ProofRequestTemplate'
import { ProofRecordExample, RecordId } from '../examples'

@Tags('Proofs')
@Route('/proofs')
@injectable()
export class ProofController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve all proof records
   *
   * @param threadId
   * @returns ProofRecord[]
   */
  @Example<ProofRecordProps[]>([ProofRecordExample])
  @Get('/')
  public async getAllProofs(@Query('threadId') threadId?: string) {
    const proofs = await this.agent.proofs.getAll()
    if (threadId) {
      return proofs.flatMap((proof) => (proof.threadId === threadId ? proof.toJSON() : []))
    }
    return proofs.map((proof) => proof.toJSON())
  }

  /**
   * Retrieve proof record by proof record id
   *
   * @param proofRecordId
   * @returns ProofRecord
   */
  @Get('/:proofRecordId')
  public async getProofById(
    @Path('proofRecordId') proofRecordId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const proof = await this.agent.proofs.getById(proofRecordId)
      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Deletes a proof record in the proof repository.
   *
   * @param proofRecordId
   */
  @Delete('/:proofRecordId')
  public async deleteProof(
    @Path('proofRecordId') proofRecordId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      this.setStatus(204)
      await this.agent.proofs.deleteById(proofRecordId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Initiate a new presentation exchange as prover by sending a presentation proposal request
   * to the connection with the specified connection id.
   *
   * @param proposal
   * @returns ProofRecord
   */
  @Post('/propose-proof')
  public async proposeProof(
    @Body() proposal: ProofProposalRequest,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    const { attributes, predicates, connectionId, ...proposalOptions } = proposal

    try {
      const presentationPreview = JsonTransformer.fromJSON({ attributes, predicates }, PresentationPreview)

      const proof = await this.agent.proofs.proposeProof(connectionId, presentationPreview, proposalOptions)
      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `connection with connectionId "${connectionId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Accept a presentation proposal as verifier by sending an accept proposal message
   * to the connection associated with the proof record.
   *
   * @param proofRecordId
   * @param proposal
   * @returns ProofRecord
   */
  @Post('/:proofRecordId/accept-proposal')
  public async acceptProposal(
    @Path('proofRecordId') proofRecordId: string,
    @Body() proposal: AcceptProofProposalRequest,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const proof = await this.agent.proofs.acceptProposal(proofRecordId, proposal)
      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Creates a presentation request not bound to any proposal or existing connection
   *
   * @param request
   * @returns ProofRequestMessageResponse
   */
  @Post('/request-outofband-proof')
  public async requestProofOutOfBand(@Body() request: ProofRequestTemplate): Promise<ProofRequestMessageResponse> {
    const { proofRequest, ...requestOptions } = request
    const proof = await this.agent.proofs.createOutOfBandRequest(proofRequest, requestOptions)
    return {
      message: `${this.agent.config.endpoints[0]}/?d_m=${JsonEncoder.toBase64URL(
        proof.requestMessage.toJSON({ useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix })
      )}`,
      proofRecord: proof.proofRecord,
    }
  }

  /**
   * Creates a presentation request bound to existing connection
   *
   * @param request
   * @returns ProofRecord
   */
  @Post('/request-proof')
  public async requestProof(
    @Body() request: ProofPresentationRequest,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    const { connectionId, proofRequest, ...requestOptions } = request
    try {
      const proof = await this.agent.proofs.requestProof(connectionId, proofRequest, requestOptions)
      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `connection with connectionId "${connectionId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Accept a presentation request as prover by sending an accept request message
   * to the connection associated with the proof record.
   *
   * @param proofRecordId
   * @param request
   * @returns ProofRecord
   */
  @Post('/:proofRecordId/accept-request')
  public async acceptRequest(
    @Path('proofRecordId') proofRecordId: string,
    @Body() request: PresentationProofRequest,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const { filterByPresentationPreview, comment } = request

      const retrievedCredentials = await this.agent.proofs.getRequestedCredentialsForProofRequest(proofRecordId, {
        filterByPresentationPreview: filterByPresentationPreview,
      })

      const requestedCredentials = this.agent.proofs.autoSelectCredentialsForProofRequest(retrievedCredentials)

      const proof = await this.agent.proofs.acceptRequest(proofRecordId, requestedCredentials, {
        comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Accept a presentation as prover by sending an accept presentation message
   * to the connection associated with the proof record.
   *
   * @param proofRecordId
   * @returns ProofRecord
   */
  @Post('/:proofRecordId/accept-presentation')
  public async acceptPresentation(
    @Path('proofRecordId') proofRecordId: string,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const proof = await this.agent.proofs.acceptPresentation(proofRecordId)

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }
}
