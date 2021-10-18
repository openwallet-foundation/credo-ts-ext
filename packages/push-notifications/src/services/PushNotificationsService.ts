import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsGetDeviceInfoMessage, PushNotificationsSetNativeDeviceInfoMessage } from '../messages'

export type DevicePlatform = 'android' | 'ios' | string

export interface DeviceInfo {
  deviceToken: string
  devicePlatform: DevicePlatform
}

@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsService {
  public createSetNativeDeviceInfo(deviceInfo: DeviceInfo) {
    return new PushNotificationsSetNativeDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsGetDeviceInfoMessage()
  }
}
