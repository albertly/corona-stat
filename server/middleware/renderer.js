import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable';
//import { Provider as ReduxProvider } from 'react-redux'
import { ContextEventsProvider } from '../../src/shared/context';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from './scheme';
// import our main App component
import App from '../../src/App';

// import the manifest generated with the create-react-app build
import manifest from '../../build/asset-manifest.json';
// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);


const path = require("path");
const fs = require("fs");


export default (store) => (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const modules = [];
        const routerContext = {};
        const sheets = new ServerStyleSheets();

        // render the app as a string
        const html = ReactDOMServer.renderToString(
            sheets.collect(
             <Loadable.Capture report={m => modules.push(m)}>
                  <ContextEventsProvider> 
                     {/* <StaticRouter location={req.baseUrl} context={routerContext}>  */}
                        <App/>
                    {/* </StaticRouter>  */}
                 </ContextEventsProvider> 
             </Loadable.Capture>
            )
        );

        const css = sheets.toString();  
        // get the stringified state

        // map required assets to script tags
        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        // get HTML headers
        const helmet = Helmet.renderStatic();

        // now inject the rendered app into our html and send it to the client
        return res.send(
            htmlData
                // write the React app
                .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                // append the extra js assets
                .replace('</body>', extraChunks.join('') + '</body>')
                // write the HTML header tags
                .replace('<title>Corona Global Statistics Live Update (COVID-19 pandemic)</title>', helmet.title.toString() + helmet.meta.toString() + `<style id="jss-server-side">${css}</style>`)
        );
    });
}
