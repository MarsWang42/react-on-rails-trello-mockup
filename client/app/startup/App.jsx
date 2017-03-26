import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CombinedReducer from '../reducers/combinedReducer';
import App from '../containers/AppContainer';
import BoardList from '../containers/BoardListContainer';
import BoardDetail from '../containers/BoardDetailContainer';

const configureStore = railsProps => (
  createStore(CombinedReducer, railsProps, applyMiddleware(thunk))
);

const onChangeRoute = (previousRoute, nextRoute) => {
  const pathRegex = /^board/;
  if (nextRoute.location.pathname.match(pathRegex)) {
    document.body.className += "red-gradient-background";
  } else document.body.className = "";
};

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
const WrappedApp = (props, _railsContext) => {
  const store = configureStore(props);
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} onChange={onChangeRoute}>
          <IndexRoute component={BoardList} />
          <Route path="board/:id" component={BoardDetail} />
        </Route>
      </Router>
    </Provider>
  );
};

export default WrappedApp;
