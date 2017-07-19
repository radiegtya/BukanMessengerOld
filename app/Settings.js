import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, Icon} from 'native-base';

export default class Settings extends Component {

  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="settings" style={{color:tintColor}}/>
    ),
  };

  _renderHeader(){
    return (
      <Header>
        <Left/>
        <Body>
          <Title>Settings</Title>
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
          <Text>This is Settings page</Text>
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