import type { DependencyManager, FeatureRegistry, Module } from '@aries-framework/core'

import { BasicMessagesApi } from '@aries-framework/core'

import { PushNotificationsModuleConfig } from '../../PushNotificationsModuleConfig'
// import { PushNotificationsApnsDeviceInfoHandler } from '../../handlers'

/**
 * Module that exposes push notification apns get and set functionality
 */
export class PushNotificationsApnsModule implements Module {
  public readonly config: PushNotificationsModuleConfig | undefined
  public readonly api = undefined

  public constructor(config?: PushNotificationsModuleConfig) {
    this.config = config
  }

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(BasicMessagesApi)

    dependencyManager.registerInstance(PushNotificationsModuleConfig, this.config)
    //   dependencyManager.registerSingleton()
    //   dependencyManager.registerSingleton()
  }
  // public constructor(
  //   private pushNotificationApnsService: PushNotificationsApnsService,
  //   private connectionService: ConnectionService,
  //   private messageSender: MessageSender,
  //   dispatcher: Dispatcher
  // ) {
  //   this.registerHandlers(dispatcher)
  // }

  // /**
  //  * Sends a set request with the apns device info (token) to another agent via a `connectionId`
  //  */
  // public async setDeviceInfo(connectionId: string, deviceInfo: ApnsDeviceInfo) {
  //   const connection = await this.connectionService.getById(connectionId)
  //   connection.assertReady()

  //   const message = this.pushNotificationApnsService.createSetDeviceInfo(deviceInfo)

  //   const outbound = createOutboundMessage(connection, message)
  //   await this.messageSender.sendMessage(outbound)
  // }

  // /**
  //  * Sends the requested apns device info (token) to another agent via a `connectionId`
  //  * Response for `push-notifications-apns/get-device-info`
  //  *
  //  */
  // public async deviceInfo(connectionId: string, deviceInfo: ApnsDeviceInfo) {
  //   const connection = await this.connectionService.getById(connectionId)
  //   connection.assertReady()

  //   const message = this.pushNotificationApnsService.createDeviceInfo(deviceInfo)

  //   const outbound = createOutboundMessage(connection, message)
  //   await this.messageSender.sendMessage(outbound)
  // }

  // /**
  //  * Gets the apns device info (token) from another agent via the `connectionId`
  //  *
  //  */
  // public async getDeviceInfo(connectionId: string) {
  //   const connection = await this.connectionService.getById(connectionId)
  //   connection.assertReady()

  //   const message = this.pushNotificationApnsService.createGetDeviceInfo()

  //   const outbound = createOutboundMessage(connection, message)
  //   await this.messageSender.sendMessage(outbound)
  // }

  // private registerHandlers(dispatcher: Dispatcher) {
  //   dispatcher.registerHandler(new PushNotificationsApnsDeviceInfoHandler())
  // }
}
