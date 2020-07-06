import React from 'react';
import axios from 'axios';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';
import './shared/utils';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

  return (
    <ContextEventsProvider>
      <Dashboard />
    </ContextEventsProvider>
  );
}

export default App;
