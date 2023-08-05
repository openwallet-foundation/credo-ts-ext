import type { ProblemReportMessageOptions } from '@aries-framework/core'

import { IsValidMessageType, parseMessageType, ProblemReportMessage } from '@aries-framework/core'

export type PushNotificationsFcmProblemReportMessageOptions = ProblemReportMessageOptions

/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 * @internal
 */
export class PushNotificationsFcmProblemReportMessage extends ProblemReportMessage {
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
