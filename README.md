## Back-End
https://github.com/albertly/corona-stat-srv

## Screens
Web Page in Chrome
![Web Page](https://raw.githubusercontent.com/albertly/corona-stat/master/doc/images/browser.jpg)

Desktop Application (Windows 10)
![Desktop](https://raw.githubusercontent.com/albertly/corona-stat/master/doc/images/desktop.jpg)

Android App.
![Android](https://raw.githubusercontent.com/albertly/corona-stat/master/doc/images/android.jpg)

Stat. by country
![Android](https://raw.githubusercontent.com/albertly/corona-stat/master/doc/images/ByCountry.jpg)

## Resources

https://github.com/mars/create-react-app-buildpack

Add remote to git
https://help.github.com/en/github/using-git/adding-a-remote


PWA Reference:
https://developers.google.com/web/progressive-web-apps/desktop

How to make PWAs installable
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs
https://www.twilio.com/blog/2018/06/installable-web-apps-practical-introduction-progressive-web-apps.html
https://create-react-app.dev/docs/making-a-progressive-web-app/


useInterval
https://overreacted.io/making-setinterval-declarative-with-react-hooks/

Material-UI
Make table smaller
https://codesandbox.io/s/solitary-platform-zoiob?fontsize=14

Make font smaller 
https://codesandbox.io/s/l48vjmk3om


How to fetch data with React Hooks?
https://www.robinwieruch.de/react-hooks-fetch-data
https://codesandbox.io/s/jvvkoo8pq3

How to query documents in MongoDB that fall within a specified date range using Mongoose and Node.
https://dev.to/itz_giddy/how-to-query-documents-in-mongodb-that-fall-within-a-specified-date-range-using-mongoose-and-node-524a
https://stackoverflow.com/questions/40332455/mongoose-query-by-date/40332542


Auto-generating Swagger Documentation for your Node API
https://medium.com/@dlowkeen/auto-generating-swagger-documentation-for-your-node-api-c806cedbdd3e
Can Swagger autogenerate its yaml based on existing express routes?
https://stackoverflow.com/questions/31300756/can-swagger-autogenerate-its-yaml-based-on-existing-express-routes


REST Services for Typescript
https://github.com/thiagobustamante/typescript-rest
https://github.com/vrudikov/typescript-rest-boilerplate



VS Code - Debugger for Chrome
https://github.com/microsoft/vscode-chrome-debug/blob/master/README.md


WebSockets tutorial: How to go real-time with Node and React
https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

Using WebSockets in React
https://dev.to/finallynero/using-websockets-in-react-4fkp

React with WebSockets
https://dev.to/sama/react-with-websockets-254e


Node.js & WebSocket — Simple chat tutorial
https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

A Simple Chat App With React, Node and WebSocket  !!!!!!!!!!!!!!!!
https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

Socket.IO, React and Node.js: Going Real-Time with WebSockets
https://www.valentinog.com/blog/socket-react/

Building a Node.js WebSocket Chat App with Socket.io and React
broadcast !!!
https://itnext.io/building-a-node-js-websocket-chat-app-with-socket-io-and-react-473a0686d1e1

WebSocket and React
https://dev.to/sirwanafifi/websocket-and-react-58an

https://github.com/websockets/ws

https://socket.io/
https://github.com/socketio/socket.io-client

Websocket client implementation for auto reconnect
https://github.com/websockets/ws/wiki/Websocket-client-implementation-for-auto-reconnect

reconnecting-websocket
https://www.npmjs.com/package/reconnecting-websocket

https://www.npmjs.com/package/ws-reconnect
https://github.com/joewalnes/reconnecting-websocket

//////////////
axios-cache-adapter
https://www.npmjs.com/package/axios-cache-adapter

Node-Cache Example
https://amitd.co/blog/node-cache-example

How to Optimize Node Requests with Simple Caching Strategies
https://scotch.io/tutorials/how-to-optimize-node-requests-with-simple-caching-strategies

https://www.npmjs.com/package/node-cache

Caching like a boss in NodeJS
https://medium.com/@danielsternlicht/caching-like-a-boss-in-nodejs-9bccbbc71b9b


Deploy to Azure
https://stackoverflow.com/questions/60879027/failed-to-deploy-react-app-build-folder-to-app-service-azure/62049253#62049253


// ESLint, Prettier
How to configure Prettier and VSCode
https://glebbahmutov.com/blog/configure-prettier-in-vscode/

Extend “Create React App” with AirBnB’s ESLint config, Prettier, Flow and React Testing Library.
https://medium.com/@pppped/extend-create-react-app-with-airbnbs-eslint-config-prettier-flow-and-react-testing-library-96627e9a9672



## Push Notificatin
Addition to sw.js (should be automatically)
self.addEventListener('push', function (evt) {
  console.log('Push Message Received');
  var options = {
    body: 'See What New',
    data: {
      timestamp: Date.now(),
      loc: 'index.html#info',
    },
    action: [{ action: 'go', title: 'Go Now' }],
  };
  evt.waitUntil(self.registration.showNotification('Corona Stat', options));
});
