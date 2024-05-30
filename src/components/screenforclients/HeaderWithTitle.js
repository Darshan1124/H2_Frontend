import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, sizes, spacing } from '../../constants/theme';

const HeaderWithTitle = ({ title }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGray, // Change to a suitable contrasting color
        alignItems: 'center',
        justifyContent: 'center',
        height: 60, // Adjust the height as needed
    },
    title: {
        fontSize: sizes.h3,
        fontWeight: 'bold',
        color: colors.primary, // Assuming your primary color is blue, change it accordingly
    },
});

export default HeaderWithTitle;
