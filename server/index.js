import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from './scheme';

if (typeof localStorage === 'undefined') {
    global.localStorage = {
        getItem:  () => 'true',
        setItem: () => {}
    };
}

import App from '../src/App';


if (typeof window === 'undefined') {
    global.window = {};
}

const app = express();

app.use(express.static('build', {index: false}));

app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();

  const content = renderToString(
                          sheets.collect(
                                <StaticRouter location={req.path} context={{}}>
                                   <ThemeProvider theme={theme}>
                                     <App />
                                    </ThemeProvider>
                                 </StaticRouter>)
                          );

  const css = sheets.toString();                                 
  console.log('content', content);
  // const html = `
  //   <html>
  //     <head>
  //     <style id="jss-server-side">${css}</style>
  //     </head>
  //     <body>
  //       <div id="root">${content}</div>
  //       <script src="bundle.js"></script>
  //     </body>
  //   </html>
  // `;
  
  const html = `
  <!doctype html>
<html lang="en">
    <head><meta charset="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="COVID-19 pandemic. Live statistics and coronavirus news tracking the number of confirmed cases, recovered patients, and death toll by country due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, news and updates">
        <link rel="apple-touch-icon" href="/logo192.png"/><link rel="manifest" href="/manifest.json"/>
        <title>Corona Global Statistics Live Update (COVID-19 pandemic)</title>
        <style id="jss-server-side">${css}</style>
        <link href="/static/css/main.33fdefa9.chunk.css" rel="stylesheet">
    </head>
    <body><noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${content}</div>
        <script>!function(e){function t(t){for(var n,a,l=t[0],f=t[1],i=t[2],p=0,s=[];p<l.length;p++)a=l[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&s.push(o[a][0]),o[a]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(c&&c(t);s.length;)s.shift()();return u.push.apply(u,i||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,l=1;l<r.length;l++){var f=r[l];0!==o[f]&&(n=!1)}n&&(u.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={1:0},u=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var l=this["webpackJsonpcorona-stat"]=this["webpackJsonpcorona-stat"]||[],f=l.push.bind(l);l.push=t,l=l.slice();for(var i=0;i<l.length;i++)t(l[i]);var c=f;r()}([])</script>
        <script src="/static/js/2.8baf590c.chunk.js"></script>
        <script src="/static/js/main.c3c338ec.chunk.js"></script>
    </body>
</html>
  `;
  res.send(html);
});



app.listen(3008, () => {
  console.log('Listening on prot 3000');
});