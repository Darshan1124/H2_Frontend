import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Title from '../common/Title';
import Input from '../common/Input';
import Button from '../common/Button';
import useGlobal from '../core/global';
import secure from '../core/secure';

function SignInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const login = useGlobal((state) => state.login);
  const [fcm_token,setFcm_token]=useState('');

  useEffect(() => {
    const retrieveFCMToken = async () => {
      try {
        const fcm_token = await secure.get('fcmToken');
        setFcm_token(fcm_token);
        console.log("got below fcm token",fcm_token);
      } catch (error) {
        console.error('Error retrieving FCM token:', error);
      }
    };
    retrieveFCMToken();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  async function onSignIn() {
    console.log('onSignIn:', username, password);

    // Check username
    const failUsername = !username;
    if (failUsername) {
      setUsernameError('Username not provided');
    }

    // Check password
    const failPassword = !password;
    if (failPassword) {
      setPasswordError('Password not provided');
    }

    // Break out of this function if there were any issues
    if (failUsername || failPassword) {
      return;
    }

    try {
      const response = await fetch('http://192.168.213.184:8000/chat/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          fcm_token
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
      const data = await response.json();
      console.log('Sign In Response:', data);
      console.log(data);
      const credentials = {
        username: username,
        password: password,
      };
      login(credentials, data.user, data.tokens);
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Title text="Helping Hand" color="#202020" />
            <Input
              title="Username"
              value={username}
              error={usernameError}
              setValue={setUsername}
              setError={setUsernameError}
            />
            <Input
              title="Password"
              value={password}
              error={passwordError}
              setValue={setPassword}
              setError={setPasswordError}
              secureTextEntry={true}
            />
            <Button title="Sign In" onPress={onSignIn} />
            <Text style={{ textAlign: 'center', marginTop: 40 }}>
              Don't have an account?{' '}
              <Text
                style={{ color: 'blue' }}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignInScreen;
