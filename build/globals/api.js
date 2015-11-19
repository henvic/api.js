this.launchpad = this.launchpad || {};
this.launchpadNamed = this.launchpadNamed || {};
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
})(typeof global === "undefined" ? self : global);
(function () {
	'use strict';

	/**
  * Class responsible for storing an object that will be printed as JSON
  * when the `toString` method is called.
  */

	var Embodied = (function () {
		/**
   * Constructs a Embodied instance.
   * @constructor
   */

		function Embodied() {
			babelHelpers.classCallCheck(this, Embodied);

			this.body_ = {};
		}

		/**
   * Gets the json object that represents this instance.
   * @return {!Object}
   */
		babelHelpers.createClass(Embodied, [{
			key: 'body',
			value: function body() {
				return this.body_;
			}

			/**
    * If the given object is an instance of Embodied, this will
    * return its body content. Otherwise this will return the
    * original object.
    * @param  {*} obj
    * @return {*}
    * @static
    */
		}, {
			key: 'toString',

			/**
    * Gets the json string that represents this instance.
    * @return {string}
    */
			value: function toString() {
				return JSON.stringify(this.body());
			}
		}], [{
			key: 'toBody',
			value: function toBody(obj) {
				return obj instanceof Embodied ? obj.body() : obj;
			}
		}]);
		return Embodied;
	})();

	this.launchpad.Embodied = Embodied;
}).call(this);
(function () {
	'use strict';

	/**
  * A collection of core utility functions.
  * @const
  */

	var core = (function () {
		function core() {
			babelHelpers.classCallCheck(this, core);
		}

		/**
   * Unique id property prefix.
   * @type {String}
   * @protected
   */
		babelHelpers.createClass(core, null, [{
			key: 'abstractMethod',

			/**
    * When defining a class Foo with an abstract method bar(), you can do:
    * Foo.prototype.bar = core.abstractMethod
    *
    * Now if a subclass of Foo fails to override bar(), an error will be thrown
    * when bar() is invoked.
    *
    * @type {!Function}
    * @throws {Error} when invoked to indicate the method should be overridden.
    */
			value: function abstractMethod() {
				throw Error('Unimplemented abstract method');
			}

			/**
    * Loops constructor super classes collecting its properties values. If
    * property is not available on the super class `undefined` will be
    * collected as value for the class hierarchy position.
    * @param {!function()} constructor Class constructor.
    * @param {string} propertyName Property name to be collected.
    * @return {Array.<*>} Array of collected values.
    * TODO(*): Rethink superclass loop.
    */
		}, {
			key: 'collectSuperClassesProperty',
			value: function collectSuperClassesProperty(constructor, propertyName) {
				var propertyValues = [constructor[propertyName]];
				while (constructor.__proto__ && !constructor.__proto__.isPrototypeOf(Function)) {
					constructor = constructor.__proto__;
					propertyValues.push(constructor[propertyName]);
				}
				return propertyValues;
			}

			/**
    * Gets the name of the given function. If the current browser doesn't
    * support the `name` property, this will calculate it from the function's
    * content string.
    * @param {!function()} fn
    * @return {string}
    */
		}, {
			key: 'getFunctionName',
			value: function getFunctionName(fn) {
				if (!fn.name) {
					var str = fn.toString();
					fn.name = str.substring(9, str.indexOf('('));
				}
				return fn.name;
			}

			/**
    * Gets an unique id. If `opt_object` argument is passed, the object is
    * mutated with an unique id. Consecutive calls with the same object
    * reference won't mutate the object again, instead the current object uid
    * returns. See {@link core.UID_PROPERTY}.
    * @type {opt_object} Optional object to be mutated with the uid. If not
    *     specified this method only returns the uid.
    * @throws {Error} when invoked to indicate the method should be overridden.
    */
		}, {
			key: 'getUid',
			value: function getUid(opt_object) {
				if (opt_object) {
					return opt_object[core.UID_PROPERTY] || (opt_object[core.UID_PROPERTY] = core.uniqueIdCounter_++);
				}
				return core.uniqueIdCounter_++;
			}

			/**
    * The identity function. Returns its first argument.
    * @param {*=} opt_returnValue The single value that will be returned.
    * @return {?} The first argument.
    */
		}, {
			key: 'identityFunction',
			value: function identityFunction(opt_returnValue) {
				return opt_returnValue;
			}

			/**
    * Returns true if the specified value is a boolean.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is boolean.
    */
		}, {
			key: 'isBoolean',
			value: function isBoolean(val) {
				return typeof val === 'boolean';
			}

			/**
    * Returns true if the specified value is not undefined.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is defined.
    */
		}, {
			key: 'isDef',
			value: function isDef(val) {
				return val !== undefined;
			}

			/**
    * Returns true if value is not undefined or null.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isDefAndNotNull',
			value: function isDefAndNotNull(val) {
				return core.isDef(val) && !core.isNull(val);
			}

			/**
    * Returns true if value is a document.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isDocument',
			value: function isDocument(val) {
				return val && typeof val === 'object' && val.nodeType === 9;
			}

			/**
    * Returns true if value is a dom element.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isElement',
			value: function isElement(val) {
				return val && typeof val === 'object' && val.nodeType === 1;
			}

			/**
    * Returns true if the specified value is a function.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is a function.
    */
		}, {
			key: 'isFunction',
			value: function isFunction(val) {
				return typeof val === 'function';
			}

			/**
    * Returns true if value is null.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isNull',
			value: function isNull(val) {
				return val === null;
			}

			/**
    * Returns true if the specified value is a number.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is a number.
    */
		}, {
			key: 'isNumber',
			value: function isNumber(val) {
				return typeof val === 'number';
			}

			/**
    * Returns true if value is a window.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isWindow',
			value: function isWindow(val) {
				return val !== null && val === val.window;
			}

			/**
    * Returns true if the specified value is an object. This includes arrays
    * and functions.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is an object.
    */
		}, {
			key: 'isObject',
			value: function isObject(val) {
				var type = typeof val;
				return type === 'object' && val !== null || type === 'function';
			}

			/**
    * Returns true if value is a string.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isString',
			value: function isString(val) {
				return typeof val === 'string';
			}

			/**
    * Merges the values of a static property a class with the values of that
    * property for all its super classes, and stores it as a new static
    * property of that class. If the static property already existed, it won't
    * be recalculated.
    * @param {!function()} constructor Class constructor.
    * @param {string} propertyName Property name to be collected.
    * @param {function(*, *):*=} opt_mergeFn Function that receives an array filled
    *   with the values of the property for the current class and all its super classes.
    *   Should return the merged value to be stored on the current class.
    * @return {boolean} Returns true if merge happens, false otherwise.
    */
		}, {
			key: 'mergeSuperClassesProperty',
			value: function mergeSuperClassesProperty(constructor, propertyName, opt_mergeFn) {
				var mergedName = propertyName + '_MERGED';
				if (constructor.hasOwnProperty(mergedName)) {
					return false;
				}

				var merged = core.collectSuperClassesProperty(constructor, propertyName);
				if (opt_mergeFn) {
					merged = opt_mergeFn(merged);
				}
				constructor[mergedName] = merged;
				return true;
			}

			/**
    * Null function used for default values of callbacks, etc.
    * @return {void} Nothing.
    */
		}, {
			key: 'nullFunction',
			value: function nullFunction() {}
		}]);
		return core;
	})();

	core.UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

	/**
  * Counter for unique id.
  * @type {Number}
  * @private
  */
	core.uniqueIdCounter_ = 1;

	this.launchpad.core = core;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Embodied = this.launchpad.Embodied;

	/**
  * Class responsible for building range objects to be used by `Filter`.
  */

	var Range = (function (_Embodied) {
		babelHelpers.inherits(Range, _Embodied);

		/**
   * Constructs a Range instance.
   * @param {*} from
   * @param {*} opt_to
   * @constructor
   */

		function Range(from, opt_to) {
			babelHelpers.classCallCheck(this, Range);

			babelHelpers.get(Object.getPrototypeOf(Range.prototype), 'constructor', this).call(this);
			if (core.isDefAndNotNull(from)) {
				this.body_.from = from;
			}
			if (core.isDefAndNotNull(opt_to)) {
				this.body_.to = opt_to;
			}
		}

		/**
   * Constructs a Range instance.
   * @param {*} from
   * @return {!Range}
   * @static
   */
		babelHelpers.createClass(Range, null, [{
			key: 'from',
			value: function from(_from) {
				return new Range(_from);
			}

			/**
    * Constructs a Range instance.
    * @param {*} from
    * @param {*} to
    * @return {!Range}
    * @static
    */
		}, {
			key: 'range',
			value: function range(from, to) {
				return new Range(from, to);
			}

			/**
    * Constructs a Range instance.
    * @param {*} to
    * @return {!Range}
    * @static
    */
		}, {
			key: 'to',
			value: function to(_to) {
				return new Range(null, _to);
			}
		}]);
		return Range;
	})(Embodied);

	this.launchpad.Range = Range;
}).call(this);
(function () {
	'use strict';

	var Embodied = this.launchpad.Embodied;
	var Range = this.launchpad.Range;

	/**
  * Class that represents a search aggregation.
  */

	var Aggregation = (function () {
		/**
   * Constructs an `Aggregation` instance.
   * @param {string} field The aggregation field.
   * @param {string} operator The aggregation operator.
   * @param {*} opt_value The aggregation value.
   * @constructor
   */

		function Aggregation(field, operator, opt_value) {
			babelHelpers.classCallCheck(this, Aggregation);

			this.field_ = field;
			this.operator_ = operator;
			this.value_ = opt_value;
		}

		/**
   * Class that represents a distance aggregation.
   */

		/**
   * Creates an `Aggregation` instance with the "avg" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */
		babelHelpers.createClass(Aggregation, [{
			key: 'getField',

			/**
    * Gets this aggregation's field.
    * @return {string}
    */
			value: function getField() {
				return this.field_;
			}

			/**
    * Gets this aggregation's operator.
    * @return {string}
    */
		}, {
			key: 'getOperator',
			value: function getOperator() {
				return this.operator_;
			}

			/**
    * Gets this aggregation's value.
    * @return {*}
    */
		}, {
			key: 'getValue',
			value: function getValue() {
				return this.value_;
			}

			/**
    * Creates an `Aggregation` instance with the "histogram" operator.
    * @param {string} field The aggregation field.
    * @param {number} interval The histogram's interval.
    * @return {!Aggregation}
    * @static
    */
		}], [{
			key: 'avg',
			value: function avg(field) {
				return Aggregation.field(field, 'avg');
			}

			/**
    * Creates an `Aggregation` instance with the "count" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'count',
			value: function count(field) {
				return Aggregation.field(field, 'count');
			}

			/**
    * Creates an `Aggregation.DistanceAggregation` instance with the "geoDistance" operator.
    * @param {string} field The aggregation field.
    * @param {*} location The aggregation location.
    * @param {...!Range} ranges The aggregation ranges.
    * @return {!Aggregation.DistanceAggregation}
    * @static
    */
		}, {
			key: 'distance',
			value: function distance(field, location) {
				for (var _len = arguments.length, ranges = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					ranges[_key - 2] = arguments[_key];
				}

				return new (babelHelpers.bind.apply(Aggregation.DistanceAggregation, [null].concat([field, location], ranges)))();
			}

			/**
    * Creates an `Aggregation` instance with the "extendedStats" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'extendedStats',
			value: function extendedStats(field) {
				return Aggregation.field(field, 'extendedStats');
			}
		}, {
			key: 'histogram',
			value: function histogram(field, interval) {
				return new Aggregation(field, 'histogram', interval);
			}

			/**
    * Creates an `Aggregation` instance with the "max" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'max',
			value: function max(field) {
				return Aggregation.field(field, 'max');
			}

			/**
    * Creates an `Aggregation` instance with the "min" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'min',
			value: function min(field) {
				return Aggregation.field(field, 'min');
			}

			/**
    * Creates an `Aggregation` instance with the "missing" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'missing',
			value: function missing(field) {
				return Aggregation.field(field, 'missing');
			}

			/**
    * Creates a new `Aggregation` instance.
    * @param {string} field The aggregation field.
    * @param {string} operator The aggregation operator.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'field',
			value: function field(_field, operator) {
				return new Aggregation(_field, operator);
			}

			/**
    * Creates an `Aggregation.RangeAggregation` instance with the "range" operator.
    * @param {string} field The aggregation field.
    * @param {...!Range} ranges The aggregation ranges.
    * @return {!Aggregation.RangeAggregation}
    * @static
    */
		}, {
			key: 'range',
			value: function range(field) {
				for (var _len2 = arguments.length, ranges = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					ranges[_key2 - 1] = arguments[_key2];
				}

				return new (babelHelpers.bind.apply(Aggregation.RangeAggregation, [null].concat([field], ranges)))();
			}

			/**
    * Creates an `Aggregation` instance with the "stats" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'stats',
			value: function stats(field) {
				return Aggregation.field(field, 'stats');
			}

			/**
    * Creates an `Aggregation` instance with the "sum" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'sum',
			value: function sum(field) {
				return Aggregation.field(field, 'sum');
			}

			/**
    * Creates an `Aggregation` instance with the "terms" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */
		}, {
			key: 'terms',
			value: function terms(field) {
				return Aggregation.field(field, 'terms');
			}
		}]);
		return Aggregation;
	})();

	var DistanceAggregation = (function (_Aggregation) {
		babelHelpers.inherits(DistanceAggregation, _Aggregation);

		/**
   * Constructs an `DistanceAggregation` instance.
   * @param {string} field The aggregation field.
   * @param {*} location The aggregation location.
   * @param {...!Range} ranges The aggregation ranges.
   * @constructor
   */

		function DistanceAggregation(field, location) {
			babelHelpers.classCallCheck(this, DistanceAggregation);

			babelHelpers.get(Object.getPrototypeOf(DistanceAggregation.prototype), 'constructor', this).call(this, field, 'geoDistance', {});
			this.value_.location = Embodied.toBody(location);

			for (var _len3 = arguments.length, ranges = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
				ranges[_key3 - 2] = arguments[_key3];
			}

			this.value_.ranges = ranges.map(function (range) {
				return range.body();
			});
		}

		/**
   * Adds a range to this aggregation.
   * @param {*} rangeOrFrom
   * @param {*} opt_to
   * @chainnable
   */
		babelHelpers.createClass(DistanceAggregation, [{
			key: 'range',
			value: function range(rangeOrFrom, opt_to) {
				var range = rangeOrFrom;
				if (!(range instanceof Range)) {
					range = Range.range(rangeOrFrom, opt_to);
				}
				this.value_.ranges.push(range.body());
				return this;
			}

			/**
    * Sets this aggregation's unit.
    * @param {string} unit
    * @chainnable
    */
		}, {
			key: 'unit',
			value: function unit(_unit) {
				this.value_.unit = _unit;
				return this;
			}
		}]);
		return DistanceAggregation;
	})(Aggregation);

	Aggregation.DistanceAggregation = DistanceAggregation;

	/**
  * Class that represents a range aggregation.
  */

	var RangeAggregation = (function (_Aggregation2) {
		babelHelpers.inherits(RangeAggregation, _Aggregation2);

		/**
   * Constructs an `RangeAggregation` instance.
   * @param {string} field The aggregation field.
   * @param {...!Range} ranges The aggregation ranges.
   * @constructor
   */

		function RangeAggregation(field) {
			babelHelpers.classCallCheck(this, RangeAggregation);

			babelHelpers.get(Object.getPrototypeOf(RangeAggregation.prototype), 'constructor', this).call(this, field, 'range');

			for (var _len4 = arguments.length, ranges = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				ranges[_key4 - 1] = arguments[_key4];
			}

			this.value_ = ranges.map(function (range) {
				return range.body();
			});
		}

		/**
   * Adds a range to this aggregation.
   * @param {*} rangeOrFrom
   * @param {*} opt_to
   * @chainnable
   */
		babelHelpers.createClass(RangeAggregation, [{
			key: 'range',
			value: function range(rangeOrFrom, opt_to) {
				var range = rangeOrFrom;
				if (!(range instanceof Range)) {
					range = Range.range(rangeOrFrom, opt_to);
				}
				this.value_.push(range.body());
				return this;
			}
		}]);
		return RangeAggregation;
	})(Aggregation);

	Aggregation.RangeAggregation = RangeAggregation;

	this.launchpad.Aggregation = Aggregation;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Embodied = this.launchpad.Embodied;

	/**
  * Class responsible for storing and handling the body contents
  * of a Filter instance.
  */

	var FilterBody = (function () {
		/**
   * Constructs a FilterBody instance.
   * @param {string} field The name of the field to filter by.
   * @param {*} operatorOrValue If a third param is given, this should
   *   be the filter's operator (like ">="). Otherwise, this will be
   *   used as the filter's value, and the filter's operator will be "=".
   * @param {*} opt_value The filter's value.
   * @constructor
   */

		function FilterBody(field, operatorOrValue, opt_value) {
			babelHelpers.classCallCheck(this, FilterBody);

			var obj = {
				operator: core.isDef(opt_value) ? operatorOrValue : '='
			};
			var value = core.isDef(opt_value) ? opt_value : operatorOrValue;
			if (core.isDefAndNotNull(value)) {
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
   * @param {Filter} opt_filter Another filter to compose this filter with,
   *   if the operator is not unary.
   */
		babelHelpers.createClass(FilterBody, [{
			key: 'add',
			value: function add(operator, opt_filter) {
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
		}, {
			key: 'addArrayOperator_',
			value: function addArrayOperator_(operator, filter) {
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
		}, {
			key: 'addMany',
			value: function addMany(operator) {
				for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					filters[_key - 1] = arguments[_key];
				}

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
		}, {
			key: 'createBody_',
			value: function createBody_(key, value) {
				this.body_ = {};
				this.body_[key] = value;
			}

			/**
    * Gets the json object that represents this filter's body.
    * @return {!Object}
    */
		}, {
			key: 'getObject',
			value: function getObject() {
				return this.body_;
			}
		}]);
		return FilterBody;
	})();

	this.launchpad.FilterBody = FilterBody;
}).call(this);
(function () {
	'use strict';

	var Embodied = this.launchpad.Embodied;

	/**
  * Class responsible for building different types of geometric
  * shapes.
  */

	var Geo = (function () {
		function Geo() {
			babelHelpers.classCallCheck(this, Geo);
		}

		/**
   * Class that represents a point coordinate.
   */
		babelHelpers.createClass(Geo, null, [{
			key: 'boundingBox',

			/**
    * Creates a new `Geo.BoundingBox` instance.
    * @param {*} upperLeft The upper left point.
    * @param {*} lowerRight The lower right point.
    * @return {Geo.BoundingBox}
    * @static
    */
			value: function boundingBox(upperLeft, lowerRight) {
				return new Geo.BoundingBox(upperLeft, lowerRight);
			}

			/**
    * Creates a new `Geo.Circle` instance.
    * @param {*} center The circle's center coordinate.
    * @param {string} radius The circle's radius.
    * @return {Geo.Circle}
    * @static
    */
		}, {
			key: 'circle',
			value: function circle(center, radius) {
				return new Geo.Circle(center, radius);
			}

			/**
    * Creates a new `Geo.Line` instance.
    * @param {...*} points This line's points.
    * @return {Geo.Line}
    * @static
    */
		}, {
			key: 'line',
			value: function line() {
				for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
					points[_key] = arguments[_key];
				}

				return new (babelHelpers.bind.apply(Geo.Line, [null].concat(points)))();
			}

			/**
    * Creates a new `Geo.Point` instance.
    * @param {number} lat The latitude coordinate
    * @param {number} lon The longitude coordinate
    * @return {Geo.Point}
    * @static
    */
		}, {
			key: 'point',
			value: function point(lat, lon) {
				return new Geo.Point(lat, lon);
			}

			/**
    * Creates a new `Geo.Polygon` instance.
    * @param {...*} points This polygon's points.
    * @return {Geo.Polygon}
    * @static
    */
		}, {
			key: 'polygon',
			value: function polygon() {
				for (var _len2 = arguments.length, points = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					points[_key2] = arguments[_key2];
				}

				return new (babelHelpers.bind.apply(Geo.Polygon, [null].concat(points)))();
			}
		}]);
		return Geo;
	})();

	var Point = (function (_Embodied) {
		babelHelpers.inherits(Point, _Embodied);

		/**
   * Constructs a `Geo.Point` instance.
   * @param {number} lat The latitude coordinate
   * @param {number} lon The longitude coordinate
   * @constructor
   */

		function Point(lat, lon) {
			babelHelpers.classCallCheck(this, Point);

			babelHelpers.get(Object.getPrototypeOf(Point.prototype), 'constructor', this).call(this);
			this.body_ = [lat, lon];
		}

		return Point;
	})(Embodied);

	Geo.Point = Point;

	/**
  * Class that represents a line.
  */

	var Line = (function (_Embodied2) {
		babelHelpers.inherits(Line, _Embodied2);

		/**
   * Constructs a `Geo.Line` instance.
   * @param {...*} points This line's points.
   * @constructor
   */

		function Line() {
			babelHelpers.classCallCheck(this, Line);

			babelHelpers.get(Object.getPrototypeOf(Line.prototype), 'constructor', this).call(this);

			for (var _len3 = arguments.length, points = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				points[_key3] = arguments[_key3];
			}

			this.body_ = {
				type: 'linestring',
				coordinates: points.map(function (point) {
					return Embodied.toBody(point);
				})
			};
		}

		return Line;
	})(Embodied);

	Geo.Line = Line;

	/**
  * Class that represents a bounding box.
  */

	var BoundingBox = (function (_Embodied3) {
		babelHelpers.inherits(BoundingBox, _Embodied3);

		/**
   * Constructs a `Geo.BoundingBox` instance.
   * @param {*} upperLeft The upper left point.
   * @param {*} lowerRight The lower right point.
   * @constructor
   */

		function BoundingBox(upperLeft, lowerRight) {
			babelHelpers.classCallCheck(this, BoundingBox);

			babelHelpers.get(Object.getPrototypeOf(BoundingBox.prototype), 'constructor', this).call(this);
			this.body_ = {
				type: 'envelope',
				coordinates: [Embodied.toBody(upperLeft), Embodied.toBody(lowerRight)]
			};
		}

		/**
   * Gets this bounding box's points.
   * @return {!Array}
   */
		babelHelpers.createClass(BoundingBox, [{
			key: 'getPoints',
			value: function getPoints() {
				return this.body_.coordinates;
			}
		}]);
		return BoundingBox;
	})(Embodied);

	Geo.BoundingBox = BoundingBox;

	/**
  * Class that represents a circle.
  */

	var Circle = (function (_Embodied4) {
		babelHelpers.inherits(Circle, _Embodied4);

		/**
   * Constructs a `Geo.Circle` instance.
   * @param {*} center The circle's center coordinate.
   * @param {string} radius The circle's radius.
   * @constructor
   */

		function Circle(center, radius) {
			babelHelpers.classCallCheck(this, Circle);

			babelHelpers.get(Object.getPrototypeOf(Circle.prototype), 'constructor', this).call(this);
			this.body_ = {
				type: 'circle',
				coordinates: Embodied.toBody(center),
				radius: radius
			};
		}

		/**
   * Gets this circle's center coordinate.
   * @return {*}
   */
		babelHelpers.createClass(Circle, [{
			key: 'getCenter',
			value: function getCenter() {
				return this.body_.coordinates;
			}

			/**
    * Gets this circle's radius.
    * @return {string}
    */
		}, {
			key: 'getRadius',
			value: function getRadius() {
				return this.body_.radius;
			}
		}]);
		return Circle;
	})(Embodied);

	Geo.Circle = Circle;

	/**
  * Class that represents a polygon.
  */

	var Polygon = (function (_Embodied5) {
		babelHelpers.inherits(Polygon, _Embodied5);

		/**
   * Constructs a `Geo.Polygon` instance.
   * @param {...*} points This polygon's points.
   * @constructor
   */

		function Polygon() {
			babelHelpers.classCallCheck(this, Polygon);

			babelHelpers.get(Object.getPrototypeOf(Polygon.prototype), 'constructor', this).call(this);
			this.body_ = {
				type: 'polygon',
				coordinates: []
			};
			this.addCoordinates_.apply(this, arguments);
		}

		/**
   * Adds the given points as coordinates for this polygon.
   * @param {...*} points
   * @protected
   */
		babelHelpers.createClass(Polygon, [{
			key: 'addCoordinates_',
			value: function addCoordinates_() {
				for (var _len4 = arguments.length, points = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					points[_key4] = arguments[_key4];
				}

				this.body_.coordinates.push(points.map(function (point) {
					return Embodied.toBody(point);
				}));
			}

			/**
    * Adds the given points as a hole inside this polygon.
    * @param  {...*} points
    * @chainnable
    */
		}, {
			key: 'hole',
			value: function hole() {
				this.addCoordinates_.apply(this, arguments);
				return this;
			}
		}]);
		return Polygon;
	})(Embodied);

	Geo.Polygon = Polygon;

	this.launchpad.Geo = Geo;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Embodied = this.launchpad.Embodied;
	var FilterBody = this.launchpad.FilterBody;
	var Geo = this.launchpad.Geo;
	var Range = this.launchpad.Range;

	/**
  * Class responsible for building filters.
  */

	var Filter = (function (_Embodied) {
		babelHelpers.inherits(Filter, _Embodied);

		/**
   * Constructs a Filter instance.
   * @param {string} field The name of the field to filter by.
   * @param {*} operatorOrValue If a third param is given, this should
   *   be the filter's operator (like ">="). Otherwise, this will be
   *   used as the filter's value, and the filter's operator will be "=".
   * @param {*} opt_value The filter's value.
   * @constructor
   */

		function Filter(field, operatorOrValue, opt_value) {
			babelHelpers.classCallCheck(this, Filter);

			babelHelpers.get(Object.getPrototypeOf(Filter.prototype), 'constructor', this).call(this);
			this.body_ = new FilterBody(field, operatorOrValue, opt_value);
		}

		/**
   * String constant that represents all fields.
   * @type {string}
   * @static
   */

		/**
   * Adds a filter to be composed with this filter using the given operator.
   * @param {string} operator
   * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
   *   name of the field to filter by.
   * @param {*} opt_operatorOrValue Either the field's operator or its value.
   * @param {*} opt_value The filter's value.
   * @chainnable
   */
		babelHelpers.createClass(Filter, [{
			key: 'add',
			value: function add(operator, fieldOrFilter, opt_operatorOrValue, opt_value) {
				var filter = fieldOrFilter ? Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value) : null;
				this.body_.add(operator, filter);
				return this;
			}

			/**
    * Adds filters to be composed with this filter using the given operator.
    * @param {string} operator
    * @param {...*} filters A variable amount of filters to be composed.
    * @chainnable
    */
		}, {
			key: 'addMany',
			value: function addMany(operator) {
				var _body_;

				for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					filters[_key - 1] = arguments[_key];
				}

				(_body_ = this.body_).addMany.apply(_body_, [operator].concat(filters));
				return this;
			}

			/**
    * Adds a filter to be composed with this filter using the "and" operator.
    * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
    *   name of the field to filter by.
    * @param {*} opt_operatorOrValue Either the field's operator or its value.
    * @param {*} opt_value The filter's value.
    * @chainnable
    */
		}, {
			key: 'and',
			value: function and(fieldOrFilter, opt_operatorOrValue, opt_value) {
				return this.add('and', fieldOrFilter, opt_operatorOrValue, opt_value);
			}

			/**
    * Returns a Filter instance that uses the "any" operator.
    * @param {string} field The name of the field to filter by.
    * @param {!Array|(...*)} value A variable amount of values to be used with
    *   the "none" operator. Can be passed either as a single array or as
    *   separate params.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'body',

			/**
    * Gets the json object that represents this filter.
    * @return {!Object}
    */
			value: function body() {
				return this.body_.getObject();
			}

			/**
    * Returns a Filter instance that uses the "gd" operator.
    * @param {string} field The field's name.
    * @param {*} locationOrCircle Either a `Geo.Circle` instance or a coordinate.
    * @param {Range|string=} opt_rangeOrDistance Either a `Range` instance or
    *   the distance value.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'or',

			/**
    * Adds a filter to be composed with this filter using the "or" operator.
    * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
    *   name of the field to filter by.
    * @param {*} opt_operatorOrValue Either the field's operator or its value.
    * @param {*} opt_value The filter's value.
    * @chainnable
    */
			value: function or(fieldOrFilter, opt_operatorOrValue, opt_value) {
				return this.add('or', fieldOrFilter, opt_operatorOrValue, opt_value);
			}

			/**
    * Converts the given arguments into a Filter instance.
    * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
    *   name of the field to filter by.
    * @param {*} opt_operatorOrValue Either the field's operator or its value.
    * @param {*} opt_value The filter's value.
    * @return {!Filter}
    */
		}], [{
			key: 'any',
			value: function any(field) {
				var values = Array.prototype.slice.call(arguments, 1);
				if (values.length === 1 && values[0] instanceof Array) {
					values = values[0];
				}
				return new Filter(field, 'any', values);
			}

			/**
    * Returns a Filter instance that uses the "gp" operator.
    * This is a special use case of `Filter.polygon` for bounding
    * boxes.
    * @param {string} field The field's name.
    * @param {*} boxOrUpperLeft Either a `Geo.BoundingBox` instance, or
    *   a bounding box's upper left coordinate.
    * @param {*} opt_lowerRight A bounding box's lower right coordinate.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'boundingBox',
			value: function boundingBox(field, boxOrUpperLeft, opt_lowerRight) {
				if (boxOrUpperLeft instanceof Geo.BoundingBox) {
					return Filter.polygon.apply(Filter, [field].concat(babelHelpers.toConsumableArray(boxOrUpperLeft.getPoints())));
				} else {
					return Filter.polygon(field, boxOrUpperLeft, opt_lowerRight);
				}
			}
		}, {
			key: 'distance',
			value: function distance(field, locationOrCircle, opt_rangeOrDistance) {
				var location = locationOrCircle;
				var range = opt_rangeOrDistance;
				if (locationOrCircle instanceof Geo.Circle) {
					location = locationOrCircle.getCenter();
					range = Range.to(locationOrCircle.getRadius());
				} else if (!(opt_rangeOrDistance instanceof Range)) {
					range = Range.to(opt_rangeOrDistance);
				}
				return Filter.distanceInternal_(field, location, range);
			}

			/**
    * Returns a Filter instance that uses the "gd" operator. This
    * is just an internal helper used by `Filter.distance`.
    * @param {string} field The field's name.
    * @param {*} location A location coordinate.
    * @param {Range} range A `Range` instance.
    * @return {!Filter}
    * @protected
    * @static
    */
		}, {
			key: 'distanceInternal_',
			value: function distanceInternal_(field, location, range) {
				var value = {
					location: Embodied.toBody(location)
				};
				range = range.body();
				if (range.from) {
					value.min = range.from;
				}
				if (range.to) {
					value.max = range.to;
				}
				return Filter.field(field, 'gd', value);
			}

			/**
    * Returns a Filter instance that uses the "=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'equal',
			value: function equal(field, value) {
				return new Filter(field, '=', value);
			}

			/**
    * Returns a Filter instance that uses the "exists" operator.
    * @param {string} field The field's name.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'exists',
			value: function exists(field) {
				return Filter.field(field, 'exists', null);
			}

			/**
    * Returns a Filter instance that uses the "fuzzy" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string|number=} opt_queryOrFuzziness If this is a string, it should
    *   be the query, otherwise it should be the fuzziness value.
    * @param {number=} opt_fuzziness The fuzziness value.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'fuzzy',
			value: function fuzzy(fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness) {
				return Filter.fuzzyInternal_('fuzzy', fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness);
			}

			/**
    * Returns a Filter instance that uses the given fuzzy operator. This
    * is an internal implementation used by the `Filter.fuzzy` method.
    * @param {string} operator The fuzzy operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string|number=} opt_queryOrFuzziness If this is a string, it should
    *   be the query, otherwise it should be the fuzziness value.
    * @param {number=} opt_fuzziness The fuzziness value.
    * @return {!Filter}
    * @protected
    * @static
    */
		}, {
			key: 'fuzzyInternal_',
			value: function fuzzyInternal_(operator, fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness) {
				var arg2IsString = core.isString(opt_queryOrFuzziness);

				var value = {
					query: arg2IsString ? opt_queryOrFuzziness : fieldOrQuery
				};
				var fuzziness = arg2IsString ? opt_fuzziness : opt_queryOrFuzziness;
				if (fuzziness) {
					value.fuzziness = fuzziness;
				}

				var field = arg2IsString ? fieldOrQuery : Filter.ALL;
				return Filter.field(field, operator, value);
			}

			/**
    * Returns a Filter instance that uses the ">" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'gt',
			value: function gt(field, value) {
				return new Filter(field, '>', value);
			}

			/**
    * Returns a Filter instance that uses the ">=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'gte',
			value: function gte(field, value) {
				return new Filter(field, '>=', value);
			}

			/**
    * Returns a Filter instance that uses the "match" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string} opt_query The query string.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'match',
			value: function match(fieldOrQuery, opt_query) {
				var field = core.isString(opt_query) ? fieldOrQuery : Filter.ALL;
				var query = core.isString(opt_query) ? opt_query : fieldOrQuery;
				return Filter.field(field, 'match', query);
			}

			/**
    * Returns a Filter instance that uses the "missing" operator.
    * @param {string} field The field's name.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'missing',
			value: function missing(field) {
				return Filter.field(field, 'missing', null);
			}

			/**
    * Returns a Filter instance that uses the "phrase" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string} opt_query The query string.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'phrase',
			value: function phrase(fieldOrQuery, opt_query) {
				var field = core.isString(opt_query) ? fieldOrQuery : Filter.ALL;
				var query = core.isString(opt_query) ? opt_query : fieldOrQuery;
				return Filter.field(field, 'phrase', query);
			}

			/**
    * Returns a Filter instance that uses the "gp" operator.
    * @param {string} field The name of the field.
    * @param {...!Object} points Objects representing points in the polygon.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'polygon',
			value: function polygon(field) {
				for (var _len2 = arguments.length, points = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					points[_key2 - 1] = arguments[_key2];
				}

				points = points.map(function (point) {
					return Embodied.toBody(point);
				});
				return Filter.field(field, 'gp', points);
			}

			/**
    * Returns a Filter instance that uses the "prefix" operator.
    * @param {string} fieldOrQuery If no second argument is given, this should
    *   be the query string, in which case all fields will be matched. Otherwise,
    *   this should be the name of the field to match.
    * @param {string=} opt_query The query string.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'prefix',
			value: function prefix(fieldOrQuery, opt_query) {
				var field = opt_query ? fieldOrQuery : Filter.ALL;
				var query = opt_query ? opt_query : fieldOrQuery;
				return Filter.field(field, 'prefix', query);
			}

			/**
    * Returns a Filter instance that uses the "range" operator.
    * @param {string} field The field's name.
    * @param {*} rangeOrMin Either a `Range` instance or a the range's min value.
    * @param {*} opt_max The range's max value.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'range',
			value: function range(field, rangeOrMin, opt_max) {
				var range = rangeOrMin;
				if (!(range instanceof Range)) {
					range = Range.range(rangeOrMin, opt_max);
				}
				return Filter.field(field, 'range', range);
			}

			/**
    * Returns a Filter instance that uses the "~" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'regex',
			value: function regex(field, value) {
				return new Filter(field, '~', value);
			}

			/**
    * Returns a Filter instance that uses the "gs" operator.
    * @param {string} field The field's name.
    * @param {...!Object} shapes Objects representing shapes.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'shape',
			value: function shape(field) {
				for (var _len3 = arguments.length, shapes = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
					shapes[_key3 - 1] = arguments[_key3];
				}

				shapes = shapes.map(function (shape) {
					return Embodied.toBody(shape);
				});
				var value = {
					type: 'geometrycollection',
					geometries: shapes
				};
				return Filter.field(field, 'gs', value);
			}

			/**
    * Returns a Filter instance that uses the "similar" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {?string} opt_query The query string.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'similar',
			value: function similar(fieldOrQuery, query) {
				var field = core.isString(query) ? fieldOrQuery : Filter.ALL;
				var value = {
					query: core.isString(query) ? query : fieldOrQuery
				};
				return Filter.field(field, 'similar', value);
			}

			/**
    * Returns a Filter instance that uses the "<" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'lt',
			value: function lt(field, value) {
				return new Filter(field, '<', value);
			}

			/**
    * Returns a Filter instance that uses the "<=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'lte',
			value: function lte(field, value) {
				return new Filter(field, '<=', value);
			}

			/**
    * Returns a Filter instance that uses the "none" operator.
    * @param {string} field The name of the field to filter by.
    * @param {!Array|(...*)} value A variable amount of values to be used with
    *   the "none" operator. Can be passed either as a single array or as
    *   separate params.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'none',
			value: function none(field) {
				var values = Array.prototype.slice.call(arguments, 1);
				if (values.length === 1 && values[0] instanceof Array) {
					values = values[0];
				}
				return new Filter(field, 'none', values);
			}

			/**
    * Returns a Filter instance that uses the "!=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'notEqual',
			value: function notEqual(field, value) {
				return new Filter(field, '!=', value);
			}

			/**
    * Returns a Filter instance that uses the "not" operator.
    * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
    *   name of the field to filter by.
    * @param {*} opt_operatorOrValue Either the field's operator or its value.
    * @param {*} opt_value The filter's value.
    * @return {!Filter}
    * @static
    */
		}, {
			key: 'not',
			value: function not(fieldOrFilter, opt_operatorOrValue, opt_value) {
				return Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value).add('not');
			}

			/**
    * Returns a Filter instance.
    * @param {string} field The name of the field to filter by.
    * @param {*} operatorOrValue If a third param is given, this should
    *   be the filter's operator (like ">="). Otherwise, this will be
    *   used as the filter's value, and the filter's operator will be "=".
    * @param {*} opt_value The filter's value.
    * @return {!Filter}
     * @static
    */
		}, {
			key: 'field',
			value: function field(_field, operatorOrValue, opt_value) {
				return new Filter(_field, operatorOrValue, opt_value);
			}
		}, {
			key: 'toFilter',
			value: function toFilter(fieldOrFilter, opt_operatorOrValue, opt_value) {
				var filter = fieldOrFilter;
				if (!(filter instanceof Filter)) {
					filter = Filter.field(fieldOrFilter, opt_operatorOrValue, opt_value);
				}
				return filter;
			}
		}]);
		return Filter;
	})(Embodied);

	Filter.ALL = '*';

	this.launchpad.Filter = Filter;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Embodied = this.launchpad.Embodied;
	var Filter = this.launchpad.Filter;
	var Aggregation = this.launchpad.Aggregation;

	/**
  * Class responsible for building queries.
  */

	var Query = (function (_Embodied) {
		babelHelpers.inherits(Query, _Embodied);

		function Query() {
			babelHelpers.classCallCheck(this, Query);
			babelHelpers.get(Object.getPrototypeOf(Query.prototype), 'constructor', this).apply(this, arguments);
		}

		babelHelpers.createClass(Query, [{
			key: 'aggregate',

			/**
    * Adds an aggregation to this `Query` instance.
    * @param {string} name The aggregation name.
    * @param {!Aggregation|string} aggregationOrField Either an
    *   `Aggregation` instance or the name of the aggregation field.
    * @param {string} opt_operator The aggregation operator.
    * @chainnable
    */
			value: function aggregate(name, aggregationOrField, opt_operator) {
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
				if (core.isDefAndNotNull(aggregation.getValue())) {
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
		}, {
			key: 'count',
			value: function count() {
				return this.type('count');
			}

			/**
    * Sets this query's type to "fetch".
    * @chainnable
    */
		}, {
			key: 'fetch',
			value: function fetch() {
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
		}, {
			key: 'filter',
			value: function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
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
		}, {
			key: 'offset',
			value: function offset(_offset2) {
				this.body_.offset = _offset2;
				return this;
			}

			/**
    * Adds a highlight entry to this `Query` instance.
    * @param {string} field The field's name.
    * @chainnable
    */
		}, {
			key: 'highlight',
			value: function highlight(field) {
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
		}, {
			key: 'limit',
			value: function limit(_limit2) {
				this.body_.limit = _limit2;
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
		}, {
			key: 'search',
			value: function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
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
		}, {
			key: 'sort',
			value: function sort(field, opt_direction) {
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
		}, {
			key: 'type',
			value: function type(_type2) {
				this.body_.type = _type2;
				return this;
			}
		}], [{
			key: 'aggregate',

			/**
    * Adds an aggregation to this `Query` instance.
    * @param {string} name The aggregation name.
    * @param {!Aggregation|string} aggregationOrField Either an
    *   `Aggregation` instance or the name of the aggregation field.
    * @param {string} opt_operator The aggregation operator.
    * @static
    */
			value: function aggregate(name, aggregationOrField, opt_operator) {
				return new Query().aggregate(name, aggregationOrField, opt_operator);
			}

			/**
    * Sets this query's type to "count".
    * @static
    */
		}, {
			key: 'count',
			value: function count() {
				return new Query().type('count');
			}

			/**
    * Sets this query's type to "fetch".
    * @static
    */
		}, {
			key: 'fetch',
			value: function fetch() {
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
		}, {
			key: 'filter',
			value: function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
				return new Query().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
			}

			/**
    * Sets the query offset.
    * @param {number} offset The index of the first entry that should be returned
    *   by this query.
    * @static
    */
		}, {
			key: 'offset',
			value: function offset(_offset) {
				return new Query().offset(_offset);
			}

			/**
    * Adds a highlight entry to this `Query` instance.
    * @param {string} field The field's name.
    * @static
    */
		}, {
			key: 'highlight',
			value: function highlight(field) {
				return new Query().highlight(field);
			}

			/**
    * Sets the query limit.
    * @param {number} limit The max amount of entries that this query should return.
    * @static
    */
		}, {
			key: 'limit',
			value: function limit(_limit) {
				return new Query().limit(_limit);
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
		}, {
			key: 'search',
			value: function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
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
		}, {
			key: 'sort',
			value: function sort(field, opt_direction) {
				return new Query().sort(field, opt_direction);
			}

			/**
    * Sets the query type.
    * @param {string} type The query's type. For example: "count", "fetch".
    * @static
    */
		}, {
			key: 'type',
			value: function type(_type) {
				return new Query().type(_type);
			}
		}]);
		return Query;
	})(Embodied);

	this.launchpad.Query = Query;
}).call(this);
(function () {
	'use strict';

	var Filter = this.launchpad.Filter;
	var Geo = this.launchpad.Geo;
	var Query = this.launchpad.Query;
	var Range = this.launchpad.Range;

	if (typeof window !== undefined) {
		window.Filter = Filter;
		window.Geo = Geo;
		window.Query = Query;
		window.Range = Range;
	}
}).call(this);
(function () {
	'use strict';

	/**
  * Provides a convenient interface for data transport.
  * @interface
  */

	var Transport = (function () {
		function Transport() {
			babelHelpers.classCallCheck(this, Transport);
		}

		babelHelpers.createClass(Transport, [{
			key: 'send',

			/**
    * Sends a message for the specified client.
    * @param {ClientRequest} clientRequest
    * @return {Promise} Deferred request.
    */
			value: function send() {}
		}]);
		return Transport;
	})();

	this.launchpad.Transport = Transport;
}).call(this);
(function () {
	'use strict';

	/**
  * Provides a convenient interface for data transport.
  * @interface
  */

	var Util = (function () {
		function Util() {
			babelHelpers.classCallCheck(this, Util);
		}

		babelHelpers.createClass(Util, null, [{
			key: 'addParametersToUrlQueryString',

			/**
    * Adds parameters into the url querystring.
    * @param {string} url
    * @param {MultiMap} opt_params
    * @return {string} Url containting parameters as querystring.
    * @protected
    */
			value: function addParametersToUrlQueryString(url, opt_params) {
				var querystring = '';
				opt_params.names().forEach(function (name) {
					opt_params.getAll(name).forEach(function (value) {
						querystring += name + '=' + encodeURIComponent(value) + '&';
					});
				});
				querystring = querystring.slice(0, -1);
				if (querystring) {
					url += url.indexOf('?') > -1 ? '&' : '?';
					url += querystring;
				}

				return url;
			}

			/**
    * Parses the url separating the domain and port from the path.
    * @param {string} url
    * @return {array} Array containing the url domain and path.
    * @protected
    */
		}, {
			key: 'parseUrl',
			value: function parseUrl(url) {
				var base;
				var path;
				var qs;

				var domainAt = url.indexOf('//');
				if (domainAt > -1) {
					url = url.substring(domainAt + 2);
				}

				var pathAt = url.indexOf('/');
				if (pathAt === -1) {
					url += '/';
					pathAt = url.length - 1;
				}

				base = url.substring(0, pathAt);
				path = url.substring(pathAt);

				var qsAt = path.indexOf('?');
				if (qsAt > -1) {
					qs = path.substring(qsAt, path.length);
					path = path.substring(0, qsAt);
				} else {
					qs = '';
				}

				return [base, path, qs];
			}

			/**
    * Joins two paths.
    * @param {string} basePath
    * @param {string} path
    */
		}, {
			key: 'joinPaths',
			value: function joinPaths(basePath, path) {
				if (basePath.charAt(basePath.length - 1) === '/') {
					basePath = basePath.substring(0, basePath.length - 1);
				}
				if (path.charAt(0) === '/') {
					path = path.substring(1);
				}
				return [basePath, path].join('/').replace(/\/$/, '');
			}

			/**
    * XmlHttpRequest's getAllResponseHeaders() method returns a string of
    * response headers according to the format described on the spec:
    * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
    * This method parses that string into a user-friendly name/value pair
    * object.
    * @param {string} allHeaders All headers as string.
    * @return {array.<object<string, string>>=}
    */
		}, {
			key: 'parseResponseHeaders',
			value: function parseResponseHeaders(allHeaders) {
				var headers = [];
				if (!allHeaders) {
					return headers;
				}
				var pairs = allHeaders.split('\r\n');
				for (var i = 0; i < pairs.length; i++) {
					var index = pairs[i].indexOf(': ');
					if (index > 0) {
						var name = pairs[i].substring(0, index);
						var value = pairs[i].substring(index + 2);
						headers.push({
							name: name,
							value: value
						});
					}
				}
				return headers;
			}
		}]);
		return Util;
	})();

	this.launchpad.Util = Util;
}).call(this);
(function () {
	'use strict';

	/**
  * Disposable utility. When inherited provides the `dispose` function to its
  * subclass, which is responsible for disposing of any object references
  * when an instance won't be used anymore. Subclasses should override
  * `disposeInternal` to implement any specific disposing logic.
  * @constructor
  */

	var Disposable = (function () {
		function Disposable() {
			babelHelpers.classCallCheck(this, Disposable);

			/**
    * Flag indicating if this instance has already been disposed.
    * @type {boolean}
    * @protected
    */
			this.disposed_ = false;
		}

		/**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */
		babelHelpers.createClass(Disposable, [{
			key: 'dispose',
			value: function dispose() {
				if (!this.disposed_) {
					this.disposeInternal();
					this.disposed_ = true;
				}
			}

			/**
    * Subclasses should override this method to implement any specific
    * disposing logic (like clearing references and calling `dispose` on other
    * disposables).
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {}

			/**
    * Checks if this instance has already been disposed.
    * @return {boolean}
    */
		}, {
			key: 'isDisposed',
			value: function isDisposed() {
				return this.disposed_;
			}
		}]);
		return Disposable;
	})();

	this.launchpad.Disposable = Disposable;
}).call(this);
(function () {
	'use strict';

	var Disposable = this.launchpad.Disposable;

	/**
  * Case insensitive string Multimap implementation. Allows multiple values for
  * the same key name.
  */

	var MultiMap = (function (_Disposable) {
		babelHelpers.inherits(MultiMap, _Disposable);

		function MultiMap() {
			babelHelpers.classCallCheck(this, MultiMap);

			babelHelpers.get(Object.getPrototypeOf(MultiMap.prototype), 'constructor', this).call(this);
			this.keys = {};
			this.values = {};
		}

		/**
   * Adds value to a key name.
   * @param {string} name
   * @param {*} value
   * @chainable
   */
		babelHelpers.createClass(MultiMap, [{
			key: 'add',
			value: function add(name, value) {
				this.keys[name.toLowerCase()] = name;
				this.values[name.toLowerCase()] = this.values[name.toLowerCase()] || [];
				this.values[name.toLowerCase()].push(value);
				return this;
			}

			/**
    * Clears map names and values.
    * @chainable
    */
		}, {
			key: 'clear',
			value: function clear() {
				this.keys = {};
				this.values = {};
				return this;
			}

			/**
    * Checks if map contains a value to the key name.
    * @param {string} name
    * @chainable
    */
		}, {
			key: 'contains',
			value: function contains(name) {
				return name.toLowerCase() in this.values;
			}

			/**
    * @inheritDoc
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.values = null;
			}

			/**
    * Gets the first added value from a key name.
    * @param {string} name
    * @chainable
    */
		}, {
			key: 'get',
			value: function get(name) {
				var values = this.values[name.toLowerCase()];
				if (values) {
					return values[0];
				}
			}

			/**
    * Gets all values from a key name.
    * @param {string} name
    * @return {array.<string>}
    */
		}, {
			key: 'getAll',
			value: function getAll(name) {
				return this.values[name.toLowerCase()];
			}

			/**
    * Returns true if the map is empty, false otherwise.
    * @return {boolean}
    */
		}, {
			key: 'isEmpty',
			value: function isEmpty() {
				return this.size() === 0;
			}

			/**
    * Gets array of key names.
    * @return {array.<string>}
    */
		}, {
			key: 'names',
			value: function names() {
				var _this = this;

				return Object.keys(this.values).map(function (key) {
					return _this.keys[key];
				});
			}

			/**
    * Removes all values from a key name.
    * @param {string} name
    * @chainable
    */
		}, {
			key: 'remove',
			value: function remove(name) {
				delete this.keys[name.toLowerCase()];
				delete this.values[name.toLowerCase()];
				return this;
			}

			/**
    * Sets the value of a key name. Relevant to replace the current values with
    * a new one.
    * @param {string} name  [description]
    * @chainable
    */
		}, {
			key: 'set',
			value: function set(name, value) {
				this.keys[name.toLowerCase()] = name;
				this.values[name.toLowerCase()] = [value];
				return this;
			}

			/**
    * Gets the size of the map key names.
    * @return {number}
    */
		}, {
			key: 'size',
			value: function size() {
				return this.names().length;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return JSON.stringify(this.values);
			}
		}]);
		return MultiMap;
	})(Disposable);

	this.launchpad.MultiMap = MultiMap;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var MultiMap = this.launchpad.MultiMap;

	/**
  */

	var ClientMessage = (function () {
		function ClientMessage() {
			babelHelpers.classCallCheck(this, ClientMessage);

			this.headers_ = new MultiMap();
		}

		/**
   * Fluent getter and setter for request body.
   * @param {string} opt_body Request body to be set.
   * @return {string} Returns request body.
   * @chainable Chainable when used for setter.
   */
		babelHelpers.createClass(ClientMessage, [{
			key: 'body',
			value: function body(opt_body) {
				if (core.isDef(opt_body)) {
					this.body_ = opt_body;
					return this;
				}
				return this.body_;
			}

			/**
    * Adds a header. If the header with the same name already exists, it will
    * not be overwritten, but new value will be stored. The order is preserved.
    * @param {string} name
    * @param {string} value
    * @chainable
    */
		}, {
			key: 'header',
			value: function header(name, value) {
				if (arguments.length !== 2) {
					throw new Error('Invalid arguments');
				}
				this.headers_.set(name, value);
				return this;
			}

			/**
    * Fluent getter and setter for request headers.
    * @param {MultiMap|object} opt_params Request headers list
    *   to be set.
    * @return {MultiMap} Returns map of request headers.
    */
		}, {
			key: 'headers',
			value: function headers(opt_headers) {
				if (core.isDef(opt_headers)) {
					if (opt_headers instanceof MultiMap) {
						this.headers_ = opt_headers;
					} else {
						this.headers_.values = opt_headers;
					}
					return opt_headers;
				}
				return this.headers_;
			}

			/**
    * Removes the body.
    */
		}, {
			key: 'removeBody',
			value: function removeBody() {
				this.body_ = undefined;
			}
		}]);
		return ClientMessage;
	})();

	this.launchpad.ClientMessage = ClientMessage;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var ClientMessage = this.launchpad.ClientMessage;

	/**
  */

	var ClientResponse = (function (_ClientMessage) {
		babelHelpers.inherits(ClientResponse, _ClientMessage);

		function ClientResponse(clientRequest) {
			babelHelpers.classCallCheck(this, ClientResponse);

			babelHelpers.get(Object.getPrototypeOf(ClientResponse.prototype), 'constructor', this).call(this);
			if (!clientRequest) {
				throw new Error('Can\'t create response without request');
			}
			this.clientRequest_ = clientRequest;
		}

		/**
   * Returns request that created this response.
   * @return {ClientRequest}
   */
		babelHelpers.createClass(ClientResponse, [{
			key: 'request',
			value: function request() {
				return this.clientRequest_;
			}

			/**
    * Fluent getter and setter for response status code.
    * @param {number} opt_statusCode Request status code to be set.
    * @return {number} Returns response status code.
    */
		}, {
			key: 'statusCode',
			value: function statusCode(opt_statusCode) {
				if (core.isDef(opt_statusCode)) {
					this.statusCode_ = opt_statusCode;
					return this;
				}
				return this.statusCode_;
			}

			/**
    * Fluent getter and setter for response status text.
    * @param {string} opt_statusText Request status text to be set.
    * @return {string} Returns response status text.
    */
		}, {
			key: 'statusText',
			value: function statusText(opt_statusText) {
				if (core.isDef(opt_statusText)) {
					this.statusText_ = opt_statusText;
					return this;
				}
				return this.statusText_;
			}

			/**
    * Checks if response succeeded. Any status code 2xx or 3xx is considered
    * valid.
    * @return {boolean}
    */
		}, {
			key: 'succeeded',
			value: function succeeded() {
				return this.statusCode() >= 200 && this.statusCode() <= 399;
			}
		}]);
		return ClientResponse;
	})(ClientMessage);

	this.launchpad.ClientResponse = ClientResponse;
}).call(this);
(function () {
  /*!
   * Promises polyfill from Google's Closure Library.
   *
   *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
   *
   * NOTE(eduardo): Promise support is not ready on all supported browsers,
   * therefore core.js is temporarily using Google's promises as polyfill. It
   * supports cancellable promises and has clean and fast implementation.
   */

  'use strict';

  var core = this.launchpad.core;

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see CancellablePromise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */
  var Thenable = function Thenable() {};

  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
   *     result of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  Thenable.prototype.then = function () {};

  /**
   * An expando property to indicate that an object implements
   * {@code Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  Thenable.addImplementation = function (ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };

  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  Thenable.isImplementedBy = function (object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };

  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  var partial = function partial(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };

  var async = {};

  /**
   * Throw an item without interrupting the current execution context.  For
   * example, if processing a group of items in a loop, sometimes it is useful
   * to report an error while still allowing the rest of the batch to be
   * processed.
   * @param {*} exception
   */
  async.throwException = function (exception) {
    // Each throw needs to be in its own context.
    async.nextTick(function () {
      throw exception;
    });
  };

  /**
   * Fires the provided callback just before the current callstack unwinds, or as
   * soon as possible after the current JS execution context.
   * @param {function(this:THIS)} callback
   * @param {THIS=} opt_context Object to use as the "this value" when calling
   *     the provided function.
   * @template THIS
   */
  async.run = function (callback, opt_context) {
    if (!async.run.workQueueScheduled_) {
      // Nothing is currently scheduled, schedule it now.
      async.nextTick(async.run.processWorkQueue);
      async.run.workQueueScheduled_ = true;
    }

    async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
  };

  /** @private {boolean} */
  async.run.workQueueScheduled_ = false;

  /** @private {!Array.<!async.run.WorkItem_>} */
  async.run.workQueue_ = [];

  /**
   * Run any pending async.run work items. This function is not intended
   * for general use, but for use by entry point handlers to run items ahead of
   * async.nextTick.
   */
  async.run.processWorkQueue = function () {
    // NOTE: additional work queue items may be pushed while processing.
    while (async.run.workQueue_.length) {
      // Don't let the work queue grow indefinitely.
      var workItems = async.run.workQueue_;
      async.run.workQueue_ = [];
      for (var i = 0; i < workItems.length; i++) {
        var workItem = workItems[i];
        try {
          workItem.fn.call(workItem.scope);
        } catch (e) {
          async.throwException(e);
        }
      }
    }

    // There are no more work items, reset the work queue.
    async.run.workQueueScheduled_ = false;
  };

  /**
   * @constructor
   * @final
   * @struct
   * @private
   *
   * @param {function()} fn
   * @param {Object|null|undefined} scope
   */
  async.run.WorkItem_ = function (fn, scope) {
    /** @const */
    this.fn = fn;
    /** @const */
    this.scope = scope;
  };

  /**
   * Fires the provided callbacks as soon as possible after the current JS
   * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
   * reasons.
   * @param {function(this:SCOPE)} callback Callback function to fire as soon as
   *     possible.
   * @param {SCOPE=} opt_context Object in whose scope to call the listener.
   * @template SCOPE
   */
  async.nextTick = function (callback, opt_context) {
    var cb = callback;
    if (opt_context) {
      cb = callback.bind(opt_context);
    }
    cb = async.nextTick.wrapCallback_(cb);
    // Introduced and currently only supported by IE10.
    if (core.isFunction(window.setImmediate)) {
      window.setImmediate(cb);
      return;
    }
    // Look for and cache the custom fallback version of setImmediate.
    if (!async.nextTick.setImmediate_) {
      async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
    }
    async.nextTick.setImmediate_(cb);
  };

  /**
   * Cache for the setImmediate implementation.
   * @type {function(function())}
   * @private
   */
  async.nextTick.setImmediate_ = null;

  /**
   * Determines the best possible implementation to run a function as soon as
   * the JS event loop is idle.
   * @return {function(function())} The "setImmediate" implementation.
   * @private
   */
  async.nextTick.getSetImmediateEmulator_ = function () {
    // Create a private message channel and use it to postMessage empty messages
    // to ourselves.
    var Channel = window.MessageChannel;
    // If MessageChannel is not available and we are in a browser, implement
    // an iframe based polyfill in browsers that have postMessage and
    // document.addEventListener. The latter excludes IE8 because it has a
    // synchronous postMessage implementation.
    if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
      /** @constructor */
      Channel = function () {
        // Make an empty, invisible iframe.
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = '';
        document.documentElement.appendChild(iframe);
        var win = iframe.contentWindow;
        var doc = win.document;
        doc.open();
        doc.write('');
        doc.close();
        var message = 'callImmediate' + Math.random();
        var origin = win.location.protocol + '//' + win.location.host;
        var onmessage = (function (e) {
          // Validate origin and message to make sure that this message was
          // intended for us.
          if (e.origin !== origin && e.data !== message) {
            return;
          }
          this.port1.onmessage();
        }).bind(this);
        win.addEventListener('message', onmessage, false);
        this.port1 = {};
        this.port2 = {
          postMessage: function postMessage() {
            win.postMessage(message, origin);
          }
        };
      };
    }
    if (typeof Channel !== 'undefined') {
      var channel = new Channel();
      // Use a fifo linked list to call callbacks in the right order.
      var head = {};
      var tail = head;
      channel.port1.onmessage = function () {
        head = head.next;
        var cb = head.cb;
        head.cb = null;
        cb();
      };
      return function (cb) {
        tail.next = {
          cb: cb
        };
        tail = tail.next;
        channel.port2.postMessage(0);
      };
    }
    // Implementation for IE6-8: Script elements fire an asynchronous
    // onreadystatechange event when inserted into the DOM.
    if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
      return function (cb) {
        var script = document.createElement('script');
        script.onreadystatechange = function () {
          // Clean up and call the callback.
          script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          script = null;
          cb();
          cb = null;
        };
        document.documentElement.appendChild(script);
      };
    }
    // Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
    // or more.
    return function (cb) {
      setTimeout(cb, 0);
    };
  };

  /**
   * Helper function that is overrided to protect callbacks with entry point
   * monitor if the application monitors entry points.
   * @param {function()} callback Callback function to fire as soon as possible.
   * @return {function()} The wrapped callback.
   * @private
   */
  async.nextTick.wrapCallback_ = function (opt_returnValue) {
    return opt_returnValue;
  };

  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  var CancellablePromise = function CancellablePromise(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {CancellablePromise.State_}
     */
    this.state_ = CancellablePromise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {CancellablePromise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<CancellablePromise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(opt_context, function (value) {
        self.resolve_(CancellablePromise.State_.FULFILLED, value);
      }, function (reason) {
        self.resolve_(CancellablePromise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(CancellablePromise.State_.REJECTED, e);
    }
  };

  /**
   * @define {number} The delay in milliseconds before a rejected Promise's reason
   * is passed to the rejection handler. By default, the rejection handler
   * rethrows the rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   *
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   */
  CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  CancellablePromise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };

  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: CancellablePromise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  CancellablePromise.CallbackEntry_ = null;

  /**
   * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  CancellablePromise.resolve = function (opt_value) {
    return new CancellablePromise(function (resolve) {
      resolve(opt_value);
    });
  };

  /**
   * @param {*=} opt_reason
   * @return {!CancellablePromise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  CancellablePromise.reject = function (opt_reason) {
    return new CancellablePromise(function (resolve, reject) {
      reject(opt_reason);
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  CancellablePromise.race = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      if (!promises.length) {
        resolve(undefined);
      }
      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(resolve, reject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  CancellablePromise.all = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toFulfill = promises.length;
      var values = [];

      if (!toFulfill) {
        resolve(values);
        return;
      }

      var onFulfill = function onFulfill(index, value) {
        toFulfill--;
        values[index] = value;
        if (toFulfill === 0) {
          resolve(values);
        }
      };

      var onReject = function onReject(reason) {
        reject(reason);
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(partial(onFulfill, i), onReject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
   *     the first input to be fulfilled, or is rejected with a list of every
   *     rejection reason if all inputs are rejected.
   * @template TYPE
   */
  CancellablePromise.firstFulfilled = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toReject = promises.length;
      var reasons = [];

      if (!toReject) {
        resolve(undefined);
        return;
      }

      var onFulfill = function onFulfill(value) {
        resolve(value);
      };

      var onReject = function onReject(index, reason) {
        toReject--;
        reasons[index] = reason;
        if (toReject === 0) {
          reject(reasons);
        }
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(onFulfill, partial(onReject, i));
      }
    });
  };

  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
    return this.addChildPromise_(core.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, core.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
  };
  Thenable.addImplementation(CancellablePromise);

  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
    var callback = function callback() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        CancellablePromise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };

  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };

  /**
   * Alias of {@link CancellablePromise.prototype.thenCatch}
   */
  CancellablePromise.prototype['catch'] = CancellablePromise.prototype.thenCatch;

  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  CancellablePromise.prototype.cancel = function (opt_message) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      async.run(function () {
        var err = new CancellablePromise.CancellationError(opt_message);
        this.cancelInternal_(err);
      }, this);
    }
  };

  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  CancellablePromise.prototype.cancelInternal_ = function (err) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!CancellablePromise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };

  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!CancellablePromise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new CancellablePromise(function (resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function (value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function (reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!core.isDef(result) && reason instanceof CancellablePromise.CancellationError) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
    /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
    return callbackEntry.child;
  };

  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.FULFILLED, value);
  };

  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  CancellablePromise.prototype.unblockAndReject_ = function (reason) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.REJECTED, reason);
  };

  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {CancellablePromise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  CancellablePromise.prototype.resolve_ = function (state, x) {
    if (this.state_ !== CancellablePromise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = CancellablePromise.State_.REJECTED;
      x = new TypeError('CancellablePromise cannot resolve to itself');
    } else if (Thenable.isImplementedBy(x)) {
      x = /** @type {!Thenable} */x;
      this.state_ = CancellablePromise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else if (core.isObject(x)) {
      try {
        var then = x.then;
        if (core.isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = CancellablePromise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === CancellablePromise.State_.REJECTED && !(x instanceof CancellablePromise.CancellationError)) {
      CancellablePromise.addUnhandledRejection_(this, x);
    }
  };

  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  CancellablePromise.prototype.tryThen_ = function (thenable, then) {
    this.state_ = CancellablePromise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function resolve(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function reject(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  CancellablePromise.prototype.scheduleCallbacks_ = function () {
    if (!this.executing_) {
      this.executing_ = true;
      async.run(this.executeCallbacks_, this);
    }
  };

  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  CancellablePromise.prototype.executeCallbacks_ = function () {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };

  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {CancellablePromise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
    if (state === CancellablePromise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };

  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  CancellablePromise.prototype.removeUnhandledRejection_ = function () {
    var p;
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };

  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!CancellablePromise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function () {
        CancellablePromise.handleRejection_.call(null, reason);
      }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      async.run(function () {
        if (promise.hadUnhandledRejection_) {
          CancellablePromise.handleRejection_.call(null, reason);
        }
      });
    }
  };

  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  CancellablePromise.handleRejection_ = async.throwException;

  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code async.throwException}.
   */
  CancellablePromise.setUnhandledRejectionHandler = function (handler) {
    CancellablePromise.handleRejection_ = handler;
  };

  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {Error}
   * @final
   */
  CancellablePromise.CancellationError = (function (_Error) {
    babelHelpers.inherits(_class, _Error);

    function _class(opt_message) {
      babelHelpers.classCallCheck(this, _class);

      babelHelpers.get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, opt_message);

      if (opt_message) {
        this.message = opt_message;
      }
    }

    return _class;
  })(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  if (typeof window.Promise === 'undefined') {
    window.Promise = CancellablePromise;
  }

  this.launchpadNamed.Promise = {};
  this.launchpadNamed.Promise.CancellablePromise = CancellablePromise;
  this.launchpadNamed.Promise.async = async;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Transport = this.launchpad.Transport;
	var Util = this.launchpad.Util;
	var ClientResponse = this.launchpad.ClientResponse;
	var Promise = this.launchpadNamed.Promise.CancellablePromise;

	/**
  * Provides a convenient interface for data transport.
  * @interface
  */

	var AjaxTransport = (function (_Transport) {
		babelHelpers.inherits(AjaxTransport, _Transport);

		function AjaxTransport() {
			babelHelpers.classCallCheck(this, AjaxTransport);

			babelHelpers.get(Object.getPrototypeOf(AjaxTransport.prototype), 'constructor', this).call(this);
		}

		/**
   * @inheritDoc
   */
		babelHelpers.createClass(AjaxTransport, [{
			key: 'send',
			value: function send(clientRequest) {
				var deferred = this.request(clientRequest.url(), clientRequest.method(), clientRequest.body(), clientRequest.headers(), clientRequest.params(), null, false);

				return deferred.then(function (response) {
					var clientResponse = new ClientResponse(clientRequest);
					clientResponse.body(response.responseText);
					clientResponse.statusCode(response.status);
					clientResponse.statusText(response.statusText);
					Util.parseResponseHeaders(response.getAllResponseHeaders()).forEach(function (header) {
						clientResponse.header(header.name, header.value);
					});
					return clientResponse;
				});
			}

			/**
    * Requests the url using XMLHttpRequest.
    * @param {!string} url
    * @param {!string} method
    * @param {?string} body
    * @param {MultiMap} opt_headers
    * @param {MultiMap} opt_params
    * @param {number=} opt_timeout
    * @param {boolean=} opt_sync
    * @return {Promise} Deferred ajax request.
    * @protected
    */
		}, {
			key: 'request',
			value: function request(url, method, body, opt_headers, opt_params, opt_timeout, opt_sync) {
				var request = new XMLHttpRequest();

				var promise = new Promise(function (resolve, reject) {
					request.onload = function () {
						if (request.aborted) {
							request.onerror();
							return;
						}
						resolve(request);
					};
					request.onerror = function () {
						var error = new Error('Request error');
						error.request = request;
						reject(error);
					};
				}).thenCatch(function (reason) {
					request.abort();
					throw reason;
				}).thenAlways(function () {
					clearTimeout(timeout);
				});

				if (opt_params) {
					url = Util.addParametersToUrlQueryString(url, opt_params);
				}

				request.open(method, url, !opt_sync);

				if (opt_headers) {
					opt_headers.names().forEach(function (name) {
						request.setRequestHeader(name, opt_headers.getAll(name).join(', '));
					});
				}

				request.send(core.isDef(body) ? body : null);

				if (core.isDefAndNotNull(opt_timeout)) {
					var timeout = setTimeout(function () {
						promise.cancel('Request timeout');
					}, opt_timeout);
				}

				return promise;
			}
		}]);
		return AjaxTransport;
	})(Transport);

	this.launchpad.AjaxTransport = AjaxTransport;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var ClientMessage = this.launchpad.ClientMessage;
	var MultiMap = this.launchpad.MultiMap;

	/**
  */

	var ClientRequest = (function (_ClientMessage) {
		babelHelpers.inherits(ClientRequest, _ClientMessage);

		function ClientRequest() {
			babelHelpers.classCallCheck(this, ClientRequest);

			babelHelpers.get(Object.getPrototypeOf(ClientRequest.prototype), 'constructor', this).call(this);
			this.params_ = new MultiMap();
		}

		/**
   * Fluent getter and setter for request method.
   * @param {string} opt_method Request method to be set.
   * @return {string} Returns request method.
   * @chainable Chainable when used for setter.
   */
		babelHelpers.createClass(ClientRequest, [{
			key: 'method',
			value: function method(opt_method) {
				if (core.isDef(opt_method)) {
					this.method_ = opt_method;
					return this;
				}
				return this.method_ || ClientRequest.DEFAULT_METHOD;
			}

			/**
    * Adds a query. If the query with the same name already exists, it will not
    * be overwritten, but new value will be stored. The order is preserved.
    * @param {string} name
    * @param {string} value
    * @chainable
    */
		}, {
			key: 'param',
			value: function param(name, value) {
				if (arguments.length !== 2) {
					throw new Error('Invalid arguments');
				}
				this.params_.set(name, value);
				return this;
			}

			/**
    * Fluent getter and setter for request querystring.
    * @param {MultiMap|object} opt_params Request querystring map to be set.
    * @return {MultiMap} Returns map of request querystring.
    */
		}, {
			key: 'params',
			value: function params(opt_params) {
				if (core.isDef(opt_params)) {
					if (opt_params instanceof MultiMap) {
						this.params_ = opt_params;
					} else {
						this.params_.values = opt_params;
					}
					return opt_params;
				}
				return this.params_;
			}

			/**
    * Fluent getter and setter for request url.
    * @param {string} opt_url Request url to be set.
    * @return {string} Returns request url.
    * @chainable Chainable when used for setter.
    * TODO: Renames on api.java as well.
    */
		}, {
			key: 'url',
			value: function url(opt_url) {
				if (core.isDef(opt_url)) {
					this.url_ = opt_url;
					return this;
				}
				return this.url_;
			}
		}]);
		return ClientRequest;
	})(ClientMessage);

	ClientRequest.DEFAULT_METHOD = 'GET';

	this.launchpad.ClientRequest = ClientRequest;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Transport = this.launchpad.Transport;
	var Util = this.launchpad.Util;
	var ClientResponse = this.launchpad.ClientResponse;
	var CancellablePromise = this.launchpadNamed.Promise.CancellablePromise;

	var http = require('http');
	var _request = require('request');

	/**
  * Provides a convenient interface for data transport.
  * @interface
  */

	var NodeTransport = (function (_Transport) {
		babelHelpers.inherits(NodeTransport, _Transport);

		function NodeTransport() {
			babelHelpers.classCallCheck(this, NodeTransport);

			babelHelpers.get(Object.getPrototypeOf(NodeTransport.prototype), 'constructor', this).call(this);
		}

		/**
   * @inheritDoc
   */
		babelHelpers.createClass(NodeTransport, [{
			key: 'send',
			value: function send(clientRequest) {
				var deferred = this.request(clientRequest.url(), clientRequest.method(), clientRequest.body(), clientRequest.headers(), clientRequest.params(), null, false);

				return deferred.then(function (response) {
					var clientResponse = new ClientResponse(clientRequest);
					clientResponse.body(response.body);
					clientResponse.statusCode(response.statusCode);
					clientResponse.statusText(http.STATUS_CODES[response.statusCode]);

					Object.keys(response.headers).forEach(function (name) {
						clientResponse.header(name, response.headers[name]);
					});

					return clientResponse;
				});
			}

			/**
    * Requests the url using XMLHttpRequest.
    * @param {!string} url
    * @param {!string} method
    * @param {?string} body
    * @param {MultiMap} opt_headers
    * @param {MultiMap} opt_params
    * @param {number=} opt_timeout
    * @return {Promise} Deferred ajax request.
    * @protected
    */
		}, {
			key: 'request',
			value: function request(url, method, body, opt_headers, opt_params, opt_timeout) {
				var options = {
					method: method,
					uri: url
				};

				if (opt_params) {
					url = Util.addParametersToUrlQueryString(url, opt_params);
				}

				if (opt_headers) {
					(function () {
						var headers = {};
						opt_headers.names().forEach(function (name) {
							headers[name] = opt_headers.getAll(name).join(', ');
						});

						options.headers = headers;
					})();
				}

				if (core.isDef(body)) {
					options.body = body;
				}

				if (core.isDefAndNotNull(opt_timeout)) {
					options.timeout(opt_timeout);
				}

				return new CancellablePromise(function (resolve, reject) {
					_request(options, function (error, response) {
						if (error) {
							reject(error);
							return;
						}

						resolve(response);
					});
				});
			}
		}]);
		return NodeTransport;
	})(Transport);

	this.launchpad.NodeTransport = NodeTransport;
}).call(this);
(function () {
	'use strict';

	var NodeTransport = this.launchpad.NodeTransport;

	/**
  * Provides a factory for data transport.
  */

	var TransportFactory = (function () {
		function TransportFactory() {
			babelHelpers.classCallCheck(this, TransportFactory);

			this.transports = {};
			this.transports[TransportFactory.DEFAULT_TRANSPORT_NAME] = NodeTransport;
		}

		/**
   * Returns {@code TransportFactory} instance.
   */
		babelHelpers.createClass(TransportFactory, [{
			key: 'get',
			value: function get(implementationName) {
				var TransportClass = this.transports[implementationName];

				if (!TransportClass) {
					throw new Error('Invalid transport name: ' + implementationName);
				}

				try {
					return new TransportClass();
				} catch (err) {
					throw new Error('Can\'t create transport', err);
				}
			}

			/**
    * Returns default transport.
    */
		}, {
			key: 'getDefault',
			value: function getDefault() {
				return this.get(TransportFactory.DEFAULT_TRANSPORT_NAME);
			}
		}], [{
			key: 'instance',
			value: function instance() {
				if (!TransportFactory.instance_) {
					TransportFactory.instance_ = new TransportFactory();
				}
				return TransportFactory.instance_;
			}
		}]);
		return TransportFactory;
	})();

	TransportFactory.DEFAULT_TRANSPORT_NAME = 'default';

	this.launchpad.TransportFactory = TransportFactory;
}).call(this);
(function () {
	'use strict';

	var core = this.launchpad.core;
	var Embodied = this.launchpad.Embodied;
	var Filter = this.launchpad.Filter;
	var Query = this.launchpad.Query;
	var TransportFactory = this.launchpad.TransportFactory;
	var ClientRequest = this.launchpad.ClientRequest;
	var Util = this.launchpad.Util;
	var MultiMap = this.launchpad.MultiMap;

	/**
  * Base client contains code that is same for all transports.
  * @interface
  */

	var Launchpad = (function () {
		function Launchpad() {
			babelHelpers.classCallCheck(this, Launchpad);

			if (arguments.length === 0) {
				throw new Error('Invalid arguments, try `new Launchpad(baseUrl, url)`');
			}

			this.body_ = null;
			this.url_ = Util.joinPaths(arguments[0] || '', arguments[1] || '');
			this.headers_ = new MultiMap();
			this.params_ = new MultiMap();

			this.header('Content-Type', 'application/json');
			this.header('X-PJAX', 'true');
			this.header('X-Requested-With', 'XMLHttpRequest');
		}

		/**
   * Static factory for creating launchpad client.
   */
		babelHelpers.createClass(Launchpad, [{
			key: 'use',

			/**
    * Specifies {@link Transport} implementation.
    */
			value: function use(transport) {
				this.customTransport_ = transport;
				return this;
			}

			/**
    * Creates new socket.io instance. The parameters passed to socket.io
    * constructor will be provided:
    *
    *   Launchpad.url('http://domain:8080/path/a').connect({ foo: true });
    *     -> io('domain:8080/path/a', { path: '/path', foo: true });
    *
    * @param {MultiMap} opt_params
    * @param {object} opt_options
    */
		}, {
			key: 'watch',
			value: function watch(opt_params, opt_options) {
				if (typeof io === 'undefined') {
					throw new Error('Socket.io client not loaded');
				}

				var clientRequest = this.createClientRequest_('GET', opt_params);

				var url = Util.parseUrl(Util.addParametersToUrlQueryString(clientRequest.url(), clientRequest.params()));

				opt_options = opt_options || {
					forceNew: true
				};
				opt_options.path = opt_options.path || url[1];

				return io(url[0] + '?url=' + encodeURIComponent(url[1] + url[2]), opt_options);
			}

			/**
    * Creates new {@link LaunchpadBaseClient}.
    */
		}, {
			key: 'path',
			value: function path(_path) {
				return new Launchpad(this.url(), _path).use(this.customTransport_);
			}

			/**
    * Sends message with DELETE http verb.
    * @param {string} opt_body
    * @return {Promise}
    */
		}, {
			key: 'delete',
			value: function _delete(opt_body) {
				return this.sendAsync('DELETE', opt_body);
			}

			/**
    * Adds a key/value pair to be sent via the body in a `multipart/form-data` format.
    * If the body is set by other means (for example, through the `body` method), this
    * will be ignored.
    * @param {string} name
    * @param {*} value
    */
		}, {
			key: 'form',
			value: function form(name, value) {
				if (!window) {
					throw new Error('form method is only available on browsers.');
				}

				if (!this.formData_) {
					this.formData_ = new FormData();
				}
				this.formData_.append(name, value);
				return this;
			}

			/**
    * Sends message with GET http verb.
    * @param {*} opt_params Optional params to be added to the request url.
    * @return {Promise}
    */
		}, {
			key: 'get',
			value: function get(opt_params) {
				return this.sendAsync('GET', opt_params);
			}

			/**
    * Sends message with PATCH http verb.
    * @param {string} opt_body
    * @return {Promise}
    */
		}, {
			key: 'patch',
			value: function patch(opt_body) {
				return this.sendAsync('PATCH', opt_body);
			}

			/**
    * Sends message with POST http verb.
    * @param {string} opt_body
    * @return {Promise}
    */
		}, {
			key: 'post',
			value: function post(opt_body) {
				return this.sendAsync('POST', opt_body);
			}

			/**
    * Sends message with PUT http verb.
    * @param {string} opt_body
    * @return {Promise}
    */
		}, {
			key: 'put',
			value: function put(opt_body) {
				return this.sendAsync('PUT', opt_body);
			}

			/**
    * Adds a header. If the header with the same name already exists, it will
    * not be overwritten, but new value will be stored. The order is preserved.
    */
		}, {
			key: 'header',
			value: function header(name, value) {
				if (arguments.length !== 2) {
					throw new Error('Invalid arguments');
				}
				this.headers_.set(name, value);
				return this;
			}

			/**
    * Gets the headers.
    * @return {MultiMap}
    */
		}, {
			key: 'headers',
			value: function headers() {
				return this.headers_;
			}

			/**
    * Adds a query. If the query with the same name already exists, it will not
    * be overwritten, but new value will be stored. The order is preserved.
    */
		}, {
			key: 'param',
			value: function param(name, value) {
				if (arguments.length !== 2) {
					throw new Error('Invalid arguments');
				}
				this.params_.set(name, value);
				return this;
			}

			/**
    * Gets the query strings map.
    * @return {MultiMap}
    */
		}, {
			key: 'params',
			value: function params() {
				return this.params_;
			}

			/**
    * Returns the URL.
    * TODO: Renames on api.java as well.
    */
		}, {
			key: 'url',
			value: function url() {
				return this.url_;
			}

			/**
    * Uses transport to send request with given method name and body
    * asynchronously.
    * @param {string} method The HTTP method to be used when sending data.
    * @param {string} body
    * @return {Promise} Deferred request.
    */
		}, {
			key: 'sendAsync',
			value: function sendAsync(method, body) {
				var transport = this.customTransport_ || TransportFactory.instance().getDefault();

				var clientRequest = this.createClientRequest_(method, body);

				return transport.send(clientRequest).then(this.decode);
			}

			/**
    * Adds an aggregation to this `Query` instance.
    * @param {string} name The aggregation name.
    * @param {!Aggregation|string} aggregationOrField Either an
    *   `Aggregation` instance or the name of the aggregation field.
    * @param {string} opt_operator The aggregation operator.
    * @chainable
    */
		}, {
			key: 'aggregate',
			value: function aggregate(name, aggregationOrField, opt_operator) {
				this.getOrCreateQuery_().aggregate(name, aggregationOrField, opt_operator);
				return this;
			}

			/**
    * Sets the body that will be sent with this request.
    * @param {*} body
    * @chainable
    */
		}, {
			key: 'body',
			value: function body(_body) {
				this.body_ = _body;
				return this;
			}

			/**
    * Sets this query's type to "count".
    * @chainnable
    */
		}, {
			key: 'count',
			value: function count() {
				this.getOrCreateQuery_().type('count');
				return this;
			}

			/**
    * Adds a filter to this Query.
    * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
    *   name of the field to filter by.
    * @param {*} operatorOrValue Either the field's operator or its value.
    * @param {*} opt_value The filter's value.
    * @chainable
    */
		}, {
			key: 'filter',
			value: function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
				this.getOrCreateQuery_().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
				return this;
			}

			/**
    * Adds a highlight entry to this `Query` instance.
    * @param {string} field The field's name.
    * @chainable
    */
		}, {
			key: 'highlight',
			value: function highlight(field) {
				this.getOrCreateQuery_().highlight(field);
				return this;
			}

			/**
    * Sets the query offset.
    * @param {number} offset The index of the first entry that should be returned
    *   by this query.
    * @chainable
    */
		}, {
			key: 'offset',
			value: function offset(_offset) {
				this.getOrCreateQuery_().offset(_offset);
				return this;
			}

			/**
    * Sets the query limit.
    * @param {number} limit The max amount of entries that this query should return.
    * @chainable
    */
		}, {
			key: 'limit',
			value: function limit(_limit) {
				this.getOrCreateQuery_().limit(_limit);
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
    * @chainable
    */
		}, {
			key: 'search',
			value: function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
				this.getOrCreateQuery_().search(filterOrTextOrField, opt_textOrOperator, opt_value);
				return this;
			}

			/**
    * Adds a sort query to this request's body.
    * @param {string} field The field that the query should be sorted by.
    * @param {string} opt_direction The direction the sort operation should use.
    *   If none is given, "asc" is used by default.
    * @chainnable
    */
		}, {
			key: 'sort',
			value: function sort(field, opt_direction) {
				this.getOrCreateQuery_().sort(field, opt_direction);
				return this;
			}

			/**
    * Gets the currently used `Query` object. If none exists yet,
    * a new one is created.
    * @return {Query}
    * @protected
    */
		}, {
			key: 'getOrCreateQuery_',
			value: function getOrCreateQuery_() {
				if (!this.query_) {
					this.query_ = new Query();
				}
				return this.query_;
			}

			/**
    * Converts the given body object to query params.
    * @param {!ClientRequest} clientRequest
    * @param {*} body
    * @protected
    */
		}, {
			key: 'convertBodyToParams_',
			value: function convertBodyToParams_(clientRequest, body) {
				if (core.isString(body)) {
					body = {
						body: body
					};
				} else if (body instanceof Embodied) {
					body = body.body();
				}
				Object.keys(body || {}).forEach(function (name) {
					return clientRequest.param(name, body[name]);
				});
			}

			/**
    * Creates client request and encode.
    * @param {string} method
    * @param {*} body
    * @return {!ClientRequest} clientRequest
    * @protected
    */
		}, {
			key: 'createClientRequest_',
			value: function createClientRequest_(method, body) {
				var clientRequest = new ClientRequest();

				clientRequest.body(body || this.body_);

				if (!core.isDefAndNotNull(clientRequest.body())) {
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
    * Wraps the given `Embodied` instance with a `Query` instance if needed.
    * @param {Embodied} embodied
    * @return {Embodied}
    * @protected
    */
		}, {
			key: 'wrapWithQuery_',
			value: function wrapWithQuery_(embodied) {
				if (embodied instanceof Filter) {
					embodied = Query.filter(embodied);
				}
				return embodied;
			}

			/**
    * Encodes clientRequest body.
    * @param {ClientRequest} clientRequest
    * @return {ClientRequest}
    */
		}, {
			key: 'encode',
			value: function encode(clientRequest) {
				var body = clientRequest.body();

				if (core.isElement(body)) {
					body = new FormData(body);
					clientRequest.body(body);
				}

				body = this.wrapWithQuery_(body);
				if (clientRequest.method() === 'GET') {
					this.convertBodyToParams_(clientRequest, body);
					clientRequest.removeBody();
					body = null;
				}

				if (typeof FormData !== 'undefined' && body instanceof FormData) {
					clientRequest.headers().remove('content-type');
				} else if (body instanceof Embodied) {
					clientRequest.body(body.toString());
				} else if (Launchpad.isContentTypeJson(clientRequest)) {
					clientRequest.body(JSON.stringify(clientRequest.body()));
				}

				this.encodeParams_(clientRequest);

				return clientRequest;
			}

			/**
    * Encodes the params for the given request, according to their types.
    * @param {!ClientRequest} clientRequest
    * @protected
    */
		}, {
			key: 'encodeParams_',
			value: function encodeParams_(clientRequest) {
				var params = clientRequest.params();
				params.names().forEach(function (name) {
					var values = params.getAll(name);
					values.forEach(function (value, index) {
						if (value instanceof Embodied) {
							value = value.toString();
						} else if (core.isObject(value) || value instanceof Array) {
							value = JSON.stringify(value);
						}
						values[index] = value;
					});
				});
			}

			/**
    * Decodes clientResponse body.
    * @param {ClientResponse} clientResponse
    * @return {ClientResponse}
    */
		}, {
			key: 'decode',
			value: function decode(clientResponse) {
				if (Launchpad.isContentTypeJson(clientResponse)) {
					try {
						clientResponse.body(JSON.parse(clientResponse.body()));
					} catch (err) {}
				}
				return clientResponse;
			}
		}], [{
			key: 'url',
			value: function url(_url) {
				return new Launchpad(_url).use(this.customTransport_);
			}
		}]);
		return Launchpad;
	})();

	Launchpad.isContentTypeJson = function (clientMessage) {
		var contentType = clientMessage.headers().get('content-type') || '';
		return contentType.indexOf('application/json') === 0;
	};

	this.launchpad.Launchpad = Launchpad;
}).call(this);
(function () {
	'use strict';

	var Launchpad = this.launchpad.Launchpad;

	if (typeof window !== undefined) {
		window.Launchpad = Launchpad;
	}
}).call(this);
//# sourceMappingURL=api.js.map
