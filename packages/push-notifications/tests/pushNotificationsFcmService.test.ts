import type { Agent } from '@aries-framework/core'

import { JsonTransformer } from '@aries-framework/core'

import { PushNotificationsFcmService } from '../src/fcm/PushNotificationsFcmService'

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

  describe('Create fcm set push notification message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-fcm/1.0/set-device-info message ', async () => {
      const message = pushNotificationsService.createSetDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm/1.0/set-device-info',
        device_token: '1234-1234-1234-1234',
      })
    })
  })

  describe('Create fcm get device info message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-fcm/1.0/get-device-info message ', async () => {
      const message = pushNotificationsService.createGetDeviceInfo()

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm/1.0/get-device-info',
      })
    })
  })

  describe('Create fcm device info message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-fcm/1.0/device-info message ', async () => {
      const message = pushNotificationsService.createDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm/1.0/device-info',
        device_token: '1234-1234-1234-1234',
      })
    })
  })
})
