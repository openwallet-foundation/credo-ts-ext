import type { ApnsDeviceInfo } from './models/ApnsDeviceInfo'

import { injectable } from 'tsyringe'

import {
  PushNotificationsApnsSetDeviceInfoMessage,
  PushNotificationsApnsGetDeviceInfoMessage,
  PushNotificationsApnsDeviceInfoMessage,
} from './messages'

@injectable()
export class PushNotificationsApnsService {
  public createSetDeviceInfo(deviceInfo: ApnsDeviceInfo) {
    return new PushNotificationsApnsSetDeviceInfoMessage(deviceInfo)
  }

  public createGetDeviceInfo() {
    return new PushNotificationsApnsGetDeviceInfoMessage({})
  }

  public createDeviceInfo(options: { threadId: string; deviceInfo: ApnsDeviceInfo }) {
    const { threadId, deviceInfo } = options
    return new PushNotificationsApnsDeviceInfoMessage({ threadId, deviceToken: deviceInfo.deviceToken })
  }
}
