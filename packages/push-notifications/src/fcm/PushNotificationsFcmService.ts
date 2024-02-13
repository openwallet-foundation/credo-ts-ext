import type { FcmDeviceInfo } from './models/FcmDeviceInfo'
import type { InboundMessageContext } from '@credo-ts/core'

import { CredoError } from '@credo-ts/core'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsFcmProblemReportError, PushNotificationsFcmProblemReportReason } from './errors'
import {
  PushNotificationsFcmSetDeviceInfoMessage,
  PushNotificationsFcmGetDeviceInfoMessage,
  PushNotificationsFcmDeviceInfoMessage,
} from './messages'

@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsFcmService {
  public createSetDeviceInfo(deviceInfo: FcmDeviceInfo) {
    if (
      (deviceInfo.deviceToken === null && deviceInfo.devicePlatform !== null) ||
      (deviceInfo.deviceToken !== null && deviceInfo.devicePlatform === null)
    )
      throw new CredoError('Both or none of deviceToken and devicePlatform must be null')

    return new PushNotificationsFcmSetDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsFcmGetDeviceInfoMessage({})
  }

  public createDeviceInfo(options: { threadId: string; deviceInfo: FcmDeviceInfo }) {
    const { threadId, deviceInfo } = options
    if (
      (deviceInfo.deviceToken === null && deviceInfo.devicePlatform !== null) ||
      (deviceInfo.deviceToken !== null && deviceInfo.devicePlatform === null)
    )
      throw new CredoError('Both or none of deviceToken and devicePlatform must be null')

    return new PushNotificationsFcmDeviceInfoMessage({
      threadId,
      deviceToken: deviceInfo.deviceToken,
      devicePlatform: deviceInfo.devicePlatform,
    })
  }

  public processSetDeviceInfo(messageContext: InboundMessageContext<PushNotificationsFcmSetDeviceInfoMessage>) {
    const { message } = messageContext
    if (
      (message.deviceToken === null && message.devicePlatform !== null) ||
      (message.deviceToken !== null && message.devicePlatform === null)
    )
      throw new PushNotificationsFcmProblemReportError('Both or none of deviceToken and devicePlatform must be null', {
        problemCode: PushNotificationsFcmProblemReportReason.MissingValue,
      })
  }
}
