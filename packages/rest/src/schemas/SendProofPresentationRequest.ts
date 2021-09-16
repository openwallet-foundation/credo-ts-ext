import { PresentationPreview } from '@aries-framework/core'
import { RecordTransformer } from '@aries-framework/core/build/utils/transformers'
import { IsOptional, ValidateNested } from 'class-validator'

import { ProofRequestRequest } from './ProofPresentationRequest'

export class PresentationProofRequestRequest extends ProofRequestRequest {
  @IsOptional()
  @ValidateNested()
  @RecordTransformer(PresentationPreview)
  public presentationProposal?: PresentationPreview
}
