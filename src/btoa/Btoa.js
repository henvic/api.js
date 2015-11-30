'use strict';

/**
 * Abstraction layer for string to base64 conversion
 * reference: https://github.com/nodejs/node/issues/3462
 */
class Btoa {
	/**
	 * Creates a base-64 encoded ASCII string from a "string" of binary data.
	 * @param {string} string to be encoded.
	 * @return {string}
	 * @static
	 */
	static btoa(stringToEncode) {
		if (typeof btoa === 'function') {
			return btoa(stringToEncode);
		}

		return new Buffer(stringToEncode.toString(), 'binary');
	}
}

export default Btoa;
