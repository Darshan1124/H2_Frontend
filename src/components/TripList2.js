import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { colors, shadow, sizes, spacing } from '../constants/theme';
import FavoriteButton from './FavoriteButton';
import { useNavigation } from '@react-navigation/native';

const CARD_WIDTH = sizes.width / 3 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 180;

const TripsList2 = ({ list }) => {

    const navigation=useNavigation();

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {list.map((item, index) => {
                    key={index}
                    return (
                        <TouchableOpacity onPress={()=>navigation.navigate('Detail')} style={styles.cardContainer} key={item.id}>
                            <View style={[styles.card, shadow.light]}>
                                <View style={styles.imageBox}>
                                    <Image style={styles.image} source={item.image} />
                                </View>
                                <View style={styles.footer}>
                                    <View style={styles.titleBox}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.location}>{item.location}</Text>
                                    </View>
                                    {/* <FavoriteButton /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'nowrap', // Ensures items are in a single row
    },
    cardContainer: {
        marginLeft: spacing.l,
        // marginBottom: spacing.l,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        // backgroundColor: colors.white,
        borderRadius: sizes.radius, // Round all corners
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        borderRadius: sizes.radius, // Round all corners
        overflow: 'hidden',
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode: 'cover',
        borderRadius: sizes.radius, // Round all corners
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 6,
        // marginRight: 10,
    },
    titleBox: {
        flex: 1,
    },
    title: {
        // marginVertical: 4,
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
    },
    location: {
        fontSize: 11,
        color: colors.lightGray,
    },
});

export default TripsList2;
