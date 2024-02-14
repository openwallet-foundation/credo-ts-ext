import type { PushNotificationsApnsProblemReportReason } from './PushNotificationsApnsProblemReportReason'
import type { ProblemReportErrorOptions } from '@credo-ts/core'

import { ProblemReportError } from '@credo-ts/core'

import { PushNotificationsApnsProblemReportMessage } from '../messages'

/**
 * @internal
 */
interface PushNotificationsApnsProblemReportErrorOptions extends ProblemReportErrorOptions {
  problemCode: PushNotificationsApnsProblemReportReason
}

/**
 * @internal
 */
export class PushNotificationsApnsProblemReportError extends ProblemReportError {
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
