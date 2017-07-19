import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, Icon} from 'native-base';

export default class Contacts extends Component {

  static navigationOptions = {
    title: 'Contacts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{color:tintColor}}/>
    ),
  };

  _renderHeader(){
    return (
      <Header>
        <Left/>
        <Body>
          <Title>Contacts</Title>
        </Body>
        <Right/>
      </Header>
    );
  }

  render(){
    return (
      <Container>
        {this._renderHeader()}
        <Content>
          <Text>This is contacts page</Text>
        </Content>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});
