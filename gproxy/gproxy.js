#!/usr/bin/env node


/* gproxy.js 
*  Simple server that proxies HTTP request to BUTLER gateways.
*  Useful in a web context when using gateways that do not send CORS headers.
*  http://open.iot-butler.eu/?post_type=library&p=51
*/

var port = process.argv[2] || 9000;
var http = require('http');
var fs = require('fs');
var server = http.createServer();


console.log("Starting gProxy...");

var gateways = [];

function build_gateways() {
  // allowed gateways
  gateways = fs.readFileSync('./gateways').toString().split('\n').filter(Boolean);
}

build_gateways();
console.log("Allowed gateways: " + gateways);

server.on('request', function(request, response){
  try{
    console.log(request.method + " request received...");
    response.setHeader("Access-Control-Allow-Origin", "*");

    if (request.method == "OPTIONS") {
      // In case of CORS request, the client will first issue an OPTIONS request to 
      // check allowed headers... Let's make it happy... (headers already set before)
      response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
      response.setHeader("Access-Control-Allow-Credentials", true);
      response.setHeader("Access-Control-Allow-Headers", "accept, content-encoding, x-butler-gateway-host, x-butler-gateway-path, x-butler-gateway-port, authorization", "Content-Type");
      response.setHeader("Access-Control-Allow-Methods", "HEAD, GET, OPTIONS, POST, PUT");
      response.setHeader("Server", "gProxy - BUTLER");
      response.setHeader("Content-Length", 0);
      response.end()
    } else {
      // Acting as a proxy
      gatewayHost = request.headers['x-butler-gateway-host'];
      if (gateways.indexOf(request.headers['x-butler-gateway-host']) > -1) {
        var options = {
            hostname: gatewayHost,
            port: request.headers['x-butler-gateway-port'] || 80,
            path: request.headers['x-butler-gateway-path'],
            headers: {
                "Authorization": request.headers['authorization'],
                "Content-Encoding": request.headers['content-encoding']
            },
            method: request.method,
        };

        var proxy = http.request(options, function (res) {
          res.pipe(response, {
            end: true
          });
        });
        
        request.pipe(proxy, {
          end: true
        });
      } else {
        // non authorized request
        console.log("Non authorized request...");
        response.writeHead(401);
        response.end();
      }
    }
      }
  catch(e){
    console.log("Exception catched: " + e);
    response.writeHead(500);
    response.end();
  }
});

server.listen(port);
console.log('Server running on port ' + port);

