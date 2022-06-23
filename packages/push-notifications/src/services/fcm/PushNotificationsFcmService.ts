import type { FcmDeviceInfo } from './FcmDeviceInfo'

import { Lifecycle, scoped } from 'tsyringe'

import {
  PushNotificationsFcmSetDeviceInfoMessage,
  PushNotificationsFcmGetDeviceInfoMessage,
  PushNotificationsFcmDeviceInfoMessage,
} from '../../messages'

@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsFcmService {
  public createSetDeviceInfo(deviceInfo: FcmDeviceInfo) {
    return new PushNotificationsFcmSetDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsFcmGetDeviceInfoMessage({})
  }

  public createDeviceInfo(deviceInfo: FcmDeviceInfo) {
    return new PushNotificationsFcmDeviceInfoMessage(deviceInfo)
  }
}
