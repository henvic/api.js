'use strict';

import Auth from '../api/Auth';
import Embodied from '../api-query/Embodied';
import Filter from '../api-query/Filter';
import Query from '../api-query/Query';
import TransportFactory from './TransportFactory';
import ClientRequest from './ClientRequest';
import Util from './Util';
import MultiMap from './MultiMap';

/**
 * The main class for making api requests. Sending requests returns a promise that is
 * resolved when the response arrives. Usage example:
 * ```javascript
 * Launchpad
 *   .url('/data/tasks')
 *   .post({desc: 'Buy milkl'})
 *   .then(function(response) {
 *     // Handle response here.
 *     console.log(response.body())
 *   });
 * ```
 */
class Launchpad {
	/**
	 * Launchpad constructor function.
	 * @param {string} url The base url.
	 * @param {...string} paths Any amount of paths to be appended to the base url.
	 * @constructor
	 */
	constructor(url, ...paths) {
		if (arguments.length === 0) {
			throw new Error('Invalid arguments, try `new Launchpad(baseUrl, url)`');
		}

		this.auth_ = null;
		this.body_ = null;
		this.url_ = Util.joinPaths(url || '', ...paths);
		this.headers_ = new MultiMap();
		this.params_ = new MultiMap();

		this.header('Content-Type', 'application/json');
		this.header('X-PJAX', 'true');
		this.header('X-Requested-With', 'XMLHttpRequest');
	}

	/**
	 * Adds an aggregation to this {@link Query} instance.
	 * @param {string} name The aggregation name.
	 * @param {!Aggregation|string} aggregationOrField Either an
	 *   {@link Aggregation} instance or the name of the aggregation field.
	 * @param {string=} opt_operator The aggregation operator.
	 * @chainable
	 */
	aggregate(name, aggregationOrField, opt_operator) {
		this.getOrCreateQuery_().aggregate(name, aggregationOrField, opt_operator);
		return this;
	}

	/**
	 * Adds authorization information to this request.
	 * @param {!Auth|string} authOrTokenOrUsername Either an {@link Auth} instance,
	 *   an authorization token, or the username.
	 * @param {string=} opt_password If a username is given as the first param,
	 *   this should be the password.
	 * @chainable
	 */
	auth(authOrTokenOrUsername, opt_password) {
		this.auth_ = authOrTokenOrUsername;
		if (!(this.auth_ instanceof Auth)) {
			this.auth_ = Auth.create(authOrTokenOrUsername, opt_password);
		}
		return this;
	}

	/**
	 * Sets the body that will be sent with this request.
	 * @param {*} body
	 * @chainable
	 */
	body(body) {
		this.body_ = body;
		return this;
	}

	/**
	 * Converts the given body object to query params.
	 * @param {!ClientRequest} clientRequest
	 * @param {*} body
	 * @protected
	 */
	convertBodyToParams_(clientRequest, body) {
		if (typeof body === 'string') {
			body = {
				body: body
			};
		} else if (body instanceof Embodied) {
			body = body.body();
		}
		Object.keys(body || {}).forEach(name => clientRequest.param(name, body[name]));
	}

	/**
	 * Sets this request's query type to "count".
	 * @chainnable
	 */
	count() {
		this.getOrCreateQuery_().type('count');
		return this;
	}

	/**
	 * Creates client request and encode.
	 * @param {string} method
	 * @param {*} body
	 * @return {!ClientRequest} clientRequest
	 * @protected
	 */
	createClientRequest_(method, body) {
		var clientRequest = new ClientRequest();

		clientRequest.body(body || this.body_);

		if (!clientRequest.body()) {
			if (this.query_) {
				clientRequest.body(this.query_.body());
			} else if (this.formData_) {
				clientRequest.body(this.formData_);
			}
		}

		clientRequest.method(method);
		clientRequest.headers(this.headers());
		clientRequest.params(this.params());
		clientRequest.url(this.url());

		this.encode(clientRequest);

		return clientRequest;
	}

	/**
	 * Decodes clientResponse body, parsing the body for example.
	 * @param {!ClientResponse} clientResponse The response object to be decoded.
	 * @return {!ClientResponse} The decoded response.
	 */
	decode(clientResponse) {
		if (Launchpad.isContentTypeJson(clientResponse)) {
			try {
				clientResponse.body(JSON.parse(clientResponse.body()));
			} catch (err) {}
		}
		return clientResponse;
	}

	/**
	 * Sends message with the DELETE http verb.
	 * @param {string=} opt_body Content to be sent as the request's body.
	 * @return {!Promise}
	 */
	delete(opt_body) {
		return this.sendAsync('DELETE', opt_body);
	}

	/**
	 * Encodes the given {@link ClientRequest}, converting its body to an appropriate
	 * format for example.
	 * @param {!ClientRequest} clientRequest The request object to encode.
	 * @return {!ClientRequest} The encoded request.
	 */
	encode(clientRequest) {
		var body = clientRequest.body();

		if (typeof body === 'object' && body.nodeType === 1) {
			body = new FormData(body);
			clientRequest.body(body);
		}

		body = this.wrapWithQuery_(body);
		if (clientRequest.method() === 'GET') {
			this.convertBodyToParams_(clientRequest, body);
			clientRequest.removeBody();
			body = null;
		}

		if (body instanceof FormData) {
			clientRequest.headers().remove('content-type');
		} else if (body instanceof Embodied) {
			clientRequest.body(body.toString());
		} else if (Launchpad.isContentTypeJson(clientRequest)) {
			clientRequest.body(JSON.stringify(clientRequest.body()));
		}

		this.encodeParams_(clientRequest);
		this.resolveAuthentication_(clientRequest);

		return clientRequest;
	}

	/**
	 * Encodes the params for the given request, according to their types.
	 * @param {!ClientRequest} clientRequest
	 * @protected
	 */
	encodeParams_(clientRequest) {
		var params = clientRequest.params();
		params.names().forEach(function(name) {
			var values = params.getAll(name);
			values.forEach(function(value, index) {
				if (value instanceof Embodied) {
					value = value.toString();
				} else if (typeof value === 'object' || (value instanceof Array)) {
					value = JSON.stringify(value);
				}
				values[index] = value;
			});
		});
	}

	/**
	 * Adds a filter to this request's {@link Query}.
	 * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
	 *   name of the field to filter by.
	 * @param {*=} opt_operatorOrValue Either the field's operator or its value.
	 * @param {*=} opt_value The filter's value.
	 * @chainable
	 */
	filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
		this.getOrCreateQuery_().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
		return this;
	}

	/**
	 * Adds a key/value pair to be sent via the body in a `multipart/form-data` format.
	 * If the body is set by other means (for example, through the `body` method), this
	 * will be ignored.
	 * @param {string} name
	 * @param {*} value
	 * @chainable
	 */
	form(name, value) {
		if (!this.formData_) {
			this.formData_ = new FormData();
		}
		this.formData_.append(name, value);
		return this;
	}

	/**
	 * Sends message with the GET http verb.
	 * @param {*=} opt_params Params to be added to the request url.
	 * @return {!Promise}
	 */
	get(opt_params) {
		return this.sendAsync('GET', opt_params);
	}

	/**
	 * Gets the currently used {@link Query} object. If none exists yet,
	 * a new one is created.
	 * @return {!Query}
	 * @protected
	 */
	getOrCreateQuery_() {
		if (!this.query_) {
			this.query_ = new Query();
		}
		return this.query_;
	}

	/**
	 * Adds a header. If the header with the same name already exists, it will
	 * not be overwritten, but new value will be stored. The order is preserved.
	 * @param {string} name
	 * @param {*} value
	 * @chainable
	 */
	header(name, value) {
		if (arguments.length !== 2) {
			throw new Error('Invalid arguments');
		}
		this.headers_.set(name, value);
		return this;
	}

	/**
	 * Gets the headers.
	 * @return {!MultiMap}
	 */
	headers() {
		return this.headers_;
	}

	/**
	 * Adds a highlight entry to this request's {@link Query} instance.
	 * @param {string} field The field's name.
	 * @chainable
	 */
	highlight(field) {
		this.getOrCreateQuery_().highlight(field);
		return this;
	}

	/**
	 * Sets the limit for this request's {@link Query}.
	 * @param {number} limit The max amount of entries that this request should return.
	 * @chainable
	 */
	limit(limit) {
		this.getOrCreateQuery_().limit(limit);
		return this;
	}

	/**
	 * Sets the offset for this request's {@link Query}.
	 * @param {number} offset The index of the first entry that should be returned
	 *   by this query.
	 * @chainable
	 */
	offset(offset) {
		this.getOrCreateQuery_().offset(offset);
		return this;
	}

	/**
	 * Adds a query. If the query with the same name already exists, it will not
	 * be overwritten, but new value will be stored. The order is preserved.
	 * @param {string} name
	 * @param {*} value
	 * @chainable
	 */
	param(name, value) {
		if (arguments.length !== 2) {
			throw new Error('Invalid arguments');
		}
		this.params_.set(name, value);
		return this;
	}

	/**
	 * Gets the query strings map.
	 * @return {!MultiMap}
	 */
	params() {
		return this.params_;
	}

	/**
	 * Sends message with the PATCH http verb.
	 * @param {string=} opt_body Content to be sent as the request's body.
	 * @return {!Promise}
	 */
	patch(opt_body) {
		return this.sendAsync('PATCH', opt_body);
	}

	/**
	 * Creates a new {@link Launchpad} instance for handling the url resulting in the
	 * union of the current url with the given paths.
	 * @param {...string} paths Any number of paths.
	 * @return {!Launchpad} A new {@link Launchpad} instance for handling the given paths.
	 */
	path(...paths) {
		return new Launchpad(this.url(), ...paths).use(this.customTransport_);
	}

	/**
	 * Sends message with the POST http verb.
	 * @param {string=} opt_body Content to be sent as the request's body.
	 * @return {!Promise}
	 */
	post(opt_body) {
		return this.sendAsync('POST', opt_body);
	}

	/**
	 * Sends message with the PUT http verb.
	 * @param {string=} opt_body Content to be sent as the request's body.
	 * @return {!Promise}
	 */
	put(opt_body) {
		return this.sendAsync('PUT', opt_body);
	}

	/**
	 * Adds the authentication information to the request.
	 * @param {!ClientRequest} clientRequest
	 * @protected
	 */
	resolveAuthentication_(clientRequest) {
		if (!this.auth_) {
			return;
		}
		if (this.auth_.hasToken()) {
			clientRequest.header('Authorization', 'Bearer ' + this.auth_.token());
		} else {
			var credentials = this.auth_.username() + ':' + this.auth_.password();
			clientRequest.header('Authorization', 'Basic ' + btoa(credentials));
		}
	}

	/**
	 * Adds a search to this request's {@link Query} instance.
	 * @param {!Filter|string} filterOrTextOrField If no other arguments
	 *   are passed to this function, this should be either a `Filter`
	 *   instance or a text to be used in a match filter. In both cases
	 *   the filter will be applied to all fields. Another option is to
	 *   pass this as a field name instead, together with other arguments
	 *   so the filter can be created.
	 * @param {string=} opt_textOrOperator Either a text to be used in a
	 *   match filter, or the operator that should be used.
	 * @param {*=} opt_value The value to be used by the filter. Should
	 *   only be passed if an operator was passed as the second argument.
	 * @chainable
	 */
	search(filterOrTextOrField, opt_textOrOperator, opt_value) {
		this.getOrCreateQuery_().search(filterOrTextOrField, opt_textOrOperator, opt_value);
		return this;
	}

	/**
	 * Uses transport to send request with given method name and body
	 * asynchronously.
	 * @param {string} method The HTTP method to be used when sending data.
	 * @param {string} body Content to be sent as the request's body.
	 * @return {!Promise} Deferred request.
	 */
	sendAsync(method, body) {
		var transport = this.customTransport_ || TransportFactory.instance().getDefault();

		var clientRequest = this.createClientRequest_(method, body);

		return transport.send(clientRequest).then(this.decode);
	}

	/**
	 * Adds a sort query to this request's body.
	 * @param {string} field The field that the query should be sorted by.
	 * @param {string=} opt_direction The direction the sort operation should use.
	 *   If none is given, "asc" is used by default.
	 * @chainnable
	 */
	sort(field, opt_direction) {
		this.getOrCreateQuery_().sort(field, opt_direction);
		return this;
	}

	/**
	 * Static factory for creating launchpad client for the given url.
	 * @param {string} url The url that the client should use for sending requests.
	 */
	static url(url) {
		return new Launchpad(url).use(this.customTransport_);
	}

	/**
	 * Returns the URL used by this client.
	 */
	url() {
		return this.url_;
	}

	/**
	 * Specifies {@link Transport} implementation.
	 * @param {!Transport} transport The transport implementation that should be used.
	 */
	use(transport) {
		this.customTransport_ = transport;
		return this;
	}

	/**
	 * Creates new socket.io instance. The parameters passed to socket.io
	 * constructor will be provided:
	 *
	 * ```javascript
	 * Launchpad.url('http://domain:8080/path/a').watch({id: 'myId'}, {foo: true});
	 * // Equals:
	 * io('domain:8080/?url=path%2Fa%3Fid%3DmyId', {foo: true});
	 * ```
	 *
	 * @param {Object=} opt_params Params to be sent with the Socket IO request.
	 * @param {Object=} opt_options Object with Socket IO options.
	 * @return {!io} Socket IO reference. Server events can be listened on it.
	 */
	watch(opt_params, opt_options) {
		if (typeof io === 'undefined') {
			throw new Error('Socket.io client not loaded');
		}

		var clientRequest = this.createClientRequest_('GET', opt_params);

		var url = Util.parseUrl(
			Util.addParametersToUrlQueryString(clientRequest.url(), clientRequest.params()));

		opt_options = opt_options || {
				forceNew: true
		};
		opt_options.path = opt_options.path || url[1];

		return io(url[0] + '?url=' + encodeURIComponent(url[1] + url[2]), opt_options);
	}

	/**
	 * Wraps the given `Embodied` instance with a {@link Query} instance if needed.
	 * @param {Embodied} embodied
	 * @return {Embodied}
	 * @protected
	 */
	wrapWithQuery_(embodied) {
		if (embodied instanceof Filter) {
			embodied = Query.filter(embodied);
		}
		return embodied;
	}
}

Launchpad.isContentTypeJson = function(clientMessage) {
	var contentType = clientMessage.headers().get('content-type') || '';
	return contentType.indexOf('application/json') === 0;
};

export default Launchpad;
