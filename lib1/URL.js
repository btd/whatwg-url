"use strict";

var conversions = require("webidl-conversions");
var utils = require("./utils.js");

var impl = utils.implSymbol;

function URL(url) {
  if (!new.target) {
    throw new TypeError("Failed to construct 'URL'. Please use the 'new' operator; this constructor " + "cannot be called as a function.");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'URL': 1 " + "argument required, but only " + arguments.length + " present.");
  }

  var args = [];
  for (var i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }

  args[0] = conversions["USVString"](args[0], { context: "Failed to construct 'URL': parameter 1" });

  if (args[1] !== undefined) {
    args[1] = conversions["USVString"](args[1], { context: "Failed to construct 'URL': parameter 2" });
  }

  iface.setup(this, args);
}

Object.defineProperty(URL, "prototype", {
  value: URL.prototype,
  writable: false,
  enumerable: false,
  configurable: false
});

URL.prototype.toJSON = function toJSON() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  return this[impl].toJSON();
};

Object.defineProperty(URL.prototype, "href", {
  get: function get() {
    return this[impl]["href"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'href' property on 'URL': The provided value" });

    this[impl]["href"] = V;
  },


  enumerable: true,
  configurable: true
});

URL.prototype.toString = function toString() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this[impl]["href"];
};

Object.defineProperty(URL.prototype, "origin", {
  get: function get() {
    return this[impl]["origin"];
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "protocol", {
  get: function get() {
    return this[impl]["protocol"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'protocol' property on 'URL': The provided value" });

    this[impl]["protocol"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "username", {
  get: function get() {
    return this[impl]["username"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'username' property on 'URL': The provided value" });

    this[impl]["username"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "password", {
  get: function get() {
    return this[impl]["password"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'password' property on 'URL': The provided value" });

    this[impl]["password"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "host", {
  get: function get() {
    return this[impl]["host"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'host' property on 'URL': The provided value" });

    this[impl]["host"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hostname", {
  get: function get() {
    return this[impl]["hostname"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'hostname' property on 'URL': The provided value" });

    this[impl]["hostname"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "port", {
  get: function get() {
    return this[impl]["port"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'port' property on 'URL': The provided value" });

    this[impl]["port"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "pathname", {
  get: function get() {
    return this[impl]["pathname"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'pathname' property on 'URL': The provided value" });

    this[impl]["pathname"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "search", {
  get: function get() {
    return this[impl]["search"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'search' property on 'URL': The provided value" });

    this[impl]["search"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "searchParams", {
  get: function get() {
    var _this = this;

    return utils.getSameObject(this, "searchParams", function () {
      return utils.tryWrapperForImpl(_this[impl]["searchParams"]);
    });
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hash", {
  get: function get() {
    return this[impl]["hash"];
  },
  set: function set(V) {
    V = conversions["USVString"](V, { context: "Failed to set the 'hash' property on 'URL': The provided value" });

    this[impl]["hash"] = V;
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, Symbol.toStringTag, {
  value: "URL",
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
    throw new TypeError(context + " is not of type 'URL'.");
  },
  create: function create(constructorArgs, privateData) {
    var obj = Object.create(URL.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl: function createImpl(constructorArgs, privateData) {
    var obj = Object.create(URL.prototype);
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

  interface: URL,
  expose: {
    Window: { URL: URL },
    Worker: { URL: URL }
  }
}; // iface
module.exports = iface;

var Impl = require(".//URL-impl.js");