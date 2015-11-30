'use strict';

import Embodied from './Embodied';

/**
 * Class responsible for storing and handling the body contents
 * of a Filter instance.
 */
class FilterBody {
	/**
	 * Constructs a {@link FilterBody} instance.
	 * @param {string} field The name of the field to filter by.
	 * @param {*} operatorOrValue If a third param is given, this should
	 *   be the filter's operator (like ">="). Otherwise, this will be
	 *   used as the filter's value, and the filter's operator will be "=".
	 * @param {*=} opt_value The filter's value.
	 * @constructor
	 */
	constructor(field, operatorOrValue, opt_value) {
		var obj = {
			operator: (opt_value !== undefined) ? operatorOrValue : '='
		};
		var value = (opt_value !== undefined) ? opt_value : operatorOrValue;
		if (value !== undefined && value !== null) {
			if (value instanceof Embodied) {
				value = value.body();
			}
			obj.value = value;
		}
		this.createBody_(field, obj);
	}

	/**
	 * Composes the current filter with the given operator.
	 * @param {string} operator
	 * @param {Filter=} opt_filter Another filter to compose this filter with,
	 *   if the operator is not unary.
	 */
	add(operator, opt_filter) {
		if (opt_filter) {
			this.addArrayOperator_(operator, opt_filter);
		} else {
			this.createBody_(operator, this.body_);
		}
	}

	/**
	 * Composes the current filter with an operator that stores its values in an array.
	 * @param {string} operator
	 * @param {!Filter} filter
	 * @protected
	 */
	addArrayOperator_(operator, filter) {
		if (!(this.body_[operator] instanceof Array)) {
			this.createBody_(operator, [this.body_]);
		}
		this.body_[operator].push(filter.body());
	}

	/**
	 * Adds filters to be composed with this filter body using the given operator.
	 * @param {string} operator
	 * @param {...*} filters A variable amount of filters to be composed.
	 */
	addMany(operator, ...filters) {
		for (var i = 0; i < filters.length; i++) {
			this.add(operator, filters[i]);
		}
	}

	/**
	 * Creates a new body object, setting the requestd key to the given value.
	 * @param {string} key The key to set in the new body object
	 * @param {*} value The value the requested key should have in the new body object.
	 * @protected
	 */
	createBody_(key, value) {
		this.body_ = {};
		this.body_[key] = value;
	}

	/**
	 * Gets the json object that represents this filter's body.
	 * @return {!Object}
	 */
	getObject() {
		return this.body_;
	}
}

export default FilterBody;
