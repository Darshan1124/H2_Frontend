import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import secure from '../core/secure';

function MyServicesScreen() {
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
            const response = await fetch('http://192.168.213.184:8000/chat/my-services/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }

            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const renderServiceItem = ({ item }) => (
        <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>{item.worktags}</Text>
            <Text style={styles.serviceInfo}>Hours: {item.hours}</Text>
            <Text style={styles.serviceInfo}>Price: ${item.price}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={services}
                renderItem={renderServiceItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyList}>No services found</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        // marginBottom:160
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

export default MyServicesScreen;
