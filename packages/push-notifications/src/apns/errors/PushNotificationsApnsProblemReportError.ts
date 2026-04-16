import type { PushNotificationsApnsProblemReportReason } from './PushNotificationsApnsProblemReportReason'
import type { DidCommProblemReportErrorOptions } from '@credo-ts/didcomm'

import { DidCommProblemReportError } from '@credo-ts/didcomm'

import { PushNotificationsApnsProblemReportMessage } from '../messages'

/**
 * @internal
 */
interface PushNotificationsApnsProblemReportErrorOptions extends DidCommProblemReportErrorOptions {
  problemCode: PushNotificationsApnsProblemReportReason
}

/**
 * @internal
 */
export class PushNotificationsApnsProblemReportError extends DidCommProblemReportError {
  public problemReport: PushNotificationsApnsProblemReportMessage

  public constructor(
    public message: string,
    { problemCode }: PushNotificationsApnsProblemReportErrorOptions,
  ) {
    super(message, { problemCode })
    this.problemReport = new PushNotificationsApnsProblemReportMessage({
      description: {
        en: message,
        code: problemCode,
      },
    })
  }
}
