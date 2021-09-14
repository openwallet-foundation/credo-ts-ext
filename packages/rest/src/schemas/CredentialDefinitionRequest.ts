import { IsString, IsBoolean, Matches } from 'class-validator'

export class CredentialDefinitionRequest {
  @IsString()
  public tag!: string

  @IsBoolean()
  public supportRevocation!: boolean

  @IsString()
  @Matches(/^[a-zA-Z0-9]{21,22}:2:.+:[0-9.]+$/)
  public schemaId!: string
}
