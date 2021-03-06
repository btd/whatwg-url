"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stableSortBy = require("lodash.sortby");
var urlencoded = require("./urlencoded");

exports.implementation = function () {
  function URLSearchParamsImpl(constructorArgs, _ref) {
    var _ref$doNotStripQMark = _ref.doNotStripQMark,
        doNotStripQMark = _ref$doNotStripQMark === undefined ? false : _ref$doNotStripQMark;

    _classCallCheck(this, URLSearchParamsImpl);

    var init = constructorArgs[0];
    this._list = [];
    this._url = null;

    if (!doNotStripQMark && typeof init === "string" && init[0] === "?") {
      init = init.slice(1);
    }

    if (Array.isArray(init)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = init[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pair = _step.value;

          if (pair.length !== 2) {
            throw new TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence's element does not " + "contain exactly two elements.");
          }
          this._list.push([pair[0], pair[1]]);
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
    } else if ((typeof init === "undefined" ? "undefined" : _typeof(init)) === "object" && Object.getPrototypeOf(init) === null) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(init)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;

          var value = init[name];
          this._list.push([name, value]);
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
    } else {
      this._list = urlencoded.parseUrlencoded(init);
    }
  }

  _createClass(URLSearchParamsImpl, [{
    key: "_updateSteps",
    value: function _updateSteps() {
      if (this._url !== null) {
        var query = urlencoded.serializeUrlencoded(this._list);
        if (query === "") {
          query = null;
        }
        this._url._url.query = query;
      }
    }
  }, {
    key: "append",
    value: function append(name, value) {
      this._list.push([name, value]);
      this._updateSteps();
    }
  }, {
    key: "delete",
    value: function _delete(name) {
      var i = 0;
      while (i < this._list.length) {
        if (this._list[i][0] === name) {
          this._list.splice(i, 1);
        } else {
          i++;
        }
      }
      this._updateSteps();
    }
  }, {
    key: "get",
    value: function get(name) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var tuple = _step3.value;

          if (tuple[0] === name) {
            return tuple[1];
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

      return null;
    }
  }, {
    key: "getAll",
    value: function getAll(name) {
      var output = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var tuple = _step4.value;

          if (tuple[0] === name) {
            output.push(tuple[1]);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return output;
    }
  }, {
    key: "has",
    value: function has(name) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._list[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var tuple = _step5.value;

          if (tuple[0] === name) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return false;
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var found = false;
      var i = 0;
      while (i < this._list.length) {
        if (this._list[i][0] === name) {
          if (found) {
            this._list.splice(i, 1);
          } else {
            found = true;
            this._list[i][1] = value;
            i++;
          }
        } else {
          i++;
        }
      }
      if (!found) {
        this._list.push([name, value]);
      }
      this._updateSteps();
    }
  }, {
    key: "sort",
    value: function sort() {
      this._list = stableSortBy(this._list, [0]);
      this._updateSteps();
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return this._list[Symbol.iterator]();
    }
  }, {
    key: "toString",
    value: function toString() {
      return urlencoded.serializeUrlencoded(this._list);
    }
  }]);

  return URLSearchParamsImpl;
}();