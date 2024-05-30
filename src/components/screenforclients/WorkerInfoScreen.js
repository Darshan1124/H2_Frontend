import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const WorkerInfoScreen = ({ workerInfo }) => {
    const { description, hour, maxprice, minprice, tags } = workerInfo;
    const tagArray = JSON.parse(tags);

    // Animation setup
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Worker Information</Text>
            <Text style={styles.info}>Description: {description}</Text>
            <Text style={styles.info}>Hour: {hour}</Text>
            <Text style={styles.price}>
                [ {maxprice} to {minprice} ]
            </Text>
            <Text style={[styles.info, styles.tagTitle]}>Tags:</Text>
            <View style={styles.tagContainer}>
                {tagArray.map((tag, index) => (
                    <Text key={index} style={styles.tag}>{tag}</Text>
                ))}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    price: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: 'bold',
    },
    tagTitle: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 20,
        color: '#333',
    },
});

export default WorkerInfoScreen;
