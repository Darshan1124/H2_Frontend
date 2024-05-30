import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { colors, sizes } from '../constants/theme';

const Card = ({ children, style, onPress }) => {
    const scale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}>
            <Animated.View
                style={[
                    styles.card,
                    style,
                    {
                        transform: [{ scale }],
                    },
                ]}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 200,
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        overflow: 'hidden', // Clip child content within border radius
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default Card;
