'use strict';

import Filter from '../../src/api-query/Filter';
import Query from '../../src/api-query/Query';

describe('Query', function() {
	describe('Query.builder()', function() {
		it('should create Query instance', function() {
			var query = Query.builder();
			assert.ok(query instanceof Query);
		});

		it('should start with an empty body', function() {
			var query = Query.builder();
			assert.deepEqual({}, query.body());
			assert.strictEqual('{}', query.toString());
		});
	});

	describe('filter', function() {
		it('should be chainnable', function() {
			var query = Query.builder();
			assert.strictEqual(query, query.filter(Filter.gt('age', 12)));
		});

		it('should add an existing filter', function() {
			var query = Query.builder().filter(Filter.gt('age', 12));
			var body = {
				filter: [{
					age: {
						operator: '>',
						value: 12
					}
				}]
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"filter":[{"age":{"operator":">","value":12}}]}', query.toString());
		});

		it('should add filter from field/operator/value', function() {
			var query = Query.builder().filter('age', '>', 12);
			var body = {
				filter: [{
					age: {
						operator: '>',
						value: 12
					}
				}]
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"filter":[{"age":{"operator":">","value":12}}]}', query.toString());
		});

		it('should add filter from field/value', function() {
			var query = Query.builder().filter('age', 12);
			var body = {
				filter: [{
					age: {
						operator: '=',
						value: 12
					}
				}]
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"filter":[{"age":{"operator":"=","value":12}}]}', query.toString());
		});

		it('should add multiple filters', function() {
			var query = Query.builder()
				.filter(Filter.gt('age', 12))
				.filter('age', '<', 15)
				.filter('name', 'Foo');

			var bodyStr = '{"filter":[{"age":{"operator":">","value":12}},' +
				'{"age":{"operator":"<","value":15}},' +
				'{"name":{"operator":"=","value":"Foo"}}]}';
			assert.strictEqual(bodyStr, query.toString());
		});
	});

	describe('sort', function() {
		it('should be chainnable', function() {
			var query = Query.builder();
			assert.strictEqual(query, query.sort('age'));
		});

		it('should add a sort entry for the given field', function() {
			var query = Query.builder().sort('age');
			var body = {
				sort: [{
					age: 'asc'
				}]
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"sort":[{"age":"asc"}]}', query.toString());
		});

		it('should add a sort entry for the given field and direction', function() {
			var query = Query.builder().sort('age', 'desc');
			var body = {
				sort: [{
					age: 'desc'
				}]
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"sort":[{"age":"desc"}]}', query.toString());
		});

		it('should add multiple sort entries', function() {
			var query = Query.builder()
				.sort('age', 'desc')
				.sort('name');
			assert.strictEqual('{"sort":[{"age":"desc"},{"name":"asc"}]}', query.toString());
		});
	});

	describe('type', function() {
		it('should be chainnable', function() {
			var query = Query.builder();
			assert.strictEqual(query, query.type('count'));
		});

		it('should set the query type to the given value', function() {
			var query = Query.builder().type('customType');
			var body = {
				type: 'customType'
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"type":"customType"}', query.toString());
		});

		it('should set the query type to "count"', function() {
			var query = Query.builder().count();
			var body = {
				type: 'count'
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"type":"count"}', query.toString());
		});

		it('should set the query type to "fetch"', function() {
			var query = Query.builder().fetch();
			var body = {
				type: 'fetch'
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"type":"fetch"}', query.toString());
		});

		it('should set the query type to "scan"', function() {
			var query = Query.builder().scan();
			var body = {
				type: 'scan'
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"type":"scan"}', query.toString());
		});
	});

	describe('from', function() {
		it('should be chainnable', function() {
			var query = Query.builder();
			assert.strictEqual(query, query.from(10));
		});

		it('should set the query type to the given value', function() {
			var query = Query.builder().from(10);
			var body = {
				offset: 10
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"offset":10}', query.toString());
		});
	});

	describe('limit', function() {
		it('should be chainnable', function() {
			var query = Query.builder();
			assert.strictEqual(query, query.limit(10));
		});

		it('should set the query type to the given value', function() {
			var query = Query.builder().limit(10);
			var body = {
				limit: 10
			};
			assert.deepEqual(body, query.body());
			assert.strictEqual('{"limit":10}', query.toString());
		});
	});

	describe('all', function() {
		it('should create complex query with many different keys', function() {
			var query = Query.builder()
				.filter(Filter.gt('age', 12))
				.sort('age', 'desc')
				.sort('name')
				.from(5)
				.limit(10)
				.fetch();
			var bodyStr = '{' +
				'"filter":[{"age":{"operator":">","value":12}}],' +
				'"sort":[{"age":"desc"},{"name":"asc"}],' +
				'"offset":5,' +
				'"limit":10,' +
				'"type":"fetch"' +
				'}';
			assert.strictEqual(bodyStr, query.toString());
		});
	});
});