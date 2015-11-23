'use strict';

import ClientMessage from './ClientMessage';
import MultiMap from './MultiMap';

/**
 */
class ClientRequest extends ClientMessage {

	constructor() {
		super();
		this.params_ = new MultiMap();
	}

	/**
	 * Fluent getter and setter for request method.
	 * @param {string} opt_method Request method to be set.
	 * @return {string} Returns request method.
	 * @chainable Chainable when used for setter.
	 */
	method(opt_method) {
		if (opt_method) {
			this.method_ = opt_method;
			return this;
		}
		return this.method_ || ClientRequest.DEFAULT_METHOD;
	}

	/**
	 * Adds a query. If the query with the same name already exists, it will not
	 * be overwritten, but new value will be stored. The order is preserved.
	 * @param {string} name
	 * @param {string} value
	 * @chainable
	 */
	param(name, value) {
		if (arguments.length !== 2) {
			throw new Error('Invalid arguments');
		}
		this.params_.set(name, value);
		return this;
	}

	/**
	 * Fluent getter and setter for request querystring.
	 * @param {MultiMap|object} opt_params Request querystring map to be set.
	 * @return {MultiMap} Returns map of request querystring.
	 */
	params(opt_params) {
		if (opt_params) {
			if (opt_params instanceof MultiMap) {
				this.params_ = opt_params;
			} else {
				this.params_.values = opt_params;
			}
			return opt_params;
		}
		return this.params_;
	}

	/**
	 * Fluent getter and setter for request url.
	 * @param {string} opt_url Request url to be set.
	 * @return {string} Returns request url.
	 * @chainable Chainable when used for setter.
	 * TODO: Renames on api.java as well.
	 */
	url(opt_url) {
		if (opt_url) {
			this.url_ = opt_url;
			return this;
		}
		return this.url_;
	}

}

ClientRequest.DEFAULT_METHOD = 'GET';

export default ClientRequest;
