var express = require("express")
 , url = require("url")
 , swagger = require("swagger-node-express")
 , mongoose = require("mongoose")
 , bodyParser = require('body-parser');
 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Connect to database connection
mongoose.connect('mongodb://localhost:27017/swagger_test');
 
swagger.setAppHandler(app);
swagger.configureSwaggerPaths("", "/api-docs", "");

require('./routes') (swagger);

swagger.configure("http://localhost:3000", "0.1");

var docs_handler = express.static(__dirname + '/node_modules/swagger-node-express/swagger-ui/');

app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

app.listen(3000, function(){
  console.log("Express server is listening on port 3000");
});
