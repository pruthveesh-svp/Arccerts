import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Otp from '../Createaccount/Otp';

export class Lphone extends Component {
  state = {
    mobileNumber: '',
    showMobileNumber: false,
  };

  handleMobileNumberChange = text => {
    this.setState({mobileNumber: text});
    if (text.length === 10) {
      this.hideKeyboard();
    }
  };

  hideKeyboard = () => {
    Keyboard.dismiss();
  };

  handleContinuePress = () => {
    const {mobileNumber} = this.state;
    // TODO: Send mobileNumber to other page
    console.log('Mobile Number:', mobileNumber);
    this.setState({showMobileNumber: true});
    this.props.navigation.navigate('Otp', {mobileNumber});
  };

  render() {
    const {mobileNumber, showMobileNumber} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
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
              onChangeText={this.handleMobileNumberChange}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                mobileNumber.length === 10 ? '#37BC9B' : '#9ADDCD',
            },
          ]}
          onPress={this.handleContinuePress}
          disabled={mobileNumber.length !== 10}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#1C1C1C',
    fontSize: 24,
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
  mobileNumber: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0,
    color: '#ACADB0',
    opacity: 1,
    textDecorationLine: 'underline',
    marginTop: 8,
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

export default Lphone;
