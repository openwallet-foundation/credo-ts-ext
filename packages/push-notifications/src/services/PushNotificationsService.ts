import { Lifecycle, scoped } from 'tsyringe'

import {
  PushNotificationsGetDeviceInfoMessage,
  PushNotificationsSetExpoDeviceInfoMessage,
  PushNotificationsSetFcmDeviceInfoMessage,
  PushNotificationsSetNativeDeviceInfoMessage,
} from '../messages'

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

  public createSetFcmDeviceInfo(deviceInfo: DeviceInfo) {
    return new PushNotificationsSetFcmDeviceInfoMessage(deviceInfo)
  }

  public createSetExpoDeviceInfo(deviceInfo: DeviceInfo) {
    return new PushNotificationsSetExpoDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsGetDeviceInfoMessage()
  }
}
