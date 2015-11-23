'use strict';

import Transport from './Transport';
import Util from './Util';
import ClientResponse from './ClientResponse';
import { CancellablePromise as Promise } from 'bower:metal-promise/src/promise/Promise';

/**
 * The implementation of an ajax transport to be used with {@link Launchpad}.
 * @extends {Transport}
 */
class AjaxTransport extends Transport {
	/**
	 * @inheritDoc
	 */
	send(clientRequest) {
		var deferred = this.request(
			clientRequest.url(), clientRequest.method(), clientRequest.body(),
			clientRequest.headers(), clientRequest.params(), null, false);

		return deferred.then(function(response) {
			var clientResponse = new ClientResponse(clientRequest);
			clientResponse.body(response.responseText);
			clientResponse.statusCode(response.status);
			clientResponse.statusText(response.statusText);
			Util.parseResponseHeaders(response.getAllResponseHeaders()).forEach(function(header) {
				clientResponse.header(header.name, header.value);
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
		var request = new XMLHttpRequest();

		var promise = new Promise(function(resolve, reject) {
			request.onload = function() {
				if (request.aborted) {
					request.onerror();
					return;
				}
				resolve(request);
			};
			request.onerror = function() {
				var error = new Error('Request error');
				error.request = request;
				reject(error);
			};
		}).thenCatch(function(reason) {
			request.abort();
			throw reason;
		}).thenAlways(function() {
			clearTimeout(timeout);
		});

		if (opt_params) {
			url = Util.addParametersToUrlQueryString(url, opt_params);
		}

		request.open(method, url);

		if (opt_headers) {
			opt_headers.names().forEach(function(name) {
				request.setRequestHeader(name, opt_headers.getAll(name).join(', '));
			});
		}

		request.send(body ? body : null);

		if (opt_timeout) {
			var timeout = setTimeout(function() {
				promise.cancel('Request timeout');
			}, opt_timeout);
		}

		return promise;
	}

}

export default AjaxTransport;
