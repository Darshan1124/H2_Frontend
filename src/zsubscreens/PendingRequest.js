import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import secure from '../core/secure';
import HeaderWithTitle from '../components/screenforclients/HeaderWithTitle';
import MainHeader from '../components/MainHeader';

function PendingRequest() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const tokens = await secure.get('tokens');
            const accessToken = tokens?.access;

            if (!accessToken) {
                console.error('Authentication token not found');
                return;
            }
            const response = await fetch('http://192.168.213.184:8000/chat/pending_offers/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }

            const data = await response.json();
            console.log(data);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const renderServiceItem = ({ item }) => (
        <>
        <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>Offer by: {item.giver}</Text>
            {item.hour && (
                <Text style={styles.serviceInfo}>Hours: {item.hour}</Text>
            )}
            <Text style={styles.serviceInfo}>Price: ${item.price}{item.perhourservice && '/hour'}</Text>
            <Text style={styles.serviceInfo}>Date: {item.date}</Text>
            <Text style={styles.serviceInfo}>Address: {item.address}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Message Me</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );


    return (
        <>
        <View style={{paddingBottom:10,paddingTop:5}}>
        <MainHeader title="pending Requests"/>
        </View>
        <View style={styles.container}>
            
            <FlatList
                data={services}
                renderItem={renderServiceItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.emptyList}>No Requests for you</Text>}
            />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    serviceCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
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
    serviceDescription: {
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 10,
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

export default PendingRequest;
