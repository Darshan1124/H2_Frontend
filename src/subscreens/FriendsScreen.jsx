// FriendsScreen.js

import React from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import Cell from "../common/Cell";
import Empty from "../common/Empty";
import useGlobal from "../core/global";
import Thumbnail from "../common/Thumbnail";
import utils from "../core/utils";
import { useNavigation } from '@react-navigation/native';

function FriendRow({ item }) {
    const navigation = useNavigation();
    console.log(item);
    const navigateToMessages = () => {
        navigation.navigate('Messages',item);
        // console.log(item);
    };

    return (
        <TouchableOpacity onPress={() => navigateToMessages()}>
            <Cell>
                <Thumbnail
                    url={item.friend.thumbnail}
                    size={76}
                />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 16
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#202020',
                            marginBottom: 4
                        }}
                    >
                        {item.friend.name}
                    </Text>
                    <Text
                        style={{
                            color: '#606060',
                        }}
                    >
                        {item.preview} <Text style={{ color: '#909090', fontSize: 13 }}>
                            {utils.formatTime(item.updated)}
                        </Text>
                    </Text>
                </View>
            </Cell>
        </TouchableOpacity>
    );
}

function FriendsScreen() {
    const friendList = useGlobal(state => state.friendList);

    // Show loading indicator
    if (friendList === null) {
        return (
            <ActivityIndicator style={{ flex: 1 }} />
        );
    }

    // Show empty if no requests
    if (friendList.length === 0) {
        return (
            <Empty icon='inbox' message='No messages yet' />
        );
    }

    // Show request list
    return (
        <View>
            <FlatList
                data={friendList}
                renderItem={({ item }) => (
                    <View>
                        <FriendRow item={item} />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default FriendsScreen;
