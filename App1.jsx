import React, { useEffect } from 'react';
import { StatusBar, AppState, PermissionsAndroid, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigations/MainNavigator';
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import './src/core/fontawesome';
import secure from './src/core/secure';

const App1 = () => {

    useEffect(() => {
        const getDeviceToken = async () => {
            let token = await messaging().getToken();
            try {
                await secure.set('fcmToken', token);
                console.log('FCM token stored securely.');
                console.log(token);
            } catch (error) {
                console.error('Error storing FCM token:', error);
            }
        };
        getDeviceToken();
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)


        // PushNotification.createChannel(
        //     {
        //         channelId: "channelid", // Change this to your preferred channel ID
        //         channelName: "My Notification Channel",
        //         channelDescription: "A channel to categorize notifications",
        //         soundName: "default",
        //         importance: 4,
        //         vibrate: true,
        //     },
        //     (created) => console.log(`Channel created: ${created}`),
        // );

    }, []);

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

    //         const { title, body } = remoteMessage.notification;

    //         // PushNotification.localNotification({
    //         //     channelId: "channelid", // Set the channel ID here
    //         //     title: title,
    //         //     message: body,
    //         // });
    //     });
    //     return unsubscribe;
    // }, []);
    useEffect(() => {
        const unsubscribeBackground = messaging().setBackgroundMessageHandler(async remoteMessage => {
            // Handle background messages
            console.log('Background message:', remoteMessage);
        });

        return () => {
            unsubscribeBackground();
        };
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <StatusBar barStyle="light-content" /> */}
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <MainNavigator />
        </GestureHandlerRootView>
    );
};

export default App1;
