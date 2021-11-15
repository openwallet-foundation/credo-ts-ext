import { AutoAcceptProof, ProofRequest } from '@aries-framework/core'
import { RecordTransformer } from '@aries-framework/core/build/utils/transformers'
import { IsString, IsOptional, ValidateNested, IsEnum } from 'class-validator'

export class ProofRequestTemplate {
  @ValidateNested()
  @RecordTransformer(ProofRequest)
  public proofRequest!: ProofRequest

  @IsOptional()
  @IsString()
  public comment?: string

  @IsOptional()
  @IsEnum(AutoAcceptProof)
  public autoAcceptProof?: AutoAcceptProof
}
