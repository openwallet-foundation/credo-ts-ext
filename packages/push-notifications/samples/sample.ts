import { PushNotificationsModule } from '../src/PushNotificationsModule'
import { setupAgent } from '../tests/utils/agent'

import { DevicePlatform } from '@aries-framework/push-notifications'

/**
 * replace `a-valid-connection-id` with the connection id you want to interact with
 * See the tests for a more accurate implementation
 */
const run = async () => {
  // Setup the agent
  const agent = setupAgent({
    name: 'aries push notifications agent',
    publicDidSeed: '65748374657483920193747564738290',
  })

  // Inject the PushNotificationModule
  // NOTE: This has to be done before initializing the agent
  const pushNotificationsModule = agent.injectionContainer.resolve(PushNotificationsModule)

  // Initialize the agent
  await agent.initialize()

  // Pushes a native device token and vendor to the specified connection record
  await pushNotificationsModule.setDeviceInfo('a-valid-connection', {
    deviceToken: '123',
    devicePlatform: DevicePlatform.Ios,
  })

  // Gets the push notification device infomation located at the other agent behind the connection
  await pushNotificationsModule.getDeviceInfo('a-valid-connection')
}

void run()
