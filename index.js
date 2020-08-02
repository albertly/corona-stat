const compression = require('compression');
const express = require('express');
const server = express();
const options = {
  index: 'index.html', //Fill path here.
};

server.use(compression());
//'/home/site/wwwroot'
server.use('/', express.static('./build', options));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port: ${port}`));
