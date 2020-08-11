import React from 'react';
import axios from 'axios';
import { AuthProvider } from 'oidc-react';
import { WebStorageStateStore } from 'oidc-client';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';

import './shared/utils';
import { subscribeToPush } from './shared/PushNotification';

const oidcConfig = {
  onSignIn: async user => {
    window.history.replaceState(null, null, window.location.origin);

    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      subscribeToPush();
    }
  },
  authority: process.env.REACT_APP_STS_AUTHORITY,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: `${window.location.origin}`,
  silent_redirect_uri: `${window.location.href}silent-renew.html`,
  // tslint:disable-next-line:object-literal-sort-keys
  post_logout_redirect_uri: `${window.location.href}`,
  responseType: 'code',
  scope: `${process.env.REACT_APP_CLIENT_SCOPE}`,
  //userStore: new WebStorageStateStore({ store: window.localStorage }),
  autoSignIn: false,
};

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

  return (
    <ContextEventsProvider>
      <AuthProvider {...oidcConfig}>
        <Dashboard />
      </AuthProvider>
    </ContextEventsProvider>
  );
}

export default App;
