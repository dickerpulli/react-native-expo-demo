import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';
import auth from './authReducer';

const rootReducer = combineReducers({
	network,
	auth
});
export default rootReducer;
