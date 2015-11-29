'use strict';

import RequestMock from '../test/RequestMock';

class AjaxRequestMock {
	static intercept() {
		return this;
	}

	static timeout() {
		AjaxRequestMock.timeout_ = true;
	}

	static reply(status, body, headers) {
		AjaxRequestMock.status = status;
		AjaxRequestMock.headers = headers;
		AjaxRequestMock.body = body;
	}

	static get() {
		return AjaxRequestMock.xhr;
	}

	static setup() {
		AjaxRequestMock.fakeServer = sinon.useFakeXMLHttpRequest();

		AjaxRequestMock.fakeServer.onCreate = (xhr) => {
			AjaxRequestMock.xhr = xhr;
			setTimeout(() => {
				if (!AjaxRequestMock.timeout_) {
					xhr.respond(AjaxRequestMock.status, AjaxRequestMock.headers, AjaxRequestMock.body);
				}
			}, 0);
		};
	}

	static teardown() {
		AjaxRequestMock.timeout_ = undefined;
		AjaxRequestMock.fakeServer.restore();
	}
}

RequestMock.set(AjaxRequestMock);
