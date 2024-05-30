import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import secure from '../../core/secure';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';


const FormOfOffer = ({ route }) => {
    const [offerType, setOfferType] = useState('perProject');
    const [service, setService] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [hour, setHour] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState(new Date())
    const [serviceError, setServiceError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [hourError, setHourError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    const navigation=useNavigation();

    // const openDatePicker = async () => {
    //     try {
    //         const { action, year, month, day } = await DatePickerAndroid.open({
    //             date: new Date(),
    //         });
    //         if (action !== DatePickerAndroid.dismissedAction) {
    //             setDate(`${year}-${month + 1}-${day}`);
    //         }
    //     } catch ({ code, message }) {
    //         console.warn('Cannot open date picker', message);
    //     }
    // };

    const handleSubmit = async () => {
        console.log(route.params);
        let hasError = false;

        if (!service) {
            setServiceError('Service is required');
            hasError = true;
        } else {
            setServiceError('');
        }

        if (!price) {
            setPriceError('Price is required');
            hasError = true;
        } else {
            setPriceError('');
        }

        // if (!date) {
        //     setDateError('Date is required');
        //     hasError = true;
        // } else {
        //     setDateError('');
        // }

        if (!hour && offerType === 'perHour') {
            setHourError('Hourly Rate is required');
            hasError = true;
        } else {
            setHourError('');
        }

        if (!address) {
            setAddressError('Address is required');
            hasError = true;
        } else {
            setAddressError('');
        }

        if (!hasError) {

            const formData = {
                receiver: route.params.worker.user.username, // Assuming you have the receiver's ID available
                perhourservice: offerType === 'perHour',
                // Include 'hour' only if offerType is 'perHour' and 'hour' is available
                ...(offerType === 'perHour' && hour && { hour: parseInt(hour, 10) }),
                description,
                price: parseFloat(price),
                state: 'pending',
                // Include 'date' only if it's available
                ...(date && { date: date }),
                address:address
            };
            

            try {
                const tokens = await secure.get('tokens');
                const accesstoken = tokens?.access;

                if (!accesstoken) {
                    console.error('Authentication token not found');
                    return;
                }
                console.log(formData);
                const response = await fetch('http://192.168.213.184:8000/chat/offers/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accesstoken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('Offer created successfully');
                    // navigation.navigate();
                    Alert.alert('Success', 'Offer created successfully!');

                    // Handle success, e.g., navigate to a different screen
                } else {
                    console.error('Failed to create offer:', response.status);
                    // Handle error, e.g., display an error message to the user
                }
            } catch (error) {
                console.error('Failed to create offer:', error.message);
                // Handle error, e.g., display an error message to the user
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.radioButton, offerType === 'perProject' && styles.selectedButton]}
                    onPress={() => setOfferType('perProject')}
                >
                    <Text style={styles.buttonText}>Offer Per Work</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, offerType === 'perHour' && styles.selectedButton]}
                    onPress={() => setOfferType('perHour')}
                >
                    <Text style={styles.buttonText}>Offer Per Hour</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Service<Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Service"
                    value={service}
                    onChangeText={text => {
                        setService(text);
                        setServiceError('');
                    }}
                />
                {serviceError ? <Text style={styles.errorText}>{serviceError}</Text> : null}
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Description (optional)"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Price<Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={text => {
                        setPrice(text);
                        setPriceError('');
                    }}
                    keyboardType="numeric"
                />
                {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}
            </View>

            {offerType === 'perHour' && (
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Estimated Hour<Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Estimated Hours"
                        value={hour}
                        onChangeText={text => {
                            setHour(text);
                            setHourError('');
                        }}
                        keyboardType="numeric"
                    />
                    {hourError ? <Text style={styles.errorText}>{hourError}</Text> : null}
                </View>
            )}
            <Text style={styles.label}>Select Estimated date
                {/* <Text style={styles.required}>*</Text> */}
            </Text>
            {/* <Button title="Click to choose date" onPress={() => setOpen(true)} /> */}
            {/* Date picker button */}
            {/* <TouchableOpacity style={styles.datechoosebutton} onPress={() => setOpen(true)}>
                <Text style={styles.dateChooseButtonText}>Choose Estimated Date</Text>
            </TouchableOpacity> */}

            {/* Display selected date */}
            {/* {selectedDate ? (
                <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
            ) : null} */}

            {/* Date picker modal */}
            {/* <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false);
                    setSelectedDate(date.toDateString()); // Set the selected date in state
                    setDate(date);
                }}
                onCancel={() => setOpen(false)}
            /> */}

            {/* Date picker */}
            {/*<DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false);
                    setSelectedDate(date.toDateString()); // Convert date object to string representation
                    setDate(date);
                }}
                onCancel={() => setOpen(false)}
            />*/}

            {/* Error message for date */}
            {/* {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null} */}

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Address<Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={text => {
                        setAddress(text);
                        setAddressError('');
                    }}
                />
                {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    radioButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'lightblue',
    },
    buttonText: {
        fontSize: 16,
        color: 'black'
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black'
    },
    required: {
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-end',
    },
    // datechoosebutton: {
    //     backgroundColor: 'gray', // Change the color as needed
    //     borderRadius: 5,
    //     paddingVertical: 10,
    //     paddingHorizontal: 10,
    //     alignSelf: 'flex-start', // Align the button to the left
    //     marginBottom: 20, // Add margin to create space between the button and other fields
    // },

    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    datePickerButton: {
        backgroundColor: 'gray',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
    },
    datePickerButtonText: {
        color: 'white',
        fontSize: 16,
    },
    selectedDate: {
        marginTop: 10,
        fontSize: 16,
    },
    datechoosebutton: {
        backgroundColor: '#007bff', // Change the color as needed
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignSelf: 'flex-start', // Align the button to the left
        marginBottom: 4, // Add margin to create space between the button and other fields
    },
    dateChooseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedDateText: {
        marginBottom: 20,
        fontSize: 16,
        color: '#007bff', // Change the color as needed
    },
});

export default FormOfOffer;
