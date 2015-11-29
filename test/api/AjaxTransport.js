'use strict';

import AjaxTransport from '../../src/api/AjaxTransport';
import ClientRequest from '../../src/api/ClientRequest';
import RequestMock from '../fixtures/RequestMock';

var TransportRequestMock = RequestMock.get();

describe('AjaxTransport', function() {
	beforeEach(TransportRequestMock.setup);
	afterEach(TransportRequestMock.teardown);

	it('should cancel send request to an url', function(done) {
		TransportRequestMock.intercept('GET', '/url').reply(200);
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		transport.send(clientRequest)
			.then(function() {
				assert.fail();
			})
			.catch(function() {
				assert.ok(TransportRequestMock.get().aborted);
				done();
			})
			.cancel();
	});

	it('should fail on transport error', function(done) {
		TransportRequestMock.intercept('GET', '/url').reply(200);
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		transport.send(clientRequest).catch(function(reason) {
			assert.ok(reason instanceof Error);
			done();
		});
		TransportRequestMock.get().abort();
	});
});
