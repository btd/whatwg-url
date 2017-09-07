"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var conversions = require("webidl-conversions");
var utils = require("./utils.js");

var impl = utils.implSymbol;

var IteratorPrototype = Object.create(utils.IteratorPrototype, _defineProperty({
  next: {
    value: function next() {
      var internal = this[utils.iterInternalSymbol];
      var target = internal.target,
          kind = internal.kind,
          index = internal.index;

      var values = Array.from(target[impl]);
      var len = values.length;
      if (index >= len) {
        return { value: undefined, done: true };
      }

      var pair = values[index];
      internal.index = index + 1;

      var _pair$map = pair.map(utils.tryWrapperForImpl),
          _pair$map2 = _slicedToArray(_pair$map, 2),
          key = _pair$map2[0],
          value = _pair$map2[1];

      var result = void 0;
      switch (kind) {
        case "key":
          result = key;
          break;
        case "value":
          result = value;
          break;
        case "key+value":
          result = [key, value];
          break;
      }
      return { value: result, done: false };
    },
    writable: true,
    enumerable: true,
    configurable: true
  }
}, Symbol.toStringTag, {
  value: "URLSearchParamsIterator",
  writable: false,
  enumerable: false,
  configurable: true
}));

function URLSearchParams() {
  var args = [];
  for (var i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  if (args[0] !== undefined) {
    if (utils.isObject(args[0])) {
      if (args[0][Symbol.iterator] !== undefined) {
        if (!utils.isObject(args[0])) {
          throw new TypeError("Failed to construct 'URLSearchParams': parameter 1" + " sequence" + " is not an iterable object.");
        } else {
          var V = [];
          var tmp = args[0];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = tmp[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var nextItem = _step.value;

              if (!utils.isObject(nextItem)) {
                throw new TypeError("Failed to construct 'URLSearchParams': parameter 1" + " sequence" + "'s element" + " is not an iterable object.");
              } else {
                var _V = [];
                var _tmp = nextItem;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = _tmp[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _nextItem = _step2.value;

                    _nextItem = conversions["USVString"](_nextItem, {
                      context: "Failed to construct 'URLSearchParams': parameter 1" + " sequence" + "'s element" + "'s element"
                    });

                    _V.push(_nextItem);
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }

                nextItem = _V;
              }

              V.push(nextItem);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          args[0] = V;
        }
      } else {
        if (!utils.isObject(args[0])) {
          throw new TypeError("Failed to construct 'URLSearchParams': parameter 1" + " record" + " is not an object.");
        } else {
          var result = Object.create(null);
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = Reflect.ownKeys(args[0])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var key = _step3.value;

              var desc = Object.getOwnPropertyDescriptor(args[0], key);
              if (desc && desc.enumerable) {
                var typedKey = key;
                var typedValue = args[0][key];

                typedKey = conversions["USVString"](typedKey, {
                  context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s key"
                });

                typedValue = conversions["USVString"](typedValue, {
                  context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s value"
                });

                result[typedKey] = typedValue;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          args[0] = result;
        }
      }
    } else {
      args[0] = conversions["USVString"](args[0], { context: "Failed to construct 'URLSearchParams': parameter 1" });
    }
  } else {
    args[0] = "";
  }

  iface.setup(this, args);
}

Object.defineProperty(URLSearchParams, "prototype", {
  value: URLSearchParams.prototype,
  writable: false,
  enumerable: false,
  configurable: false
});

URLSearchParams.prototype.append = function append(name, value) {
  var _impl;

  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 2) {
    throw new TypeError("Failed to execute 'append' on 'URLSearchParams': 2 " + "arguments required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], {
    context: "Failed to execute 'append' on 'URLSearchParams': parameter 1"
  });

  args[1] = conversions["USVString"](args[1], {
    context: "Failed to execute 'append' on 'URLSearchParams': parameter 2"
  });

  return (_impl = this[impl]).append.apply(_impl, args);
};

URLSearchParams.prototype.delete = function _(name) {
  var _impl2;

  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'delete' on 'URLSearchParams': 1 " + "argument required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], {
    context: "Failed to execute 'delete' on 'URLSearchParams': parameter 1"
  });

  return (_impl2 = this[impl]).delete.apply(_impl2, args);
};

URLSearchParams.prototype.get = function get(name) {
  var _impl3;

  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'get' on 'URLSearchParams': 1 " + "argument required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], { context: "Failed to execute 'get' on 'URLSearchParams': parameter 1" });

  return (_impl3 = this[impl]).get.apply(_impl3, args);
};

URLSearchParams.prototype.getAll = function getAll(name) {
  var _impl4;

  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'getAll' on 'URLSearchParams': 1 " + "argument required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], {
    context: "Failed to execute 'getAll' on 'URLSearchParams': parameter 1"
  });

  return utils.tryWrapperForImpl((_impl4 = this[impl]).getAll.apply(_impl4, args));
};

URLSearchParams.prototype.has = function has(name) {
  var _impl5;

  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'has' on 'URLSearchParams': 1 " + "argument required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], { context: "Failed to execute 'has' on 'URLSearchParams': parameter 1" });

  return (_impl5 = this[impl]).has.apply(_impl5, args);
};

URLSearchParams.prototype.set = function set(name, value) {
  var _impl6;

  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  if (arguments.length < 2) {
    throw new TypeError("Failed to execute 'set' on 'URLSearchParams': 2 " + "arguments required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], { context: "Failed to execute 'set' on 'URLSearchParams': parameter 1" });

  args[1] = conversions["USVString"](args[1], { context: "Failed to execute 'set' on 'URLSearchParams': parameter 2" });

  return (_impl6 = this[impl]).set.apply(_impl6, args);
};

URLSearchParams.prototype.sort = function sort() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  return this[impl].sort();
};

URLSearchParams.prototype[Symbol.iterator] = function entries() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return module.exports.createDefaultIterator(this, "key+value");
};

URLSearchParams.prototype.entries = URLSearchParams.prototype[Symbol.iterator];

URLSearchParams.prototype.keys = function keys() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return module.exports.createDefaultIterator(this, "key");
};

URLSearchParams.prototype.values = function values() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return module.exports.createDefaultIterator(this, "value");
};

URLSearchParams.prototype.forEach = function forEach(callback) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'forEach' on 'URLSearchParams': 1 argument required, " + "but only 0 present.");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Failed to execute 'forEach' on 'URLSearchParams': The callback provided " + "as parameter 1 is not a function.");
  }
  var thisArg = arguments[1];
  var pairs = Array.from(this[impl]);
  var i = 0;
  while (i < pairs.length) {
    var _pairs$i$map = pairs[i].map(utils.tryWrapperForImpl),
        _pairs$i$map2 = _slicedToArray(_pairs$i$map, 2),
        key = _pairs$i$map2[0],
        value = _pairs$i$map2[1];

    callback.call(thisArg, value, key, this);
    pairs = Array.from(this[impl]);
    i++;
  }
};

URLSearchParams.prototype.toString = function toString() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  return this[impl].toString();
};

Object.defineProperty(URLSearchParams.prototype, Symbol.toStringTag, {
  value: "URLSearchParams",
  writable: false,
  enumerable: false,
  configurable: true
});

var iface = {
  mixedInto: [],
  is: function is(obj) {
    if (obj) {
      if (obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (var i = 0; i < module.exports.mixedInto.length; ++i) {
        if (obj instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl: function isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      var wrapper = utils.wrapperForImpl(obj);
      for (var i = 0; i < module.exports.mixedInto.length; ++i) {
        if (wrapper instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  convert: function convert(obj) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? "The provided value" : _ref$context;

    if (module.exports.is(obj)) {
      return utils.implForWrapper(obj);
    }
    throw new TypeError(context + " is not of type 'URLSearchParams'.");
  },
  createDefaultIterator: function createDefaultIterator(target, kind) {
    var iterator = Object.create(IteratorPrototype);
    Object.defineProperty(iterator, utils.iterInternalSymbol, {
      value: { target: target, kind: kind, index: 0 },
      writable: false,
      enumerable: false,
      configurable: true
    });
    return iterator;
  },
  create: function create(constructorArgs, privateData) {
    var obj = Object.create(URLSearchParams.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl: function createImpl(constructorArgs, privateData) {
    var obj = Object.create(URLSearchParams.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup: function _internalSetup(obj) {},
  setup: function setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};

    privateData.wrapper = obj;

    this._internalSetup(obj);
    Object.defineProperty(obj, impl, {
      value: new Impl.implementation(constructorArgs, privateData),
      writable: false,
      enumerable: false,
      configurable: true
    });
    obj[impl][utils.wrapperSymbol] = obj;
    if (Impl.init) {
      Impl.init(obj[impl], privateData);
    }
  },

  interface: URLSearchParams,
  expose: {
    Window: { URLSearchParams: URLSearchParams },
    Worker: { URLSearchParams: URLSearchParams }
  }
}; // iface
module.exports = iface;

var Impl = require(".//URLSearchParams-impl.js");