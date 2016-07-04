var https = require('https');
var fs = require('fs');
var url = require('url');

var access_token = '';

function generateOptionsObjectFor(path){
  var options = url.parse('https://www.deviantart.com/' + path);
  options.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
    };
  return options;
}

function readTokenFromFile(filename){
  fs.readFile(filename, 'utf8', function(err, data){
    if(err){
      throw err;
    }
    return data;
  });
}

function writeTokenToFile(token){
  fs.writeFile('access_token.txt', token, function (err){
    if(err){
      throw err;
    }
    return token;
  });
}

function isValid(token){
  var options = generateOptionsObjectFor('api/v1/oauth2/placebo?access_token=' + token);
  https.get(options, function(res){
    var data = '';
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      var responseObject = JSON.parse(data);
      if(responseObject.status == 'success'){
        console.log('Access token is valid.');
        return true;
      }
      else if (responseObject.error) {
        console.log(responseObject.error_description);
        return false;
      }
      else{
        console.log('Response is not successful');
        return false;
      }
    });
  }).on('error', function(err){
    console.log('Error checking token: ' + err);
  });
}

function obtainNewToken(client_id, client_secret){
  var options = generateOptionsObjectFor('oauth2/token?' + 'client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=client_credentials');
  https.get(options, function(res){
    var data = '';
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      var responseObject = JSON.parse(data);
      if(responseObject.status == 'success'){
        access_token = responseObject.access_token;
        console.log(access_token);
        return access_token;
      }
      else if (responseObject.error) {
        console.log(responseObject.error_description);
      }
    });
  }).on('error', function(err){
    console.log('Error obtaining new token: ' + err);
  });
}

function initialize(client_id, client_secret){

}

isValid('57d4e9dd4661a759e5fbda9603b82ecb7126533ea5bf6f9a2d');
// obtainNewToken(4787, '36b25fc8db5d33504ef10e241679d6e0');
