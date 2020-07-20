import React from 'react';
import axios from 'axios';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';
import { ContextAuthProvider } from './shared/contextAuth';

import './shared/utils';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

  return (
    <ContextEventsProvider>
      <ContextAuthProvider>
        <Dashboard />
      </ContextAuthProvider>
    </ContextEventsProvider>
  );
}

export default App;
