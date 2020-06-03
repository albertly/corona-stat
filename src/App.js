import React from 'react';
import axios from 'axios';
//import CssBaseline from '@material-ui/core/CssBaseline';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';
import './shared/utils';

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

    return (
        <React.StrictMode>
            {/* <CssBaseline /> */}
            <ContextEventsProvider>
                <Dashboard />
            </ContextEventsProvider>
        </React.StrictMode>
    )
}

export default App;