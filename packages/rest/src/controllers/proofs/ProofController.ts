import { Agent, PresentationPreview, RecordNotFoundError } from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'
import {
  Body,
  Delete,
  Get,
  InternalServerError,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Post,
} from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { AcceptProofProposalRequest } from '../../schemas/AcceptProofProposalRequest'
import { ProofRequestRequest } from '../../schemas/ProofPresentationRequest'
import { ProofProposalRequest } from '../../schemas/ProofProposalRequest'
import { PresentationProofRequestRequest } from '../../schemas/SendProofPresentationRequest'
import { ProofUtils } from '../../utils/ProofUtils'

@JsonController('/proofs')
@Service()
export class ProofController {
  @Inject()
  private agent: Agent
  private proofUtils: ProofUtils

  public constructor(agent: Agent) {
    this.agent = agent
    this.proofUtils = new ProofUtils(agent)
  }

  /**
   * Retrieve proof record by proofRecordId
   */
  @Get('/:proofRecordId')
  public async getProofById(@Param('proofRecordId') proofRecordId: string) {
    try {
      const proof = await this.agent.proofs.getById(proofRecordId)

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`proof with proofRecordId "${proofRecordId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Retrieve proof record by threadId
   */
  @Get('/thread/:threadId')
  public async getProofByThreadId(@Param('threadId') threadId: string) {
    try {
      const proof = await this.proofUtils.getProofByThreadId(threadId)

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`proof with threadId "${threadId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Retrieve all ProofRecords
   */
  @Get('/')
  public async getAllProofs() {
    const proofs = await this.agent.proofs.getAll()

    return proofs.map((proof) => proof.toJSON())
  }

  /**
   * Initiate a new presentation exchange as prover by sending a presentation proposal message
   * to the connection with the specified connection id.
   */
  @Post('/propose-proof')
  public async proposeProof(@Body() proposal: ProofProposalRequest) {
    const { attributes, predicates, comment, connectionId } = proposal

    try {
      const presentationPreview = new PresentationPreview({
        attributes,
        predicates,
      })

      const proof = await this.agent.proofs.proposeProof(connectionId, presentationPreview, {
        comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a presentation proposal as verifier (by sending a presentation request message) to the connection
   * associated with the proof record.
   */
  @Post('/:proofRecordId/accept-proposal')
  public async acceptProposal(
    @Param('proofRecordId') proofRecordId: string,
    @Body() proposal: AcceptProofProposalRequest
  ) {
    try {
      const proof = await this.agent.proofs.acceptProposal(proofRecordId, proposal)

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`proof with proofRecordId "${proofRecordId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Creates a presentation request not bound to any proposal or existing connection
   */
  @Post('/request-outofband-proof')
  public async requestProofOutOfBand(
    @Body()
    request: ProofRequestRequest
  ) {
    const { proofRequest, comment } = request

    const proof = await this.agent.proofs.createOutOfBandRequest(proofRequest, {
      comment,
    })

    return {
      message: `https://wwww.example.com/?c_i=${JsonEncoder.toBase64URL(proof.requestMessage.toJSON())}`,
      proofRecord: proof.proofRecord,
    }
  }

  /**
   * Creates a presentation request bound to existing connection
   */
  @Post('/:connectionId/request-proof')
  public async requestProof(
    @Param('connectionId') connectionId: string,
    @Body()
    request: ProofRequestRequest
  ) {
    try {
      const { proofRequest, comment } = request

      const proof = await this.agent.proofs.requestProof(connectionId, proofRequest, {
        comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a presentation request as prover (by sending a presentation message) to the connection
   * associated with the proof record.
   */
  @Post('/:proofRecordId/accept-request')
  public async acceptRequest(
    @Param('proofRecordId') proofRecordId: string,
    @Body() request: PresentationProofRequestRequest
  ) {
    try {
      const { proofRequest, presentationProposal, comment } = request

      const retrievedCredentials = await this.agent.proofs.getRequestedCredentialsForProofRequest(
        proofRequest,
        presentationProposal
      )

      const requestedCredentials = this.agent.proofs.autoSelectCredentialsForProofRequest(retrievedCredentials)

      const proof = await this.agent.proofs.acceptRequest(proofRecordId, requestedCredentials, {
        comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Proof with proofRecordId "${proofRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a presentation as prover (by sending a presentation acknowledgement message) to the connection
   * associated with the proof record.
   */
  @Post('/:proofRecordId/accept-presentation')
  public async acceptPresentation(@Param('proofRecordId') proofRecordId: string) {
    try {
      const proof = await this.agent.proofs.acceptPresentation(proofRecordId)

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Proof with proofRecordId "${proofRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Deletes a proofRecord in the proof repository.
   */
  @Delete('/:proofRecordId')
  @OnUndefined(204)
  public async deleteProof(@Param('proofRecordId') proofRecordId: string) {
    try {
      await this.agent.proofs.deleteById(proofRecordId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Proof with proofRecordId "${proofRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }
}
