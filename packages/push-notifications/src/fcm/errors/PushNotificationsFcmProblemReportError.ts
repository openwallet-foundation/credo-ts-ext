import type { PushNotificationsFcmProblemReportReason } from './PushNotificationsFcmProblemReportReason'
import type { DidCommProblemReportErrorOptions } from '@credo-ts/didcomm'

import { DidCommProblemReportError } from '@credo-ts/didcomm'

import { PushNotificationsFcmProblemReportMessage } from '../messages'

/**
 * @internal
 */
interface PushNotificationsFcmProblemReportErrorOptions extends DidCommProblemReportErrorOptions {
  problemCode: PushNotificationsFcmProblemReportReason
}

/**
 * @internal
 */
export class PushNotificationsFcmProblemReportError extends DidCommProblemReportError {
  public problemReport: PushNotificationsFcmProblemReportMessage

  public constructor(
    public message: string,
    { problemCode }: PushNotificationsFcmProblemReportErrorOptions,
  ) {
    super(message, { problemCode })
    this.problemReport = new PushNotificationsFcmProblemReportMessage({
      description: {
        en: message,
        code: problemCode,
      },
    })
  }
}
