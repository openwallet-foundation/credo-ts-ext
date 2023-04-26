import type { ApnsDeviceInfo } from './ApnsDeviceInfo'

import { injectable } from 'tsyringe'

import {
  PushNotificationsApnsSetDeviceInfoMessage,
  PushNotificationsApnsGetDeviceInfoMessage,
  PushNotificationsApnsDeviceInfoMessage,
} from '../../messages'

@injectable()
export class PushNotificationsApnsService {
  public createSetDeviceInfo(deviceInfo: ApnsDeviceInfo) {
    return new PushNotificationsApnsSetDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsApnsGetDeviceInfoMessage({})
  }

  public createDeviceInfo(deviceInfo: ApnsDeviceInfo) {
    return new PushNotificationsApnsDeviceInfoMessage(deviceInfo)
  }
}
