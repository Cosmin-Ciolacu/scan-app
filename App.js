import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/home'

class App extends Component {
  render() {
    return (
      <AppRoot />
    )
  }
}
let RootStack = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Home: { screen: Home },
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
})
const AppRoot = createAppContainer(RootStack)
export default App