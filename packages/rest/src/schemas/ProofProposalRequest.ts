import { PresentationPreviewAttribute, PresentationPreviewPredicate } from '@aries-framework/core'
import { Type } from 'class-transformer'
import { IsString, IsOptional, ValidateNested } from 'class-validator'

export class ProofProposalRequest {
  @IsString()
  public connectionId!: string

  @ValidateNested({ each: true })
  @Type(() => PresentationPreviewAttribute)
  public attributes!: PresentationPreviewAttribute[]

  @ValidateNested({ each: true })
  @Type(() => PresentationPreviewPredicate)
  public predicates!: PresentationPreviewPredicate[]

  @IsOptional()
  @IsString()
  public comment?: string
}
