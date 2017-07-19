import React, {Component} from 'react';
import {} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';

export default class Chats extends Component {

  static navigationOptions = {
    title: 'Chats',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="chatbubbles" style={{color:tintColor}}/>
    ),
  };

  _renderHeader(){
    return (
      <Header>
        <Left/>
        <Body>
          <Title>Chats</Title>
        </Body>
        <Right/>
      </Header>
    );
  }

  _renderRow(){
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        </Left>
        <Body>
          <Text>Kumar Pratik</Text>
          <Text note>Doing what you like...</Text>
        </Body>
        <Right>
          <Text note>3:43 pm</Text>
        </Right>
      </ListItem>
    )
  }

  render(){
    return (
      <Container>

        {this._renderHeader()}

        {/* === Content Start === */}
        <Content>
          {/* Search Bar */}
          <Item rounded style={styles.searchBar}>
            <Icon name="search" style={{fontSize: 14}} />
            <Input placeholder="Search for messages or users" style={{fontSize: 14}} />
          </Item>
          {/* Search Bar End */}

          {/* List */}
          <List>
            {this._renderRow()}
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
