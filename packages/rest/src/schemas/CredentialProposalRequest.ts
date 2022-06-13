import { AutoAcceptCredential, V1CredentialPreview } from '@aries-framework/core'
import { Attachment } from '@aries-framework/core/build/decorators/attachment/Attachment'
import { LinkedAttachment } from '@aries-framework/core/build/utils/LinkedAttachment'
import { Type } from 'class-transformer'
import { IsString, ValidateNested, IsOptional, Matches, IsEnum, IsInstance } from 'class-validator'

export class CredentialProposalRequest {
  @IsString()
  public connectionId!: string

  @IsOptional()
  @IsString()
  public comment?: string

  @ValidateNested()
  @Type(() => V1CredentialPreview)
  @IsInstance(V1CredentialPreview)
  public credentialProposal?: V1CredentialPreview

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

  @ValidateNested({ each: true })
  @Type(() => Attachment)
  @IsInstance(Attachment, { each: true })
  @IsOptional()
  public attachments?: Attachment[]

  @ValidateNested({ each: true })
  @Type(() => LinkedAttachment)
  @IsInstance(LinkedAttachment, { each: true })
  @IsOptional()
  public linkedAttachments?: LinkedAttachment[]

  @IsEnum(AutoAcceptCredential)
  @IsOptional()
  public autoAcceptCredential?: AutoAcceptCredential
}
