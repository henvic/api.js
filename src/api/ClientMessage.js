'use strict';

import MultiMap from './MultiMap';

/**
 * Represents a client message (e.g. a request or a response).
 */
class ClientMessage {
	constructor() {
		this.headers_ = new MultiMap();
	}

	/**
	 * Fluent getter and setter for request body.
	 * @param {*=} opt_body Request body to be set. If none is given,
	 *   the current value of the body will be returned.
	 * @return {*} Returns request body if no body value was given. Otherwise
	 *   returns the {@link ClientMessage} object itself, so calls can be chained.
	 * @chainable Chainable when used as setter.
	 */
	body(opt_body) {
		if (opt_body) {
			this.body_ = opt_body;
			return this;
		}
		return this.body_;
	}

	/**
	 * Adds a header. If a header with the same name already exists, it will not be
	 * overwritten, but the new value will be stored as well. The order is preserved.
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
	 * @param {MultiMap|Object=} opt_headers Request headers list to
	 *   be set. If none is given the current value of the headers will
	 *   be returned.
	 * @return {!MultiMap|ClientMessage} Returns map of request headers
	 *   if no new value was given. Otherwise returns the {@link ClientMessage}
	 *   object itself, so calls can be chained.
	 * @chainable Chainable when used as setter.
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
