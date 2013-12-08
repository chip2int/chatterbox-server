/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */


exports.storage = {
  messages: [],

  storeData: function (chatMsg) {
    this.messages.push(chatMsg);
  },

  getData: function () {
    return this.messages;
  }
};



exports.handleRequest = function(request, response) {

  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as    URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  var statusCode = 200;
  console.log("Serving request type " + request.method + " for url " + request.url);

  request.setEncoding('utf8');

  /*
  var methods = {
    'POST': function() {
      request.on('data', function(chatMsg) {
        var temp = JSON.parse(chatMsg);
        temp['createdAt'] = new Date();
        temp = JSON.stringify(temp);
        exports.storage.storeData(temp);
        statusCode = 201;
      }

    }
  }

  methods[request.method]();
  */

  if (request.method === 'POST') {
      request.on('data', function(chatMsg) {
        var temp = JSON.parse(chatMsg);
        temp['createdAt'] = new Date();
        temp = JSON.stringify(temp);
        exports.storage.storeData(temp);
        statusCode = 201;
    });
  }


  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  response.writeHead(statusCode, headers);


  response.end('[' + exports.storage.getData() + ']');


};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};









