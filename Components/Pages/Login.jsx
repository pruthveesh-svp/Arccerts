import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';

export class Login extends Component {
  navigateToOtherPage = () => {
    this.props.navigation.navigate('Display');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navigateToOtherPage}>
          <Text
            style={[
              styles.text,
              {
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 36,
                lineHeight: 42,
              },
            ]}>
            ArcCerts™
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#37BC9B',
  },
  text: {
    color: 'white',
  },
});

export default withNavigation(Login);
