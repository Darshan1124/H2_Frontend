import { useLayoutEffect, useState } from "react"
import {
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	Text,
	View,
	TouchableWithoutFeedback
} from "react-native"
import Input from "../common/Input"
import Button from "../common/Button"
import api from "../core/api"
import utils from "../core/utils"
import useGlobal from "../core/global"
import messaging from '@react-native-firebase/messaging';

function SignUpScreen({ navigation }) {
	const [username, setUsername] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	const [usernameError, setUsernameError] = useState('')
	const [firstNameError, setFirstNameError] = useState('')
	const [lastNameError, setLastNameError] = useState('')
	const [password1Error, setPassword1Error] = useState('')
	const [password2Error, setPassword2Error] = useState('')

	const login = useGlobal(state => state.login)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	function onSignUp() {
		// Check username
		const failUsername = !username || username.length < 5;
		if (failUsername) {
			setUsernameError('Username must be >= 5 characters');
		}
		// Check firstName
		const failFirstName = !firstName;
		if (failFirstName) {
			setFirstNameError('First Name was not provided');
		}
		// Check last Name
		const failLastName = !lastName;
		if (failLastName) {
			setLastNameError('Last Name was not provided');
		}
		// Check password1
		const failPassword1 = !password1 || password1 < 8;
		if (failPassword1) {
			setPassword1Error('Password is too short');
		}
		// Check password2
		const failPassword2 = password1 !== password2;
		if (failPassword2) {
			setPassword2Error('Passwords don\'t match');
		}
		// Break out of the function if there were any issues
		if (failUsername ||
			failFirstName ||
			failLastName ||
			failPassword1 ||
			failPassword2) {
			return;
		}

		// let token = messaging().getToken();
		// console.log("below token also sending");
		// console.log('f9WEepO8Qn6dTc8NqcHaKN:APA91bEDAVMYgywU-Dz0rq6OWU6l9kMD6tSv9JZwK6HTNX2UVIT3FKBekIv9IQOZzT2NZ1YXioUJvDuFkSdQ83HfBwSc6osRzYJVuRXWYy0xs2xEStv-VGFB5NXgBiEyO0Gb5miSSRf2');


		// let token = 'f9WEepO8Qn6dTc8NqcHaKN:APA91bEDAVMYgywU-Dz0rq6OWU6l9kMD6tSv9JZwK6HTNX2UVIT3FKBekIv9IQOZzT2NZ1YXioUJvDuFkSdQ83HfBwSc6osRzYJVuRXWYy0xs2xEStv-VGFB5NXgBiEyO0Gb5miSSRf2'
		// console.log('f9WEepO8Qn6dTc8NqcHaKN:APA91bEDAVMYgywU-Dz0rq6OWU6l9kMD6tSv9JZwK6HTNX2UVIT3FKBekIv9IQOZzT2NZ1YXioUJvDuFkSdQ83HfBwSc6osRzYJVuRXWYy0xs2xEStv-VGFB5NXgBiEyO0Gb5miSSRf2');

		// Make signin request using fetch
		fetch('http://192.168.213.184:8000/chat/signup/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				first_name: firstName,
				last_name: lastName,
				password: password1,
				// devicetoken:token
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				// Assuming response data has the same structure as before
				utils.log('Sign Up:', data);
				const credentials = {
					username: username,
					password: password1
				};
				login(
					credentials,
					data.user,
					data.tokens
				);
			})
			.catch(error => {
				console.error('Error during sign up:', error);
			});
	}


	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>

						<Text
							style={{
								textAlign: 'center',
								marginBottom: 24,
								fontSize: 36,
								fontWeight: 'bold'
							}}
						>
							Sign Up
						</Text>

						<Input
							title='Username'
							value={username}
							error={usernameError}
							setValue={setUsername}
							setError={setUsernameError}
						/>

						<Input
							title='First Name'
							value={firstName}
							error={firstNameError}
							setValue={setFirstName}
							setError={setFirstNameError}
						/>

						<Input
							title='Last Name'
							value={lastName}
							error={lastNameError}
							setValue={setLastName}
							setError={setLastNameError}
						/>

						<Input
							title='Password'
							value={password1}
							error={password1Error}
							setValue={setPassword1}
							setError={setPassword1Error}
							secureTextEntry={true}
						/>

						<Input
							title='Retype Password'
							value={password2}
							error={password2Error}
							setValue={setPassword2}
							setError={setPassword2Error}
							secureTextEntry={true}
						/>

						<Button title='Sign Up' onPress={onSignUp} />

						<Text style={{ textAlign: 'center', marginTop: 40 }}>
							Already have an account? <Text
								style={{ color: 'blue' }}
								onPress={() => navigation.goBack()}
							>
								Sign In
							</Text>
						</Text>


					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default SignUpScreen