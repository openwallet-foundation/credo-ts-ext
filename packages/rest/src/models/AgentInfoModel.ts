import { IsString, IsArray, IsBoolean, IsOptional, IsObject } from 'class-validator'

export class AgentInfoModel {
  @IsString()
  public label!: string

  @IsArray()
  public endpoints!: string[]

  @IsBoolean()
  public isInitialized!: boolean

  @IsObject()
  @IsOptional()
  public publicDid?: {
    did: string
    verkey: string
  }
}
