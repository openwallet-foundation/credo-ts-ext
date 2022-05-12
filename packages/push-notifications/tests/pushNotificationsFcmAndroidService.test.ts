import type { Agent } from '@aries-framework/core'

import { JsonTransformer } from '@aries-framework/core'
import { MessageValidator } from '@aries-framework/core/build/utils/MessageValidator'

import { PushNotificationsFcmAndroidService } from '../src/services/fcm-android/PushNotificationsFcmAndroidService'

import { setupAgent } from './utils/agent'

describe('PushNotifications', () => {
  let notificationReceiver: Agent
  let pushNotificationsService: PushNotificationsFcmAndroidService

  beforeAll(async () => {
    notificationReceiver = setupAgent({
      name: 'push notifications fcm-android serivce notification receiver test',
      publicDidSeed: '65748374657483920193747564738290',
    })

    pushNotificationsService = notificationReceiver.injectionContainer.resolve(PushNotificationsFcmAndroidService)
    await notificationReceiver.initialize()
  })

  afterAll(async () => {
    await notificationReceiver.shutdown()
    await notificationReceiver.wallet.delete()
  })

  describe('Create fcm-android set push notification message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-fcm-android/1.0/set-device-info message ', async () => {
      const message = pushNotificationsService.createSetDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      await expect(MessageValidator.validate(message)).resolves.toBeUndefined()

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm-android/1.0/set-device-info',
        device_token: '1234-1234-1234-1234',
      })
    })
  })

  describe('Create fcm-android get device info message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-fcm-android/1.0/get-device-info message ', async () => {
      const message = pushNotificationsService.createGetDeviceInfo()

      const jsonMessage = JsonTransformer.toJSON(message)

      await expect(MessageValidator.validate(message)).resolves.toBeUndefined()

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm-android/1.0/get-device-info',
      })
    })
  })

  describe('Create fcm-android device info message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-fcm-android/1.0/device-info message ', async () => {
      const message = pushNotificationsService.createDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
      })

      const jsonMessage = JsonTransformer.toJSON(message)

      await expect(MessageValidator.validate(message)).resolves.toBeUndefined()

      expect(jsonMessage).toEqual({
        '@id': expect.any(String),
        '@type': 'https://didcomm.org/push-notifications-fcm-android/1.0/device-info',
        device_token: '1234-1234-1234-1234',
      })
    })
  })
})
