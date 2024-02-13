import type { RestAgent } from '../../utils/agent'
import type { AnonCredsRequestProofFormatOptions, AnonCredsProofRequestRestrictionOptions } from '../types'
import type { AnonCredsProofRequestRestriction, AnonCredsRequestProofFormat } from '@aries-framework/anoncreds'
import type { ProofExchangeRecordProps } from '@aries-framework/core'

import { Agent, RecordNotFoundError } from '@aries-framework/core'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { maybeMapValues } from '../../utils/helpers'
import { ProofRecordExample, RecordId } from '../examples'
import {
  RequestProofOptions,
  AcceptProofProposalOptions,
  AcceptProofRequestOptions,
  ProposeProofOptions,
  CreateProofRequestOptions,
} from '../types'

const transformAttributeMarkers = (attributes?: { [key: string]: boolean }) => {
  if (!attributes) {
    return undefined
  }

  return Object.entries(attributes).reduce<{ [key in `attr::${string}::marker`]: '1' | '0' }>(
    (acc, [attr, val]) => ({
      [`attr::${attr}::marker`]: val ? '1' : '0',
      ...acc,
    }),
    {},
  )
}

const transformAttributeValues = (attributeValues?: { [key in string]: string }) => {
  if (!attributeValues) {
    return undefined
  }

  return Object.entries(attributeValues).reduce<{ [key in `attr::${string}::value`]: string }>(
    (acc, [attr, val]) => ({
      [`attr::${attr}::value`]: val,
      ...acc,
    }),
    {},
  )
}

const transformRestriction = ({
  attributeValues,
  attributeMarkers,
  ...others
}: AnonCredsProofRequestRestrictionOptions): AnonCredsProofRequestRestriction => ({
  ...transformAttributeMarkers(attributeMarkers),
  ...transformAttributeValues(attributeValues),
  ...others,
})

const transformProofFormat = (
  proofFormat?: AnonCredsRequestProofFormatOptions,
): AnonCredsRequestProofFormat | undefined => {
  if (!proofFormat) {
    return undefined
  }

  const { requested_attributes, requested_predicates, ...rest } = proofFormat

  return {
    ...rest,
    requested_attributes: maybeMapValues(
      ({ restrictions, ...other }) => ({
        restrictions: restrictions?.map(transformRestriction),
        ...other,
      }),
      requested_attributes,
    ),
    requested_predicates: maybeMapValues(
      ({ restrictions, ...other }) => ({
        restrictions: restrictions?.map(transformRestriction),
        ...other,
      }),
      requested_predicates,
    ),
  }
}

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
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
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
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
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
    @Body() proposal: ProposeProofOptions,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const proof = await this.agent.proofs.proposeProof(proposal)

      return proof.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `connection with connectionId "${proposal.connectionId}" not found.`,
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
    proposal: AcceptProofProposalOptions,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const proof = await this.agent.proofs.acceptProposal({
        proofRecordId,
        ...proposal,
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
   * Creates a presentation request not bound to any proposal or existing connection
   *
   * @param request
   * @returns ProofRequestMessageResponse
   */
  @Post('/create-request')
  @Example<{ message: object; proofRecord: ProofExchangeRecordProps }>({
    message: {},
    proofRecord: ProofRecordExample,
  })
  public async createRequest(@Body() request: CreateProofRequestOptions) {
    const { proofFormats, ...rest } = request
    const { message, proofRecord } = await this.agent.proofs.createRequest({
      proofFormats: {
        anoncreds: transformProofFormat(proofFormats.anoncreds),
        indy: transformProofFormat(proofFormats.indy),
      },
      ...rest,
    })

    return {
      message,
      proofRecord: proofRecord,
    }
  }

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
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    const { connectionId, proofFormats, ...rest } = request
    try {
      const proof = await this.agent.proofs.requestProof({
        connectionId,
        proofFormats: {
          anoncreds: transformProofFormat(proofFormats.anoncreds),
          indy: transformProofFormat(proofFormats.indy),
        },
        ...rest,
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
    request: AcceptProofRequestOptions,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const retrievedCredentials = await this.agent.proofs.selectCredentialsForRequest({
        proofRecordId,
      })

      const proof = await this.agent.proofs.acceptRequest({
        proofRecordId,
        proofFormats: retrievedCredentials.proofFormats,
        ...request,
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
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
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
