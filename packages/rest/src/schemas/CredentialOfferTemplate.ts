import type { CredentialOfferTemplate } from '@aries-framework/core'

import { CredentialPreview, AutoAcceptCredential } from '@aries-framework/core'
import { Attachment } from '@aries-framework/core/build/decorators/attachment/Attachment'
import { LinkedAttachment } from '@aries-framework/core/build/utils/LinkedAttachment'
import { Type } from 'class-transformer'
import { IsString, IsOptional, ValidateNested, IsEnum, Matches, IsInstance } from 'class-validator'

export class CredentialOfferTemp implements CredentialOfferTemplate {
  @IsString()
  @Matches(/^([a-zA-Z0-9]{21,22}):3:CL:(([1-9][0-9]*)|([a-zA-Z0-9]{21,22}:2:.+:[0-9.]+)):(.+)?$/)
  public credentialDefinitionId!: string

  @IsOptional()
  @IsString()
  public comment?: string

  @ValidateNested()
  @Type(() => CredentialPreview)
  @IsInstance(CredentialPreview)
  public preview!: CredentialPreview

  @IsEnum(AutoAcceptCredential)
  @IsOptional()
  public autoAcceptCredential?: AutoAcceptCredential

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
}
