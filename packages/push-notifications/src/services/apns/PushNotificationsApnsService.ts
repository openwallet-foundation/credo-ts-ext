import type { ApnsDeviceInfo } from './ApnsDeviceInfo'

import { Lifecycle, scoped } from 'tsyringe'

import {
  PushNotificationsApnsSetDeviceInfoMessage,
  PushNotificationsApnsGetDeviceInfoMessage,
  PushNotificationsApnsDeviceInfoMessage,
} from '../../messages'

@scoped(Lifecycle.ContainerScoped)
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
