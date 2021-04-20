/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import configureStore from './src/redux/configureStore';

import React from 'react';

const WrappedApp = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => WrappedApp);
