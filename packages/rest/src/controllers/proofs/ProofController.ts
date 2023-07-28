import type { RestAgent } from '../../utils/agent'
import type { RequestProofOptionsProofRequestRestriction } from '../types'
import type { AnonCredsProofRequestRestriction } from '@aries-framework/anoncreds'
import type { ProofExchangeRecordProps } from '@aries-framework/core'

import { Agent, RecordNotFoundError } from '@aries-framework/core'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { ProofRecordExample, RecordId } from '../examples'
import { RequestProofOptions, RequestProofProposalOptions } from '../types'

const maybeMapValues = <V, U>(
  transform: (input: V) => U,
  obj?: {
    [key: string]: V
  }
) => {
  if (!obj) {
    return obj
  }

  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, transform(value)]))
}

const transformRestriction = (
  restriction: RequestProofOptionsProofRequestRestriction
): AnonCredsProofRequestRestriction => ({
  schema_id: restriction.schemaId,
  schema_issuer_id: restriction.schemaIssuerId,
  schema_name: restriction.schemaName,
  schema_version: restriction.schemaVersion,
  issuer_id: restriction.issuerId,
  cred_def_id: restriction.credDefId,
  rev_reg_id: restriction.revRegId,
  schema_issuer_did: restriction.schemaIssuerDid,
  issuer_did: restriction.issuerDid,
})

@Tags('Proofs')
@Route('/proofs')
@injectable()
export class ProofController extends Controller {
  private agent: RestAgent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve all proof records
   *
   * @param threadId
   * @returns ProofExchangeRecordProps[]
   */
  @Example<ProofExchangeRecordProps[]>([ProofRecordExample])
  @Get('/')
  public async getAllProofs(@Query('threadId') threadId?: string) {
    let proofs = await this.agent.proofs.getAll()

    if (threadId) proofs = proofs.filter((p) => p.threadId === threadId)

    return proofs.map((proof) => proof.toJSON())
  }

  /**
   * Retrieve proof record by proof record id
   *
   * @param proofRecordId
   * @returns ProofExchangeRecordProps
   */
  @Get('/:proofRecordId')
  @Example<ProofExchangeRecordProps>(ProofRecordExample)
  public async getProofById(
    @Path('proofRecordId') proofRecordId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
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
      return internalServerError(500, { message: `something went wrong: ${error}` })
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
    @Res() internalServerError: TsoaResponse<500, { message: string }>
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
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Initiate a new presentation exchange as prover by sending a presentation proposal request
   * to the connection with the specified connection id.
   *
   * @param proposal
   * @returns ProofExchangeRecordProps
   */
  @Post('/propose-proof')
  @Example<ProofExchangeRecordProps>(ProofRecordExample)
  public async proposeProof(
    @Body() proposal: RequestProofProposalOptions,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    const { attributes, predicates, connectionId, comment } = proposal

    try {
      const proof = await this.agent.proofs.proposeProof({
        connectionId,
        protocolVersion: 'v2',
        proofFormats: {
          anoncreds: {
            attributes,
            predicates,
          },
        },
        comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `connection with connectionId "${connectionId}" not found.`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Accept a presentation proposal as verifier by sending an accept proposal message
   * to the connection associated with the proof record.
   *
   * @param proofRecordId
   * @param proposal
   * @returns ProofExchangeRecordProps
   */
  @Post('/:proofRecordId/accept-proposal')
  @Example<ProofExchangeRecordProps>(ProofRecordExample)
  public async acceptProposal(
    @Path('proofRecordId') proofRecordId: string,
    @Body()
    proposal: {
      request: { name?: string; version?: string }
      comment?: string
    },
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      const proof = await this.agent.proofs.acceptProposal({
        proofRecordId,
        proofFormats: {
          anoncreds: {
            name: proposal.request.name,
            version: proposal.request.version,
          },
        },
        comment: proposal.comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  // TODO: Represent out-of-band proof
  // /**
  //  * Creates a presentation request not bound to any proposal or existing connection
  //  *
  //  * @param request
  //  * @returns ProofRequestMessageResponse
  //  */
  // @Post('/request-outofband-proof')
  // @Example<{ proofUrl: string; proofRecord: ProofRecordProps }>({
  //   proofUrl: 'https://example.com/proof-url',
  //   proofRecord: ProofRecordExample,
  // })
  // public async requestProofOutOfBand(@Body() request: Omit<RequestProofOptions, 'connectionId'>) {
  //   const { proofRequestOptions, ...requestOptions } = request

  //   const proof = await this.agent.proofs.createOutOfBandRequest(proofRequestOptions, requestOptions)

  //   return {
  //     proofUrl: `${this.agent.config.endpoints[0]}/?d_m=${JsonEncoder.toBase64URL(
  //       proof.requestMessage.toJSON({ useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix })
  //     )}`,
  //     proofRecord: proof.proofRecord,
  //   }
  // }

  /**
   * Creates a presentation request bound to existing connection
   *
   * @param request
   * @returns ProofExchangeRecordProps
   */
  @Post('/request-proof')
  @Example<ProofExchangeRecordProps>(ProofRecordExample)
  public async requestProof(
    @Body() request: RequestProofOptions,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    const { connectionId, proofRequestOptions } = request

    try {
      const proof = await this.agent.proofs.requestProof({
        connectionId,
        protocolVersion: 'v2',
        proofFormats: {
          anoncreds: {
            name: proofRequestOptions.name,
            version: proofRequestOptions.version,
            requested_attributes: maybeMapValues(
              (attribute) => ({
                name: attribute.name,
                names: attribute.names,
                non_revoked: attribute.nonRevoked,
                restrictions: attribute.restrictions?.map(transformRestriction),
              }),
              proofRequestOptions.requestedAttributes
            ),
            requested_predicates: maybeMapValues(
              (predicate) => ({
                name: predicate.name,
                p_type: predicate.pType,
                p_value: predicate.pValue,
                non_revoked: predicate.nonRevoked,
                restrictions: predicate.restrictions?.map(transformRestriction),
              }),
              proofRequestOptions.requestedPredicates
            ),
          },
        },
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `connection with connectionId "${connectionId}" not found.`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Accept a presentation request as prover by sending an accept request message
   * to the connection associated with the proof record.
   *
   * @param proofRecordId
   * @param request
   * @returns ProofExchangeRecordProps
   */
  @Post('/:proofRecordId/accept-request')
  @Example<ProofExchangeRecordProps>(ProofRecordExample)
  public async acceptRequest(
    @Path('proofRecordId') proofRecordId: string,
    @Body()
    request: {
      comment?: string
    },
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      const { comment } = request

      const retrievedCredentials = await this.agent.proofs.selectCredentialsForRequest({
        proofRecordId,
      })

      const proof = await this.agent.proofs.acceptRequest({
        proofRecordId,
        proofFormats: retrievedCredentials.proofFormats,
        comment,
      })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Accept a presentation as prover by sending an accept presentation message
   * to the connection associated with the proof record.
   *
   * @param proofRecordId
   * @returns ProofExchangeRecordProps
   */
  @Post('/:proofRecordId/accept-presentation')
  @Example<ProofExchangeRecordProps>(ProofRecordExample)
  public async acceptPresentation(
    @Path('proofRecordId') proofRecordId: string,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      const proof = await this.agent.proofs.acceptPresentation({ proofRecordId })

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `proof with proofRecordId "${proofRecordId}" not found.`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }
}
