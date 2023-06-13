import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export class Name extends Component {
  state = {
    fullName: '',
    isInputActive: false,
    isTextEntered: false,
  };

  handleInputChange = text => {
    const {isTextEntered} = this.state;
    if (!isTextEntered && text.length > 0) {
      this.setState({isTextEntered: true});
    } else if (isTextEntered && text.length === 0) {
      this.setState({isTextEntered: false});
    }
    this.setState({fullName: text});
  };

  handleSubmit = () => {
    const {fullName} = this.state;
    if (fullName.length === 24) {
      // Perform submit action

      // Navigation
      this.props.navigation.navigate('Home');
    }
  };

  clearInput = () => {
    this.setState({fullName: '', isTextEntered: false});
  };

  activateInput = () => {
    this.setState({isInputActive: true});
  };

  deactivateInput = () => {
    this.setState({isInputActive: false});
  };

  render() {
    const {fullName, isInputActive, isTextEntered} = this.state;
    const submitButtonStyle =
      fullName.length === 0
        ? styles.submitButtonInactive
        : styles.submitButtonActive;

    const inputStyle = [
      styles.input,
      isInputActive && styles.inputActive,
      {
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0,
        color: '#1C1C1C',
        opacity: 1,
      },
    ];

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>What's your name?</Text>
        <Text style={styles.subtitle}>Please enter your full name</Text>
        <Text style={styles.note}>
          You can always change it later if you want to.
        </Text>
        <View
          style={[
            styles.inputContainer,
            isInputActive && styles.inputContainerActive,
          ]}>
          <TextInput
            style={inputStyle}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={this.handleInputChange}
            maxLength={24}
            onFocus={this.activateInput}
            onBlur={this.deactivateInput}
          />
          {isTextEntered && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={this.clearInput}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.submitButton, submitButtonStyle]}
          onPress={this.handleSubmit}
          disabled={fullName.length !== 24}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0,
    color: '#1C1C1C',
    opacity: 1,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter',
    letterSpacing: -0.64,
    color: '#656565',
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter',
    letterSpacing: -0.48,
    color: '#656565',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#9ADDCD',
  },
  inputContainerActive: {
    borderColor: '#000000',
  },
  input: {
    flex: 1,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  inputActive: {
    color: '#1C1C1C',
  },
  clearButton: {
    paddingHorizontal: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  submitButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: 340,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9ADDCD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  submitButtonActive: {
    backgroundColor: '#37BC9B',
  },
  submitButtonInactive: {
    backgroundColor: '#9ADDCD',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0,
    textTransform: 'capitalize',
    opacity: 1,
  },
});

export default Name;
