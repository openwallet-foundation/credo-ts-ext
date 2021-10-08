import { ConnectionService } from '@aries-framework/core'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsGetDeviceInfoMessage, PushNotificationsSetDeviceInfoMessage } from '../messages'

export interface DeviceInfo {
  deviceToken: string
  deviceVendor: DeviceVendor
}

export enum DeviceVendor {
  Android = 'android',
  Ios = 'ios',
}

@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsService {
  public constructor(private connectionService: ConnectionService) {}

  public async processSetDeviceInfo(deviceInfo: DeviceInfo, connectionId: string) {
    const message = new PushNotificationsSetDeviceInfoMessage(deviceInfo)
    const connection = await this.connectionService.getById(connectionId)
    return { message, connection }
  }

  public async processGetDeviceInfo(connectionId: string) {
    const message = new PushNotificationsGetDeviceInfoMessage()
    const connection = await this.connectionService.getById(connectionId)
    return { message, connection }
  }
}
