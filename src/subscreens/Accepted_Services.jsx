import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import secure from '../core/secure';
import TitleLine from '../components/TitleLine';

const Accepted_Service = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const tokens = await secure.get('tokens');
            const accesstoken = tokens?.access;

            if (!accesstoken) {
                console.error('Authentication token not found');
                return;
            }

            const response = await fetch('http://192.168.213.184:8000/chat/All_Offers_Of_user/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("Received data:", data.offers);

            if (data) {
                setServices(data.offers);
                console.log("below is my data");
                console.log(services);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleAcceptOffer = async (offerId) => {
        try {
            const tokens = await secure.get('tokens');
            const accessToken = tokens?.access;
    
            if (!accessToken) {
                console.error('Authentication token not found');
                return;
            }
    
            const response = await fetch(`http://192.168.213.184:8000/chat/complete_offer/${offerId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ offerId }),  // Pass the offerId in the request body
            });
    
            if (response.ok) {
                // Remove the accepted offer from services state
                // const updatedServices = services.filter(offer => offer.id !== offerId);
                // setServices(updatedServices);
                fetchServices();
                Alert.alert('Success', 'Offer completed successfully!');
            } else {
                Alert.alert('Error', 'Failed to complete offer. Please try again.');
            }
        } catch (error) {
            console.error('Error accepting offer:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };
    

    const renderServiceItem = ({ item }) => (
        <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>Address: {item.address}</Text>
            <Text style={styles.serviceInfo}>Description: {item.description}</Text>
            <Text style={styles.serviceInfo}>Price: ${item.price}</Text>
            <Text style={styles.serviceInfo}>State: {item.state}</Text>
            
            {item.state === "accepted" && (
            <TouchableOpacity style={styles.button} onPress={() => handleAcceptOffer(item.id)}>
                <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
        )}
        </View>
    );

    const renderScreen = () => (
        <View style={styles.container}>
            {/* Add search input here if needed */}
            <View style={{marginTop:20}}></View>
            <TitleLine title="Your Services" />
            <View style={{marginTop:20,marginBottom:80}}>
            <FlatList
                data={services}
                renderItem={renderServiceItem}
                keyExtractor={(item, index) => index.toString()} // Use index as key
                ListEmptyComponent={<Text style={styles.emptyList}>No services found</Text>}
            />
            </View>
            
        </View>
    );

    return <>{renderScreen()}</>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationText: {
        marginRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    serviceCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'flex-start', // Adjust button alignment as needed
    },
    buttonText: {
        color: 'white',
    },
    emptyList: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default Accepted_Service;
