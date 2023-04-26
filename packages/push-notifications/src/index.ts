import 'reflect-metadata'

export { PushNotificationsApnsModule, PushNotificationsFcmModule } from './modules'
export { PushNotificationsApnsApi, PushNotificationsFcmApi } from './api'
export {
  PushNotificationsApnsDeviceInfoMessage,
  PushNotificationsApnsGetDeviceInfoMessage,
  PushNotificationsApnsSetDeviceInfoMessage,
  PushNotificationsFcmDeviceInfoMessage,
  PushNotificationsFcmGetDeviceInfoMessage,
  PushNotificationsFcmSetDeviceInfoMessage,
} from './messages'
export { ApnsDeviceInfo, FcmDeviceInfo } from './services'

export * from './PushNotificationsModuleConfig'
