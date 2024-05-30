import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useGlobal from '../../core/global';
import secure from '../../core/secure';

const ServiceWorkerCard = ({ worker }) => {
    // const [showFullBio, setShowFullBio] = useState(false);

    const searchList = useGlobal(state => state.searchList)
    const searchUsers = useGlobal(state => state.searchUsers)
    const friendList = useGlobal(state => state.friendList);

    const toggleShowFullBio = () => {
        setShowFullBio(!showFullBio);
    };

    const renderBio = () => {
        if (worker.worker_info.description.length <= 90) {
            return <Text style={styles.bio}>{worker.worker_info.description}</Text>;
        } else {
            return (
                <View style={styles.bioContainer}>
                    <Text style={styles.bio}>{worker.worker_info.description.substring(0, 92)}<Text style={{ color: 'blue' }}>....More</Text>
                        {/* <TouchableOpacity style={styles.button1} onPress={toggleShowFullBio}>
                            <Text style={styles.moreButton}>More</Text>
                        </TouchableOpacity> */}
                    </Text>
                </View>
            );
        }
    };

    const navigation = useNavigation();

    // function MessageMeClicked(){
    //     // navigation.navigate()
    //     console.log("button clicked");
    // }


    const MessageMeClicked = () => {
        console.log(worker);
        if (worker.connection_id) {
            // console.log("hello");
            // console.log(friendList);
            const connectedUser = friendList.find(friend => friend.friend.username === worker.user.username);
            if (connectedUser) {
                console.log("hello");
                console.log(connectedUser); // This is the full object of the connected user
                // Do whatever you need to do with the connectedUser object
                navigation.navigate('Messages', connectedUser);
            }
        }
        else {
            const senduser = {
                "messages": null,
                "next": null,
                "friend": {
                    "username": worker.user.username,
                    "name": worker.user.name,
                    "thumbnail": worker.user.thumbnail,
                }
            }
            navigation.navigate('Messages', senduser);
        }
        // navigation.navigate('Messages', user);
    };

    function HireMeClicked() {
        console.log("below data i am sharing");
        console.log(worker);
        navigation.navigate('CreateAnOffer', { worker })
    }


    return (
        <View style={styles.card}>
            {/* First Horizontal Section */}
            <TouchableOpacity >
                <View style={styles.horizontalSection}>
                    {/* Vertical Part 1 - Images */}

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: `http://192.168.213.184:8000${worker.user.thumbnail}` }}
                            style={styles.image}
                        />
                    </View>

                    {/* Vertical Part 2 - Textual Information */}
                    <View style={styles.textContainer}>
                        <Text style={[styles.name, styles.bold]}>{worker.user.name}</Text>
                        <Text style={styles.reviews}>Rating: {worker.rating.average_score}</Text>
                        <Text style={styles.reviews}>Total Ratings: {worker.rating.total_reviews}</Text>
                        <Text style={styles.country}>Location: need to set</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Second Horizontal Section */}

            <View style={styles.detailsContainer}>
                <TouchableOpacity>
                    <Text style={[styles.range, styles.bold]}>
                        {parseInt(worker.worker_info.minprice)} to {parseInt(worker.worker_info.maxprice)}
                    </Text>

                    {renderBio()}
                    <Text style={[styles.workTags]}>Work Tags: {JSON.parse(worker.worker_info.tags).join(', ')}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.sendMessageButton, styles.button]} onPress={MessageMeClicked}>
                        <Text style={styles.sendMessageButtonText}>Message Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.hireMeButton, styles.button]} onPress={HireMeClicked}>
                        <Text style={styles.sendMessageButtonText}>Hire Me</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};




const ScreenWithTag = () => {

    const [workers, setWorkers] = useState([]);

    const fetch_data = async () => {
        const tokens = await secure.get('tokens');
        const accesstoken = tokens?.access;

        if (!accesstoken) {
            console.error('Authentication token not found');
            return;
        }
        const response = await fetch(`http://192.168.213.184:8000/chat/workers-by-tag/Wash/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        setWorkers(data)
    }
    // const response = await fetch(`http://192.168.213.184:8000/chat/workers-by-tag/Wash/`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${accesstoken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 worktags: services,
    //                 hours: hoursValue,
    //                 other_services: arr,
    //                 price: price,
    //                 description: description,
    //             }),
    //         });

    useEffect(() => {
        // fetch('http://192.168.213.184:8000/chat/workers-by-tag/Wash/')
        //     .then(response => response.json())
        //     .then(data => {
        //         setWorkers(data); // Assuming data is an array of workers
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });

        // const response = await fetch(`http://192.168.213.184:8000/chat/workers-by-tag/${tag}/`);
        fetch_data();
    }, []);



    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {Object.values(workers).map(worker => (
                <ServiceWorkerCard key={worker.user.username} worker={worker} />
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
        fontSize: 20,
        color: 'black'
    },
    reviews: {
        fontSize: 15,
        color: 'black'
    },
    country: {
        fontSize: 15,
        color: 'black'
    },
    detailsContainer: {
        marginTop: 10, // Add spacing between first and second horizontal sections
    },
    range: {
        fontSize: 20,
        marginBottom: 5, // Add spacing between text elements
        color: 'black'
    },
    bio: {
        fontSize: 15,
        marginBottom: 5, // Add spacing between text elements
        color: 'black'
    },
    workTags: {
        fontSize: 15,
        marginBottom: 10, // Add spacing between text elements
        color: 'black'
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    sendMessageButton: {
        backgroundColor: '#CCE9FF',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    hireMeButton: {
        backgroundColor: '#FFD700', // Change color for "Hire Me" button
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default ScreenWithTag;
