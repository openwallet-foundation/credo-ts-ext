import type { Agent } from '@aries-framework/core'

import { RecordNotFoundError } from '@aries-framework/core'
import { classToPlain } from 'class-transformer'

import { PushNotificationsService } from '../src/services'

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

  describe('Create set Native push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications/1.0/set-native-device-info message ', async () => {
      const { message } = await pushNotificationsService.createSetNativeDeviceInfo(
        notificationReceiverNotificationSenderConnectionId,
        { deviceToken: '123', deviceVendor: 'android' }
      )

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/set-native-device-info',
        device_token: '123',
        device_vendor: 'android',
      })
    })

    test('Should error with invalid connection id', () => {
      expect(
        pushNotificationsService.createSetNativeDeviceInfo('invalid-connection-id', {
          deviceToken: '123',
          deviceVendor: 'android',
        })
      ).rejects.toThrowError(RecordNotFoundError)
    })
  })

  describe('Create set Expo push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications/1.0/set-expo-device-info message ', async () => {
      const { message } = await pushNotificationsService.createSetExpoDeviceInfo(
        notificationReceiverNotificationSenderConnectionId,
        { deviceToken: '123', deviceVendor: 'android' }
      )

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/set-expo-device-info',
        device_token: '123',
        device_vendor: 'android',
      })
    })

    test('Should error with invalid connection id', () => {
      expect(
        pushNotificationsService.createSetExpoDeviceInfo('invalid-connection-id', {
          deviceToken: '123',
          deviceVendor: 'ios',
        })
      ).rejects.toThrowError(RecordNotFoundError)
    })
  })

  describe('Create set fcm push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications/1.0/set-fcm-device-info message ', async () => {
      const { message } = await pushNotificationsService.createSetFcmDeviceInfo(
        notificationReceiverNotificationSenderConnectionId,
        { deviceToken: '123', deviceVendor: 'ios' }
      )

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/set-fcm-device-info',
        device_token: '123',
        device_vendor: 'ios',
      })
    })

    test('Should error with invalid connection id', () => {
      expect(
        pushNotificationsService.createSetFcmDeviceInfo('invalid-connection-id', {
          deviceToken: '123',
          deviceVendor: 'ios',
        })
      ).rejects.toThrowError(RecordNotFoundError)
    })
  })

  describe('Create get push notification Message', () => {
    test('Should create a valid https://didcomm.org/push-notifications/1.0/get-device-info message ', async () => {
      const { message } = await pushNotificationsService.createGetDeviceInfo(
        notificationReceiverNotificationSenderConnectionId
      )

      const jsonMessage = classToPlain(message)

      expect(jsonMessage).toEqual({
        '@type': 'https://didcomm.org/push-notifications/1.0/get-device-info',
      })
    })

    test('Should error with invalid connection id', () => {
      expect(pushNotificationsService.createGetDeviceInfo('invalid-connection-id')).rejects.toThrowError(
        RecordNotFoundError
      )
    })
  })
})
