import React from 'react';
import axios from 'axios';
import { StaticRouter } from 'react-router-dom';

import Dashboard from '../../src/dashboard/Dashboard';
import { ContextEventsProvider } from '../../src/shared/context';
import   '../../src/shared/utils';

function App(props) {
    axios.defaults.baseURL = process.env.REACT_APP_SOURCE_URL;

    return (
        <ContextEventsProvider>           
            <StaticRouter location={props.location} context={props.context}><Dashboard /></StaticRouter>
        </ContextEventsProvider>
    )
}

export default App;