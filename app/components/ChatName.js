import React, {Component} from 'react';
import {Text} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class ChatName extends Component{


  render(){
      const {name, user} = this.props;

      let result = null;
      if(name){
        result = <Text>{name}</Text>
      }else if(user){
        result = <Text>{user.profile.firstName + " " + user.profile.lastName}</Text>
      }
      return result;
  }

}

export default createContainer((props) => {
  if(!props.name && props.users){
    const selector = {_id: {$in: props.users, $ne: MO.user()._id}};
    // MO.subscribe('chatNameSub', 'users', selector, ()=>{});

    return {
      user: MO.collection('users', 'chatNameSub').findOne(selector)
    }
  }else{
    return {
      user: null
    }
  }

}, ChatName);
