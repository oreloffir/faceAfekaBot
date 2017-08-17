var prompt = require('prompt');
var constants = require('./app/services/constants');
var twitterManager  = require('./app/services/twitterService');
var watsonService = require('./app/services/watsonService')
var googleSearchService = require('./app/services/googleSearchService')

var faceAfeka = require('./app/managers/faceAfekaManager')
var faceAfekaConfig  = require('./app/config/config')

twitterManager.connect();
watsonService.connect();
googleSearchService.connect()
prompt.start();
faceAfekaManager = new faceAfeka(faceAfekaConfig)


/**
 * Nested function.
 * the function starts with get hashTags from the user with the prompt npm, until he enter 'Done'.
 * then it calls the twitter service getTweets function with the hashTags array, the service start to bring tweets.
 * the twitter service call to the watson service analyzeTweet func with the tweet.
 * the watson service analyze the tweet and call the googleSearch service search method with the query it create.
 * the googleSearch service search image according to the query and call the faceAfeka manager post method.
 * the faceAfeka manager send a http post req to the faceAfeka system.
 * @param array
 */
function getHashTag(array) {
	console.log("Enter a hashTag (Enter "+constants.DONE+" for finish):")
	prompt.get(['hashTag'], function (err, result) {
		var hashTag = result.hashTag;
		if (hashTag === constants.DONE) {
			console.log('We are done. array= '+ array );
			twitterManager.getTweets(array, function (tweet) {
				watsonService.analyzeTweet(tweet.text, function (keywords) {
					googleSearchService.search(keywords, function (images) {
						var postText = tweet.text;
						if (images.length > 0) {
							postText += " " + images[constants.FIRST_IMG][constants.IMG_URL];
							faceAfekaManager.post(postText, function (err, res) {
								if(err)
									console.log(err)
							})
						}
					})
				})
			})
		} else {
			array.push(hashTag)
			getHashTag(array);
		}
	});
}

getHashTag([])





