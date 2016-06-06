var http = require('http');
var https = require('https');
var url = require('url');
var headers = {
  'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
};

var deviantArt = {
  access_token: '',
  client_id: 4787,
  client_secret: '36b25fc8db5d33504ef10e241679d6e0',
  urlObject: {
    protocol: 'https:',
    hostname: 'www.deviantart.com'
  },
  updateToken: function (){
    deviantArt.urlObject.pathname = '/oauth2/token';
    deviantArt.urlObject.query = {
      client_id: deviantArt.client_id,
      client_secret: deviantArt.client_secret,
      grant_type: 'client_credentials'
    };
    var options = {
      protocol: deviantArt.urlObject.protocol,
      hostname: deviantArt.urlObject.hostname,
      path: url.parse(url.format(deviantArt.urlObject)).path,
      headers: headers
    };
    https.get(options, function(response){
      var data = '';
      response.on('data', function(chunk){
        data += chunk;
      });
      response.on('end', function(){
        deviantArt.access_token = data;
        console.log(data);
      });
    }).on('error', function(error){
      console.error('Error updating token: ' + error);
    });
  },
  getDailyDeviationsObject: function(){
    urlObject.pathname = '/api/v1/oauth2/browse/dailydeviations';
  }
};

deviantArt.updateToken();

var server = http.createServer(function(req, res){
  res.end(deviantArt.access_token);
});

server.listen(8080);
