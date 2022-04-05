import { AutoAcceptProof } from '@aries-framework/core'
import { Type } from 'class-transformer'
import { IsString, IsOptional, ValidateNested, IsEnum, IsInstance } from 'class-validator'

import { ProofRequest } from '../utils/ProofRequest'

export class ProofRequestTemplate {
  @ValidateNested()
  @Type(() => ProofRequest)
  @IsInstance(ProofRequest)
  public proofRequest!: ProofRequest

  @IsOptional()
  @IsString()
  public comment?: string

  @IsOptional()
  @IsEnum(AutoAcceptProof)
  public autoAcceptProof?: AutoAcceptProof
}
