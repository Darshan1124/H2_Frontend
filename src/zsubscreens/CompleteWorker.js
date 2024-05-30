import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import secure from '../core/secure';
import { useNavigation } from '@react-navigation/native';
import TitleLine2 from '../components/Titleline2';

const CompleteWorker = _props => {
    const [arr, setArr] = useState([]);
    const [selected, setSelected] = useState("");
    const [services, setServices] = useState([]);
    const [services01, setServices01] = useState("");
    const [Minprice, setMinprice] = useState('');
    const [Maxprice, setMaxPrice] = useState('');
    const [description, setDescription] = useState('');

    const servicesData = [
        { label: 'Cleaning', value: 'cleaning' },
        { label: 'Carpenting', value: 'carpenting' },
        { label: 'Painting', value: 'painting' },
        { label: 'Other', value: 'other' },
    ];

    const data = [
        { label: '1 Hour', value: '1' },
        { label: '2 Hour', value: '2' },
        { label: '3 Hour', value: '3' },
        { label: '4 Hour', value: '4' },
        { label: '5 Hour', value: '5' },
        { label: '6 Hour', value: '6' },
        { label: '7 Hour', value: '7' },
        { label: '8 Hour', value: '8' },
    ];

    const _renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                <Image style={styles.icon} source={require('../../assets/icons/Search.png')} />
            </View>
        );
    };

    const addService = () => {
        if (services01.trim() !== '') {
            // Add the entered service to the services01 array
            setArr(prevArr => [...prevArr, services01]);
            setServices01(""); // Clear the input field after adding the service
        }
    };


    const removeService = index => {
        // Remove the service at the specified index from the services01 array
        setArr(prevArr => prevArr.filter((_, i) => i !== index));
    };


    const navigation = useNavigation();



    const handleSubmit = async () => {
        try {
            const tokens = await secure.get('tokens');
            const accesstoken = tokens?.access;
    
            if (!accesstoken) {
                console.error('Authentication token not found');
                return;
            }
    
            const mergedArray = [...arr, ...services.map(service => service)];
    
            const minPriceValue = parseInt(Minprice);
            const maxPriceValue = parseInt(Maxprice);
    
            if (isNaN(minPriceValue) || isNaN(maxPriceValue) || minPriceValue >= maxPriceValue) {
                console.error('Invalid price range');
                return;
            }
    
            const hoursValue = parseInt(selected.value);
    
            console.log('Request payload:', {
                tags: mergedArray,
                hours: hoursValue,
                minprice: minPriceValue,
                maxprice: maxPriceValue,
                description: description,
            });
    
            const response = await fetch('http://192.168.213.184:8000/chat/create-worker-info/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tags: mergedArray,
                    hour: hoursValue,
                    minprice: minPriceValue,
                    maxprice: maxPriceValue,
                    description: description,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Response data:', data);
            navigation.navigate('Profileworker');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    










    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
            </View>
        );
    };




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.inputContainer2}>
                    <Text style={styles.inputLabelofhour}>Services</Text>
                    <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={servicesData}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        value={services}
                        search
                        searchPlaceholder="Search..."
                        onChange={item => {
                            setServices(item);
                        }}
                        // renderLeftIcon={() => (
                        //     <AntDesign
                        //         style={styles.icon}
                        //         color="black"
                        //         name="Safety"
                        //         size={20}
                        //     />
                        // )}
                        renderItem={renderItem}
                        renderSelectedItem={(item, unSelect) => (
                            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                <View style={styles.selectedStyle}>
                                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                    {/* <AntDesign color="black" name="delete" size={17} /> */}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <View>
                        <View>
                            <Text style={styles.inputLabel}>Please specify Your service(if any)</Text>
                            <TextInput
                                style={styles.input}
                                value={services01}
                                onChangeText={text => setServices01(text)}
                                placeholder="Specify services..."
                                placeholderTextColor='#888'
                            />
                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={addService}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                        <Text style={{ backgroundColor: '#EFEFEF', paddingVertical: 3, paddingHorizontal: 10, fontSize: 20, borderRadius: 5 }}>Add</Text>
                                        <Image source={require('../../assets/icons/plus.png')} style={styles.icon} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer2}>
                                {/* <Text style={styles.inputLabel}>Added Services:</Text> */}
                                <TitleLine2 title="Added Services:" />
                                {arr.map((service, index) => (
                                    <View key={index} >
                                        {/* <Text style={styles.inputLabel}>Service {index + 1}</Text> */}
                                        <View style={styles.serviceContainer}>
                                            <Text style={styles.serviceText}>{service}</Text>
                                            <TouchableOpacity onPress={() => removeService(index)}>
                                                <Image source={require('../../assets/icons/cross.jpg')} style={styles.icon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>
                    </View>
                </View>


                


                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Price</Text>
                    <View style={styles.priceRangeContainer}>
                        <TextInput
                            style={[styles.input, styles.priceInput]}
                            value={Minprice}
                            onChangeText={text => setMinprice(text.replace(/[^0-9]/g, ''))}
                            placeholder="Min"
                            keyboardType="numeric"
                        />
                        <Text style={styles.toText}>to</Text>
                        <TextInput
                            style={[styles.input, styles.priceInput]}
                            value={Maxprice}
                            onChangeText={text => setMaxPrice(text.replace(/[^0-9]/g, ''))}
                            placeholder="Max"
                            keyboardType="numeric"
                        />
                    </View>
                </View>


                <Text style={styles.inputLabelofhour}>Hours</Text>

                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    placeholderTextColor="#888"
                    valueField="value"
                    placeholder="Select Hours"
                    searchPlaceholder="Search..."
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                    }}
                // renderLeftIcon={() => (
                //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                // )}
                />


                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        placeholder="Enter description..."
                        placeholderTextColor='#888'
                        multiline={true} // Allow multiline input
                        numberOfLines={4} // Set the number of lines for the input field
                    />
                </View>




                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default CompleteWorker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    inputContainer: {
        marginTop: 20,
    },
    inputContainer2: {
        marginTop: 20,
        flexDirection: 'row', // Arrange items horizontally
        flexWrap: 'wrap', // Wrap items to the next line when necessary
    },

    inputContainer2: {
        // marginTop: 2,
    },
    inputLabel: {
        fontSize: 16,
        // marginBottom: 2,
        marginTop: 20
    },
    priceRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginTop: 5,
    },
    priceInput: {
        flex: 1,
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: '#CCE9FF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#011838',
        fontSize: 16,
    },
    inputLabelofhour: {
        fontSize: 16,
        marginTop: 15,
        paddingBottom: 2
    },
    serviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // Wrap items to the next line when necessary
        marginVertical: 5, // Add vertical margin between rows
    },

    serviceText: {
        fontSize: 16,
        backgroundColor: '#EFEFEF', // Set background color around the service text
        paddingVertical: 5, // Adjust padding as needed
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 5, // Add margin between service text and cross icon
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    toText: {
        fontSize: 16,
        marginRight: 7,
    },
});



