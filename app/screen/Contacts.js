import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Button} from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Contacts extends Component {

  componentWillMount(){
    this.props.navigation.setParams({
      search: ""
    });
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

const container = createContainer((props) => {
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

  const {params={}} = props.navigation.state;

  return {
    //first param is collectionName, second is unique subscription name (client)
    contacts: MO.collection('users', 'contactsSub').find({
      $and: [
          {username: {$ne: MO.user().username}},
          {'profile.firstName': {$regex: params.search, $options: 'i'}}
      ]
    }),
  }
}, Contacts);

container.navigationOptions = ({navigation})=> ({
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
