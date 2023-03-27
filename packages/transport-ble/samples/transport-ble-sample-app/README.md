# STEPS

To effectively test the transport via this app, we need to issue a credential to one of the testing agents (Alice), who will then share a proof of this credential with the other agent (Faber).

The simplest way to do this, is by using the Siera CLI to automatically assign the credential to our initialized agent.

Ensure to read the following steps carefully and follow strictly. Don't worry if you're not seeing any log updates on certain steps, or too long logs on other steps. Just follow the steps and wait the stated times, and you should be fine. If anything breaks, you will see the error in the logs.

1. Clone this repository (or pull the latest changes).

2. Run `yarn install` to install dependencies.

3. Run `yarn start`.

4. In another terminal window, run `yarn android` or `yarn ios` to build the app to your testing device (Untested for iOS, strongly recommend to use Android).

5. Repeat step 4 above on another device; you'll need two devices to run this test.

6. Connect both devices to the Metro server, then refresh both apps from the app server terminal to ensure they're both synced to Metro.

7. Switch on Bluetooth on both devices, then click `REQUEST PERMISSIONS` on both devices (if Android), and accept the subsequent permissions request.

8. Click `START AS SENDER` on one of the devices, and wait for the agent configuration to load (5 seconds).

9. Click `START AS RECEIVER` on the other of the devices, and wait for the agent configuration to load (5 seconds).

10. Click `REGISTER BLE OUTBOUND TRANSPORT` on the sender device, and wait 5 seconds.

11. Click `REGISTER BLE INBOUND TRANSPORT` on the receiver device, and wait 5 seconds.

12. Click `INITIALIZE AGENT` on the sender device and wait for the agent to initialize, and for the credential issuance flow to complete (1 minute).

13. Click `INITIALIZE AGENT` on the receiver device and wait for the agent to initialize (10 seconds).

14. Click `PREPARE FOR ADVERTISING` on the sender device, and wait 5 seconds.

15. Click `PREPARE FOR SCANNING` on the sender device, and wait 5 seconds.

16. Click `START ADVERTISING` on the sender device and wait 5 seconds.

17. Click `START SCANNING` on the sender device and wait 5 seconds.

18. Wait some more 5 seconds after the receiver device is discovered, then Click on `CONNECT`, and wait 5 seconds.

19. Wait some more 5 seconds, then Click on `SEND MESSAGE`, then follow the logs to see the magic!
