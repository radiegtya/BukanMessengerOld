import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Welcome extends Component{

  handleStart(){
    this.props.navigation.navigate('SignIn');
  }

  render(){
    return (
      <View>
        <TouchableOpacity onPress={()=>this.handleStart()}>
          <Text>Start Messaging</Text>
        </TouchableOpacity>
      </View>
    )
  }

}
