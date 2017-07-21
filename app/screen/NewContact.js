import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Left, Body, Right } from 'native-base';
import RNContacts from 'react-native-contacts';

export default class NewContact extends Component{

  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      mobileNumber: "",
    };
  }

  _renderHeader(){
    const {firstName, lastName, mobileNumber} = this.state;
    const validationCondition = firstName != "" && mobileNumber != "";
    return (
      <Header>
        <Left/>
        <Body>
          <Text>Contacts</Text>
        </Body>
        <Right>
        <TouchableOpacity onPress={()=>this.handleDone(validationCondition)}>
          <Text style={{color: validationCondition ?'#4285f4':'#d0d0d0', marginRight: 10}}>Done</Text>
        </TouchableOpacity>
        </Right>
      </Header>
    )
  }

  handleDone(validationCondition){
    const {firstName, lastName, mobileNumber} = this.state;
    if(validationCondition){
        const {goBack} = this.props.navigation;
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
          {this._renderHeader()}

          <Form>
            <Item>
              <Input placeholder="First Name" onChangeText={(text) => this.setState({firstName: text})}/>
            </Item>
            <Item inlineLabel>
              <Input placeholder="Last Name" onChangeText={(text) => this.setState({lastName: text})}/>
            </Item>
            <Item inlineLabel>
              <Input placeholder="Mobile Number" onChangeText={(text) => this.setState({mobileNumber: text})}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }

}
