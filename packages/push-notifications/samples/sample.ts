import { AutoAcceptCredential, LogLevel } from '@aries-framework/core'

import { PushNotificationsModule } from '../src/PushNotificationsModule'
import { DeviceVendor } from '../src/services'
import { setupAgent } from '../tests/utils/agent'
import { TestLogger } from '../tests/utils/logger'

/**
 * replace `a-valid-connection-id` with the connection id you want to interact with
 * See the tests for a more accurate implementation
 */
const run = async () => {
  // Setup an agent
  const agent = setupAgent({
    publicDidSeed: '12312312312312312312312312312356',
    name: 'Aries Test Agent',
    logger: new TestLogger(LogLevel.debug),
    autoAcceptConnection: true,
    autoAcceptCredential: AutoAcceptCredential.ContentApproved,
  })

  // Inject the PushNotificationModule
  const pushNotificationsModule = agent.injectionContainer.resolve(PushNotificationsModule)

  // Initialize the agent
  await agent.initialize()

  // Pushes a native device token and vendor to the specified connection record
  pushNotificationsModule.sendNativeDeviceInfo(
    { deviceToken: '123', deviceVendor: DeviceVendor.Android },
    'a-valid-connection-id'
  )

  // Pushes an expo device token and vendor to the specified connection record
  pushNotificationsModule.sendExpoDeviceInfo(
    { deviceToken: '123', deviceVendor: DeviceVendor.Ios },
    'a-valid-connection-id'
  )

  // Gets the push notification device infomation located at the other agent behind the connection
  pushNotificationsModule.getDeviceInfo('a-valid-connection-id')
}

void run()
