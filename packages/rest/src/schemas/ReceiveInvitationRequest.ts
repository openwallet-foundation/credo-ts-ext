import { Type } from 'class-transformer'
import { IsInstance, ValidateNested } from 'class-validator'

import { InvitationConfigRequest } from './InvitationConfigRequest'
import { InvitationRequest } from './InvitationRequest'

export class ReceiveInvitationRequest extends InvitationConfigRequest {
  @ValidateNested()
  @Type(() => InvitationRequest)
  @IsInstance(InvitationRequest)
  public invitation!: InvitationRequest
}
