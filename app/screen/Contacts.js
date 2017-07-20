import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Button} from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor, {connectMeteor} from 'react-native-meteor';
import {MO} from '../MO';

@connectMeteor
export default class Contacts extends Component {

  static navigationOptions = ({navigation})=> ({
    title: 'Contacts',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{color:tintColor}}/>
    ),
    headerRight: (
      <TouchableOpacity onPress={()=>navigation.navigate('NewContact')}>
        <Icon name="add" style={{color: '#4285f4', marginRight: 10}}/>
      </TouchableOpacity>
    )
  });

  constructor(){
    super();
    this.state= {
      search: ""
    };
  }

  getMeteorData(){
    const self = this;
    console.log(MO.user().username)
    RNContacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // x.x
      } else {
        let phoneNumbers = [];
        contacts.forEach((contact)=>{
          contact.phoneNumbers.forEach((phone)=>{
            if(phone.number){
              const formatedPhoneNumber = "+62" + phone.number.replace(new RegExp(/[-\/\\^$*+?.()|[\]{}]/g, 'g'), '').replace(/\s/g,'');
              phoneNumbers.push(formatedPhoneNumber);
            }
          });
        });
        phoneNumbers = [...new Set(phoneNumbers)];

        //first param is unique subName (client), second is real subscription name, third is query, then fourth is callback
        MO.subscribe('contactsSub', 'users', {username: {$in: phoneNumbers}}, ()=>{});
      }
    });

    return {
      //first param is collectionName, second is unique subscription name (client)
      contacts: MO.collection('users', 'contactsSub').find({
        $and: [
            {username: {$ne: MO.user().username}},
            {'profile.firstName': {$regex: this.state.search, $options: 'i'}}
        ]
      }),
    }
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


        {/* === Content Start === */}
        <Content>
          {/* Search Bar */}
          <Item rounded style={styles.searchBar}>
            <Icon name="search" style={styles.searchText} />
            <Input placeholder="Search for contacts" style={styles.searchText} onChangeText={(text) => this.setState({search: text})}/>
          </Item>
          {/* Search Bar End */}

          {/* List */}
          <List>
            {this.data.contacts.map((contact,i) => this._renderRow(contact, i))}
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
