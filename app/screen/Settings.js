import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Settings extends Component {

  handleSignOut(){
    Meteor.logout();
  }

  render(){
    const {profile} = this.props.user;
    const name = profile.firstName + " " + profile.lastName;

    return (
      <Container>

        {/* === Content Start === */}
        <Content>
          {/* Profile */}
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
              </Left>
              <Body>
                <Text>{name}</Text>
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

            {/* FAQ */}
            <ListItem>
              <Left>
                <Text>BukanChat FAQ</Text>
              </Left>
              <Body/>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
            {/* FAQ End */}

            {/* Contact us */}
            <ListItem>
              <Left>
                <Text>Contact us</Text>
              </Left>
              <Body/>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
            {/* Contacts us End */}

          </List>
          {/* List End */}

          <ListItem itemDivider/>

          {/* List */}
          <List>
            {/* Sign out */}
            <ListItem>
              <Left>
                <TouchableOpacity onPress={()=>this.handleSignOut()}>
                  <Text style={{color: '#E20000'}}>Sign out</Text>
                </TouchableOpacity>
              </Left>
              <Body/>
              <Right/>
            </ListItem>
            {/* Sign out End */}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const container = createContainer((props) => {
  return {
    user: MO.user(),
  };
}, Settings);

container.navigationOptions = ({navigation})=> ({
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="settings" style={{color:tintColor}}/>
    ),
    headerRight: (
      <TouchableOpacity onPress={()=>{}}>
        <Text style={{color: '#4285f4', marginRight: 10}}>Edit</Text>
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
}
