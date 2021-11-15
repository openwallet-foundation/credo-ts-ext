import { IsString } from 'class-validator'

import { CredentialOfferTemp } from './CredentialOfferTemplate'

export class CredentialOfferRequest extends CredentialOfferTemp {
  @IsString()
  public connectionId!: string
}
