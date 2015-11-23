'use strict';

import MultiMap from './MultiMap';

/**
 */
class ClientMessage {

	constructor() {
		this.headers_ = new MultiMap();
	}

	/**
	 * Fluent getter and setter for request body.
	 * @param {string} opt_body Request body to be set.
	 * @return {string} Returns request body.
	 * @chainable Chainable when used for setter.
	 */
	body(opt_body) {
		if (opt_body) {
			this.body_ = opt_body;
			return this;
		}
		return this.body_;
	}

	/**
	 * Adds a header. If the header with the same name already exists, it will
	 * not be overwritten, but new value will be stored. The order is preserved.
	 * @param {string} name
	 * @param {string} value
	 * @chainable
	 */
	header(name, value) {
		if (arguments.length !== 2) {
			throw new Error('Invalid arguments');
		}
		this.headers_.set(name, value);
		return this;
	}

	/**
	 * Fluent getter and setter for request headers.
	 * @param {MultiMap|object} opt_params Request headers list
	 *   to be set.
	 * @return {MultiMap} Returns map of request headers.
	 */
	headers(opt_headers) {
		if (opt_headers) {
			if (opt_headers instanceof MultiMap) {
				this.headers_ = opt_headers;
			} else {
				this.headers_.values = opt_headers;
			}
			return opt_headers;
		}
		return this.headers_;
	}

	/**
	 * Removes the body.
	 */
	removeBody() {
		this.body_ = undefined;
	}
}

export default ClientMessage;
