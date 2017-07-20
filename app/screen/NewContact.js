import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class NewContact extends Component{

  static navigationOptions = {
    title: 'New Contact',
  };

  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      mobileNumber: ""
    };
  }

  render(){
    return (
      <Container>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>First Name</Label>
              <Input onChangeText={(text) => this.setState({firstName: text})}/>
            </Item>
            <Item inlineLabel>
              <Label>Last Name</Label>
              <Input onChangeText={(text) => this.setState({lastName: text})}/>
            </Item>
            <Item inlineLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={(text) => this.setState({mobileNumber: text})}/>
            </Item>
          </Form>
          <Button block style={{marginTop: 20}}>
            <Text>Done</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}
