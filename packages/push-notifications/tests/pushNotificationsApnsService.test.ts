import type { Agent } from '@credo-ts/core'

import { JsonTransformer } from '@credo-ts/core'

import { PushNotificationsApnsService } from '../src/apns/PushNotificationsApnsService'

import { setupAgentApns } from './utils/agent'

describe('Push Notifications apns', () => {
  let agent: Agent
  let pushNotificationsApnsService: PushNotificationsApnsService

  beforeAll(async () => {
    agent = await setupAgentApns({
      name: 'push notifications apns service notification receiver test',
    })
    pushNotificationsApnsService = agent.dependencyManager.resolve(PushNotificationsApnsService)
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  describe('Create apns set push notification message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-apns/1.0/device-info message ', async () => {
      const message = pushNotificationsApnsService.createDeviceInfo({
        threadId: '5678-5678-5678-5678',
        deviceInfo: {
          deviceToken: '1234-1234-1234-1234',
        },
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual(
        expect.objectContaining({
          '@id': expect.any(String),
          '@type': 'https://didcomm.org/push-notifications-apns/1.0/device-info',
          device_token: '1234-1234-1234-1234',
          '~thread': expect.objectContaining({ thid: '5678-5678-5678-5678' }),
        }),
      )
    })
  })
  describe('Create apns set push notification message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-apns/1.0/set-device-info message ', async () => {
      const message = pushNotificationsApnsService.createSetDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-apns/1.0/set-device-info',
        device_token: '1234-1234-1234-1234',
      })
    })
  })

  describe('Create apns get device info message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-apns/1.0/get-device-info message ', async () => {
      const message = pushNotificationsApnsService.createGetDeviceInfo()

      const jsonMessage = JsonTransformer.toJSON(message)

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-apns/1.0/get-device-info',
      })
    })
  })
})
