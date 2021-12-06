import { AutoAcceptProof, ProofRequest } from '@aries-framework/core'
import { Type } from 'class-transformer'
import { IsString, IsOptional, ValidateNested, IsEnum } from 'class-validator'

export class ProofRequestTemplate {
  @ValidateNested()
  @Type(() => ProofRequest)
  public proofRequest!: ProofRequest

  @IsOptional()
  @IsString()
  public comment?: string

  @IsOptional()
  @IsEnum(AutoAcceptProof)
  public autoAcceptProof?: AutoAcceptProof
}
