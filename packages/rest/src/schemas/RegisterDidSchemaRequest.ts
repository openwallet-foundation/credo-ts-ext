import { IsString, Matches } from 'class-validator'

export class RegisterDidSchemaRequest {
  @IsString()
  @Matches(/^(did:sov:)?[a-zA-Z0-9]{21,22}$/)
  public did!: string

  @IsString()
  public verkey!: string

  @IsString()
  public alias!: string
}
