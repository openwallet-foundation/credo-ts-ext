import { IsBoolean, IsString, IsOptional } from 'class-validator'

export class InvitationConfigRequest {
  @IsOptional()
  @IsBoolean()
  public autoAcceptConnection?: boolean

  @IsOptional()
  @IsString()
  public alias?: string

  @IsOptional()
  @IsString()
  public mediatorId?: string
}
