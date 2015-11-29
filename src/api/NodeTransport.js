'use strict';

import http from 'http';
import Ajax from 'bower:metal-ajax/src/Ajax';
import CancellablePromise from 'bower:metal-promise/src/promise/Promise';
import ClientResponse from './ClientResponse';
import Transport from './Transport';

/**
 * Provides a convenient interface for data transport.
 * @interface
 */
class NodeTransport extends Transport {
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
	 * @return {CancellablePromise} Deferred ajax request.
	 * @protected
	 */
	request(url, method, body, opt_headers, opt_params, opt_timeout) {
		if (opt_params) {
			url = Ajax.addParametersToUrlQueryString(url, opt_params);
		}

		var options = {
			method: method,
			uri: url
		};

		if (opt_headers) {
			let headers = {};
			opt_headers.names().forEach(function(name) {
				headers[name] = opt_headers.getAll(name).join(', ');
			});

			options.headers = headers;
		}

		if (body) {
			options.body = body;
		}

		if (opt_timeout) {
			options.timeout = opt_timeout;
		}

		var connection;

		return new CancellablePromise((resolve, reject) => {
			connection = NodeTransport.Adapter(options, (error, response) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(response);
			});
		}).thenCatch((reason) => {
			connection.abort();
			throw reason;
		});
	}

}

export default NodeTransport;
