'use strict';

class NodeRequestMock {
	static inject(name, module) {
		NodeRequestMock[name] = module;
	}

	static intercept(verb, address, requestBody) {
		var u = NodeRequestMock.url.parse(address);
		NodeRequestMock.scope = NodeRequestMock.nock(u.protocol + '//' + u.hostname).intercept(u.path, verb, requestBody);
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
		NodeRequestMock.nock.cleanAll();
	}
}

export default NodeRequestMock;
