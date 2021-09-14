import { ProofRequest } from '@aries-framework/core'
import { RecordTransformer } from '@aries-framework/core/build/utils/transformers'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

export class ProofRequestRequest {
  @ValidateNested()
  @RecordTransformer(ProofRequest)
  public proofRequest!: ProofRequest

  @IsOptional()
  @IsString()
  public comment?: string
}
