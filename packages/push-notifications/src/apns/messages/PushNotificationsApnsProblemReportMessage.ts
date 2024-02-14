import type { ProblemReportMessageOptions } from '@credo-ts/core'

import { IsValidMessageType, parseMessageType, ProblemReportMessage } from '@credo-ts/core'

export type PushNotificationsApnsProblemReportMessageOptions = ProblemReportMessageOptions

/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 * @internal
 */
export class PushNotificationsApnsProblemReportMessage extends ProblemReportMessage {
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
