import { setupAgentApns } from '../tests/utils/agent'

/**
 * replace `a-valid-connection-id` with the connection id you want to interact with
 * See the tests for a more accurate implementation
 */
const run = async () => {
  // Setup the agent
  const agent = await setupAgentApns({
    name: 'aries apns push notifications agent',
  })

  // Inject the PushNotificationModule
  // NOTE: This has to be done before initializing the agent
  const pushNotificationsApnsModule = agent.modules.pushNotificationsApns
  // const pushNotificationsFcmModule = agent.modules.pushNotificationsFcm

  // Initialize the agent

  // Pushes a  device token and vendor to the specified connection record
  await pushNotificationsApnsModule.setDeviceInfo('a-valid-connection', {
    deviceToken: '123',
  })

  // Gets the push notification device information located at the other agent behind the connection
  await pushNotificationsApnsModule.getDeviceInfo('a-valid-connection')
}

void run()
