'use strict';

class RequestMock {
	static get() {
		return this.mock;
	}

	static set(mock) {
		this.mock = mock;
	}
}

export default RequestMock;
