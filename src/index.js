import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const AppBundle = (

  <React.StrictMode>
    <CssBaseline />
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);


ReactDOM.hydrate(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// window.onload = () => {
//  // Loadable.preloadReady().then(() => {
//     ReactDOM.hydrate(
//       AppBundle,
//       document.getElementById('root')
//     );
// //  });
// };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
