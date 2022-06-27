import { IndyRevocationInterval, ProofAttributeInfo, ProofPredicateInfo } from '@aries-framework/core'
import { IsMap } from '@aries-framework/core/build/utils/transformers'
import { Expose, Type } from 'class-transformer'
import { IsString, ValidateNested, IsInstance, IsOptional, IsIn } from 'class-validator'

export class ProofRequest {
  @IsString()
  public name!: string

  @IsString()
  public version!: string

  @IsString()
  @IsOptional()
  public nonce?: string

  @Expose({ name: 'requested_attributes' })
  @IsMap()
  @ValidateNested({ each: true })
  @Type(() => ProofAttributeInfo)
  @IsInstance(ProofAttributeInfo, { each: true })
  public requestedAttributes!: Map<string, ProofAttributeInfo>

  @Expose({ name: 'requested_predicates' })
  @IsMap()
  @ValidateNested({ each: true })
  @Type(() => ProofPredicateInfo)
  @IsInstance(ProofPredicateInfo, { each: true })
  public requestedPredicates!: Map<string, ProofPredicateInfo>

  @Expose({ name: 'non_revoked' })
  @ValidateNested()
  @Type(() => IndyRevocationInterval)
  @IsOptional()
  @IsInstance(IndyRevocationInterval)
  public nonRevoked?: IndyRevocationInterval

  @IsIn(['1.0', '2.0'])
  @IsOptional()
  public ver?: '1.0' | '2.0'
}
