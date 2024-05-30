import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faClipboardList, faHeart, faEnvelope, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { colors, sizes } from '../constants/theme';
import { StyleSheet, Animated } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import SubHomeScreen from '../subscreens/SubHome';
import HomeWorkerScreen from '../zscreens/HomeWorkerScreen';
import ProfileworkerScreen from '../zscreens/profileworkerscreen';
import FavoriteWorkerScreen from '../zscreens/FavoriteWorkerScreen';
import MyWorkerOrderScreen from '../zscreens/MyWorkerOrderScreen';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Notification from '../zscreens/NotificationWorkerScreen';
import PendingRequest from '../zsubscreens/PendingRequest';


const tabs = [
    {
        name: 'Home',
        screen: HomeWorkerScreen,
        icon: faHome,
    },
    // {
    //     name: 'PendingRequest',
    //     screen: PendingRequest,
    //     icon: faUserPlus,
    //     title: 'Pending Requests', // Set dynamic header title for PendingRequest screen
    // },
    {
        name: 'Message',
        screen: SubHomeScreen,
        icon: faEnvelope,
        title: 'Messages', // Set dynamic header title for Message screen
    },
    // {
    //     name: 'MyWorkerOrder',
    //     screen: MyWorkerOrderScreen,
    //     icon: faClipboardList,
    //     title: 'My Worker Orders', // Set dynamic header title for MyWorkerOrder screen
    // },
    {
        name: 'Profileworker',
        screen: ProfileworkerScreen,
        icon: faUser,
        title: 'Worker Profile', // Set dynamic header title for Profileworker screen
    },
];
const Tab = createBottomTabNavigator();
const ZTabNavigator = () => {
    const offsetAnimation = React.useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            >
                {tabs.map(({ name, screen, icon, title }, index) => {
                    return (
                        <Tab.Screen
                            key={name}
                            name={name}
                            component={screen}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <FontAwesomeIcon
                                            icon={icon}
                                            size={25}
                                            style={{
                                                color: focused ? colors.primary : colors.gray,
                                            }}
                                        />
                                    );
                                },
                                headerTitle: title, // Set dynamic header title
                            }}
                            listeners={{
                                focus: () => {
                                    Animated.spring(offsetAnimation, {
                                        toValue: index * (sizes.width / tabs.length),
                                        useNativeDriver: true,
                                    }).start();
                                },
                            }}
                        />
                    );
                })}
            </Tab.Navigator>
            {/* <Animated.View
                style={[
                    styles.indicator,
                    {
                        transform: [
                            {
                                translateX: offsetAnimation,
                            },
                        ],
                    },
                ]}
            /> */}
        </>
    );
};

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        width: 10,
        height: 2,
        left: sizes.width / tabs.length / 2 - 5,
        bottom: 30,
        backgroundColor: colors.primary,
        zIndex: 100,
    },
});

export default ZTabNavigator;
