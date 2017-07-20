import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Chats extends Component {

  _renderRow(chat, i){
    return (
      <ListItem avatar key={i}>
        <Left>
          <Thumbnail source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        </Left>
        <Body>
          <Text>Kumar Pratik</Text>
          <Text note>{chat.lastMessage.message}</Text>
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

        {/* === Content Start === */}
        <Content>
          {/* Search Bar */}
          <Item rounded style={styles.searchBar}>
            <Icon name="search" style={styles.searchText} />
            <Input placeholder="Search for messages or users" style={styles.searchText} />
          </Item>
          {/* Search Bar End */}

          {/* List */}
          <List>
            {this.props.chats.map((chat,i) => this._renderRow(chat, i))}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const container = createContainer((props) => {
  // const user = MO.user();
  //get all chats, that current loggedIn user is on users array
  // const selector = {users: {$in: [Meteor.userId()]}};
  const selector = {};

  // MO.subscribe('chatsSub', 'chats', selector, ()=>{});
  // Meteor.subscribe('chats', {}, ()=>{});

  return {
    chats: MO.collection('chats', 'chatsSub').find(selector)
    // chats: Meteor.collection('chats').find(selector)
  }
}, Chats);

container.navigationOptions = ({navigation})=> ({
  title: 'Chats',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="chatbubbles" style={{color:tintColor}}/>
  ),
  headerRight: (
    <TouchableOpacity onPress={()=>navigation.navigate('New Message')}>
      <Icon name="create" style={{color: '#4285f4', marginRight: 10}}/>
    </TouchableOpacity>
  )
});

export default container;

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
