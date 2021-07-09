var express = require('express');
var os = require('os');
var router = express.Router();
var posts = require("../data/sl2018.json");
var typogr = require('typogr');
const _ = require('lodash');

function get_the_event( post ) {
	if ( post.tag == 'SL' ) {
		return 'Salt Lake';
	} else if ( post.tag == 'KL' ) {
		return 'Kirtland';
	} else if ( post.tag == 'NW' ) {
		return 'Northwest';
	} else if ( post.tag == 'SW' ) {
		return 'Southwest';
	} else if ( post.tag == 'DC' ) {
		return 'DC';
	} else if ( post.tag == 'AZ' ) {
		return 'Arizona';
	} else if ( post.tag == 'SF' ) {
		return 'San Francisco';
	} else if ( post.tag == 'NE' ) {
		return 'Northeast';
	} else if ( post.tag == 'CC' ) {
		return 'Christ Conference';
	} else if ( post.tag == 'DA' ) {
		return 'Dallas';
	} else {
		return 'FIX ME PLEASE';
	}
}

var build = function( posts ) {
	for ( var i = posts.length - 1; i >= 0; i-- ) {
		var slug = posts[i].Audio,
			title = posts[i].Title;

			console.log(posts[i]);

		// Let's get the event key
		posts[i].tag = slug.substr( 0, 2 );

		// Let's build the year.
		var year = slug.substr( 2, 2 );
		if ( year > 18 ) {
			posts[i].year = 19 + year;
		} else {
			posts[i].year = 20 + year;
		}

		var presenters = _.get(posts[i], 'Presenters');

		if ( presenters ) {
			if ( presenters.indexOf(',') > 0 ) {
				posts[i].presenters = presenters.split(',');
				for ( var idx = posts[i].presenters.length - 1; idx >= 0; idx-- ) {
					posts[i].presenters[ idx ] = posts[i].presenters[idx].trim();
				}
			} else if ( presenters.indexOf(os.EOL)) {
				posts[i].presenters = presenters.split(os.EOL)
				for (var idx = posts[i].presenters.length - 1; idx >= 0; idx--) {
					posts[i].presenters[idx] = posts[i].presenters[idx].trim();
				}
			} else {
				posts[i].presenters = [presenters];
			}
		} else {
			posts[i].presenters = [presenters];
		}

		posts[i].presenters = _.filter(posts[i].presenters, function(o) { return o.length > 0; });

		posts[i].URL = `https://www.sunstonemagazine.com/audio/${posts[i].Audio}.mp3`

		var desc = _.get(posts[i], 'Description');
		posts[i].Description = posts[i].Description.replace(slug + ',', '');
		posts[i].Description = typogr(posts[i].Description).chain().initQuotes().smartypants().value();
		posts[i].Description = posts[i].Description.replace(/\n?\r\n/g, '<br />' );


		// Let's get the event listing.
		posts[i].number = slug.substr( 4 );

		posts[i].Title = typogr(title).chain().initQuotes().smartypants().value();

		posts[i].event = get_the_event( posts[i] );

	}

	return posts;
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Sunstone Podcast Preview', posts: build( posts ) });
});

/* GET home page. */
router.get('/posts', function(req, res) {
  res.send({ title: 'Sunstone Podcast Import', posts: build( posts ) });
});

/* GET home page. */
router.get('/sheets', function (req, res) {
	res.send({ title: 'Sunstone Podcast Import', posts: build( posts ) });
});

module.exports = router;
