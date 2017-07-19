import React, {Component} from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Contacts from './Contacts';
import Chats from './Chats';
import Settings from './Settings';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authenticated = TabNavigator({
  Contacts: {
    screen: Contacts
  },
  Chats: {
    screen: Chats
  },
  Settings: {
    screen: Settings
  }
}, {
  tabBarOptions: {
    activeTintColor: '#4285f4'
  }
});

const Unauthenticated = StackNavigator({
  SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  },
});

export default class Main extends Component{

  render(){
    const signedIn = true;

    if(signedIn)
      return <Authenticated/>
    else
      return <Unauthenticated/>
  }

}
