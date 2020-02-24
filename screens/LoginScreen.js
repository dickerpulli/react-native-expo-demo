import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setLoginSuccess } from '../redux/authActions';

class LoginScreen extends React.Component {
  render() {
    const login = () => {
      this.props.login();
      this.props.navigation.navigate('App');
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <TouchableOpacity
          onPress={login}
          style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(setLoginSuccess("abc"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
