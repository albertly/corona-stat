var express = require('express');
var server = express();
var options = {
  index: 'index.html', //Fill path here.
};

//'/home/site/wwwroot'
server.use('/', express.static('./build', options));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port: ${port}`));
