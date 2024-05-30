import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTags, faMapMarkerAlt,faArrowRight } from '@fortawesome/free-solid-svg-icons';

const DiscountServicesButtons = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <View style={styles.buttonstyle}>
                    <Text style={styles.buttonText}>Great</Text>
                    <Text style={styles.buttonText1}>Discounts</Text>
                    <Text style={styles.buttonText2}>Tap to know more</Text>
                </View>
                <FontAwesomeIcon icon={faTags} size={50} color="#3D5AFE" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <View style={styles.buttonstyle}>
                    <Text style={styles.buttonText}>Top Local</Text>
                    <Text style={styles.buttonText1}>Services</Text>
                    <Text style={styles.buttonText2}>Tap to know more</Text>
                </View>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={50} color="#00C853" style={styles.icon} />

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 35,
        marginTop:25
    },
    button: {
        backgroundColor: '#E0E0E0', // Light grey background color
        paddingVertical: 10,
        // paddingHorizontal: 20,
        borderRadius: 5,
        width: '48%',
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center', // Center vertically
    },
    buttonText: {
        color: '#212121', // Dark grey text color
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10, // Add space between icon and text
    },
    buttonText1: {
        color: '#212121', // Dark grey text color
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10, // Add space between icon and text
    },
    buttonText2: {
        color: '#212121',
        fontSize: 7,
        marginLeft: 10, // Add space between icon and text
    },
    icon: {
        marginRight: 10, // Add space between icon and text
    },
    buttonstyle: {
        marginRight:10
    },
});

export default DiscountServicesButtons;
