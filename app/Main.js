import React, {Component} from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Meteor, {createContainer} from 'react-native-meteor';

import Welcome from './screen/Welcome';
import SignIn from './screen/SignIn';
import PinVerification from './screen/PinVerification';
import Contacts from './screen/Contacts';
import Chats from './screen/Chats';
import Settings from './screen/Settings';
import NewContact from './screen/NewContact';
import Loading from './screen/Loading';

Meteor.connect('ws://localhost:3000/websocket');


const Main = (props)=>{
  const { status, user, loggingIn } = props;

  const AuthenticatedTab = TabNavigator({
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

  const Authenticated = StackNavigator({
    AuthenticatedTab: {
      screen: AuthenticatedTab
    },
    NewContact: {
      screen: NewContact
    }
  });

  const Unauthenticated = StackNavigator({
    Welcome: {
      screen: Welcome
    },
    SignIn: {
      screen: SignIn
    },
    PinVerification: {
      screen: PinVerification
    },
  }, {
    //  headerMode: 'none',
     gesturesEnabled: false
  });


  let initialRouteName = "Unauthenticated";
  if(loggingIn && status.connected){
    initialRouteName = "Loading";
  }else if(user != null){
    initialRouteName = "Authenticated";
  }

  const RootNav = StackNavigator({
    Loading: {
     screen: Loading,
     navigationOptions: {
       gesturesEnabled: false
     }
   },
   Authenticated: {
     screen: Authenticated,
     navigationOptions: {
       gesturesEnabled: false
     }
   },
   Unauthenticated: {
     screen: Unauthenticated,
     navigationOptions: {
       gesturesEnabled: false
     }
   }
  },{
    headerMode: "none",
    mode: "modal", 
    initialRouteName: initialRouteName
  });

  return <RootNav/>;
};

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, Main);
