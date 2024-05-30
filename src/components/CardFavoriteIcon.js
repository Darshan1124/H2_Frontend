import React from 'react';
import { StyleSheet } from 'react-native';
import FavouriteButton from './FavouriteButton';

const CardFavoriteIcon = ({ style, active, onPress }) => {
    return (
        <FavouriteButton
            style={[styles.icon, style]}
            active={active}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
    },
});

export default CardFavoriteIcon;