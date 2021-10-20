import { PushNotificationsModule } from '../src/PushNotificationsModule'
import { setupAgent } from '../tests/utils/agent'

/**
 * replace `a-valid-connection-id` with the connection id you want to interact with
 * See the tests for a more accurate implementation
 */
const run = async () => {
  // Setup the agent
  const agent = setupAgent('aries push notifications agent', '65748374657483920193747564738290')

  // Inject the PushNotificationModule
  // NOTE: This has to be done before initializing the agent
  const pushNotificationsModule = agent.injectionContainer.resolve(PushNotificationsModule)

  // Initialize the agent
  await agent.initialize()

  // Pushes a native device token and vendor to the specified connection record
  pushNotificationsModule.setDeviceInfo('a-valid-connection', {
    deviceToken: '123',
    devicePlatform: 'ios',
  })

  // Gets the push notification device infomation located at the other agent behind the connection
  pushNotificationsModule.getDeviceInfo('a-valid-connection')
}

void run()
