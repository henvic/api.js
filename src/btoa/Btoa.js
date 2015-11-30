'use strict';

class Btoa {
	btoa(stringToEncode) {
		if (typeof btoa === 'function') {
			return btoa(stringToEncode);
		}

		return new Buffer(stringToEncode.toString(), 'binary');
	}
}

export default Btoa;
