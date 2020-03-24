import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import Dashboard from './dashboard/Dashboard';
import { ContextEventsProvider } from './shared/context';


function App() {
    axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;
    console.log("REACT_APP_SOURCE_URL", process.env.REACT_APP_SOURCE_URL);
    return (
        <>
            <ContextEventsProvider>
                <Dashboard/>
            </ContextEventsProvider>
        </>
    )
}

export default App;