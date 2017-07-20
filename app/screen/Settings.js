import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Form} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Settings extends Component {

  componentWillMount(){
    const {user} = this.props;

    //set navigation params to be able using method inside this class
    this.props.navigation.setParams({
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      turnOnEdit: false,
      handleDone: this.handleDone.bind(this)
    });
  }

  handleDone(validationCondition){
    if(validationCondition){
      const {user} = this.props;
      const {firstName, lastName} = this.props.navigation.state.params;
      Meteor.collection('users').update(user._id, {
        $set: {
          'profile.firstName': firstName,
          'profile.lastName': lastName
        }
      }, ()=>{
        this.props.navigation.setParams({turnOnEdit: false});
      });
    }
  }

  handleSignOut(){
    Meteor.logout();
  }

  render(){
    const {profile} = this.props.user;
    const {params = {}} = this.props.navigation.state;
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
              {!params.turnOnEdit?
                (
                  <Body>
                    <Text>{name}</Text>
                    <Text note style={{color: "#4285f4"}}>online</Text>
                  </Body>
                ):
                (
                  <Body>
                    <Form>
                      <Item>
                        <Input placeholder="First Name" value={params.firstName} onChangeText={(text) => this.props.navigation.setParams({firstName: text})}/>
                      </Item>
                      <Item>
                        <Input placeholder="Last Name" value={params.lastName} onChangeText={(text) => this.props.navigation.setParams({lastName: text})}/>
                      </Item>
                    </Form>
                  </Body>
                )
              }
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

container.navigationOptions = ({navigation})=> {
    const {params = {}} = navigation.state;
    const validationCondition = params.firstName != "";

    let headerRight = (
      <TouchableOpacity onPress={()=>navigation.setParams({turnOnEdit: true})}>
        <Text style={{color: '#4285f4', marginRight: 10}}>Edit</Text>
      </TouchableOpacity>
    );
    if(params.turnOnEdit){
      headerRight = (
        <TouchableOpacity onPress={()=>params.handleDone(validationCondition)}>
          <Text style={{color: validationCondition?'#4285f4':'#d0d0d0', marginRight: 10}}>Done</Text>
        </TouchableOpacity>
      )
    }

    return {
      title: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="settings" style={{color:tintColor}}/>
      ),
      headerRight: headerRight
    }
};

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
