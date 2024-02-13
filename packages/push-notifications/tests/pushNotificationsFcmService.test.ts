import type { Agent, AgentMessage, ConnectionRecord } from '@credo-ts/core'

import { AgentContext, DependencyManager, JsonTransformer } from '@credo-ts/core'

import { PushNotificationsFcmService } from '../src/fcm/PushNotificationsFcmService'
import { PushNotificationsFcmProblemReportError } from '../src/fcm/errors'

import { setupAgentFcm } from './utils/agent'

describe('Push Notifications Fcm ', () => {
  let agent: Agent
  let pushNotificationsService: PushNotificationsFcmService

  beforeAll(async () => {
    agent = await setupAgentFcm({
      name: 'push notifications fcm service notification receiver test',
    })

    pushNotificationsService = agent.dependencyManager.resolve(PushNotificationsFcmService)
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  describe('Create fcm set-device-info message', () => {
    test('Should create a valid message with both token and platform', async () => {
      const message = pushNotificationsService.createSetDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
        devicePlatform: 'android',
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm/1.0/set-device-info',
        device_token: '1234-1234-1234-1234',
        device_platform: 'android',
      })
    })

    test('Should create a valid message without token and platform ', async () => {
      const message = pushNotificationsService.createSetDeviceInfo({
        deviceToken: null,
        devicePlatform: null,
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm/1.0/set-device-info',
        device_token: null,
        device_platform: null,
      })
    })

    test('Should throw error if either token or platform are missing', async () => {
      expect(() =>
        pushNotificationsService.createSetDeviceInfo({
          deviceToken: 'something',
          devicePlatform: null,
        }),
      ).toThrow('Both or none of deviceToken and devicePlatform must be null')

      expect(() =>
        pushNotificationsService.createSetDeviceInfo({
          deviceToken: null,
          devicePlatform: 'something',
        }),
      ).toThrow('Both or none of deviceToken and devicePlatform must be null')
    })
  })

  describe('Create fcm get-device-info message', () => {
    test('Should create a valid message ', async () => {
      const message = pushNotificationsService.createGetDeviceInfo()

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm/1.0/get-device-info',
      })
    })
  })

  describe('Create fcm device-info message', () => {
    test('Should create a valid message with both token and platform', async () => {
      const message = pushNotificationsService.createDeviceInfo({
        threadId: '5678-5678-5678-5678',
        deviceInfo: {
          deviceToken: '1234-1234-1234-1234',
          devicePlatform: 'android',
        },
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual(
        expect.objectContaining({
          '@id': expect.any(String),
          '@type': 'https://didcomm.org/push-notifications-fcm/1.0/device-info',
          device_token: '1234-1234-1234-1234',
          device_platform: 'android',
          '~thread': expect.objectContaining({ thid: '5678-5678-5678-5678' }),
        }),
      )
    })

    test('Should create a valid message without token and platform ', async () => {
      const message = pushNotificationsService.createDeviceInfo({
        threadId: '5678-5678-5678-5678',
        deviceInfo: {
          deviceToken: null,
          devicePlatform: null,
        },
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual(
        expect.objectContaining({
          '@id': expect.any(String),
          '@type': 'https://didcomm.org/push-notifications-fcm/1.0/device-info',
          device_token: null,
          device_platform: null,
          '~thread': expect.objectContaining({ thid: '5678-5678-5678-5678' }),
        }),
      )
    })

    test('Should throw error if either token or platform are missing', async () => {
      expect(() =>
        pushNotificationsService.createDeviceInfo({
          threadId: '5678-5678-5678-5678',
          deviceInfo: {
            deviceToken: 'something',
            devicePlatform: null,
          },
        }),
      ).toThrow('Both or none of deviceToken and devicePlatform must be null')

      expect(() =>
        pushNotificationsService.createDeviceInfo({
          threadId: '5678-5678-5678-5678',
          deviceInfo: {
            deviceToken: null,
            devicePlatform: 'something',
          },
        }),
      ).toThrow('Both or none of deviceToken and devicePlatform must be null')
    })
  })

  describe('Process fcm set-device-info message', () => {
    test('Should throw if one of token and platform are missing', async () => {
      const message = pushNotificationsService.createSetDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
        devicePlatform: 'android',
      })

      message.devicePlatform = null
      expect(() => pushNotificationsService.processSetDeviceInfo(createInboundMessageContext(message))).toThrow(
        PushNotificationsFcmProblemReportError,
      )

      message.deviceToken = null
      expect(() => pushNotificationsService.processSetDeviceInfo(createInboundMessageContext(message))).not.toThrow(
        PushNotificationsFcmProblemReportError,
      )

      message.devicePlatform = 'something'
      expect(() => pushNotificationsService.processSetDeviceInfo(createInboundMessageContext(message))).toThrow(
        PushNotificationsFcmProblemReportError,
      )
    })
  })
})

function createInboundMessageContext<T extends AgentMessage>(message: T) {
  return {
    agentContext: new AgentContext({ dependencyManager: new DependencyManager(), contextCorrelationId: '' }),
    message,
    assertReadyConnection: function (): ConnectionRecord {
      throw new Error('Function not implemented.')
    },
    toJSON: function (): {
      message: T
      recipientKey: string | undefined
      senderKey: string | undefined
      sessionId: string | undefined
      agentContext: { contextCorrelationId: string }
    } {
      throw new Error('Function not implemented.')
    },
  }
}
