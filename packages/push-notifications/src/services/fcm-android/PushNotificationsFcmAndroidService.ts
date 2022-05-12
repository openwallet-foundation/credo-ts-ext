import type { FcmAndroidDeviceInfo } from './FcmAndroidDeviceInfo'

import { Lifecycle, scoped } from 'tsyringe'

import {
  PushNotificationsFcmAndroidSetDeviceInfoMessage,
  PushNotificationsFcmAndroidGetDeviceInfoMessage,
  PushNotificationsFcmAndroidDeviceInfoMessage,
} from '../../messages'

@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsFcmAndroidService {
  public createSetDeviceInfo(deviceInfo: FcmAndroidDeviceInfo) {
    return new PushNotificationsFcmAndroidSetDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsFcmAndroidGetDeviceInfoMessage({})
  }

  public createDeviceInfo(deviceInfo: FcmAndroidDeviceInfo) {
    return new PushNotificationsFcmAndroidDeviceInfoMessage(deviceInfo)
  }
}
