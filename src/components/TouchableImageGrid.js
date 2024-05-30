import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const TouchableImageGrid = ({ images }) => {
    const navigation = useNavigation();

    const navigateToScreenWithTag = (tag) => {
        navigation.navigate('ScreenWithTag', { tag });
    };
    return (
        <View style={styles.container}>
            {images.map((item, index) => (
                <TouchableOpacity key={index} style={styles.item} onPress={() => navigateToScreenWithTag(item.text)}>
                    <Image source={item.imageSource} style={styles.image} />
                    <Text style={styles.text}>{item.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 25,
        marginTop:10
    },
    item: {
        width: '29%',
        marginBottom: 3,
        // alignItems: 'center',
        // marginRight:6,
        marginHorizontal:5,
        marginTop:15
    },
    image: {
        width: '100%',
        height: 75, // Adjust as needed
        borderRadius: 10, // Optional: add borderRadius for images
    },
    text: {
        marginTop: 5,
        marginLeft:5
        // textAlign: 'center',
    },
});

export default TouchableImageGrid;
