import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';

const {width} = Dimensions.get('window');

export class Display extends Component {
  state = {
    createAccountColor: '#FFFFFF',
    loginColor: '#FFFFFF',
  };

  handleCreateAccountPress = () => {
    this.setState({createAccountColor: '#37BC9B', loginColor: '#FFFFFF'});
    this.props.navigation.navigate('Phone');
  };

  handleLoginPress = () => {
    this.setState({createAccountColor: '#FFFFFF', loginColor: '#37BC9B'});
    this.props.navigation.navigate('lphone');
  };

  render() {
    const {createAccountColor, loginColor} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/120x120?text=Placeholder+Image',
            }}
            style={styles.image}
          />
          <Text style={styles.title}>
            Fastest way to{'\n'}validate certificates
          </Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              <Text style={styles.subtitleFirstLine}>
                ArcCerts is secure and quick
              </Text>
              {'\n'}
              <Text style={styles.subtitleSecondLine}>
                to validate certificates
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: createAccountColor}]}
            onPress={this.handleCreateAccountPress}>
            <Text style={styles.buttonText}>Create an Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: loginColor}]}
            onPress={this.handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37BC9B',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: 'normal',
    marginTop: 16,
    textAlign: 'center',
    letterSpacing: 0.6,
    color: '#FFFFFF',
  },
  subtitleContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'normal',
    letterSpacing: 0,
    color: '#FFFFFF',
    opacity: 1,
    textAlign: 'center',
  },
  subtitleFirstLine: {
    fontWeight: 'bold',
  },
  subtitleSecondLine: {
    fontWeight: 'normal',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'medium',
  },
});

export default withNavigation(Display);
