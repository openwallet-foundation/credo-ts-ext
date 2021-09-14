import { AutoAcceptCredential } from '@aries-framework/core'
import { IsOptional, IsString, IsEnum } from 'class-validator'

export class AcceptCredentialProposalRequest {
  @IsOptional()
  @IsString()
  public comment?: string

  @IsOptional()
  @IsString()
  public credentialDefinitionId?: string

  @IsOptional()
  @IsEnum(AutoAcceptCredential)
  public autoAcceptCredential?: AutoAcceptCredential
}
