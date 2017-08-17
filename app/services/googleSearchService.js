module.exports = {
	/**
	 * googleSearchService connect method, require CSE ID and API KEY.
	 * CSE ID - Google Custom Search Engine ID
	 * API KEY - Google API KEY
	 **/
	connect: function () {
		var GoogleImages = require('google-images');
		var config = require('../config/googleSearch-configuration');
		this.client = new GoogleImages(config.CSE_ID, config.API_KEY);//'CSE ID', 'API KEY'
	},
	/**
	 * googleSearchService search method, require CSE ID and API KEY.
	 * @param {String} query - the string it will search.
	 * @param {requestCallback} callback - the callback that use the images it found.
	 **/
	search: function (query, callback) {
		console.log('query: '+query)
		this.client.search(query)
			.then( function (images) {
				console.log(images)
				callback(images);
			})
			.catch(function (err) {
			console.log("Search error: "+JSON.stringify(err))
			})
	}
};