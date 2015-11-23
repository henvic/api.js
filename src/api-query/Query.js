'use strict';

import Embodied from './Embodied';
import Filter from './Filter';
import Aggregation from './Aggregation';

/**
 * Class responsible for building queries.
 */
class Query extends Embodied {
	/**
	 * Adds an aggregation to this `Query` instance.
	 * @param {string} name The aggregation name.
	 * @param {!Aggregation|string} aggregationOrField Either an
	 *   `Aggregation` instance or the name of the aggregation field.
	 * @param {string} opt_operator The aggregation operator.
	 * @static
	 */
	static aggregate(name, aggregationOrField, opt_operator) {
		return new Query().aggregate(name, aggregationOrField, opt_operator);
	}

	/**
	 * Sets this query's type to "count".
	 * @static
	 */
	static count() {
		return new Query().type('count');
	}

	/**
	 * Sets this query's type to "fetch".
	 * @static
	 */
	static fetch() {
		return new Query().type('fetch');
	}

	/**
	 * Adds a filter to this Query.
	 * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
	 *   name of the field to filter by.
	 * @param {*} operatorOrValue Either the field's operator or its value.
	 * @param {*} opt_value The filter's value.
	 * @static
	 */
	static filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
		return new Query().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
	}

	/**
	 * Sets the query offset.
	 * @param {number} offset The index of the first entry that should be returned
	 *   by this query.
	 * @static
	 */
	static offset(offset) {
		return new Query().offset(offset);
	}

	/**
	 * Adds a highlight entry to this `Query` instance.
	 * @param {string} field The field's name.
	 * @static
	 */
	static highlight(field) {
		return new Query().highlight(field);
	}

	/**
	 * Sets the query limit.
	 * @param {number} limit The max amount of entries that this query should return.
	 * @static
	 */
	static limit(limit) {
		return new Query().limit(limit);
	}

	/**
	 * Adds a search to this `Query` instance.
	 * @param {!Filter|string} filterOrTextOrField If no other arguments
	 *   are passed to this function, this should be either a `Filter`
	 *   instance or a text to be used in a match filter. In both cases
	 *   the filter will be applied to all fields. Another option is to
	 *   pass this as a field name instead, together with other arguments
	 *   so the filter can be created.
	 * @param {string} opt_textOrOperator Either a text to be used in a
	 *   match filter, or the operator that should be used.
	 * @param {*} opt_value The value to be used by the filter. Should
	 *   only be passed if an operator was passed as the second argument.
	 * @static
	 */
	static search(filterOrTextOrField, opt_textOrOperator, opt_value) {
		return new Query().search(filterOrTextOrField, opt_textOrOperator, opt_value);
	}

	/**
	 * Adds a sort entry to this query, specifying the field this query should be
	 * sorted by and, optionally, the sort direction.
	 * @param {string} field The field that the query should be sorted by.
	 * @param {string} opt_direction The direction the sort operation should use.
	 *   If none is given, "asc" is used by default.
	 * @static
	 */
	static sort(field, opt_direction) {
		return new Query().sort(field, opt_direction);
	}

	/**
	 * Sets the query type.
	 * @param {string} type The query's type. For example: "count", "fetch".
	 * @static
	 */
	static type(type) {
		return new Query().type(type);
	}

	/**
	 * Adds an aggregation to this `Query` instance.
	 * @param {string} name The aggregation name.
	 * @param {!Aggregation|string} aggregationOrField Either an
	 *   `Aggregation` instance or the name of the aggregation field.
	 * @param {string} opt_operator The aggregation operator.
	 * @chainnable
	 */
	aggregate(name, aggregationOrField, opt_operator) {
		var aggregation = aggregationOrField;
		if (!(aggregation instanceof Aggregation)) {
			aggregation = Aggregation.field(aggregationOrField, opt_operator);
		}

		var field = aggregation.getField();
		var value = {};
		value[field] = {
			name: name,
			operator: aggregation.getOperator()
		};
		if (aggregation.getValue() !== undefined && aggregation.getValue() !== null) {
			value[field].value = aggregation.getValue();
		}

		if (!this.body_.aggregation) {
			this.body_.aggregation = [];
		}
		this.body_.aggregation.push(value);
		return this;
	}

	/**
	 * Sets this query's type to "count".
	 * @chainnable
	 */
	count() {
		return this.type('count');
	}

	/**
	 * Sets this query's type to "fetch".
	 * @chainnable
	 */
	fetch() {
		return this.type('fetch');
	}

	/**
	 * Adds a filter to this Query.
	 * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
	 *   name of the field to filter by.
	 * @param {*} operatorOrValue Either the field's operator or its value.
	 * @param {*} opt_value The filter's value.
	 * @chainnable
	 */
	filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
		var filter = Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value);
		if (!this.body_.filter) {
			this.body_.filter = [];
		}
		this.body_.filter.push(filter.body());
		return this;
	}

	/**
	 * Sets the query offset.
	 * @param {number} offset The index of the first entry that should be returned
	 *   by this query.
	 * @chainnable
	 */
	offset(offset) {
		this.body_.offset = offset;
		return this;
	}

	/**
	 * Adds a highlight entry to this `Query` instance.
	 * @param {string} field The field's name.
	 * @chainnable
	 */
	highlight(field) {
		if (!this.body_.highlight) {
			this.body_.highlight = [];
		}

		this.body_.highlight.push(field);
		return this;
	}

	/**
	 * Sets the query limit.
	 * @param {number} limit The max amount of entries that this query should return.
	 * @chainnable
	 */
	limit(limit) {
		this.body_.limit = limit;
		return this;
	}

	/**
	 * Adds a search to this `Query` instance.
	 * @param {!Filter|string} filterOrTextOrField If no other arguments
	 *   are passed to this function, this should be either a `Filter`
	 *   instance or a text to be used in a match filter. In both cases
	 *   the filter will be applied to all fields. Another option is to
	 *   pass this as a field name instead, together with other arguments
	 *   so the filter can be created.
	 * @param {string} opt_textOrOperator Either a text to be used in a
	 *   match filter, or the operator that should be used.
	 * @param {*} opt_value The value to be used by the filter. Should
	 *   only be passed if an operator was passed as the second argument.
	 * @chainnable
	 */
	search(filterOrTextOrField, opt_textOrOperator, opt_value) {
		var filter = filterOrTextOrField;
		if (opt_value) {
			filter = Filter.field(filterOrTextOrField, opt_textOrOperator, opt_value);
		} else if (opt_textOrOperator) {
			filter = Filter.match(filterOrTextOrField, opt_textOrOperator);
		} else if (!(filter instanceof Filter)) {
			filter = Filter.match(filterOrTextOrField);
		}
		if (!this.body_.search) {
			this.body_.search = [];
		}
		this.body_.search.push(filter.body());
		return this;
	}

	/**
	 * Adds a sort entry to this query, specifying the field this query should be
	 * sorted by and, optionally, the sort direction.
	 * @param {string} field The field that the query should be sorted by.
	 * @param {string} opt_direction The direction the sort operation should use.
	 *   If none is given, "asc" is used by default.
	 * @chainnable
	 */
	sort(field, opt_direction) {
		if (!this.body_.sort) {
			this.body_.sort = [];
		}
		var sortEntry = {};
		sortEntry[field] = opt_direction || 'asc';
		this.body_.sort.push(sortEntry);
		return this;
	}

	/**
	 * Sets the query type.
	 * @param {string} type The query's type. For example: "count", "fetch".
	 * @chainnable
	 */
	type(type) {
		this.body_.type = type;
		return this;
	}
}

export default Query;
