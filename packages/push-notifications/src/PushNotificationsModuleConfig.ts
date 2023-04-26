/**
 * PushNotificationsModuleConfigOptions defines the interface for the options of the PushNotificationsModuleConfig class.
 */

export enum Platform {
  ANDROID = 'android',
  IOS = 'ios',
}
export interface PushNotificationsModuleConfigOptions {
  /**
   * The platform to use - either android or ios.
   *
   * @default undefined
   */
  platform: Platform
}

export class PushNotificationsModuleConfig {
  private options: PushNotificationsModuleConfigOptions

  public constructor(options: PushNotificationsModuleConfigOptions) {
    this.options = options
  }

  public get platform() {
    return this.options.platform
  }
}
