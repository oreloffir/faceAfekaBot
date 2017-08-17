module.exports = {
	/**
	 * twitterService connect method, require consumer_key, consumer_secret, access_token, access_token_secret.
	 **/
	connect: function () {
		this.constants = require('./constants');
		var twit = require('twit');
		var config = require('../config/twitter-configuration');
		this.twitter = new twit(config);
	},
	/**
	 * twitterService get tweets method, require hashTags.
	 * It will wait after it found tweet (@see constants.MILL_TO_WAIT) and than it will search anther tweet.
	 * @param {Array} hashTags - the strings it will search in tweets.
	 * @param {requestCallback} callback - the callback that use the tweet it found.
	 **/
	getTweets: function (hashTags, callback) {
		console.log("start listening to tweets!");
		var stream = this.twitter.stream('statuses/filter', {track: hashTags, language: 'en'});
		var self = this
		stream.on('tweet', function(tweet) {
			callback(tweet);
			stream.stop()
			setTimeout(function() {
				stream.start()
			}, self.constants.MILL_TO_WAIT);
		});
		stream.on('error', function(error) {
			console.log(error);
		});
		return stream;
	}
};