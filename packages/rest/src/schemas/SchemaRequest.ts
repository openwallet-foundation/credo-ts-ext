import { IsString, IsArray, Matches } from 'class-validator'

export class SchemaRequest {
  @IsString()
  public name!: string

  @Matches(/^(\d+\.)?(\d+\.)?(\*|\d+)$/, {
    message: 'Version must be X.X or X.X.X',
  })
  public version!: string

  @IsArray()
  public attributes!: string[]
}
