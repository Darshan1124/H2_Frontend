import React from 'react';
import { Text, View } from 'react-native';
import MainHeader from '../components/MainHeader';

const FavoriteScreen = () => {
    return (<View>
        <MainHeader title="Favorites" />
        <View style={{ alignItems: 'center', justifyContent: 'center',height:700 }}>
            <Text>Favorite will be shown here</Text>
        </View>
        </View>
    );
};

export default FavoriteScreen;