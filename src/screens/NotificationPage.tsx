import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import messaging, { firebase } from "@react-native-firebase/messaging"
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
class NotificationPage extends React.Component {
    state = {
        time: 0,
        title: "",
        msg: "",
        data:[]
    }
    componentDidMount() {
        this.getToken()
        this.getCheckMessage()
        this.checkPermission()

    }
    getCheckMessage = () => {
        // Alert.alert("hello")
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
            const title = remoteMessage.notification?.title;
            const msg = remoteMessage.notification?.body;
            const time = remoteMessage.sentTime
            this.setState({
                title,
                msg
            })
            console.log(title)
            console.log(msg)
            console.log(time)
            // Alert.alert(`${title}`,`${msg}`)
        });
        //   return unsubscribe
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });
    }
    getToken = async () => {
        //@ts-ignore
        const token = await messaging().getToken(firebase.app().options.messagingSenderId);
        console.log('token id', token)
        //f2oa6F_DS9W0LFepyxFGue:APA91bExjzqIiGArRoJlP6kFu8IQG8N0EipjCrUCO144W4quVKOlzYQszbhKeIaejtI8aCwaqbgK-LAKbqGyidtTd7my7vY5eZX2c6f-512VI1L9K8fpd9DtJZEGxRwJsoOfs-amQCY4

    }
    checkPermission = async () => {
        try {
            const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
            console.log("result", result)
            //    if(result===RESULTS.GRANTED)
            if (result !== "granted") {
                // request
                this.requestPermission()
            }
        } catch (error) {
            console.log("Error", error)
        }

    }
    requestPermission = async () => {
        try {
            const granted = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
            if (granted !== "granted") {
                openSettings();
            }
        } catch (error) {
            console.log("Error", error)
        }

    }

    render() {
        const { title, msg } = this.state;

        return (
            <LinearGradient colors={[ "#b06ab3","#4568DC"]} style={{flex:1}}>
                <View style={styles.container}>
                    <Text style={styles.text2}>Push_Notification in Firebase</Text>
                    <View style={styles.main}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.msg}>{msg}</Text>
                    </View>
                </View>
            </LinearGradient>

        )
    }
}
export default NotificationPage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        paddingTop: 20
    },
    text2: {
        color: "black",
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        letterSpacing: -1
    },
    main: {
        alignItems: 'center',
        justifyContent: "center",
        height: "60%"
    },
    title: {
        fontSize: 25,
        fontWeight: "500",
    },
    msg: {
        fontWeight: "400",
        fontSize: 18,
        color: "black"
    }

})