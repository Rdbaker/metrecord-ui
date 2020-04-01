import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Sentry from '@sentry/browser';
import 'react-dates/initialize';

import authReducer from 'modules/auth/reducer';
import orgReducer from 'modules/org/reducer';
import userReducer from 'modules/user/reducer';
import endUsersReducer from 'modules/endUsers/reducer';
import authEpic from 'modules/auth/epic';
import orgEpic from 'modules/org/epic';
import socketEpic from 'modules/socket/epic';
import { DEBUG } from 'constants/resources';

import './index.css';
import App from './App';


const epicMiddleware = createEpicMiddleware();
const mountSentry = () => {
  if (!DEBUG) {
    Sentry.init({ dsn: 'https://f5235bb71f91446ab6bf9dcbb23c9e4d@sentry.io/1782756' });
  }
};
setTimeout(mountSentry, 0);
const compose = composeWithDevTools({ trace: true, traceLimit: 25 });

const loggingMiddleware = () => next => action => {
  if (DEBUG) {
    console.info('[Metrecord] applying action', action);
  }
  next(action);
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    org: orgReducer,
    user: userReducer,
    endUsers: endUsersReducer,
  }),
  compose(
    applyMiddleware(epicMiddleware),
    applyMiddleware(loggingMiddleware),
  ),
);

epicMiddleware.run(
  combineEpics(
    orgEpic,
    socketEpic,
    authEpic,
  )
)


if (DEBUG) {
  window.store = store;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
