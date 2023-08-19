/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NotificationPage from './src/screens/NotificationPage';
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background", remoteMessage)
})
// messaging().getInitialNotification(async remoteMessage => {
//   console.log("Message handled in the background", remoteMessage)
// })
function App(): JSX.Element {

  return (
    <View style={{ flex: 1 }}>
      <NotificationPage />
    </View>
  )
}

export default App;
