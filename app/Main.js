import {TabNavigator} from 'react-navigation';
import Contacts from './Contacts';
import Chats from './Chats';
import Settings from './Settings';

const Main = TabNavigator({
  Contacts: {
    screen: Contacts
  },
  Chats: {
    screen: Chats
  },
  Settings: {
    screen: Settings
  }
}, {
  tabBarOptions: {
    activeTintColor: '#4285f4'
  }
});

export default Main;
