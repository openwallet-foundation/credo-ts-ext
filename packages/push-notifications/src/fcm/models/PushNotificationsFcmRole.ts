/**
 * Push Notification FCM roles based on the flow defined in RFC 0734.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0734-push-notifications-fcm#roles
 * @public
 */
export enum PushNotificationsFcmRole {
  Sender = 'notification-sender',
  Receiver = 'notification-receiver',
}
