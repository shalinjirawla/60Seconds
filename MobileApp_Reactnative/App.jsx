import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store'
import * as Sentry from 'sentry-expo';
import { SENTRY_DSN } from './src/config/Settings';

export default App = () => {

  useEffect(() => {
    try {
      // initialize sentry
      initializeSentry();
    } catch (error) {
      console.log('err', error)
    }
  }, []);

  const initializeSentry = () => {
    Sentry.init({
      dsn: SENTRY_DSN,
      enableInExpoDevelopment: false,
      debug: true,
    });
  }

  return (
    // <TaskProvider>
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
    </Provider>
    // </TaskProvider>

  );
}
