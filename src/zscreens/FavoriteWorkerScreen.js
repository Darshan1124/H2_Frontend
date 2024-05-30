import React from 'react';
import { Text, View } from 'react-native';
import MainHeader from '../components/MainHeader';

const FavoriteWorkerScreen = () => {
    return (<View>
        <MainHeader title="Orders" />
        <View style={{ alignItems: 'center', justifyContent: 'center',height:700 }}>
            <Text>Orders will be shown here</Text>
        </View>
        </View>
    );
};

export default FavoriteWorkerScreen;