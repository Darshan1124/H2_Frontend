import React, { useRef, useEffect, useState } from 'react';
import { Animated, FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, shadow, sizes, spacing } from '../constants/theme';
import FavoriteButton from './FavoriteButton';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlacesCarousel = ({ list }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current) {
                let nextIndex = (currentIndex + 1) % list.length; // Calculate next index using modulo
                flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
                setCurrentIndex(nextIndex);
            }
        }, 4000); // Change the duration as needed (milliseconds)

        return () => clearInterval(interval);
    }, [currentIndex, list]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={list}
                horizontal
                snapToInterval={CARD_WIDTH_SPACING}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: spacing.l,
                            marginRight: index === list.length - 1 ? spacing.l : 0,
                        }}
                    >
                        <View style={[styles.card, shadow.dark]}>
                            {/* <FavoriteButton style={styles.favorite} /> */}
                            <View style={styles.imageBox}>
                                <Image source={item.image} style={styles.image} />
                            </View>
                            <View style={styles.titleBox}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.location}>{item.location}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginVertical: 10,
        borderRadius: sizes.radius,
        overflow: 'hidden',
    },
    favorite: {
        position: 'absolute',
        top: spacing.m,
        right: spacing.m,
        zIndex: 1,
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: sizes.radius,
        overflow: 'hidden',
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',
    },
    titleBox: {
        position: 'absolute',
        top: CARD_HEIGHT - 80,
        left: 16,
    },
    title: {
        fontSize: sizes.h2,
        fontWeight: 'bold',
        color: colors.white,
    },
    location: {
        fontSize: sizes.h3,
        color: colors.white,
    },
});


export default TopPlacesCarousel;
