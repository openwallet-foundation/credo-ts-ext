import { Agent, RecordNotFoundError } from '@aries-framework/core'
import {
  AcceptOfferOptions,
  AcceptProposalOptions,
  AcceptRequestOptions,
  OfferCredentialOptions,
  ProposeCredentialOptions,
} from '@aries-framework/core/build/modules/credentials/CredentialsModuleOptions'
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

@JsonController('/credentials')
@injectable()
export class CredentialController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
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

  /**
   * Initiate a new credential exchange as holder by sending a propose credential message
   * to the connection with a specified connection id.
   *
   * @param options
   * @returns CredentialExchangeRecord
   */
  @Post('/propose-credential')
  public async proposeCredential(
    @Body()
    options: ProposeCredentialOptions
  ) {
    try {
      const credential = await this.agent.credentials.proposeCredential(options)
      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        const { connectionId } = options
        throw new NotFoundError(`Connection with connection id "${connectionId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential proposal as issuer by sending an accept proposal message
   * to the connection associated with the credential exchange record.
   *
   * @param options
   * @returns CredentialExchangeRecord
   */
  @Post('/accept-proposal')
  public async acceptProposal(
    @Body()
    options: AcceptProposalOptions
  ) {
    try {
      const credential = await this.agent.credentials.acceptProposal(options)
      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        const { credentialRecordId } = options
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Initiate a new credential exchange as issuer by sending a offer credential message
   * to the connection with the specified connection id.
   *
   * @param options
   * @returns CredentialExchangeRecord
   */
  @Post('/offer-credential')
  public async offerCredential(
    @Body()
    options: OfferCredentialOptions
  ) {
    try {
      const credential = await this.agent.credentials.offerCredential(options)
      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        const { connectionId } = options
        throw new NotFoundError(`Connection with connection id "${connectionId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential offer as holder by sending an accept offer message
   * to the connection associated with the credential exchange record.
   *
   * @param options
   * @returns CredentialExchangeRecord
   */
  @Post('/accept-offer')
  public async acceptOffer(
    @Body()
    options: AcceptOfferOptions
  ) {
    try {
      const credential = await this.agent.credentials.acceptOffer(options)
      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        const { credentialRecordId } = options
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential request as issuer by sending an accept request message
   * to the connection associated with the credential exchange record.
   *
   * @param options
   * @returns CredentialExchangeRecord
   */
  @Post('/accept-request')
  public async acceptRequest(
    @Body()
    options: AcceptRequestOptions
  ) {
    try {
      const credential = await this.agent.credentials.acceptRequest(options)
      return credential.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        const { credentialRecordId } = options
        throw new NotFoundError(`Credential with credential record id "${credentialRecordId}" not found.`)
      }
      throw new InternalServerError(`Something went wrong: ${error}`)
    }
  }

  /**
   * Accept a credential as holder by sending an accept credential message
   * to the connection associated with the credential exchange record.
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
}
