'use strict';

import AjaxTransport from '../../src/api/AjaxTransport';
import ClientRequest from '../../src/api/ClientRequest';
import RequestMock from '../RequestMock';

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

	it('should parse request query string', function(done) {
		TransportRequestMock.intercept('GET', 'http://xyz/url?foo=1&query=1&query=%20').reply(200);
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://xyz/url?foo=1');
		clientRequest.params().add('query', 1);
		clientRequest.params().add('query', ' ');
		transport.request(
			clientRequest.url(), clientRequest.method(), null, null,
			clientRequest.params(), null, false)
		.then(function(xhrResponse) {
			assert.strictEqual('http://xyz/url?foo=1&query=1&query=%20', xhrResponse.url);
			done();
		});
	});

	it('should parse request query string without params', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url?foo=1').reply(200);
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url?foo=1');
		transport.request(clientRequest.url(), clientRequest.method()).then(function(xhrResponse) {
			assert.strictEqual('http://localhost/url?foo=1', xhrResponse.url);
			done();
		});
	});

	it('should cancel request if given timeout is reached', function(done) {
		TransportRequestMock.timeout();

		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url?foo=1');
		transport.request(
			clientRequest.url(),
			clientRequest.method(),
			null,
			null,
			null,
			100
		).catch(function() {
			done();
		});
	});
});
