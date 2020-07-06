var express = require('express');
const cookiesMiddleware = require('universal-cookie-express');
var path = require('path');
var public = path.join(__dirname, 'build');

// import express from 'express';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
// import App from './App';
// import theme from './theme';

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

// function handleRender(req, res) {
//   const sheets = new ServerStyleSheets();

//   // Render the component to a string.
//   const html = ReactDOMServer.renderToString(
//     sheets.collect(
//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <App />
//       </ThemeProvider>,
//     ),
//   );

//   // Grab the CSS from our sheets.
//   const css = sheets.toString();

//   // Send the rendered page back to the client.
//   res.send(renderFullPage(html, css));
// }

const app = express();

app.use('/build', express.static('build'));
app.use(cookiesMiddleware())

app.get('/', function(req, res) {
    console.log('cookie', req.universalCookies.get('darkTheme'))
    console.log( 'req', req.url);
    if (req.universalCookies.get('darkTheme') === true)  {
        console.log('Sending black' );
        res.sendFile(path.join(public, 'indexBlack.html'));
    } else if (req.universalCookies.get('darkTheme') === undefined ) {
        console.log('Sending black u' );
        res.sendFile(path.join(public, 'indexBlack.html'));    
    } else {
        console.log('Sending white' );
        res.sendFile(path.join(public, 'indexWhite.html'));
    }

});

var options = {
    index: 'index.html'                                             //Fill path here.
    };
app.use('/', express.static('build', options));

// app.use('/', function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });



// This is fired every time the server-side receives a request.
//app.use(handleRender);

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${port}`);
});