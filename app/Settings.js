import React, {Component} from 'react';
import {} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';

export default class Settings extends Component {

  static navigationOptions = {
    title: 'Settings',
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

  _renderRow(){
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        </Left>
        <Body>
          <Text>Kumar Pratik</Text>
        </Body>
        <Right/>
      </ListItem>
    )
  }

  render(){
    return (
      <Container>

        {this._renderHeader()}

        {/* === Content Start === */}
        <Content>
          {/* Profile */}
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note style={{color: "#4285f4"}}>online</Text>
              </Body>
              <Right/>
            </ListItem>
            <ListItem>
              <Text style={{color: '#4285f4'}}>Set Profile Picture</Text>
            </ListItem>
          </List>
          {/* Profile */}

          <ListItem itemDivider/>

          {/* List */}
          <List>
            <ListItem>
              <Left>
                <Text>BukanChat FAQ</Text>
              </Left>
              <Body/>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Contact us</Text>
              </Left>
              <Body/>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

//NativeBase styling basic obj
const styles = {
  searchBar: {
    backgroundColor: '#ededed',
    marginLeft: 10,
    margin: 10,
    height: 25
  },
}
