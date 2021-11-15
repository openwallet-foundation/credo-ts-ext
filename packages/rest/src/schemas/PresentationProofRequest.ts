import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class PresentationProofRequest {
  @IsOptional()
  @IsBoolean()
  public filterByPresentationPreview?: boolean

  @IsOptional()
  @IsString()
  public comment?: string
}
