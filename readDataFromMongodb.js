var cheerio = require('cheerio');
var request = require('request');
var express = require('express');

var app = express();
function generateView(data) {
	var arr=[];
    
    var ret = '<html><title>API DATA IN NODEJS</title><style>table, th, td {border: 1px solid black;}</style><table><th><tr><td>LIKES</td> <td>TITLE</td> <td>URL</td></tr></th>';
     for (var i = 0; i < data.length; i++) {
		 ret += '<tr><td>' +data[i].likes + '</td><td>' + data[i].title + '</td><td>' + data[i].url + '</td></tr>';
     }
   return ret + '</table></html>';
}

function getData(response, html) {
    var res = {};
    var result=[];
    
    var a=JSON.parse(response.body);
        
    a.forEach(function(entry) {
        
    res = {
            'likes':entry['likes'],
            'title': entry['title'],
            'url': entry['url']
        }
        result.push(res);
    });
    return result;
}
function SendRequest (url, cb) {

    request({
        uri: url
    }, function (error, response, body) {
        if (!error) {
            cb(null, getData(response,body));
        } else {
            cb(error);
        }
    });
}
function ChkUrl(param) {
    var addressesArr = [];
    if (typeof(param.address) === 'string') {
        var str=param.address;
        if (  str.indexOf('https://') === -1 &&   str.indexOf('http://') === -1) {
            str = 'http://' + str;
        }
        addressesArr.push(str);
    } else {
        addressesArr = addressesArr.concat(param.address);
    }
    return addressesArr;
}

app.get('/data/from/mongodb', function (request, resonse) {

    if (!request.query.address) {
        resonse.send('<h1>No Address Found</h1>')
    } else {
        //var Alladdresses =   ChkUrl(request.query);
        var records = [];
        
            SendRequest('http://localhost/mongodatabase.php', function (err, result) {
                if (!err) {console.log(result);} 
                resonse.end(generateView(result));
                 
	        
            });
        
    }
});
app.get('*', function(request, resonse) {
    resonse.send('<h1>404 Page Not Found</h1>');
});
var server = app.listen(process.env.PORT || 3000);
module.exports = server; 