import React, {Component} from 'react';
import {} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';

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

        {/* === Content Start === */}
        <Content>
          <Item rounded style={nbStyles.searchBar}>
            <Icon name="search" style={{fontSize: 14}} />
            <Input placeholder="Search for contacts" style={{fontSize: 14}} />
          </Item>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
              </Body>
              <Right/>
            </ListItem>
          </List>
        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

//NativeBase styling basic obj
const nbStyles = {
  searchBar: {
    backgroundColor: '#ededed',
    marginLeft: 10,
    margin: 10,
    height: 25
  },
}
