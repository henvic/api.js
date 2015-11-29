'use strict';

import RequestMock from '../test/RequestMock';

var url = require('url');
var assert = require('assert');
var nock = require('nock');

class NodeRequestMock {
	static intercept(verb, address, requestBody) {
		var u = url.parse(address);
		NodeRequestMock.scope = nock(u.protocol + '//' + u.hostname).intercept(u.path, verb, requestBody);
		return NodeRequestMock.scope;
	}

	static socketDelay(time) {
		NodeRequestMock.scope.socketDelay(time);
		return NodeRequestMock.scope;
	}

	static reply(status, body, headers) {
		NodeRequestMock.scope.reply(status, body, headers);
		return NodeRequestMock.scope;
	}

	static get() {
		return NodeRequestMock.scope;
	}

	static setup() {
	}

	static teardown() {
		NodeRequestMock.scope = undefined;
		nock.cleanAll();
	}
}

RequestMock.set(NodeRequestMock);

global.assert = assert;
