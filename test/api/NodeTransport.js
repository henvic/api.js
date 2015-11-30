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

	it('should send request to an url', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('http://localhost/url', response.request().url());
			done();
		});
	});

	it('should send request with different http method', function(done) {
		TransportRequestMock.intercept('POST', 'http://localhost/url').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		clientRequest.method('POST');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('POST', response.request().method());
			done();
		});
	});

	it('should send request with body', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(200, 'responseBody');
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		clientRequest.body('requestBody');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('requestBody', response.request().body());
			assert.strictEqual('responseBody', response.body());
			done();
		});
	});

	it('should send request with query string', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url?query=1').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		clientRequest.param('query', 1);
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"query":[1]}', response.request().params().toString());
			done();
		});
	});

	it('should send request with header', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		clientRequest.header('content-type', 'application/json');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"content-type":["application/json"]}', response.request().headers().toString());
			done();
		});
	});

	it('should send request with multiple header of same name', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(200);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		var headers = clientRequest.headers();
		headers.add('content-type', 'application/json');
		headers.add('content-type', 'text/html');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"content-type":["application/json","text/html"]}', response.request().headers().toString());
			done();
		});
	});

	it('should response with headers', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(200, undefined, {
			'content-type': 'application/json'
		});
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"content-type":["application/json"]}', response.headers().toString());
			done();
		});
	});

	it('should response success with any status code', function(done) {
		TransportRequestMock.intercept('GET', 'http://localhost/url').reply(500);
		var transport = new NodeTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('http://localhost/url');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual(500, response.statusCode());
			assert.strictEqual('Internal Server Error', response.statusText());
			done();
		});
	});
});
