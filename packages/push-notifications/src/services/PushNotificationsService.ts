import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsGetDeviceInfoMessage, PushNotificationsSetNativeDeviceInfoMessage } from '../messages'

export enum DevicePlatform {
  Android = 'android',
  Ios = 'ios',
}

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
