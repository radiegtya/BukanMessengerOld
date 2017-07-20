// react-native-meteor-redux
import initMeteorRedux, {MeteorOffline} from 'react-native-meteor-redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
// end react-native-meteor-redux

const MO = new MeteorOffline({debounce: 1000});
export {MO};
