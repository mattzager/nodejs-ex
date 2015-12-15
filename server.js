//  OpenShift sample Node application
var express = require('express');
var app     = express();

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
res.write('<html><body>');
  res.write('<h1>Hello OpenShift v3!!!</h1>');
  res.write('<form action="/exit" method="get"><input type="submit" value="Healthcheck"></form>');
  res.write('<hr/>');
  var os = require('os');
  var interfaces = os.networkInterfaces();
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if(address.address.slice(0, "10.".length) == "10.") {
          res.write('<br/>Server: ' + address.address);
        }
    }
  }
  res.write('<br/>Timestamp: ' + new Date().toISOString().replace('T', ' ').substr(0, 19));
  res.write('</body></html>');
  res.end();
});

app.get('/exit', function(req, res) {
  process.exit(1);
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
