import React, {Component} from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Meteor, {createContainer} from 'react-native-meteor';
// react-native-meteor-redux
import initMeteorRedux, {MeteorOffline} from 'react-native-meteor-redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
// end react-native-meteor-redux

import Welcome from './Welcome';
import SignIn from './SignIn';
import Contacts from './Contacts';
import Chats from './Chats';
import Settings from './Settings';
import PinVerification from './PinVerification';
import Loading from './Loading';

Meteor.connect('ws://localhost:3000/websocket');

export const MO = new MeteorOffline();


const Main = (props)=>{
  const { status, user, loggingIn } = props;

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
