import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from './Icon';
import { sizes, spacing } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainHeader = ({ title }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation(); // Use useNavigation hook to access the navigation object

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            {/* <TouchableOpacity onPress={{}}>
                <Icon icon="Hamburger" />
            </TouchableOpacity> */}
            <Text style={styles.title}>{title}</Text>
            <Icon icon="Notification" onPress={() => { navigation.navigate('Notification')}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.l,
    },
    title: {
        fontSize: sizes.h3,
        fontWeight: 'bold',
    },
});

export default MainHeader;
