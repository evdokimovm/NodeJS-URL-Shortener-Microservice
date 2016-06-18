module.exports = function(app, db, cors) {

	var sites = db.collection('sites');
	var APP_URL = 'http://localhost:8080/';

	app.get('/:url', cors(), function(req, res) {
		var url = APP_URL + req.params.url;
		if (url !== APP_URL + 'favicon.ico') {
			findURL(url, db, res);
		}
	})

	app.get('/new/:url*', cors(), function(req, res) {
		// Create short url, store and display the info
		var url = req.url.slice(5);
		var urlObj = {};
		if (validateURL(url)) {
			urlObj = {
				'original_url': url,
				'short_url': APP_URL + linkGen()
			};
			res.send(urlObj);

			// Save original url and short url to the database
			sites.save(urlObj, function(err) {
				if (err) throw err;
			});
		} else {
			res.send(JSON.stringify({
				error : 'No short url found for given input'
			}))
		}
	})

	function findURL(link, db, res) {
		// Check to see if the site is already there
		// get the url
		sites.findOne({
			'short_url': link
		}, function(err, result) {
			if (err) throw err;
			// object of the url
			if (result) {
				// we have a result
				res.redirect(result.original_url);
			} else {
				// we don't
				res.send(JSON.stringify({
					error : 'Site not found!'
				}))
			}
		});
	}

	function linkGen() {
		// Generates random string for link
		var possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var linkGen = '';

		for(var i = 0; i < 6; i += 1) {
			linkGen += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return linkGen;
	}

	function validateURL(url) {
		// Checks to see if it is an actual url
		// Regex from https://gist.github.com/dperini/729294
		var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
		return regex.test(url);
	}

}
