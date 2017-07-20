import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import RNContacts from 'react-native-contacts';

export default class NewContact extends Component{

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    let validationCondition = params.firstName != "" && params.mobileNumber != "";
    return {
      title: 'New Contact',
      headerRight: (
        <TouchableOpacity onPress={()=>params.handleDone(validationCondition)}>
          <Text style={{color: validationCondition ?'#4285f4':'#d0d0d0', marginRight: 10}}>Done</Text>
        </TouchableOpacity>
      )
    }
  };

  componentWillMount(){
    //params for navigation
    this.props.navigation.setParams({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      handleDone: this.handleDone.bind(this)
    });
  }

  handleDone(validationCondition){
    if(validationCondition){
        const {goBack} = this.props.navigation;
        const {firstName, lastName, mobileNumber} = this.props.navigation.state.params;
        RNContacts.addContact({
          givenName: firstName + " " + lastName,
          phoneNumbers: [
            {
              label: "mobile",
              number: mobileNumber
            }
          ]
        },(err)=>{
          if(!err){
            goBack();
          }
        })
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="First Name" onChangeText={(text) => this.props.navigation.setParams({firstName: text})}/>
            </Item>
            <Item inlineLabel>
              <Input placeholder="Last Name" onChangeText={(text) => this.props.navigation.setParams({lastName: text})}/>
            </Item>
            <Item inlineLabel>
              <Input placeholder="Mobile Number" onChangeText={(text) => this.props.navigation.setParams({mobileNumber: text})}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }

}
