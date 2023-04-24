/**
 * DummyModuleConfigOptions defines the interface for the options of the DummyModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface PushNotificationsModuleConfigOptions {
  /**
   * Whether to automatically accept request messages.
   *
   * @default false
   */
  //   autoAcceptRequests?: boolean
  deviceToken?: string
}

export class PushNotificationsModuleConfig {
  private options: PushNotificationsModuleConfigOptions

  public constructor(options?: PushNotificationsModuleConfigOptions) {
    this.options = options ?? {}
  }

  /** See {@link PushNotificationsModuleConfigOptions.autoAcceptRequests} */
  public get autoAcceptRequests() {
    return this.options.deviceToken
  }
}
