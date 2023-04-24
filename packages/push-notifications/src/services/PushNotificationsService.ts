import type { DeviceInfo } from './DeviceInfo'

import { injectable } from 'tsyringe'

import {
  PushNotificationsDeviceInfoMessage,
  PushNotificationsGetDeviceInfoMessage,
  PushNotificationsSetDeviceInfoMessage,
} from '../messages'

@injectable()
export class PushNotificationsService {
  public createSetDeviceInfo(deviceInfo: DeviceInfo) {
    return new PushNotificationsSetDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsGetDeviceInfoMessage({})
  }

  public createDeviceInfo(deviceInfo: DeviceInfo) {
    return new PushNotificationsDeviceInfoMessage(deviceInfo)
  }
}
