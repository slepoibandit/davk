var http = require('http');

var server = http.createServer(function(request, response){
  var header = request.header;
  var method = request.method;
  var url = request.url;
  var body = [];

  request.on('error', function(error){
    console.error(error);
  });
  http.get('http://backend.deviantart.com/oembed?url=http%3A%2F%2Ffav.me%2Fd2enxz7', function(res){
    var returnedDeviant = '';
    res.on('data', function(chunk){
      returnedDeviant += chunk;
    });
    res.on('end', function(){
      var returnedDeviantConverted = JSON.parse(returnedDeviant);
      response.writeHead(302, {
        'Location': returnedDeviantConverted.url
      });
      response.end();
    });
  }).on('error', function(err){
    response.end(err.toString());
  });
});

server.listen(8080);
