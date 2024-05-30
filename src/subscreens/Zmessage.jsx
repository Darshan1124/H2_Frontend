// ZMessagesScreen.js

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Easing, FlatList, InputAccessoryView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Thumbnail from "../common/Thumbnail";
import useGlobal from "../core/global";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import secure from "../core/secure";


function MessageHeader({ friend }) {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Thumbnail
                url={friend.thumbnail}
                size={30}
            />
            <Text
                style={{
                    color: '#202020',
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: 'bold'
                }}
            >
                {friend.name}
            </Text>
        </View>
    );
}

function MessageBubbleMe({ text }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                padding: 4,
                paddingRight: 12
            }}
        >
            <View style={{ flex: 1 }} />
            <View
                style={{
                    backgroundColor: '#303040',
                    borderRadius: 21,
                    maxWidth: '75%',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'center',
                    marginRight: 8,
                    minHeight: 42
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        lineHeight: 18
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    );
}

function MessageTypingAnimation({ offset }) {
    const y = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const total = 1000;
        const bump = 200;

        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(bump * offset),
                Animated.timing(y, {
                    toValue: 1,
                    duration: bump,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(y, {
                    toValue: 0,
                    duration: bump,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.delay(total - bump * 2 - bump * offset),
            ])
        );
        animation.start();
        return () => {
            animation.stop();
        };
    }, []);

    const translateY = y.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8]
    });

    return (
        <Animated.View
            style={{
                width: 8,
                height: 8,
                marginHorizontal: 1.5,
                borderRadius: 4,
                backgroundColor: '#606060',
                transform: [{ translateY }]
            }}
        />
    );
}

function MessageBubbleFriend({ text = '', friend, typing = false }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                padding: 4,
                paddingLeft: 16
            }}
        >
            <Thumbnail
                url={friend.thumbnail}
                size={42}
            />
            <View
                style={{
                    backgroundColor: '#d0d2db',
                    borderRadius: 21,
                    maxWidth: '75%',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'center',
                    marginLeft: 8,
                    minHeight: 42
                }}
            >
                {typing ? (
                    <View style={{ flexDirection: 'row' }}>
                        <MessageTypingAnimation offset={0} />
                        <MessageTypingAnimation offset={1} />
                        <MessageTypingAnimation offset={2} />
                    </View>
                ) : (
                    <Text
                        style={{
                            color: '#202020',
                            fontSize: 16,
                            lineHeight: 18
                        }}
                    >
                        {text}
                    </Text>
                )}
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
}

function MessageBubble({ index, message, friend }) {
    const [showTyping, setShowTyping] = useState(false);

    const messagesTyping = useGlobal(state => state.messagesTyping);

    useEffect(() => {
        if (index !== 0) return;
        if (messagesTyping === null) {
            setShowTyping(false);
            return;
        }
        setShowTyping(true);
        const check = setInterval(() => {
            const now = new Date();
            const ms = now - messagesTyping;
            if (ms > 10000) {
                setShowTyping(false);
            }
        }, 1000);
        return () => clearInterval(check);
    }, [messagesTyping]);

    if (index === 0) {
        if (showTyping) {
            return <MessageBubbleFriend friend={friend} typing={true} />;
        }
        return null;
    }

    return message.is_me ? (
        <MessageBubbleMe text={message.text} />
    ) : (
        <MessageBubbleFriend text={message.text} friend={friend} />
    );
}

function MessageInput({ message, setMessage, onSend }) {
    return (
        <View
            style={{
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <TextInput
                placeholder="Message..."
                placeholderTextColor='#909090'
                value={message}
                onChangeText={setMessage}
                style={{
                    flex: 1,
                    paddingHorizontal: 18,
                    borderWidth: 1,
                    borderRadius: 25,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    height: 50
                }}
            />
            <TouchableOpacity onPress={onSend}>
                {/* <Text
                    size={22}
                    color={'#303040'}
                    style={{
                        marginHorizontal: 12
                    }}
                >Paperplane</Text> */}
                <FontAwesomeIcon icon={faPaperPlane} size={22} color={'#303040'} style={{ marginHorizontal: 12 }} />
            </TouchableOpacity>
        </View>
    );
}

function ZMessagesScreen({ navigation, route }) {
    const [message, setMessage] = useState('');

    const messagesList = useGlobal(state => state.messagesList);
    const messagesNext = useGlobal(state => state.messagesNext);

    let messageList = useGlobal(state => state.messageList);
    const messageSend = useGlobal(state => state.messageSend);
    const messageType = useGlobal(state => state.messageType);
    const firstmessagesend = useGlobal(state => state.firstmessagesend);
    const friendList = useGlobal(state => state.friendList);
    const [connectionId, setConnectionId] = useState(route.params.id);
    const [connectionidsetter, setConnectionidsetter] = useState(false)

    // const connectionId = route.params.id;
    const friend = route.params.friend;

    // Update the header 
    useLayoutEffect(() => {
        console.log("friend");
        console.log(friend);
        navigation.setOptions({
            headerTitle: () => (
                <MessageHeader friend={friend} />
            )
        });
    }, [navigation, friend]);

    //     useEffect(() => {
    //         // messageList(connectionId);
    //         console.log("below is connectionid id got from api");
    //         gotconnection();
    // }, []);

    useEffect(() => {
        messageList(connectionId);
        console.log("below is connectionid id");
        console.log(connectionId);
    }, [messageList, connectionId, friendList, connectionidsetter]);




    async function gotconnection() {
        try {
            const tokens = await secure.get('tokens');
            const accesstoken = tokens?.access;

            if (!accesstoken) {
                console.error('Authentication token not found');
                return;
            }
            const response = await fetch('http://192.168.213.184:8000/chat/connectionid/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ receiver_username: friend.username })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("below data received and it contains connection id");
            console.log(data);
            console.log(setConnectionidsetter(true));
            setConnectionId(data.connection_id);
        } catch (error) {
            setConnectionId(null);
            console.error('Error:', error);
        }
    }

    // 

    async function onSend() {
        const cleaned = message.replace(/\s+/g, ' ').trim();
        if (cleaned.length === 0) return;
        console.log(connectionId);
        if (connectionId) {
            messageSend(connectionId, cleaned);
        } else {
            console.log("no connection id");
            console.log("below message not sending");
            console.log(cleaned);
            console.log("below is username");
            console.log(friend.username);
            await firstmessagesend(friend.username, cleaned);
            console.log("completed response");
            console.log("starting with delay");
            // Introduce a 1-second delay before calling gotconnection
            setTimeout(gotconnection, 1000);
            // Reset the message input
            setMessage('');
        }
    }


    function onType(value) {
        setMessage(value);
        messageType(friend.username);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#011838", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text style={{ color: "#CCE9FF" }}>Let's Work Together</Text>
                <TouchableOpacity style={{ backgroundColor: "#CCE9FF", padding: 5, borderRadius: 4, paddingHorizontal: 15 }}>
                    <Text style={{ color: "#011838", fontSize: 20 }}>Hire Me</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#CCE9FF", padding: 5, borderRadius: 4, paddingHorizontal: 15 }}>
                    <Text style={{ color: "#011838", fontSize: 20 }}>Award Bid</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    marginBottom: Platform.OS === 'ios' ? 60 : 0
                }}
            >
                <FlatList
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{
                        paddingTop: 30
                    }}
                    data={[{ id: -1 }, ...messagesList]}
                    inverted={true}
                    keyExtractor={item => item.id}
                    onEndReached={() => {
                        if (messagesNext) {
                            messageList(connectionId, messagesNext);
                        }
                    }}
                    renderItem={({ item, index }) => (
                        <MessageBubble
                            index={index}
                            message={item}
                            friend={friend}
                        />
                    )}
                />
            </View>
            {Platform.OS === 'ios' ? (
                <InputAccessoryView>
                    <MessageInput
                        message={message}
                        setMessage={onType}
                        onSend={onSend}
                    />
                </InputAccessoryView>
            ) : (
                <MessageInput
                    message={message}
                    setMessage={onType}
                    onSend={onSend}
                />
            )}
        </SafeAreaView>
    );
}


export default ZMessagesScreen;
