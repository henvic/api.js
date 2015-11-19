'use strict';

import core from 'bower:metal/src/core';
import Transport from './Transport';
import Util from './Util';
import ClientResponse from './ClientResponse';
import { CancellablePromise } from 'bower:metal-promise/src/promise/Promise';

var http = require('http');
var request = require('request');

/**
 * Provides a convenient interface for data transport.
 * @interface
 */
class NodeTransport extends Transport {

	constructor() {
		super();
	}

	/**
	 * @inheritDoc
	 */
	send(clientRequest) {
		var deferred = this.request(
			clientRequest.url(), clientRequest.method(), clientRequest.body(),
			clientRequest.headers(), clientRequest.params(), null, false);

		return deferred.then(function(response) {
			var clientResponse = new ClientResponse(clientRequest);
			clientResponse.body(response.body);
			clientResponse.statusCode(response.statusCode);
			clientResponse.statusText(http.STATUS_CODES[response.statusCode]);

			Object.keys(response.headers).forEach(function(name) {
				clientResponse.header(name, response.headers[name]);
			});

			return clientResponse;
		});
	}

	/**
	 * Requests the url using XMLHttpRequest.
	 * @param {!string} url
	 * @param {!string} method
	 * @param {?string} body
	 * @param {MultiMap} opt_headers
	 * @param {MultiMap} opt_params
	 * @param {number=} opt_timeout
	 * @return {Promise} Deferred ajax request.
	 * @protected
	 */
	request(url, method, body, opt_headers, opt_params, opt_timeout) {
		var options = {
			method: method,
			uri: url
		};

		if (opt_params) {
			url = Util.addParametersToUrlQueryString(url, opt_params);
		}

		if (opt_headers) {
			let headers = {};
			opt_headers.names().forEach(function(name) {
				headers[name] = opt_headers.getAll(name).join(', ');
			});

			options.headers = headers;
		}

		if (core.isDef(body)) {
			options.body = body;
		}

		if (core.isDefAndNotNull(opt_timeout)) {
			options.timeout(opt_timeout);
		}

		return new CancellablePromise(function(resolve, reject) {
			request(options, (error, response) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(response);
			});
		});
	}

}

export default NodeTransport;
