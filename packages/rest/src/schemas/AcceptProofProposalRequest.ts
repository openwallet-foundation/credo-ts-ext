import { IsOptional, IsString } from 'class-validator'

export class AcceptProofProposalRequest {
  @IsOptional()
  public request?: {
    name?: string
    version?: string
    nonce?: string
  }

  @IsOptional()
  @IsString()
  public comment?: string
}
