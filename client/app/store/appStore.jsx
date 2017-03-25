import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CombinedReducer from '../reducers/combinedReducer';

const configureStore = (railsProps) => (
  createStore(CombinedReducer, railsProps, applyMiddleware(thunk))
);

export default configureStore;
