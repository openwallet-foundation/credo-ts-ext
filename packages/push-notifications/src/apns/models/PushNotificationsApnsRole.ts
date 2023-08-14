/**
 * Push Notification FCM roles based on the flow defined in RFC 0699.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0699-push-notifications-apns#roles
 * @public
 */
export enum PushNotificationsApnsRole {
  Sender = 'notification-sender',
  Receiver = 'notification-receiver',
}
