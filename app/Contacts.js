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
          {/* Search Bar */}
          <Item rounded style={styles.searchBar}>
            <Icon name="search" style={styles.searchText} />
            <Input placeholder="Search for contacts" style={styles.searchText} />
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
  searchText: {
    fontSize: 14,
  }
}
