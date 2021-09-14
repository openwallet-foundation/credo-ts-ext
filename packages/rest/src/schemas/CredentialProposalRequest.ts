import type { CredentialProposeOptions } from '@aries-framework/core'
import type { Attachment } from '@aries-framework/core/build/decorators/attachment/Attachment'
import type { LinkedAttachment } from '@aries-framework/core/build/utils/LinkedAttachment'

import { AutoAcceptCredential, CredentialPreview } from '@aries-framework/core'
import { Type } from 'class-transformer'
import { IsDefined, IsString, ValidateNested, IsOptional, Matches, IsEnum } from 'class-validator'

export class CredentialProposalRequest implements CredentialProposeOptions {
  @IsOptional()
  @IsString()
  public comment?: string

  @ValidateNested()
  @Type(() => CredentialPreview)
  @IsDefined()
  public credentialProposal?: CredentialPreview

  @IsOptional()
  @IsString()
  @Matches(/^(did:sov:)?[a-zA-Z0-9]{21,22}$/)
  public schemaIssuerDid?: string

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{21,22}:2:.+:[0-9.]+$/)
  public schemaId?: string

  @IsOptional()
  @IsString()
  public schemaName?: string

  @IsOptional()
  @IsString()
  @Matches(/^(\d+\.)?(\d+\.)?(\*|\d+)$/, {
    message: 'Version must be X.X or X.X.X',
  })
  public schemaVersion?: string

  @IsOptional()
  @IsString()
  @Matches(/^([a-zA-Z0-9]{21,22}):3:CL:(([1-9][0-9]*)|([a-zA-Z0-9]{21,22}:2:.+:[0-9.]+)):(.+)?$/)
  public credentialDefinitionId?: string

  @IsOptional()
  @IsString()
  @Matches(/^(did:sov:)?[a-zA-Z0-9]{21,22}$/)
  public issuerDid?: string

  @IsOptional()
  public attachments?: Attachment[]

  @IsOptional()
  public linkedAttachments?: LinkedAttachment[]

  @IsEnum(AutoAcceptCredential)
  @IsOptional()
  public autoAcceptCredential?: AutoAcceptCredential
}
