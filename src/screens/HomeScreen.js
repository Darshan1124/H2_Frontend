import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { colors } from '../constants/theme';
import MainHeader from '../components/MainHeader';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import { PLACES, TOP_PLACES } from '../data';
import SectionHeader from '../components/SectionHeader';
import TripsList from '../components/TripsList';
import TripsList2 from '../components/TripList2';
import Publish from '../components/Publish';
import { useNavigation } from '@react-navigation/native';
import TouchableImageGrid from '../components/TouchableImageGrid';
import DiscountServicesButtons from '../components/DiscountServicesButtons';
import TitleLine from '../components/TitleLine';
import useGlobal from '../core/global';

const HomeScreen = () => {
    const [screen, setScreen] = useState('Home');
    const socketConnect = useGlobal(state => state.socketConnect)
	const socketClose = useGlobal(state => state.socketClose)

	useEffect(() => {
		socketConnect()
		// return () => {
		// 	socketClose()
		// }
	}, [])

    const handleFirstButtonPress = () => {
        setScreen('Home');
    };

    const handleSecondButtonPress = () => {
        setScreen('HelloWorld');
    };

    const navigation = useNavigation();

    const renderScreen = () => {
        switch (screen) {
            case 'Home':
                return (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleFirstButtonPress}>
                                <Text style={styles.buttonText}>Buy default</Text>
                                <Text style={styles.buttonText}>Services</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
                                <Text style={styles.buttonText}>Publish custom</Text>
                                <Text style={styles.buttonText}>Service</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.locationContainer}>
                            <Text style={styles.locationText}>Location</Text>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                                <Image source={require('../../assets/icons/Search.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <TitleLine title="FOR YOU" />
                        <TouchableImageGrid images={[
                            { imageSource: require('../../assets/Services/wash.jpg'), text: 'Cleaning' },
                            { imageSource: require('../../assets/Services/Carpenter.jpg'), text: 'Carpentering' },
                            { imageSource: require('../../assets/Services/Electricin.jpg'), text: 'electrician' },
                            { imageSource: require('../../assets/Services/Sofawash.jpeg'), text: 'Sofa wash' },
                            { imageSource: require('../../assets/Services/tutor.jpg'), text: 'tutor' },
                            { imageSource: require('../../assets/Services/babbysitter.jpeg'), text: 'baby sitter' },
                        ]} />
                        <TitleLine title="DEALS & SEARVICES" />
                        <DiscountServicesButtons />
                        <TopPlacesCarousel list={TOP_PLACES} />

                        <SectionHeader
                            title="Popular Services"
                            buttonTitle="See All"
                            onPress={() => { }}
                        />
                        <View style={styles.randomstyles}>
                            <TripsList2 list={PLACES} />
                        </View>
                        <TitleLine title="TOP PICKS" />
                        <SectionHeader
                            title="Top Rated in your area"
                            buttonTitle="See All"
                            onPress={() => { }}
                        />
                        <View style={styles.randomstyles}>
                            <TripsList list={PLACES} />
                        </View>
                    </ScrollView>
                );
            case 'HelloWorld':
                return (
                    <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleFirstButtonPress}>
                                <Text style={styles.buttonText}>Buy default</Text>
                                <Text style={styles.buttonText}>Services</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
                                <Text style={styles.buttonText}>Publish custom</Text>
                                <Text style={styles.buttonText}>Service</Text>
                            </TouchableOpacity>
                        </View>
                        <Publish />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <MainHeader title="H2" />
            {renderScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#CCE9FF',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    buttonText: {
        color: '#011838',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    locationText: {
        marginRight: 10,
    },
    icon: {
        width: 45,
        height: 45,
    },
    randomstyles: {
        marginTop: 7
    }
});

export default HomeScreen;
