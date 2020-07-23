var express = require('express');
var server = express();
var options = {
  index: 'index.html', //Fill path here.
};
//'/home/site/wwwroot'
server.use('/', express.static('./build', options));
server.listen(process.env.PORT || 3000);
