import { IndySdkError, Agent, RecordNotFoundError, CredentialProtocolVersion } from '@aries-framework/core'
// import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'
import { isIndyError } from '@aries-framework/core/build/utils/indyError'
import {
  Get,
  Post,
  JsonController,
  Body,
  InternalServerError,
  Param,
  NotFoundError,
  Delete,
  OnUndefined,
} from 'routing-controllers'
import { injectable } from 'tsyringe'

// import { AcceptCredentialProposalRequest } from '../../schemas/AcceptCredentialProposalRequest'
import { CredentialOfferRequest } from '../../schemas/CredentialOfferRequest'
// import { CredentialOfferTemp } from '../../schemas/CredentialOfferTemplate'
import { CredentialProposalRequest } from '../../schemas/CredentialProposalRequest'

@JsonController('/credentials')
@injectable()
export class CredentialController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve credential exchange record by credential record id
   *
   * @param credentialRecordId
   * @returns CredentialExchangeRecord
   */
  @Get('/:credentialRecordId')
  public async getCredentialById(@Param('credentialRecordId') credentialRecordId: string) {
    try {
      const credential = await this.agent.credentials.getById(credentialRecordId)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Retrieve all credential exchange records
   *
   * @returns CredentialExchangeRecord[]
   */
  @Get('/')
  public async getAllCredentials() {
    const credentials = await this.agent.credentials.getAll()
    return credentials.map((c) => c.toJSON())
  }

  /**
   * TODO: Update CredentialProposalRequest
   * Initiate a new credential exchange as holder by sending a credential proposal message
   * to the connection with the specified connection id.
   *
   * @param proposal
   * @returns CredentialExchangeRecord
   */
  @Post('/propose-credential')
  public async proposeCredential(
    @Body()
    proposal: CredentialProposalRequest
  ) {
    const { connectionId, ...proposalRequest } = proposal
    try {
      const credential = await this.agent.credentials.proposeCredential({
        connectionId,
        credentialFormats: { indy: proposalRequest },
      })

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Connection with connection id "${connectionId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * TODO: Update CredentialProposalRequest
   * Accept a credential proposal as issuer (by sending a credential offer message) to the connection
   * associated with the credential exchange record.
   *
   * @param credentialRecordId
   * @param proposal
   * @returns CredentialExchangeRecord
   */
  @Post('/:credentialRecordId/accept-proposal')
  public async acceptProposal(
    @Param('credentialRecordId') credentialRecordId: string,
    @Body()
    proposal: CredentialProposalRequest
  ) {
    try {
      const { ...proposalRequest } = proposal.credentialProposal

      const credential = await this.agent.credentials.acceptProposal({
        credentialRecordId,
        credentialFormats: { indy: proposalRequest },
      })

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * DEPRECATED: All offers are now out of band
   * Creates a credential offer not bound to any existing connection
   */
  // @Post('/offer-outofband-credential')
  // public async offerCredentialOutOfBand(
  //   @Body()
  //   offer: CredentialOfferTemp
  // ) {
  //   const credential = await this.agent.credentials.createOutOfBandOffer(offer)

  //   return {
  //     message: `${this.agent.config.endpoints[0]}/?d_m=${JsonEncoder.toBase64URL(
  //       credential.offerMessage.toJSON({ useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix })
  //     )}`,
  //     credentialRecord: credential.credentialRecord,
  //   }
  // }

  /**
   * TODO: Update CredentiaOfferRequest
   * Initiate a new credential exchange as issuer by sending a credential offer message
   * to the connection with the specified connection id.
   *
   * @param offer
   * @returns CredentialExchangeRecord
   */
  @Post('/offer-credential')
  public async offerCredential(
    @Body()
    offer: CredentialOfferRequest
  ) {
    const { connectionId, ...offerRequest } = offer
    try {
      const credential = await this.agent.credentials.offerCredential({
        connectionId,
        protocolVersion: CredentialProtocolVersion.V1,
        credentialFormats: { indy: offerRequest.preview },
      })

      return credential.toJSON()
    } catch (error) {
      if (error instanceof IndySdkError) {
        if (isIndyError(error.cause, 'WalletItemNotFound')) {
          throw new NotFoundError(
            `credential definition with credentialDefinitionId "${offer.credentialDefinitionId}" not found.`
          )
        }
      }
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Connection with connection id "${connectionId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential offer as holder (by sending a credential request message) to the connection
   * associated with the credential exchange record.
   *
   * @param credentialRecordId
   * @returns CredentialExchangeRecord
   */
  @Post('/:credentialRecordId/accept-offer')
  public async acceptOffer(@Param('credentialRecordId') credentialRecordId: string) {
    try {
      const credential = await this.agent.credentials.acceptOffer({ credentialRecordId })

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential request as issuer (by sending a credential message) to the connection
   * associated with the credential exchange record.
   *
   * @param credentialRecordId
   * @returns CredentialExchangeRecord
   */
  @Post('/:credentialRecordId/accept-request')
  public async acceptRequest(@Param('credentialRecordId') credentialRecordId: string) {
    try {
      const credential = await this.agent.credentials.acceptRequest({ credentialRecordId })

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential as holder (by sending a credential acknowledgement message) to the connection
   * associated with the credential exchange record.
   *
   * @param credentialRecordId
   * @returns CredentialExchangeRecord
   */
  @Post('/:credentialRecordId/accept-credential')
  public async acceptCredential(@Param('credentialRecordId') credentialRecordId: string) {
    try {
      const credential = await this.agent.credentials.acceptCredential(credentialRecordId)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Deletes a credential exchange record in the credential repository.
   *
   * @param credentialRecordId
   */
  @Delete('/:credentialRecordId')
  @OnUndefined(204)
  public async deleteCredential(@Param('credentialRecordId') credentialRecordId: string): Promise<void> {
    try {
      await this.agent.credentials.deleteById(credentialRecordId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }
}
