import React from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { ReduxNetworkProvider } from 'react-native-offline';

const store = configureStore();

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = store.getState().auth.userToken;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Settings: SettingsStack,
});

const AuthSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: TabNavigator,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});

const AppContainer = createAppContainer(AuthSwitchNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxNetworkProvider>
          <AppContainer />
        </ReduxNetworkProvider>
      </Provider>
    );
  }
}
