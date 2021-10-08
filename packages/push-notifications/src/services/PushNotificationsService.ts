import { ConnectionService } from '@aries-framework/core'
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
  public constructor(private connectionService: ConnectionService) {}

  public async createSetNativeDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const message = new PushNotificationsSetNativeDeviceInfoMessage(deviceInfo)
    const connection = await this.connectionService.getById(connectionId)
    return { message, connection }
  }

  public async createSetFcmDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const message = new PushNotificationsSetFcmDeviceInfoMessage(deviceInfo)
    const connection = await this.connectionService.getById(connectionId)
    return { message, connection }
  }

  public async createSetExpoDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const message = new PushNotificationsSetExpoDeviceInfoMessage(deviceInfo)
    const connection = await this.connectionService.getById(connectionId)
    return { message, connection }
  }

  public async createGetDeviceInfo(connectionId: string) {
    const message = new PushNotificationsGetDeviceInfoMessage()
    const connection = await this.connectionService.getById(connectionId)
    return { message, connection }
  }
}
