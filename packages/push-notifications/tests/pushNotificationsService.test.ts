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
    test('Should create a valid https://didcomm.org/push-notifications/1.0/set-native-device-info message ', async () => {
      const message = pushNotificationsService.createSetNativeDeviceInfo({
        deviceToken: '123',
        deviceVendor: 'android',
      })

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/set-native-device-info',
        device_token: '123',
        device_vendor: 'android',
      })
    })
  })
})