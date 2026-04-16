import type { DidCommProblemReportMessageOptions } from '@credo-ts/didcomm'

import { DidCommProblemReportMessage, IsValidMessageType, parseMessageType } from '@credo-ts/didcomm'

export type PushNotificationsFcmProblemReportMessageOptions = DidCommProblemReportMessageOptions

/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 * @internal
 */
export class PushNotificationsFcmProblemReportMessage extends DidCommProblemReportMessage {
  /**
   * Create new ConnectionProblemReportMessage instance.
   * @param options
   */
  public constructor(options: PushNotificationsFcmProblemReportMessageOptions) {
    super(options)
  }

  @IsValidMessageType(PushNotificationsFcmProblemReportMessage.type)
  public readonly type = PushNotificationsFcmProblemReportMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-fcm/1.0/problem-report')
}
