//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');

app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/hello', function(req, res) {
  res.write('<html><body>');
  res.write('<h1><font color="blue">Hello World!</font></h1>');
  res.write('<hr/>');
  var os = require('os');
  var interfaces = os.networkInterfaces();
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if(address.address.slice(0, "10.".length) == "10.") {
          res.write('<p/>Server: ' + address.address);
        }
    }
  }
  
  res.write('<p/>Timestamp: ' + new Date().toISOString().replace('T', ' ').substr(0, 19));
  res.write('</body></html>');
  res.end();
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
