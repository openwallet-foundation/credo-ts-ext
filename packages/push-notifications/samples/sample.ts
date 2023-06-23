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

  // Pushes a  device token and vendor to the specified connection record
  await agent.modules.pushNotificationsApns.setDeviceInfo('a-valid-connection', {
    deviceToken: '123',
  })

  // Gets the push notification device information located at the other agent behind the connection
  await agent.modules.pushNotificationsApns.getDeviceInfo('a-valid-connection')
}

void run()
