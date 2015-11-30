'use strict';

import Transport from './Transport';
import Ajax from 'bower:metal-ajax/src/Ajax';
import ClientResponse from './ClientResponse';

/**
 * The implementation of an ajax transport to be used with {@link Launchpad}.
 * @extends {Transport}
 */
class AjaxTransport extends Transport {
	/**
	 * @inheritDoc
	 */
	send(clientRequest) {
		var deferred = Ajax.request(
			clientRequest.url(), clientRequest.method(), clientRequest.body(),
			clientRequest.headers(), clientRequest.params(), null, false);

		return deferred.then(function(response) {
			var clientResponse = new ClientResponse(clientRequest);
			clientResponse.body(response.responseText);
			clientResponse.statusCode(response.status);
			clientResponse.statusText(response.statusText);
			Ajax.parseResponseHeaders(response.getAllResponseHeaders()).forEach(function(header) {
				clientResponse.header(header.name, header.value);
			});
			return clientResponse;
		});
	}
}

export default AjaxTransport;
