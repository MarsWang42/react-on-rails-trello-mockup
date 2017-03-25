import { combineReducers } from 'redux';
import UserReducer from './userReducer'

const CombinedReducer = combineReducers({
  user: UserReducer,
});

export default CombinedReducer;
