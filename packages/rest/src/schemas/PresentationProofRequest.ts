import { PresentationPreview, ProofRequest } from '@aries-framework/core'
import { RecordTransformer } from '@aries-framework/core/build/utils/transformers'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

export class PresentationProofRequest {
  @ValidateNested()
  @RecordTransformer(ProofRequest)
  public proofRequest!: ProofRequest

  @IsOptional()
  @ValidateNested()
  @RecordTransformer(PresentationPreview)
  public presentationProposal?: PresentationPreview

  @IsOptional()
  @IsString()
  public comment?: string
}
