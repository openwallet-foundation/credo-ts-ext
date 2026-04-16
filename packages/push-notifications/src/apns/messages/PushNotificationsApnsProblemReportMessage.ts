import type { DidCommProblemReportMessageOptions } from '@credo-ts/didcomm'

import { DidCommProblemReportMessage, IsValidMessageType, parseMessageType } from '@credo-ts/didcomm'

export type PushNotificationsApnsProblemReportMessageOptions = DidCommProblemReportMessageOptions

/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 * @internal
 */
export class PushNotificationsApnsProblemReportMessage extends DidCommProblemReportMessage {
  /**
   * Create new ConnectionProblemReportMessage instance.
   * @param options
   */
  public constructor(options: PushNotificationsApnsProblemReportMessageOptions) {
    super(options)
  }

  @IsValidMessageType(PushNotificationsApnsProblemReportMessage.type)
  public readonly type = PushNotificationsApnsProblemReportMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-apns/1.0/problem-report')
}
