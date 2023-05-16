/**
 * PushNotificationsModuleConfigOptions defines the interface for the options of the PushNotificationsModuleConfig class.
 */
export interface PushNotificationsModuleConfigOptions {
  /**
   * The provider to use - apns or fcm
   *
   * @default undefined
   */
  options?: object
}

export class PushNotificationsModuleConfig {
  public options: PushNotificationsModuleConfigOptions

  public constructor(options?: PushNotificationsModuleConfigOptions) {
    this.options = options ?? {}
  }
}
