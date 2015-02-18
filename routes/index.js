var express = require('express');
var router = express.Router();
var posts = require("../second.json");

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
	} else if ( post.tag == 'KL' ) {
		return 'Kirtland';
	} else if ( post.tag == 'KL' ) {
		return 'Kirtland';
	} else if ( post.tag == 'KL' ) {
		return 'Kirtland';
	} else {
		return 'FIX ME PLEASE';
	}
}

var build = function( posts ) {
	for ( var i = posts.length - 1; i >= 0; i-- ) {
		var slug = posts[i].Audio;

		// Let's get the event key
		posts[i].tag = slug.substr( 0, 2 );

		// Let's build the year.
		var year = slug.substr( 2, 2 );
		if ( year > 16 ) {
			posts[i].year = 19 + year;
		} else {
			posts[i].year = 20 + year;
		}

		var presenters = posts[i].Presenters;

		if ( posts[i].Presenters.length > 0	) {
			posts[i].Presenters = presenters.split(',');
		}

		// Let's get the event listing.
		posts[i].number = slug.substr( 4 );

		posts[i].event = get_the_event( posts[i] );

	}

	return posts;
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Posts', posts: build( posts ) });
});

module.exports = router;
