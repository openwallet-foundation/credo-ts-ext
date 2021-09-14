import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { InvitationConfigRequest } from './InvitationConfigRequest'
import { InvitationRequest } from './InvitationRequest'

export class ReceiveInvitationRequest extends InvitationConfigRequest {
  @ValidateNested()
  @Type(() => InvitationRequest)
  public invitation!: InvitationRequest
}
