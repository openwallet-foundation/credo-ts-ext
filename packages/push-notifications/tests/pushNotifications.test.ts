import type { Agent } from '@aries-framework/core'

import { RecordNotFoundError } from '@aries-framework/core'
import { classToPlain } from 'class-transformer'

import { DeviceVendor, PushNotificationsService } from '../src/services'

import { getTestAgent } from './utils/helpers'

describe('PushNotifications', () => {
  let notificationSender: Agent
  let notificationReceiver: Agent
  let notificationReceiverNotificationSenderConnectionId: string
  let pushNotificationsService: PushNotificationsService

  beforeAll(async () => {
    notificationReceiver = getTestAgent('push notifications notification receiver test')
    notificationSender = getTestAgent('push notifications notification sender test')
    pushNotificationsService = notificationReceiver.injectionContainer.resolve(PushNotificationsService)
    await notificationReceiver.initialize()
    await notificationSender.initialize()

    const { invitation, connectionRecord } = await notificationReceiver.connections.createConnection({
      autoAcceptConnection: true,
    })
    await notificationSender.connections.receiveInvitation(invitation)

    notificationReceiverNotificationSenderConnectionId = connectionRecord.id
  })

  afterAll(async () => {
    await notificationReceiver.shutdown({
      deleteWallet: true,
    })

    await notificationSender.shutdown({
      deleteWallet: true,
    })
  })

  describe('Create set push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications/1.0/set-device-info message ', async () => {
      const { message } = await pushNotificationsService.processSetDeviceInfo(
        { deviceToken: '123', deviceVendor: DeviceVendor.Android },
        notificationReceiverNotificationSenderConnectionId
      )

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/set-device-info',
        device_token: '123',
        device_vendor: 'android',
      })
    })

    test('Should error with invalid connection id', () => {
      expect(
        pushNotificationsService.processSetDeviceInfo(
          { deviceToken: '123', deviceVendor: DeviceVendor.Android },
          'invalid-connection-id'
        )
      ).rejects.toThrowError(RecordNotFoundError)
    })
  })

  describe('Create get push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications/1.0/get-device-info message ', async () => {
      const { message } = await pushNotificationsService.processGetDeviceInfo(
        notificationReceiverNotificationSenderConnectionId
      )

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/get-device-info',
      })
    })

    test('Should error with invalid connection id', () => {
      expect(pushNotificationsService.processGetDeviceInfo('invalid-connection-id')).rejects.toThrowError(
        RecordNotFoundError
      )
    })
  })
})
