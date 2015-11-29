'use strict';

import Embodied from '../../src/api-query/Embodied';
import Filter from '../../src/api-query/Filter';
import Launchpad from '../../src/api/Launchpad';
import Transport from '../../src/api/Transport';

describe('Launchpad', function() {

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

	it('should throws exception when socket.io is not loaded', function() {
		assert.throws(function() {
			Launchpad.url('/url').watch();
		}, Error);
	});

	it('should socket.io use path from client url', function(done) {
		window.io = function(url, opts) {
			assert.strictEqual('domain:8080?url=%2Fpath%2Fa%3Ffoo%3D1', url);
			assert.deepEqual({
				forceNew: true,
				path: '/path/a'
			}, opts);
			done();
		};
		Launchpad.url('http://domain:8080/path/a?foo=1').watch();
		delete window.io;
	});

	it('should socket.io ignore path from client url and use from options', function(done) {
		window.io = function(url, opts) {
			assert.strictEqual('domain:8080?url=%2Fpath%2Fa', url);
			assert.deepEqual({
				path: '/new'
			}, opts);
			done();
		};
		Launchpad.url('http://domain:8080/path/a').watch(null, {
			path: '/new'
		});
		delete window.io;
	});

	it('should use different transport', function() {
		var transport = new Transport();
		var client = Launchpad.url().use(transport);
		assert.strictEqual(transport, client.customTransport_);
		assert.ok(client instanceof Launchpad);
	});

	it('should set / get base path', function() {
		Launchpad.base('http://foo.com/');
		assert.strictEqual('http://foo.com/', Launchpad.base());
	});

	it('should create URL with base path', function() {
		Launchpad.base('http://example.org/');
		var service = Launchpad.url('/service');
		assert.strictEqual('http://example.org/service', service.url());
	});

	it('should change full url', function() {
		var transport = new Transport();
		var parent = Launchpad.url('http://other:123').use(transport);
		assert.strictEqual('http://other:123', parent.url());
	});

	it('should inherit parent transport', function() {
		var transport = new Transport();
		var parent = Launchpad.url().use(transport);
		var child = parent.path('/path');
		assert.strictEqual(parent.customTransport_, child.customTransport_);
	});

	it('should send DELETE request', function(done) {
		Launchpad.url('/url').delete('body').then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('DELETE', response.request().method());
			assert.strictEqual('"body"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send GET request', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('GET', response.request().method());
			assert.ok(!response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send GET request with params as object', function(done) {
		var params = {
			foo: 'foo',
			bar: 'bar'
		};
		Launchpad.url('/url').get(params).then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('GET', response.request().method());
			assert.ok(!response.request().body());
			assert.strictEqual('{"foo":["foo"],"bar":["bar"]}', response.request().params().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send GET request with params as Embodied', function(done) {
		class TestParams extends Embodied {
			constructor() {
				super();
				this.body_.foo = 'foo';
				this.body_.bar = ['bar1', 'bar2'];
			}
		}
		Launchpad.url('/url').get(new TestParams()).then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('GET', response.request().method());
			assert.ok(!response.request().body());
			assert.strictEqual('{"foo":["foo"],"bar":["[\\"bar1\\",\\"bar2\\"]"]}', response.request().params().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should transform Filter into Query when sending via GET', function(done) {
		Launchpad.url('/url').get(Filter.field('name', 'foo')).then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('GET', response.request().method());
			assert.ok(!response.request().body());
			var paramsStr = '{"filter":["[{\\"name\\":{\\"operator\\":\\"=\\",\\"value\\":\\"foo\\"}}]"]}';
			assert.strictEqual(paramsStr, response.request().params().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send GET request with params as string', function(done) {
		Launchpad.url('/url').get('strBody').then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('GET', response.request().method());
			assert.ok(!response.request().body());
			assert.strictEqual('{"body":["strBody"]}', response.request().params().toString());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send POST request with body', function(done) {
		Launchpad.url('/url').post('body').then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('POST', response.request().method());
			assert.strictEqual('"body"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send PUT request with body', function(done) {
		Launchpad.url('/url').put('body').then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('PUT', response.request().method());
			assert.strictEqual('"body"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send PATCH request with body', function(done) {
		Launchpad.url('/url').patch('body').then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('PATCH', response.request().method());
			assert.strictEqual('"body"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with body that was previously set through "body" function', function(done) {
		Launchpad.url('/url').body('body').post().then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('POST', response.request().method());
			assert.strictEqual('"body"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should give precedence to body passed to the request call', function(done) {
		Launchpad.url('/url').body('body').post('postBody').then(function(response) {
			assert.strictEqual('/url', response.request().url());
			assert.strictEqual('POST', response.request().method());
			assert.strictEqual('"postBody"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query count in the body', function(done) {
		Launchpad.url('/url').count().post().then(function(response) {
			assert.strictEqual('{"type":"count"}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query filter in the body', function(done) {
		Launchpad.url('/url').filter('name', '=', 'foo').post().then(function(response) {
			assert.strictEqual('{"filter":[{"name":{"operator":"=","value":"foo"}}]}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query search in the body', function(done) {
		Launchpad.url('/url').search('name', '=', 'foo').post().then(function(response) {
			assert.strictEqual('{"search":[{"name":{"operator":"=","value":"foo"}}]}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query offset in the body', function(done) {
		Launchpad.url('/url').offset(0).post().then(function(response) {
			assert.strictEqual('{"offset":0}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query limit in the body', function(done) {
		Launchpad.url('/url').limit(0).post().then(function(response) {
			assert.strictEqual('{"limit":0}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query sort in the body', function(done) {
		Launchpad.url('/url').sort('id', 'desc').post().then(function(response) {
			assert.strictEqual('{"sort":[{"id":"desc"}]}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query highlight in the body', function(done) {
		Launchpad.url('/url').highlight('field').post().then(function(response) {
			assert.strictEqual('{"highlight":["field"]}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query aggregate in the body', function(done) {
		Launchpad.url('/url').aggregate('name', 'field').post().then(function(response) {
			assert.strictEqual('{"aggregation":[{"field":{"name":"name"}}]}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with multiple queries in the body', function(done) {
		Launchpad.url('/url').offset(0).limit(50).post().then(function(response) {
			assert.strictEqual('{"offset":0,"limit":50}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request prioritize body instead of query in the body', function(done) {
		Launchpad.url('/url').sort('id', 'desc').post('body').then(function(response) {
			assert.strictEqual('"body"', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should create new client instance based on parent client', function() {
		var books = Launchpad.url('/books');
		var book1 = books.path('/1');
		assert.notStrictEqual(book1, books);
		assert.strictEqual('/books', books.url());
		assert.strictEqual('/books/1', book1.url());
	});

	it('should send request to url without path', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.strictEqual('/url', response.request().url());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request to url with path', function(done) {
		Launchpad.url('/url/a').get().then(function(response) {
			assert.strictEqual('/url/a', response.request().url());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send request with query string', function(done) {
		Launchpad.url('/url/a')
			.param('query', 1)
			.get()
			.then(function(response) {
				assert.strictEqual('{"query":[1]}', response.request().params().toString());
				done();
			});
		this.requests[0].respond(200);
	});

	it('should send request with query as Embodied', function(done) {
		class TestParam extends Embodied {
			constructor() {
				super();
				this.body_.foo = 'foo';
			}
		}
		Launchpad.url('/url/a')
			.param('query', new TestParam())
			.get()
			.then(function(response) {
				assert.strictEqual('{"query":["{\\"foo\\":\\"foo\\"}"]}', response.request().params().toString());
				done();
			});
		this.requests[0].respond(200);
	});

	it('should send request with header string', function(done) {
		Launchpad.url('/url/a')
			.header('header', 1)
			.get()
			.then(function(response) {
				assert.strictEqual('{"content-type":["application/json"],"x-pjax":["true"],"x-requested-with":["XMLHttpRequest"],"header":[1]}', response.request().headers().toString());
				done();
			});
		this.requests[0].respond(200);
	});

	it('should send request with multiple header of same name', function(done) {
		Launchpad.url('/url/a')
			.header('header', 1)
			.header('header', 2)
			.get()
			.then(function(response) {
				assert.strictEqual('{"content-type":["application/json"],"x-pjax":["true"],"x-requested-with":["XMLHttpRequest"],"header":[2]}', response.request().headers().toString());
				done();
			});
		this.requests[0].respond(200);
	});

	it('should serialize body of json requests', function(done) {
		Launchpad.url('/url').header('content-type', 'application/json').post({
			foo: 1
		}).then(function(response) {
			assert.strictEqual('{"foo":1}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should deserialize body of json responses', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.deepEqual({
				foo: 1
			}, response.body());
			done();
		});
		this.requests[0].respond(200, {
			'content-type': 'application/json'
		}, '{"foo": 1}');
	});

	it('should support FormData as request body', function(done) {
		var formData = new FormData();
		Launchpad.url('/url').post(formData).then(function(response) {
			assert.strictEqual(formData, response.request().body());
			assert.strictEqual(undefined, response.request().headers().get('content-type'));
			done();
		});
		this.requests[0].respond(200);
	});

	it('should support Embodied as request body', function(done) {
		class TestBody extends Embodied {
			constructor() {
				super();
				this.body_ = {
					foo: 'foo'
				};
			}
		}
		Launchpad.url('/url').post(new TestBody()).then(function(response) {
			assert.strictEqual('{"foo":"foo"}', response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should wrap Filter in query when passed as request body', function(done) {
		Launchpad.url('/url').post(Filter.field('name', 'foo')).then(function(response) {
			var bodyStr = '{"filter":[{"name":{"operator":"=","value":"foo"}}]}';
			assert.strictEqual(bodyStr, response.request().body());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should wrap dom element request body as form data', function(done) {
		var form = document.createElement('form');
		Launchpad.url('/url').post(form).then(function(response) {
			assert.ok(response.request().body() instanceof FormData);
			done();
		});
		this.requests[0].respond(200);
	});

	it('should send data passed through "form" method as FormData object via the body', function(done) {
		Launchpad.url('/url').form('age', 12).form('weight', 100).post().then(function(response) {
			var body = response.request().body();
			assert.ok(body instanceof FormData);
			assert.strictEqual(undefined, response.request().headers().get('content-type'));
			done();
		});
		this.requests[0].respond(200);
	});

	it('should not send data passed through "form" method via the body if the body is already set', function(done) {
		Launchpad.url('/url').form('age', 12).post({}).then(function(response) {
			var body = response.request().body();
			assert.ok(!(body instanceof FormData));
			assert.strictEqual('{}', body);
			done();
		});
		this.requests[0].respond(200);
	});

	it('should response succeeded for status codes 2xx', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.ok(response.succeeded());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should response succeeded for status codes 3xx', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.ok(response.succeeded());
			done();
		});
		this.requests[0].respond(200);
	});

	it('should response not succeeded for status codes 4xx', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.ok(!response.succeeded());
			done();
		});
		this.requests[0].respond(400);
	});

	it('should response not succeeded for status codes 5xx', function(done) {
		Launchpad.url('/url').get().then(function(response) {
			assert.ok(!response.succeeded());
			done();
		});
		this.requests[0].respond(500);
	});

	it('should throws exception for invalid constructor', function() {
		assert.throws(function() {
			new Launchpad();
		}, Error);
	});

	it('should throws exception for invalid query arguments', function() {
		assert.throws(function() {
			Launchpad.url('/url').param();
		}, Error);

		assert.throws(function() {
			Launchpad.url('/url').param('name');
		}, Error);
	});

	it('should throws exception for invalid header arguments', function() {
		assert.throws(function() {
			Launchpad.url('/url').header();
		}, Error);

		assert.throws(function() {
			Launchpad.url('/url').header('name');
		}, Error);
	});

	it('should throws exception for invalid header arguments', function() {
		assert.throws(function() {
			Launchpad.url('/url').header();
		}, Error);

		assert.throws(function() {
			Launchpad.url('/url').header('name');
		}, Error);
	});
});
