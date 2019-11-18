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
import dashboardReducer from 'modules/dashboards/reducer';
import browserEventsReducer from 'modules/browserEvents/reducer';
import eventsReducer from 'modules/events/reducer';
import chartsReducer from 'modules/charts/reducer';
import orgEpic from 'modules/org/epic';
import userEpic from 'modules/user/epic';
import socketEpic from 'modules/socket/epic';
import eventEpic from 'modules/events/epic';
import browserEventsEpic from 'modules/browserEvents/epic';
import chartsEpic from 'modules/charts/epic';
import dashboardEpic from 'modules/dashboards/epic';
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
    browserEvents: browserEventsReducer,
    events: eventsReducer,
    charts: chartsReducer,
    dashboards: dashboardReducer,
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
    userEpic,
    browserEventsEpic,
    eventEpic,
    chartsEpic,
    dashboardEpic,
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
