import { setupAgent } from '../tests/utils/agent'

import { PushNotificationsApnsModule } from '@aries-framework/push-notifications'

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
  const pushNotificationsApnsModule = agent.injectionContainer.resolve(PushNotificationsApnsModule)

  // Initialize the agent
  await agent.initialize()

  // Pushes a  device token and vendor to the specified connection record
  await pushNotificationsApnsModule.setDeviceInfo('a-valid-connection', {
    deviceToken: '123',
  })

  // Gets the push notification device infomation located at the other agent behind the connection
  await pushNotificationsApnsModule.getDeviceInfo('a-valid-connection')
}

void run()
