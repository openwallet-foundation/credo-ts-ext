import 'reflect-metadata'

import type { Agent } from '@aries-framework/core'

import { classToPlain } from 'class-transformer'

import { PushNotificationsService } from '../src/services'

import { getTestAgent } from './utils/helpers'

describe('PushNotifications', () => {
  let notificationReceiver: Agent
  let pushNotificationsService: PushNotificationsService

  beforeAll(async () => {
    notificationReceiver = getTestAgent('push notifications notification receiver test')
    pushNotificationsService = notificationReceiver.injectionContainer.resolve(PushNotificationsService)
    await notificationReceiver.initialize()
  })

  afterAll(async () => {
    await notificationReceiver.shutdown({
      deleteWallet: true,
    })
  })

  describe('Create set Native push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications-native/1.0/set-device-info message ', async () => {
      const message = pushNotificationsService.createSetNativeDeviceInfo({
        deviceToken: '1234-1234-1234-1234',
        devicePlatform: 'android',
      })

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications-native/1.0/set-device-info',
        device_token: '1234-1234-1234-1234',
        device_vendor: 'android',
      })
    })
  })
})
