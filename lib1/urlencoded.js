"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = require("./infra"),
    isASCIIHex = _require.isASCIIHex;

function strictlySplitByteSequence(buf, cp) {
  var list = [];
  var last = 0;
  var i = buf.indexOf(cp);
  while (i >= 0) {
    list.push(buf.slice(last, i));
    last = i + 1;
    i = buf.indexOf(cp, last);
  }
  if (last !== buf.length) {
    list.push(buf.slice(last));
  }
  return list;
}

function replaceByteInByteSequence(buf, from, to) {
  var i = buf.indexOf(from);
  while (i >= 0) {
    buf[i] = to;
    i = buf.indexOf(from, i + 1);
  }
  return buf;
}

function percentEncode(c) {
  var hex = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = "0" + hex;
  }

  return "%" + hex;
}

function percentDecode(input) {
  var output = Buffer.alloc(input.byteLength);
  var ptr = 0;
  for (var i = 0; i < input.length; ++i) {
    if (input[i] !== 37 || !isASCIIHex(input[i + 1]) || !isASCIIHex(input[i + 2])) {
      output[ptr++] = input[i];
    } else {
      output[ptr++] = parseInt(input.slice(i + 1, i + 3).toString(), 16);
      i += 2;
    }
  }
  return output.slice(0, ptr);
}

function _parseUrlencoded(input) {
  var sequences = strictlySplitByteSequence(input, 38);
  var output = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sequences[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var bytes = _step.value;

      if (bytes.length === 0) {
        continue;
      }

      var name = void 0;
      var value = void 0;
      var indexOfEqual = bytes.indexOf(61);

      if (indexOfEqual >= 0) {
        name = bytes.slice(0, indexOfEqual);
        value = bytes.slice(indexOfEqual + 1);
      } else {
        name = bytes;
        value = Buffer.alloc(0);
      }

      name = replaceByteInByteSequence(Buffer.from(name), 43, 32);
      value = replaceByteInByteSequence(Buffer.from(value), 43, 32);

      output.push([percentDecode(name).toString(), percentDecode(value).toString()]);
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

  return output;
}

function serializeUrlencodedByte(input) {
  var output = "";
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var byte = _step2.value;

      if (byte === 32) {
        output += "+";
      } else if (byte === 42 || byte === 45 || byte === 46 || byte >= 48 && byte <= 57 || byte >= 65 && byte <= 90 || byte === 95 || byte >= 97 && byte <= 122) {
        output += String.fromCodePoint(byte);
      } else {
        output += percentEncode(byte);
      }
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

  return output;
}

function serializeUrlencoded(tuples) {
  var encodingOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var encoding = "utf-8";
  if (encodingOverride !== undefined) {
    encoding = encodingOverride;
  }

  var output = "";
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = tuples.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 2),
          i = _step3$value[0],
          tuple = _step3$value[1];

      // TODO: handle encoding override
      var name = serializeUrlencodedByte(Buffer.from(tuple[0]));
      var value = tuple[1];
      if (tuple.length > 2 && tuple[2] !== undefined) {
        if (tuple[2] === "hidden" && name === "_charset_") {
          value = encoding;
        } else if (tuple[2] === "file") {
          // value is a File object
          value = value.name;
        }
      }
      value = serializeUrlencodedByte(Buffer.from(value));
      if (i !== 0) {
        output += "&";
      }
      output += name + "=" + value;
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

  return output;
}

module.exports = {
  percentEncode: percentEncode,
  percentDecode: percentDecode,

  // application/x-www-form-urlencoded string parser
  parseUrlencoded: function parseUrlencoded(input) {
    return _parseUrlencoded(Buffer.from(input));
  },


  // application/x-www-form-urlencoded serializer
  serializeUrlencoded: serializeUrlencoded
};