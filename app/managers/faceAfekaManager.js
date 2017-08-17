/**
 * faceAfekaManager constructor
 * @param {object} config - the bot email and password.
 **/
var faceAfekaManager = function (config) {
    if (!config)
        throw new Error('Configuration object missing')
    this.querystring = require('querystring')
    this.http = require('http')
    this.config = config;
}
/**
 * This method create a http post req and send it to localhost:3000/api/posts/add
 *
 * @callback requestCallback
 * @param {object} data - the post content.
 * @param {requestCallback} callback - The callback that handles the errors (err, post)
 **/
faceAfekaManager.prototype.post = function (data, callback) {
    var postReqData = {}
    postReqData.postData = {}
    postReqData.postData.content = data
    postReqData.client = this.config
    postReqData = JSON.stringify(postReqData)
    var postParams = {
        host: 'localhost',
        port: '3000',
        path: '/api/posts/add',
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json"
        }
    }
    var postRequest = this.http.request(postParams, function(res) {
        var dataBuffer = ""
        res.on('data' ,function (data) {
            dataBuffer += data
        })
        res.on('end', function () {
            callback(null, JSON.parse(dataBuffer))
        })
    })
    // post the data
    postRequest.write(postReqData);
    postRequest.end();
}
module.exports = faceAfekaManager