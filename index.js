var express = require('express');
var server = express();
var options = {
index: 'index.html'                                             //Fill path here.
};
server.use('/', express.static('/home/site/wwwroot', options));
server.listen(process.env.PORT);