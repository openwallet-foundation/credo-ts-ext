import { IsString } from 'class-validator'

import { InvitationConfigRequest } from './InvitationConfigRequest'

export class ReceiveInvitationByUrlRequest extends InvitationConfigRequest {
  @IsString()
  public invitationUrl!: string
}
