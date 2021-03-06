var express = require('express')
var router = express.Router()
var cors = require('cors')

var URL = require('../models/url')
var APP_URL = 'http://localhost:8080/'

router.get('/:url', cors(), function(req, res) {
	var shortURL = APP_URL + req.params.url
	if (shortURL !== APP_URL + 'favicon.ico') {
		findURL(shortURL, URL, res)
	}
})

router.get('/new/:url*', cors(), function(req, res) {
	var originalURL = req.url.slice(5)
	if (validateURL(originalURL)) {
		var newURL = new URL()
		newURL.original_url = originalURL
		newURL.short_url = APP_URL + linkGen()

		URL.findOne({
			original_url: originalURL
		}, function(err, data) {
			if (data) {
				res.json({
					original_url: data.original_url,
					short_url: data.short_url
				})
			} else {
				newURL.save(function(err, data) {
					if (err) throw err
					res.json({
						original_url: data.original_url,
						short_url: data.short_url
					})
				})
			}
		})
	} else {
		res.json({
			error: 'Given URL Not Valid'
		})
	}
})

function findURL(link, URL, res) {
	URL.findOne({
		'short_url': link
	}, function(err, result) {
		if (err) throw err
		if (result) {
			res.redirect(result.original_url)
		} else {
			res.json({
				error: 'Site Not Found'
			})
		}
	})
}

function linkGen() {
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var linkGen = ''

	for (var i = 0; i < 6; i += 1) {
		linkGen += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return linkGen
}

function validateURL(url) {
	// Checks to see if it is an actual url
	// Regex from https://gist.github.com/dperini/729294
	var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
	return regex.test(url)
}

module.exports = router
