var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');



function getDataFrom(path){
  https.get(options, function(response){
    var data = '';
    response.on('data', function(chunk){
      data += chunk;
    });
    response.on('end', function(){
      return data;
    });
  }).on('error', function(error){
    console.error('Error updating token: ' + error);
  });
}

// deviantArt.access_token = JSON.parse(data).access_token;
// fs.writeFile('access_token.txt', deviantArt.access_token, function(error){
//   if(error){
//     throw error;
//   }
//   console.log('Access token saved to access_token.txt');
// });

var deviantArt = {
  access_token: '',
  client_id: 4787,
  client_secret: '36b25fc8db5d33504ef10e241679d6e0',
  readToken: function(){
    fs.readFile('access_token.txt', 'utf8', function(error, data){
      if(error){
        throw error;
      }
      deviantArt.access_token = data;
      console.log('Read token from access_token.txt successfully');
    });
  },
  checkToken: function(){
    deviantArt.urlObject.pathname = '/oauth2/placebo';
    deviantArt.urlObject.query = '';
    https.get();
  },
  updateToken: function (){
    deviantArt.urlObject.pathname = '/oauth2/token';
    deviantArt.urlObject.query = {
      client_id: deviantArt.client_id,
      client_secret: deviantArt.client_secret,
      grant_type: 'client_credentials'
    };
    var options = {
      path: url.parse(url.format(deviantArt.urlObject)).path
    };
  },
  getDailyDeviationsObject: function(){
    urlObject.pathname = '/api/v1/oauth2/browse/dailydeviations';
  }
};



var server = http.createServer(function(req, res){
  res.end(deviantArt.access_token);
});

server.listen(8080);
