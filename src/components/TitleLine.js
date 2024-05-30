import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleLine = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginHorizontal:30,
        marginTop:10
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Lightest color
    },
    title: {
        paddingHorizontal: 7,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TitleLine;
