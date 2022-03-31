import { IsString } from 'class-validator'

export class CreateDidSchemaRequest {
  @IsString()
  public seed!: string
}
