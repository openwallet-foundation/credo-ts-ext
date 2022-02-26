import { IsString } from 'class-validator'

export class BasicMessageRequest {
  @IsString()
  public content!: string
}
