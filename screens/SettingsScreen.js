import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setLogout } from '../redux/authActions';

class SettingsScreen extends React.Component {
  render() {
    const logout = () => {
      this.props.logout();
      this.props.navigation.navigate('Auth');
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        <TouchableOpacity
          onPress={logout}
          style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white' }}>Logout</Text>
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
    logout: () => dispatch(setLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
