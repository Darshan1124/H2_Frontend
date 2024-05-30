import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import { StatusBar } from 'react-native';
import DetailScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../subscreens/Splash';
import SignInScreen from '../subscreens/SignIn';
import SignUpScreen from '../subscreens/SignUp';
import SubHomeScreen from '../subscreens/SubHome';
import SubSearchScreen from '../subscreens/SubSearch';
import useGlobal from '../core/global';
import RequestsScreen from '../subscreens/Requests';
import MessagesScreen from '../subscreens/Message';
import MyServicesScreen from '../subscreens/MyServicesScreen';
import NotificationScreen from '../subscreens/NotificationScreen';
import ProfileworkerScreen from '../zscreens/profileworkerscreen';
import ZTabNavigator from './ZTabNavigator';
import SearchWorkerScreen from '../zscreens/SearchWorkerScreen';
import CompleteWorker from '../zsubscreens/CompleteWorker';
import ScreenWithTag from '../components/screenforclients/ScreenWithTag';
import WorkerInfoScreen from '../components/screenforclients/WorkerInfoScreen';
import FormOfOffer from '../components/screenforclients/CreateAnOffer';
import PendingRequest from '../zsubscreens/PendingRequest';
import Accepted_Service from '../subscreens/Accepted_Services';

const Stack = createStackNavigator();

const MainNavigator = () => {

    const init = useGlobal(state => state.init);
    const initialized = useGlobal(state => state.initialized)
    const authenticated = useGlobal(state => state.authenticated)
    const worker = useGlobal(state => state.worker);
    const toggleWorker = useGlobal(state => state.toggleWorker);

    useEffect(() => {
        init(); // Call the init function when SplashScreen mounts
        toggleWorker();
    }, [init, toggleWorker]);

    return (
        <NavigationContainer>
            
            <Stack.Navigator>


                {!initialized ? (
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    </>
                ) : !authenticated ? (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                ) : worker ? ( // If worker is true, navigate to different screens
                    <>
                        <Stack.Screen
                            name="RootWorker"
                            component={ZTabNavigator}
                            options={{
                                // headerTitle: 'H2 For Freelancer', // Set header title to an empty string
                                headerShown: false, // Hide the header
                            }}
                        />
                        <Stack.Screen
                            name="SearchWorker"
                            component={SearchWorkerScreen}
                            options={{
                                title: 'Search',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen name="Profileworker" component={ProfileworkerScreen} />
                        <Stack.Screen
                            name="CompleteWorker" // Add MessagesScreen to the navigator
                            component={CompleteWorker}
                            options={{
                                title: 'Complete/Edit Profile',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="WorkerInfoCard" // Add MessagesScreen to the navigator
                            component={WorkerInfoScreen}
                            options={{
                                title: 'Freelancer Profile',
                                headerTitleAlign: 'center',
                            }}
                        />
                        {/* <Stack.Screen
                            name="PendingRequest" // Add MessagesScreen to the navigator
                            component={PendingRequest}
                            options={{
                                title: 'Pending Request',
                                headerTitleAlign: 'center',
                            }}
                        /> */}
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Root"
                            component={TabNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="Search"
                            component={SearchScreen}
                            options={{
                                title: 'Search',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="Detail"
                            component={DetailScreen}
                            options={{
                                title: 'Detail',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="ScreenWithTag"
                            component={ScreenWithTag}
                            options={({ route }) => ({
                                title: `Results for ${route.params.tag}...`,
                                headerTitleAlign: 'center',
                            })}
                        />

                        <Stack.Screen
                            name="SubHome"
                            component={SubHomeScreen}
                            options={{
                                title: 'Message',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="SubSearch"
                            component={SubSearchScreen}
                            options={{
                                title: 'Message',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                                title: 'Profile',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="Requests"
                            component={RequestsScreen}
                            options={{
                                title: 'Requests',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="Messages" // Add MessagesScreen to the navigator
                            component={MessagesScreen}
                            options={({ route }) => ({
                                title: route.params.friend.name, // Set title based on friend's name
                            })}
                        />
                        {/* MyServicesScreen */}
                        <Stack.Screen
                            name="MyServices" // Add MessagesScreen to the navigator
                            component={MyServicesScreen}
                            options={{
                                title: 'My Services',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="Notification" // Add MessagesScreen to the navigator
                            component={NotificationScreen}
                            options={{
                                title: 'Notification',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="Offers" // Add MessagesScreen to the navigator
                            component={Accepted_Service}
                            options={{
                                title: 'Offers given',
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="CreateAnOffer"
                            component={FormOfOffer}
                            options={({ route }) => ({
                                title: `Create offer for ${route.params.worker.user.username}`, // Set dynamic title
                                headerTitleAlign: 'center',
                            })}
                        />
                        

                    </>
                )}


            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default MainNavigator;
