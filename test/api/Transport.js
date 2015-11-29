'use strict';

import AjaxTransport from '../../src/api/AjaxTransport';
import ClientRequest from '../../src/api/ClientRequest';

describe('AjaxTransport', function() {

	beforeEach(function() {
		this.xhr = sinon.useFakeXMLHttpRequest();

		var requests = this.requests = [];

		this.xhr.onCreate = function(xhr) {
			requests.push(xhr);
		};
	});

	afterEach(function() {
		this.xhr.restore();
	});

	it('should send request to an url', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('/url', response.request().url());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should cancel send request to an url', function(done) {
		var self = this;
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		transport.send(clientRequest)
			.then(function() {
				assert.fail();
			})
			.catch(function() {
				assert.ok(self.requests[0].aborted);
				done();
			})
			.cancel();
	});

	it('should send request with different http method', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		clientRequest.method('POST');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('POST', response.request().method());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with body', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		clientRequest.body('requestBody');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('requestBody', response.request().body());
			assert.strictEqual('responseBody', response.body());
			done();
		});
		this.requests[0].respond(200, null, 'responseBody');
	});

	it('should send request with query string', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		clientRequest.param('query', 1);
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"query":[1]}', response.request().params().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with header', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		clientRequest.header('content-type', 'application/json');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"content-type":["application/json"]}', response.request().headers().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with multiple header of same name', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		var headers = clientRequest.headers();
		headers.add('content-type', 'application/json');
		headers.add('content-type', 'text/html');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"content-type":["application/json","text/html"]}', response.request().headers().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should response with headers', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual('{"content-type":["application/json"]}', response.headers().toString());
			done();
		});
		this.requests[0].respond(200, {
			'content-type': 'application/json'
		});
	});

	it('should response success with any status code', function(done) {
		var transport = new AjaxTransport();
		var clientRequest = new ClientRequest();
		clientRequest.url('/url');
		transport.send(clientRequest).then(function(response) {
			assert.strictEqual(500, response.statusCode());
			assert.strictEqual('Internal Server Error', response.statusText());
			done();
		});
		this.requests[0].respond(500);
	});

	});
});
