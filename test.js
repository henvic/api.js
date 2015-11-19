if (typeof window === 'undefined') {
    window = {};
}

var api = require('./build/globals/api');

var Launchpad = window.Launchpad;

Launchpad
.url('http://liferay.io/bbtest/example')
.limit(8)
.get()
.then(function(clientResponse) {
	var results = clientResponse.body();

	if (results.length > 8) {
		console.log('Incorrect results length: ', results.length);
	}
	else {
		console.log('Correct results length: ', results.length);
	}
});