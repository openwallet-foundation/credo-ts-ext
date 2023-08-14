/**
 * Push Notification FCM errors discussed in RFC 0734.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0734-push-notifications-fcm#set-device-info
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0734-push-notifications-fcm#device-info
 * @internal
 */
export enum PushNotificationsFcmProblemReportReason {
  MissingValue = 'missing-value',
  NotRegistered = 'not-registered-for-push-notifications',
}
