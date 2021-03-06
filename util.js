var util = {};
var http = require('http');
var sign = require('./sign');
var options = {
    hostname: 'bcs.duapp.com',  
    port: 80
};
util.parse = function(str) {
    var obj = str;
    try {
        obj = JSON.parse(data);
    } catch (e) {
    }
    return obj;
};
util.getOptions = function (method, buckect, object, headers) {
    var signstr = sign.getSign(method, buckect, object);
    var url = '/' + buckect + (object ? '/' + object : '') + '?sign=' + signstr;
    var opt = {
        hostname: options.hostname,
        port: options.port,
        path: url,
        method: method
    };
    if (headers) opt.headers = headers;
    return opt;
};
util.request = function(opt, callback) {
    var req = http.request(opt, function(res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function() {
            data = util.parse(data);
            callback({
                statusCode: res.statusCode,
                headers: res.headers,
                data: data
            });
        });
    });
    req.on('error', function(e) {
        //console.log('problem with request ' + opt.path + ' : ' + e.message);
    });
    return req;
};
module.exports = util;
