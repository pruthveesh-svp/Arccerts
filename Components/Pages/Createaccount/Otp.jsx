import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';

export class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ['', '', '', ''],
      activeInput: 0,
      isOtpComplete: false,
      receivedOtp: this.props.route.params.otp,
      showError: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    const {receivedOtp, otp} = this.state;
    if (
      receivedOtp &&
      receivedOtp.length === 4 &&
      otp.every(digit => digit === '')
    ) {
      this.setState({otp: receivedOtp.split('')});
    }
  }

  handleOtpChange = (index, value) => {
    const otp = this.state.otp.slice();
    otp[index] = value;

    this.setState({otp});

    if (value === '') {
      if (index > 0) {
        this.setState({activeInput: index - 1}, () => {
          this.refs[index - 1].focus();
        });
      }
    } else if (index < 3) {
      this.setState({activeInput: index + 1}, () => {
        this.refs[index + 1].focus();
      });
    }

    const isOtpComplete = otp.every(digit => digit !== '');
    this.setState({isOtpComplete, showError: false});
  };
  handleContinue = () => {
    const {receivedOtp, otp} = this.state;
    console.log('Received OTP:', receivedOtp);
    console.log('Entered OTP:', otp.join(''));

    if (otp.join('') === receivedOtp.toString()) {
      console.log('Mobile:', this.props.route.params.mobile);
      console.log('OTP:', receivedOtp);

      // Call the API to validate OTP and get the accessToken
      // Assuming you're using fetch for the API call
      fetch('http://13.232.249.114:5000/arccerts/v1/user/validateOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: this.props.route.params.mobile,
          otp: receivedOtp,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);

          // Check if the API response is successful
          if (data.status) {
            const accessToken = data.data.accessToken;
            console.log('Access Token:', accessToken);

            // Set the accessToken in state or store it in a global state management solution
            this.setState({accessToken});

            // Navigate to the Name screen
            this.props.navigation.navigate('Name');
          } else {
            console.log('OTP verification failed');
            this.setState({showError: true});
          }
        })
        .catch(error => {
          console.log('API Error:', error);
          this.setState({showError: true});
        });
    } else {
      console.log('Incorrect OTP');
      this.setState({showError: true});
    }
  };

  render() {
    const {otp, activeInput, isOtpComplete, receivedOtp, showError, isLoading} =
      this.state;
    const resendButtonStyle = isOtpComplete
      ? {...styles.resendButton, backgroundColor: '#37BC9B'}
      : styles.resendButton;
    const resendButtonText = isOtpComplete ? 'Continue' : 'Resend';

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.verifyText}>Verify your mobile number</Text>
        <View style={styles.otpContainer}>
          <Text style={styles.enterPinText}>
            Enter the pin you have received via SMS on{' '}
            <Text style={styles.mobileNumber}>
              {this.props.route.params.mobile}
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.editNumberButton}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.editNumberButtonText}>Edit number</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={index}
              style={[
                styles.otpInput,
                activeInput === index && styles.activeInput,
                showError && otp.join('') !== receivedOtp && styles.errorInput,
              ]}
              value={digit}
              onChangeText={value => this.handleOtpChange(index, value)}
              maxLength={1}
              keyboardType="numeric"
              autoFocus={index === 0}
            />
          ))}
        </View>
        {showError && (
          <Text style={styles.errorText}>
            {otp.join('') !== receivedOtp
              ? 'Enter the valid OTP'
              : 'Incomplete OTP'}
          </Text>
        )}

        <TouchableOpacity
          style={resendButtonStyle}
          onPress={this.handleContinue}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.resendButtonText}>{resendButtonText}</Text>
          )}
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
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#1C1C1C',
    fontSize: 24,
  },
  verifyText: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0,
    color: '#1C1C1C',
    opacity: 1,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  enterPinText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter',
    letterSpacing: -0.64,
    color: '#656565',
  },
  mobileNumber: {
    color: '#656565',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
  },
  editNumberButton: {
    paddingHorizontal: 8,
  },
  editNumberButtonText: {
    color: '#0185FF',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter',
    letterSpacing: -0.64,
  },
  otpInputContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  otpInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#1C1C1C',
    height: 48,
    marginRight: 12,
    fontSize: 24,
    textAlign: 'center',
  },
  activeInput: {
    borderColor: '#0185FF',
  },
  resendButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: 340,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9ADDCD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter',
    letterSpacing: 0.4,
    textTransform: 'capitalize',
    opacity: 1,
  },
  errorInput: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 8,
  },
});

export default Otp;
