import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsGetDeviceInfoMessage, PushNotificationsSetNativeDeviceInfoMessage } from '../messages'

export type DeviceVendor = 'android' | 'ios' | string

export interface DeviceInfo {
  deviceToken: string
  deviceVendor: DeviceVendor
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
