import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';
import ChatName from '../components/ChatName';

class Chats extends Component {

  _renderHeader(){
    const {navigate} = this.props.navigation;
    return (
      <Header>
        <Left/>
        <Body>
          <Text>Chats</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>navigate('NewMessage')}>
            <Icon name="create" style={{color: '#4285f4', marginRight: 10}}/>
          </TouchableOpacity>
        </Right>
      </Header>
    )
  }

  _renderRow(chat, i){
    return (
      <ListItem avatar key={i}>
        <Left>
          <Thumbnail source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        </Left>
        <Body>
          <ChatName name={chat.name} users={chat.users}/>
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

        {this._renderHeader()}

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

const ChatsContainer = createContainer((props) => {
  return {
    chats: MO.collection('chats', 'chatsSub').find({})
  }
}, Chats);

ChatsContainer.navigationOptions = ({navigation})=> ({
  tabBarIcon: ({ tintColor }) => (
    <Icon name="chatbubbles" style={{color:tintColor}}/>
  ),
});

export default ChatsContainer;

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
