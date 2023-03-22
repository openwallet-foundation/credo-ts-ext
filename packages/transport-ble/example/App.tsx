import { useState } from 'react'
import { Button, View, StyleSheet, Platform } from 'react-native'

import { requestPermissions } from './src/permissions'
import { Receiver } from './src/receiver'
import { Sender } from './src/sender'
import { Spacer } from './src/spacer'

export default function App() {
  const [hasRequestedPermissions, setHasRequestedPermissions] = useState(false)

  const [isSender, setIsSender] = useState(false)
  const [isReceiver, setIsReceiver] = useState(false)

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && !hasRequestedPermissions && (
        <>
          <Button
            title="request permissions"
            onPress={async () => {
              await requestPermissions()
              setHasRequestedPermissions(true)
              console.log('Has requested permissions!')
            }}
          />
          <Spacer />
        </>
      )}
      <>
        <Button title="start as sender" onPress={() => setIsSender(true)} />
        <Spacer />
        <Button title="start as receiver" onPress={() => setIsReceiver(true)} />
        <Spacer />
      </>
      {isSender && <Sender />}
      {isReceiver && <Receiver />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20
  }
})
