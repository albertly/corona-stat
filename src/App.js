import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';

import   './shared/utils';

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

  // strPad();

    return (
        <>
            <ContextEventsProvider>
           
                    <Dashboard />
 
            </ContextEventsProvider>
        </>
    )
}

export default App;