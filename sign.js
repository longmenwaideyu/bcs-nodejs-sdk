var crypto = require('crypto');
var sign = {};
var AccessKey = '';
var SecrectKey = '';
var hash = function (content) {
    var h = require('crypto').createHmac('sha1', SecrectKey).update(content).digest();
    return h.toString('base64');
}
sign.setSecrectKey = function (sk) {
    SecrectKey = sk;
}
sign.setAccessKey = function (ak) {
    AccessKey = ak;
}

sign.getSignMBO = function (method, bucket, object) {
    var content = "MBO\n"
                + "Method=" + method + "\n"
                + "Bucket=" + bucket + "\n"
                + "Object=/" + object + "\n";
    return 'MBO:' + AccessKey + ':' + hash(content);
}
/**
 * 获取url签名
 * @param  {String|null|undefined}
 * @param  {String|null|undefined}
 * @param  {String|null|undefined}
 * @param  {String|Number|null|undefined}
 * @param  {String|null|undefined}
 * @param  {String|Number|null|undefined}
 * @return {String}
 */
sign.getSign = function (method, bucket, object, time, ip, size) {
    var flag = 'MBO';
    var content = "Method=" + method + "\n"
                + "Bucket=" + bucket + "\n"
                + "Object=/" + object + "\n";
    if (time != null && time != undefined) {
        flag += 'T';
        content += 'Time=' + time + "\n";
    }
    if (ip != null && ip != undefined) {
        flag += 'I';
        content += 'Ip=' + ip + "\n";
    }
    if (size != null && size != undefined) {
        flag += 'S';
        content += 'Size=' + size + "\n";
    }
    content = flag + '\n' + content;
    return flag + ':' + AccessKey + ':' + hash(content);
}

module.exports =  sign;