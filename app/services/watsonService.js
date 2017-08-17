module.exports = {
	/**
	 * watsonService connect method, require username, password and version_date.
	 **/
	connect: function () {
		var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
		var config = require('../config/watson-configuration');
		this.wadsonAnalyzer  = new NaturalLanguageUnderstandingV1(config);
	},
	/**
	 * watsonService analyze tweet method, require tweet text.
	 * @param {String} tweetText - the string it will analyze.
	 * @param {requestCallback} callback - the callback that use the query it create.
	 **/
	analyzeTweet: function (tweetText, callback) {
		// the parameters for the analyze. keyword, entities (places, persons)
		var parameters = {
			'text': tweetText,
			'features': {
				'keywords': {
					'limit': 2
				},
				'entities':{
				}
			}
		}
		this.wadsonAnalyzer.analyze(parameters, function(err, response) {
			if (err)
				console.log('error:', err);
			else{
				//take the first keyword and the first person and create a query for the callback
				if(response.keywords[0] && response.entities[0]){
					var keywords  = response.keywords[0].text;
					var entities  = response.entities[0].text;
					callback(keywords+" "+entities);
				}
			}
		});


	}
};