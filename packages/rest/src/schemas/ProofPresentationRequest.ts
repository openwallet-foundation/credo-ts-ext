import { IsString } from 'class-validator'

import { ProofRequestTemplate } from './ProofRequestTemplate'

export class ProofPresentationRequest extends ProofRequestTemplate {
  @IsString()
  public connectionId!: string
}
