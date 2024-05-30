import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { WORKERS } from '../data'; // Import the WORKERS data
import { useNavigation } from '@react-navigation/native';

const WorkerCard = ({ worker }) => {
    const [showFullBio, setShowFullBio] = useState(false);
    const navigation=useNavigation();

    const toggleShowFullBio = () => {
        setShowFullBio(!showFullBio);
    };

    const renderBio = () => {
        if (worker.bio.length <= 90 || showFullBio) {
            return <Text style={styles.bio}>{worker.bio}</Text>;
        } else {
            return (
                <View style={styles.bioContainer}>
                    <Text style={styles.bio}>{worker.bio.substring(0, 92)}...
                    <TouchableOpacity style={styles.button1} onPress={toggleShowFullBio}>
                        <Text  style={styles.moreButton}>More</Text>
                    </TouchableOpacity>
                    </Text>
                </View>
            );
        }
    };
    

    return (
        <View style={styles.card}>
            {/* First Horizontal Section */}
            <TouchableOpacity>
            <View style={styles.horizontalSection}>
                {/* Vertical Part 1 - Images */}
                
                <View style={styles.imageContainer}>
                    <Image 
                        source={worker.image} // Use worker's image from the data
                        style={styles.image} 
                    />
                </View>

                {/* Vertical Part 2 - Textual Information */}
                <View style={styles.textContainer}>
                    <Text style={[styles.name, styles.bold]}>{worker.name}</Text>
                    <Text style={styles.reviews}>Rating: {worker.rating}</Text>
                    <Text style={styles.country}>Location: {worker.location}</Text>
                </View>
            </View>
            </TouchableOpacity>
            {/* Second Horizontal Section */}
            <View style={styles.detailsContainer}>
                <Text style={[styles.range, styles.bold]}>Range of Money</Text>
                {renderBio()}
                <Text style={[styles.workTags]}>Work Tags: {worker.workTags.join(', ')}</Text>
                <TouchableOpacity style={styles.sendMessageButton}>
                    <Text style={[styles.sendMessageButtonText, styles.big]} onClick={navigation.navigate('Message')}>Message for Inquiry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const WorkerList = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {Object.values(WORKERS).map(worker => (
                <WorkerCard key={worker.id} worker={worker} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd', // Border color
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4, // Increased shadow height
        },
        shadowOpacity: 1, // Increased shadow opacity
        shadowRadius: 20, // Increased shadow radius
        elevation: 5,
        margin: 7
    },
    horizontalSection: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
    },
    imageContainer: {
        marginRight: 10, // Add margin for spacing between image and text
        borderRadius: 10, // Rounded corners for the image container
        overflow: 'hidden', // Ensure image doesn't overflow rounded corners
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10, // Rounded corners for the image
    },
    textContainer: {
        flex: 1, // Take remaining space
    },
    name: {
        fontSize: 18,
        color:'black'
    },
    reviews: {
        fontSize: 16,
        color:'black'
    },
    country: {
        fontSize: 16,
        color:'black'
    },
    detailsContainer: {
        marginTop: 10, // Add spacing between first and second horizontal sections
    },
    range: {
        fontSize: 23,
        marginBottom: 5, // Add spacing between text elements
        color:'black'
    },
    bio: {
        fontSize: 15,
        marginBottom: 5, // Add spacing between text elements
        color:'black'
    },
    workTags: {
        fontSize: 15,
        marginBottom: 10, // Add spacing between text elements
        color:'black'
    },
    sendMessageButton: {
        backgroundColor: '#CCE9FF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderRadius: 10,// Rounded corners for the button
        // alignSelf: 'flex-start',
    },
    sendMessageButtonText: {
        color: '#011838',
        fontSize: 18, // Increase button font size
        color: '#011838',
        fontWeight: 'bold',
    },
    moreButton: {
        color: '#007BFF',
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold', // Make text bold
    },
    big: {
        fontSize: 20, // Increase font size
    },
});

export default WorkerList;
