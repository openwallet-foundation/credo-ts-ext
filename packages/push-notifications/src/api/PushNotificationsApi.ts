// import type { DummyRecord } from './repository/DummyRecord'
import type { DeviceInfo } from '../services'

import {
  OutboundMessageContext,
  AgentContext,
  ConnectionService,
  injectable,
  MessageSender,
} from '@aries-framework/core'

import { PushNotificationsDeviceInfoHandler } from '../handlers'
import { PushNotificationsService } from '../services'

// import { DummyRequestHandler, DummyResponseHandler } from './handlers'
// import { DummyState } from './repository'
// import { DummyService } from './services'

@injectable()
export class PushNotificationsApi {
  private messageSender: MessageSender
  private pushNotificationsService: PushNotificationsService
  private connectionService: ConnectionService
  private agentContext: AgentContext

  public constructor(
    messageSender: MessageSender,
    pushNotificationsService: PushNotificationsService,
    connectionService: ConnectionService,
    agentContext: AgentContext
  ) {
    this.messageSender = messageSender
    this.pushNotificationsService = pushNotificationsService
    this.connectionService = connectionService
    this.agentContext = agentContext

    this.agentContext.dependencyManager.registerMessageHandlers([
      new PushNotificationsDeviceInfoHandler(),
      //   new DummyResponseHandler(this.dummyService),
    ])
  }

  /**
   * Sends a set request with the apns device info (token) to another agent via a `connectionId`
   *
   * @param connectionId The connection ID string
   * @param deviceInfo The APNS device info
   * @returns Promise<void>
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationsService.createSetDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, {
      agentContext: this.agentContext,
      connection: connection,
    })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested apns device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-apns/get-device-info`
   *
   * @param connectionId The connection ID string
   * @param deviceInfo The APNS device info
   * @returns Promise<void>
   */
  public async deviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationsService.createDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, {
      agentContext: this.agentContext,
      connection: connection,
    })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the apns device info (token) from another agent via the `connectionId`
   *
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationsService.createGetDeviceInfo()

    const outbound = new OutboundMessageContext(message, {
      agentContext: this.agentContext,
      connection: connection,
    })
    await this.messageSender.sendMessage(outbound)
  }
}
