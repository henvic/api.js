'use strict';

import NodeTransport from '../../src/api/NodeTransport';
import ClientRequest from '../../src/api/ClientRequest';
import RequestMock from '../RequestMock';

var TransportRequestMock = RequestMock.get();

describe('NodeTransport', function() {
	beforeEach(TransportRequestMock.setup);
	afterEach(TransportRequestMock.teardown);

	it('should cancel send request to an url', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		transport.send(clientRequest)
			.then(function() {
				assert.fail();
			})
			.catch(function() {
				// assert that connection.abort was called as well
				done();
			})
			.cancel();
	});

	it('should parse request query string', function(done) {
		TransportRequestMock.intercept('GET', 'http://xyz/url?foo=1&query=1&query=%20').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://xyz/url?foo=1');
		clientRequest.params().add('query', 1);
		clientRequest.params().add('query', ' ');
		transport.request(
			clientRequest.url(), clientRequest.method(), null, null,
			clientRequest.params(), null, false)
		.then(function(xhrResponse) {
			assert.strictEqual(xhrResponse.request.uri.href, 'http://xyz/url?foo=1&query=1&query=%20');
			done();
		});
	});

	it('should parse request query string without params', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url?foo=1').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url?foo=1');
		transport.request(clientRequest.url(), clientRequest.method()).then(function(xhrResponse) {
			assert.strictEqual('http://localhost/url?foo=1', xhrResponse.request.uri.href);
			done();
		});
	});

	it('should cancel request if given timeout is reached', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url?foo=1').socketDelay(5).reply(200);

		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url?foo=1');
		transport.request(
			clientRequest.url(),
			clientRequest.method(),
			null,
			null,
			null,
			1
		).then(function() {
			assert.fail();
		})
		.catch(function(e) {
			assert.strictEqual('ESOCKETTIMEDOUT', e.code);
			done();
		});
	});
});
