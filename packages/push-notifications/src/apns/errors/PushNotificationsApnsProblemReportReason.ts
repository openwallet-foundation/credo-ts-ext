/**
 * Push Notification APNS errors discussed in RFC 0699.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0699-push-notifications-apns#set-device-info
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0699-push-notifications-apns#device-info
 * @internal
 */
export enum PushNotificationsApnsProblemReportReason {
  MissingValue = 'missing-value',
  NotRegistered = 'not-registered-for-push-notifications',
}
