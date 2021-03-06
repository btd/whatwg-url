"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var usm = require("./url-state-machine");
var urlencoded = require("./urlencoded");
var URLSearchParams = require("./URLSearchParams");

exports.implementation = function () {
  function URLImpl(constructorArgs) {
    _classCallCheck(this, URLImpl);

    var url = constructorArgs[0];
    var base = constructorArgs[1];

    var parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === null) {
        throw new TypeError("Invalid base URL");
      }
    }

    var parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === null) {
      throw new TypeError("Invalid URL");
    }

    var query = parsedURL.query !== null ? parsedURL.query : "";

    this._url = parsedURL;

    // We cannot invoke the "new URLSearchParams object" algorithm without going through the constructor, which strips
    // question mark by default. Therefore the doNotStripQMark hack is used.
    this._query = URLSearchParams.createImpl([query], { doNotStripQMark: true });
    this._query._url = this;
  }

  _createClass(URLImpl, [{
    key: "toJSON",
    value: function toJSON() {
      return this.href;
    }
  }, {
    key: "href",
    get: function get() {
      return usm.serializeURL(this._url);
    },
    set: function set(v) {
      var parsedURL = usm.basicURLParse(v);
      if (parsedURL === null) {
        throw new TypeError("Invalid URL");
      }

      this._url = parsedURL;
    }
  }, {
    key: "origin",
    get: function get() {
      return usm.serializeURLOrigin(this._url);
    }
  }, {
    key: "protocol",
    get: function get() {
      return this._url.scheme + ":";
    },
    set: function set(v) {
      usm.basicURLParse(v + ":", { url: this._url, stateOverride: "scheme start" });
    }
  }, {
    key: "username",
    get: function get() {
      return this._url.username;
    },
    set: function set(v) {
      if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
        return;
      }

      usm.setTheUsername(this._url, v);
    }
  }, {
    key: "password",
    get: function get() {
      return this._url.password;
    },
    set: function set(v) {
      if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
        return;
      }

      usm.setThePassword(this._url, v);
    }
  }, {
    key: "host",
    get: function get() {
      var url = this._url;

      if (url.host === null) {
        return "";
      }

      if (url.port === null) {
        return usm.serializeHost(url.host);
      }

      return usm.serializeHost(url.host) + ":" + usm.serializeInteger(url.port);
    },
    set: function set(v) {
      if (this._url.cannotBeABaseURL) {
        return;
      }

      usm.basicURLParse(v, { url: this._url, stateOverride: "host" });
    }
  }, {
    key: "hostname",
    get: function get() {
      if (this._url.host === null) {
        return "";
      }

      return usm.serializeHost(this._url.host);
    },
    set: function set(v) {
      if (this._url.cannotBeABaseURL) {
        return;
      }

      usm.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
    }
  }, {
    key: "port",
    get: function get() {
      if (this._url.port === null) {
        return "";
      }

      return usm.serializeInteger(this._url.port);
    },
    set: function set(v) {
      if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
        return;
      }

      if (v === "") {
        this._url.port = null;
      } else {
        usm.basicURLParse(v, { url: this._url, stateOverride: "port" });
      }
    }
  }, {
    key: "pathname",
    get: function get() {
      if (this._url.cannotBeABaseURL) {
        return this._url.path[0];
      }

      if (this._url.path.length === 0) {
        return "";
      }

      return "/" + this._url.path.join("/");
    },
    set: function set(v) {
      if (this._url.cannotBeABaseURL) {
        return;
      }

      this._url.path = [];
      usm.basicURLParse(v, { url: this._url, stateOverride: "path start" });
    }
  }, {
    key: "search",
    get: function get() {
      if (this._url.query === null || this._url.query === "") {
        return "";
      }

      return "?" + this._url.query;
    },
    set: function set(v) {
      var url = this._url;

      if (v === "") {
        url.query = null;
        this._query._list = [];
        return;
      }

      var input = v[0] === "?" ? v.substring(1) : v;
      url.query = "";
      usm.basicURLParse(input, { url: url, stateOverride: "query" });
      this._query._list = urlencoded.parseUrlencoded(input);
    }
  }, {
    key: "searchParams",
    get: function get() {
      return this._query;
    }
  }, {
    key: "hash",
    get: function get() {
      if (this._url.fragment === null || this._url.fragment === "") {
        return "";
      }

      return "#" + this._url.fragment;
    },
    set: function set(v) {
      if (v === "") {
        this._url.fragment = null;
        return;
      }

      var input = v[0] === "#" ? v.substring(1) : v;
      this._url.fragment = "";
      usm.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
    }
  }]);

  return URLImpl;
}();