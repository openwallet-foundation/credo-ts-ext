/**
 * PushNotificationsModuleConfigOptions defines the interface for the options of the PushNotificationsModuleConfig class.
 */
export interface PushNotificationsModuleConfigOptions {
  /**
   * The provider to use - apns or fcm
   *
   * @default undefined
   */
  provider?: 'fcm' | 'apns'
}

export class PushNotificationsModuleConfig {
  public options: PushNotificationsModuleConfigOptions

  public constructor(options?: PushNotificationsModuleConfigOptions) {
    this.options = options ?? {}
  }

  public get provider() {
    return this.options.provider
  }
}
