import { IndySdkError, Agent, RecordNotFoundError } from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'
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

import { AcceptCredentialProposalRequest } from '../../schemas/AcceptCredentialProposalRequest'
import { CredentialOfferRequest } from '../../schemas/CredentialOfferRequest'
import { CredentialOfferTemp } from '../../schemas/CredentialOfferTemplate'
import { CredentialProposalRequest } from '../../schemas/CredentialProposalRequest'

@JsonController('/credentials')
@injectable()
export class CredentialController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve credential record by credentialId
   */
  @Get('/:credentialId')
  public async getCredentialById(@Param('credentialId') credentialId: string) {
    try {
      const credential = await this.agent.credentials.getById(credentialId)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`credential with credentialId "${credentialId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Retrieve all credential records
   */
  @Get('/')
  public async getAllCredentials() {
    const credentials = await this.agent.credentials.getAll()
    return credentials.map((c) => c.toJSON())
  }

  /**
   * Initiate a new credential exchange as holder by sending a credential proposal message
   * to the connection with the specified connection id.
   */
  @Post('/propose-credential')
  public async proposeCredential(
    @Body()
    proposal: CredentialProposalRequest
  ) {
    const { connectionId, ...proposalRequest } = proposal
    try {
      const credential = await this.agent.credentials.proposeCredential(connectionId, proposalRequest)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Connection with connection id "${connectionId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential proposal as issuer (by sending a credential offer message) to the connection
   * associated with the credential record.
   */
  @Post('/:credentialId/accept-proposal')
  public async acceptProposal(
    @Param('credentialId') credentialId: string,
    @Body()
    proposal: AcceptCredentialProposalRequest
  ) {
    try {
      const credential = await this.agent.credentials.acceptProposal(credentialId, proposal)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential id "${credentialId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Creates a credential offer not bound to any existing connection
   */
  @Post('/offer-outofband-credential')
  public async offerCredentialOutOfBand(
    @Body()
    offer: CredentialOfferTemp
  ) {
    const credential = await this.agent.credentials.createOutOfBandOffer(offer)

    return {
      message: `${this.agent.config.endpoints[0]}/?d_m=${JsonEncoder.toBase64URL(
        credential.offerMessage.toJSON({ useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix })
      )}`,
      credentialRecord: credential.credentialRecord,
    }
  }

  /**
   * Initiate a new credential exchange as issuer by sending a credential offer message
   * to the connection with the specified connection id.
   */
  @Post('/offer-credential')
  public async offerCredential(
    @Body()
    offer: CredentialOfferRequest
  ) {
    const { connectionId, ...offerRequest } = offer
    try {
      const credential = await this.agent.credentials.offerCredential(connectionId, offerRequest)

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
   * associated with the credential record.
   */
  @Post('/:credentialId/accept-offer')
  public async acceptOffer(@Param('credentialId') credentialId: string) {
    try {
      const credential = await this.agent.credentials.acceptOffer(credentialId)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential id "${credentialId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential request as issuer (by sending a credential message) to the connection
   * associated with the credential record.
   */
  @Post('/:credentialId/accept-request')
  public async acceptRequest(@Param('credentialId') credentialId: string) {
    try {
      const credential = await this.agent.credentials.acceptRequest(credentialId)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential id "${credentialId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential as holder (by sending a credential acknowledgement message) to the connection
   * associated with the credential record.
   */
  @Post('/:credentialId/accept-credential')
  public async acceptCredential(@Param('credentialId') credentialId: string) {
    try {
      const credential = await this.agent.credentials.acceptCredential(credentialId)

      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential id "${credentialId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Deletes a credentialRecord in the credential repository.
   */
  @Delete('/:credentialId')
  @OnUndefined(204)
  public async deleteCredential(@Param('credentialId') credentialId: string): Promise<void> {
    try {
      await this.agent.credentials.deleteById(credentialId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`Credential with credential id "${credentialId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }
}
