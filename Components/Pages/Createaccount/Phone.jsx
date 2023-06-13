import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import axios from 'axios';

export function Phone({navigation, setRegistrationData}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleMobileNumberChange = text => {
    setMobileNumber(text);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleContinuePress = async () => {
    try {
      hideKeyboard();
      console.log('Entered Mobile Number:', mobileNumber);

      const response = await axios.post(
        'http://13.232.249.114:5000/arccerts/v1/user/register',
        {
          mobile: mobileNumber, // Updated key to "mobile"
        },
      );

      console.log('Registration response:', response.data);

      const {data} = response.data;
      const {mobile, otp, isNewUser} = data;

      console.log('Mobile:', mobile);
      console.log('OTP:', otp);
      console.log('isNewUser:', isNewUser);

      setRegistrationData(data);

      if (response.status === 201) {
        navigation.navigate('Otp', {mobile: mobile, otp: otp});
      } else {
        // Handle other response codes if needed
        // ...
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error setting up the request:', error.message);
      }
      console.log('Error config:', error.config);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Enter your mobile number</Text>
        <Text style={styles.description}>
          Enter your number to create an account or login
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.flag}>🇮🇳</Text>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: mobileNumber.length === 10 ? '#37BC9B' : '#9ADDCD',
          },
        ]}
        onPress={handleContinuePress}
        disabled={mobileNumber.length !== 10}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  contentContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 40,
  },
  label: {
    color: '#1C1C1C',
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0,
    opacity: 1,
  },
  description: {
    color: '#656565',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter',
    letterSpacing: -0.64,
    opacity: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1C',
    marginBottom: 20,
  },
  flag: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0,
    color: '#1C1C1C',
    opacity: 1,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0,
    color: '#1C1C1C',
    opacity: 1,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: 340,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0.4,
    textTransform: 'capitalize',
    opacity: 1,
  },
});

export default function PhoneScreen({navigation}) {
  const [registrationData, setRegistrationData] = useState(null);

  return (
    <Phone navigation={navigation} setRegistrationData={setRegistrationData} />
  );
}
