import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DrawerContent = ({ onClose }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>Close Drawer</Text>
            </TouchableOpacity>
            <View style={styles.drawerContent}>
                <Text>This is your drawer content.</Text>
                <Text>You can add any content you want here.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    drawerContent: {
        marginBottom: 20,
    },
});

export default DrawerContent;
