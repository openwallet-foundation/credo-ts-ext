import { AutoAcceptProof, PresentationPreviewAttribute, PresentationPreviewPredicate } from '@aries-framework/core'
import { Type } from 'class-transformer'
import { IsString, IsOptional, ValidateNested, IsEnum, IsInstance } from 'class-validator'

export class ProofProposalRequest {
  @IsString()
  public connectionId!: string

  @ValidateNested({ each: true })
  @Type(() => PresentationPreviewAttribute)
  @IsInstance(PresentationPreviewAttribute, { each: true })
  @IsOptional()
  public attributes!: PresentationPreviewAttribute[]

  @ValidateNested({ each: true })
  @Type(() => PresentationPreviewPredicate)
  @IsInstance(PresentationPreviewPredicate, { each: true })
  @IsOptional()
  public predicates!: PresentationPreviewPredicate[]

  @IsOptional()
  @IsEnum(AutoAcceptProof)
  public autoAcceptProof?: AutoAcceptProof

  @IsOptional()
  @IsString()
  public comment?: string
}
