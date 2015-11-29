'use strict';

import nock from 'nock';
import url from 'url';

class NodeRequestMock {
	static inject(name, module) {
		NodeRequestMock[name] = module;
	}

	static intercept(verb, address, requestBody, reqMeta) {
		var u = url.parse(address);

		NodeRequestMock.scope = nock(u.protocol + '//' + u.hostname, reqMeta)
			.intercept(u.path, verb, requestBody);

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

	static setup() {}

	static teardown() {
		NodeRequestMock.scope = undefined;
		nock.cleanAll();
	}
}

export default NodeRequestMock;
