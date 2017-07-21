import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Button} from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Contacts extends Component {

  _renderHeader(){
    const {navigate} = this.props.navigation;
    return (
      <Header>
        <Left/>
        <Body>
          <Text>Contacts</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>navigate('NewContact')}>
            <Icon name="add" style={{color: '#4285f4', marginRight: 10}}/>
          </TouchableOpacity>
        </Right>
      </Header>
    )
  }

  _renderRow(contact, i){
    const {profile} = contact;
    const name = profile.firstName + " " + profile.lastName;

    return (
      <ListItem avatar key={i}>
        <Left>
          <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        </Left>
        <Body>
          <Text>{name}</Text>
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
            <Input placeholder="Search for contacts" style={styles.searchText} onChangeText={(text) => this.props.navigation.setParams({search: text})}/>
          </Item>
          {/* Search Bar End */}

          {/* List */}
          <List>
            {this.props.contacts.map((contact,i) => this._renderRow(contact, i))}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const ContactsContainer = createContainer((props) => {
  RNContacts.getAll((err, contacts) => {
    if(err === 'denied'){
      // x.x
    } else {
      let phoneNumbers = [];
      contacts.forEach((contact)=>{
        contact.phoneNumbers.forEach((phone)=>{
          if(phone.number){
            const formatedPhoneNumber = "+" + phone.number.replace(new RegExp(/[-\/\\^$*+?.()|[\]{}]/g, 'g'), '').replace(/\s/g,'');
            phoneNumbers.push(formatedPhoneNumber);
          }
        });
      });
      phoneNumbers = [...new Set(phoneNumbers)];

      //first param is unique subName (client), second is real subscription name, third is query, then fourth is callback
      MO.subscribe('contactsSub', 'users', {username: {$in: phoneNumbers}}, ()=>{});
    }
  });

  const user = MO.user();
  //get all chats, that current loggedIn user is on users array
  MO.subscribe('chatsSub', 'chats', {users: {$in: [user._id]}}, ()=>{});

  return {
    //first param is collectionName, second is unique subscription name (client)
    contacts: MO.collection('users', 'contactsSub').find({
      $and: [
          {username: {$ne: MO.user().username}},
          {'profile.firstName': {$regex: props.search, $options: 'i'}}
      ]
    }),
  }
}, Contacts);


export default class ContactsStateHolder extends Component {

  constructor(){
    super();
    this.state = {
      search: ""
    };
  }

  static navigationOptions = ({navigation})=> ({
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{color:tintColor}}/>
    ),
  });

  render(){
    const {search} = this.state;

    return (
      <ContactsContainer
        search={search}
        {...this.props}
      />
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
