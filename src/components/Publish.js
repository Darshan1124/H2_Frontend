import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import secure from '../core/secure';
import { useNavigation } from '@react-navigation/native';

const Form = _props => {
    const [arr, setArr] = useState("");
    const [selected, setSelected] = useState("");
    const [services, setServices] = useState('');
    const [services01, setServices01] = useState('');
    const [price, setPrice] = useState('');
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
            setArr(services01);
            setServices01('');
        }
    };

    const removeService = () => {
        setArr(""); // Updated to be called within removeService function
    };


    const navigation = useNavigation();



    // Frontend: Form.js

    const handleSubmit = async () => {
        try {
            const tokens = await secure.get('tokens');
            const accesstoken = tokens?.access;

            if (!accesstoken) {
                console.error('Authentication token not found');
                return;
            }

            // Convert selected hours to integer
            const hoursValue = parseInt(selected.value); // Assuming selected.value is the value of hours

            console.log('Request payload:', {
                worktags: services,
                hours: hoursValue, // Ensure hours is sent as an integer
                other_services: arr,
                price: price,
                description: description,
            });

            const response = await fetch('http://192.168.213.184:8000/chat/addservice/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    worktags: services,
                    hours: hoursValue,
                    other_services: arr,
                    price: price,
                    description: description,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response data:', data);
            // Handle the response from the server
            navigation.navigate('MyServices')
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };




    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelofhour}>Services</Text>
                    {/* <MultiSelect
                        style={styles.dropdown}
                        data={servicesData}
                        labelField="label"
                        valueField="value"
                        placeholder="Select service type"
                        placeholderTextColor="#888"
                        value={services}
                        onChange={item => {
                            setServices(item);
                        }}
                    /> */}
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={servicesData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select service type"
                        placeholderTextColor="#888"
                        searchPlaceholder="Search..."
                        value={services}
                        onChange={item => {
                            setServices(item.value);
                        }}
                    />
                    <View>
                        <View style={styles.inputContainer}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 3, padding: 10 }}>
                                        <Text style={{ backgroundColor: '#EFEFEF', paddingVertical: 3, paddingHorizontal: 10, fontSize: 20, borderRadius: 5 }}>Add</Text>
                                        <Image source={require('../../assets/icons/plus.png')} style={styles.icon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {/* {arr.map((service, index) => ( */}

                    <View style={{ marginRight: 5 }}>
                        <View style={styles.inputContainer}>
                            <View style={styles.serviceContainer}>
                                <TouchableOpacity onPress={removeService}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ backgroundColor: '#EFEFEF', paddingHorizontal: 10, fontSize: 20, borderRadius: 5 }}>{arr}</Text>
                                        <Image source={require('../../assets/icons/cross.jpg')} style={styles.icon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    {/* ))} */}
                </View>


                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text.replace(/[^0-9]/g, ''))}
                        placeholder="Enter price..."
                        placeholderTextColor='#888'
                        keyboardType="numeric"
                    />
                </View>

                <Text style={styles.inputLabelofhour}>Hours</Text>
                {/* <MultiSelect
                    style={styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    label="Multi Select"
                    placeholder="Select Hours"
                    placeholderTextColor="#888"
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                    }}
                    renderItem={item => _renderItem(item)}
                /> */}


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

export default Form;

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
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
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
        justifyContent: 'space-between',
    },
    serviceText: {
        fontSize: 16,
    },
});



