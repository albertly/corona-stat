import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';
import   './shared/utils';

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

    return (
        <ContextEventsProvider>           
            <BrowserRouter><Dashboard /></BrowserRouter>
        </ContextEventsProvider>
    )
}

export default App;