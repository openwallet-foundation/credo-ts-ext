import type { PresentationPreviewAttributeOptions, PresentationPreviewPredicateOptions } from '@aries-framework/core'

import { AutoAcceptProof } from '@aries-framework/core'
import { IsString, IsOptional, IsEnum } from 'class-validator'

export class ProofProposalRequest {
  @IsString()
  public connectionId!: string

  @IsOptional()
  public attributes!: PresentationPreviewAttributeOptions[]

  @IsOptional()
  public predicates!: PresentationPreviewPredicateOptions[]

  @IsOptional()
  @IsEnum(AutoAcceptProof)
  public autoAcceptProof?: AutoAcceptProof

  @IsOptional()
  @IsString()
  public comment?: string
}
