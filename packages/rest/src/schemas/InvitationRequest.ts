import { Expose } from 'class-transformer'
import { IsString, IsArray, IsOptional } from 'class-validator'

export class InvitationRequest {
  @Expose({ name: '@Id' })
  public id!: string

  @Expose({ name: '@Type' })
  public type!: string

  @IsString()
  public label!: string

  @IsString()
  @IsOptional()
  public did?: string

  @IsArray()
  @IsOptional()
  public recipientKeys?: string[]

  @IsString()
  @IsOptional()
  public serviceEndpoint?: string

  @IsArray()
  @IsOptional()
  public routingKeys?: string[]
}
