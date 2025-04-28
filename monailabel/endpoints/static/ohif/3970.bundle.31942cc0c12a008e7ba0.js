(self["webpackChunk"] = self["webpackChunk"] || []).push([[3970],{

/***/ 33970:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fX: () => (/* reexport */ enums_namespaceObject),
  X6: () => (/* reexport */ adaptersPMAP),
  f_: () => (/* reexport */ adaptersRT),
  ql: () => (/* reexport */ adaptersSEG),
  QX: () => (/* reexport */ adaptersSR),
  _$: () => (/* reexport */ helpers_namespaceObject)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Segmentation.js
var Segmentation_namespaceObject = {};
__webpack_require__.r(Segmentation_namespaceObject);
__webpack_require__.d(Segmentation_namespaceObject, {
  fillSegmentation: () => (Segmentation_fillSegmentation),
  generateSegmentation: () => (Segmentation_generateSegmentation),
  generateToolState: () => (Segmentation_generateToolState)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Segmentation/index.js
var Cornerstone3D_Segmentation_namespaceObject = {};
__webpack_require__.r(Cornerstone3D_Segmentation_namespaceObject);
__webpack_require__.d(Cornerstone3D_Segmentation_namespaceObject, {
  generateLabelMaps2DFrom3D: () => (generateLabelMaps2DFrom3D),
  generateSegmentation: () => (generateSegmentation_generateSegmentation),
  generateToolState: () => (generateToolState_generateToolState)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/ParametricMap/index.js
var Cornerstone3D_ParametricMap_namespaceObject = {};
__webpack_require__.r(Cornerstone3D_ParametricMap_namespaceObject);
__webpack_require__.d(Cornerstone3D_ParametricMap_namespaceObject, {
  generateToolState: () => (ParametricMap_generateToolState_generateToolState)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/index.js
var RTStruct_namespaceObject = {};
__webpack_require__.r(RTStruct_namespaceObject);
__webpack_require__.d(RTStruct_namespaceObject, {
  generateContourSetsFromLabelmap: () => (RTStruct_generateContourSetsFromLabelmap),
  generateRTSSFromAnnotations: () => (generateRTSSFromAnnotations),
  generateRTSSFromSegmentations: () => (generateRTSSFromSegmentations)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/enums/index.js
var enums_namespaceObject = {};
__webpack_require__.r(enums_namespaceObject);
__webpack_require__.d(enums_namespaceObject, {
  s: () => (Events$1)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/index.js
var helpers_namespaceObject = {};
__webpack_require__.r(helpers_namespaceObject);
__webpack_require__.d(helpers_namespaceObject, {
  vk: () => (downloadDICOMData)
});

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}



// EXTERNAL MODULE: ../../../node_modules/dcmjs/build/dcmjs.es.js
var dcmjs_es = __webpack_require__(5842);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/toArray.js
var toArray = function toArray(x) {
  return Array.isArray(x) ? x : [x];
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/codeMeaningEquals.js
var codeMeaningEquals = function codeMeaningEquals(codeMeaningName) {
  return function (contentItem) {
    return contentItem.ConceptNameCodeSequence.CodeMeaning === codeMeaningName;
  };
};



// EXTERNAL MODULE: ../../../node_modules/buffer/index.js
var node_modules_buffer = __webpack_require__(81429);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/downloadDICOMData.js



var datasetToDict = dcmjs_es/* data */.p.datasetToDict;
function downloadDICOMData(bufferOrDataset, filename) {
  var blob;
  if (bufferOrDataset instanceof ArrayBuffer) {
    blob = new Blob([bufferOrDataset], {
      type: "application/dicom"
    });
  } else {
    if (!bufferOrDataset._meta) {
      throw new Error("Dataset must have a _meta property");
    }
    var buffer = node_modules_buffer/* Buffer */.hp.from(datasetToDict(bufferOrDataset).write());
    blob = new Blob([buffer], {
      type: "application/dicom"
    });
  }
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/MeasurementReport.js






var TID1500 = dcmjs_es/* utilities */.BF.TID1500,
  addAccessors = dcmjs_es/* utilities */.BF.addAccessors;
var StructuredReport = dcmjs_es/* derivations */.h4.StructuredReport;
var Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
var TID1500MeasurementReport = TID1500.TID1500MeasurementReport,
  TID1501MeasurementGroup = TID1500.TID1501MeasurementGroup;
var DicomMetaDictionary = dcmjs_es/* data */.p.DicomMetaDictionary;
var FINDING = {
  CodingSchemeDesignator: "DCM",
  CodeValue: "121071"
};
var FINDING_SITE = {
  CodingSchemeDesignator: "SCT",
  CodeValue: "363698007"
};
var FINDING_SITE_OLD = {
  CodingSchemeDesignator: "SRT",
  CodeValue: "G-C0E3"
};
var codeValueMatch = function codeValueMatch(group, code, oldCode) {
  var ConceptNameCodeSequence = group.ConceptNameCodeSequence;
  if (!ConceptNameCodeSequence) {
    return;
  }
  var CodingSchemeDesignator = ConceptNameCodeSequence.CodingSchemeDesignator,
    CodeValue = ConceptNameCodeSequence.CodeValue;
  return CodingSchemeDesignator == code.CodingSchemeDesignator && CodeValue == code.CodeValue || oldCode && CodingSchemeDesignator == oldCode.CodingSchemeDesignator && CodeValue == oldCode.CodeValue;
};
function getTID300ContentItem(tool, toolType, ReferencedSOPSequence, toolClass) {
  var args = toolClass.getTID300RepresentationArguments(tool);
  args.ReferencedSOPSequence = ReferencedSOPSequence;
  var TID300Measurement = new toolClass.TID300Representation(args);
  return TID300Measurement;
}
function getMeasurementGroup(toolType, toolData, ReferencedSOPSequence) {
  var toolTypeData = toolData[toolType];
  var toolClass = MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_TOOL_TYPE[toolType];
  if (!toolTypeData || !toolTypeData.data || !toolTypeData.data.length || !toolClass) {
    return;
  }

  // Loop through the array of tool instances
  // for this tool
  var Measurements = toolTypeData.data.map(function (tool) {
    return getTID300ContentItem(tool, toolType, ReferencedSOPSequence, toolClass);
  });
  return new TID1501MeasurementGroup(Measurements);
}
var MeasurementReport = /*#__PURE__*/function () {
  function MeasurementReport() {
    _classCallCheck(this, MeasurementReport);
  }
  return _createClass(MeasurementReport, null, [{
    key: "getSetupMeasurementData",
    value: function getSetupMeasurementData(MeasurementGroup) {
      var ContentSequence = MeasurementGroup.ContentSequence;
      var contentSequenceArr = toArray(ContentSequence);
      var findingGroup = contentSequenceArr.find(function (group) {
        return codeValueMatch(group, FINDING);
      });
      var findingSiteGroups = contentSequenceArr.filter(function (group) {
        return codeValueMatch(group, FINDING_SITE, FINDING_SITE_OLD);
      }) || [];
      var NUMGroup = contentSequenceArr.find(function (group) {
        return group.ValueType === "NUM";
      });
      var SCOORDGroup = toArray(NUMGroup.ContentSequence).find(function (group) {
        return group.ValueType === "SCOORD";
      });
      var ReferencedSOPSequence = SCOORDGroup.ContentSequence.ReferencedSOPSequence;
      var ReferencedSOPInstanceUID = ReferencedSOPSequence.ReferencedSOPInstanceUID,
        ReferencedFrameNumber = ReferencedSOPSequence.ReferencedFrameNumber;
      var defaultState = {
        sopInstanceUid: ReferencedSOPInstanceUID,
        frameIndex: ReferencedFrameNumber || 1,
        complete: true,
        finding: findingGroup ? addAccessors(findingGroup.ConceptCodeSequence) : undefined,
        findingSites: findingSiteGroups.map(function (fsg) {
          return addAccessors(fsg.ConceptCodeSequence);
        })
      };
      if (defaultState.finding) {
        defaultState.description = defaultState.finding.CodeMeaning;
      }
      var findingSite = defaultState.findingSites && defaultState.findingSites[0];
      if (findingSite) {
        defaultState.location = findingSite[0] && findingSite[0].CodeMeaning || findingSite.CodeMeaning;
      }
      return {
        defaultState: defaultState,
        findingGroup: findingGroup,
        findingSiteGroups: findingSiteGroups,
        NUMGroup: NUMGroup,
        SCOORDGroup: SCOORDGroup,
        ReferencedSOPSequence: ReferencedSOPSequence,
        ReferencedSOPInstanceUID: ReferencedSOPInstanceUID,
        ReferencedFrameNumber: ReferencedFrameNumber
      };
    }
  }, {
    key: "generateReport",
    value: function generateReport(toolState, metadataProvider, options) {
      // ToolState for array of imageIDs to a Report
      // Assume Cornerstone metadata provider has access to Study / Series / Sop Instance UID

      var allMeasurementGroups = [];
      var firstImageId = Object.keys(toolState)[0];
      if (!firstImageId) {
        throw new Error("No measurements provided.");
      }

      /* Patient ID
      Warning - Missing attribute or value that would be needed to build DICOMDIR - Patient ID
      Warning - Missing attribute or value that would be needed to build DICOMDIR - Study Date
      Warning - Missing attribute or value that would be needed to build DICOMDIR - Study Time
      Warning - Missing attribute or value that would be needed to build DICOMDIR - Study ID
       */
      var generalSeriesModule = metadataProvider.get("generalSeriesModule", firstImageId);

      //const sopCommonModule = metadataProvider.get('sopCommonModule', firstImageId);

      // NOTE: We are getting the Series and Study UIDs from the first imageId of the toolState
      // which means that if the toolState is for multiple series, the report will have the incorrect
      // SeriesInstanceUIDs
      var studyInstanceUID = generalSeriesModule.studyInstanceUID,
        seriesInstanceUID = generalSeriesModule.seriesInstanceUID;

      // Loop through each image in the toolData
      Object.keys(toolState).forEach(function (imageId) {
        var sopCommonModule = metadataProvider.get("sopCommonModule", imageId);
        var frameNumber = metadataProvider.get("frameNumber", imageId);
        var toolData = toolState[imageId];
        var toolTypes = Object.keys(toolData);
        var ReferencedSOPSequence = {
          ReferencedSOPClassUID: sopCommonModule.sopClassUID,
          ReferencedSOPInstanceUID: sopCommonModule.sopInstanceUID
        };
        if (Normalizer.isMultiframeSOPClassUID(sopCommonModule.sopClassUID)) {
          ReferencedSOPSequence.ReferencedFrameNumber = frameNumber;
        }

        // Loop through each tool type for the image
        var measurementGroups = [];
        toolTypes.forEach(function (toolType) {
          var group = getMeasurementGroup(toolType, toolData, ReferencedSOPSequence);
          if (group) {
            measurementGroups.push(group);
          }
        });
        allMeasurementGroups = allMeasurementGroups.concat(measurementGroups);
      });
      var _MeasurementReport = new TID1500MeasurementReport({
        TID1501MeasurementGroups: allMeasurementGroups
      }, options);

      // TODO: what is the correct metaheader
      // http://dicom.nema.org/medical/Dicom/current/output/chtml/part10/chapter_7.html
      // TODO: move meta creation to happen in derivations.js
      var fileMetaInformationVersionArray = new Uint8Array(2);
      fileMetaInformationVersionArray[1] = 1;
      var derivationSourceDataset = {
        StudyInstanceUID: studyInstanceUID,
        SeriesInstanceUID: seriesInstanceUID
        //SOPInstanceUID: sopInstanceUID, // TODO: Necessary?
        //SOPClassUID: sopClassUID,
      };
      var _meta = {
        FileMetaInformationVersion: {
          Value: [fileMetaInformationVersionArray.buffer],
          vr: "OB"
        },
        //MediaStorageSOPClassUID
        //MediaStorageSOPInstanceUID: sopCommonModule.sopInstanceUID,
        TransferSyntaxUID: {
          Value: ["1.2.840.10008.1.2.1"],
          vr: "UI"
        },
        ImplementationClassUID: {
          Value: [DicomMetaDictionary.uid()],
          // TODO: could be git hash or other valid id
          vr: "UI"
        },
        ImplementationVersionName: {
          Value: ["dcmjs"],
          vr: "SH"
        }
      };
      var _vrMap = {
        PixelData: "OW"
      };
      derivationSourceDataset._meta = _meta;
      derivationSourceDataset._vrMap = _vrMap;
      var report = new StructuredReport([derivationSourceDataset]);
      var contentItem = _MeasurementReport.contentItem(derivationSourceDataset);

      // Merge the derived dataset with the content from the Measurement Report
      report.dataset = Object.assign(report.dataset, contentItem);
      report.dataset._meta = _meta;
      report.dataset.SpecificCharacterSet = "ISO_IR 192";
      return report;
    }

    /**
     * Generate Cornerstone tool state from dataset
     * @param {object} dataset dataset
     * @param {object} hooks
     * @param {function} hooks.getToolClass Function to map dataset to a tool class
     * @returns
     */
  }, {
    key: "generateToolState",
    value: function generateToolState(dataset) {
      var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // For now, bail out if the dataset is not a TID1500 SR with length measurements
      if (dataset.ContentTemplateSequence.TemplateIdentifier !== "1500") {
        throw new Error("This package can currently only interpret DICOM SR TID 1500");
      }
      var REPORT = "Imaging Measurements";
      var GROUP = "Measurement Group";
      var TRACKING_IDENTIFIER = "Tracking Identifier";

      // Identify the Imaging Measurements
      var imagingMeasurementContent = toArray(dataset.ContentSequence).find(codeMeaningEquals(REPORT));

      // Retrieve the Measurements themselves
      var measurementGroups = toArray(imagingMeasurementContent.ContentSequence).filter(codeMeaningEquals(GROUP));

      // For each of the supported measurement types, compute the measurement data
      var measurementData = {};
      var cornerstoneToolClasses = MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE;
      var registeredToolClasses = [];
      Object.keys(cornerstoneToolClasses).forEach(function (key) {
        registeredToolClasses.push(cornerstoneToolClasses[key]);
        measurementData[key] = [];
      });
      measurementGroups.forEach(function (measurementGroup) {
        var measurementGroupContentSequence = toArray(measurementGroup.ContentSequence);
        var TrackingIdentifierGroup = measurementGroupContentSequence.find(function (contentItem) {
          return contentItem.ConceptNameCodeSequence.CodeMeaning === TRACKING_IDENTIFIER;
        });
        var TrackingIdentifierValue = TrackingIdentifierGroup.TextValue;
        var toolClass = hooks.getToolClass ? hooks.getToolClass(measurementGroup, dataset, registeredToolClasses) : registeredToolClasses.find(function (tc) {
          return tc.isValidCornerstoneTrackingIdentifier(TrackingIdentifierValue);
        });
        if (toolClass) {
          var measurement = toolClass.getMeasurementData(measurementGroup);
          console.log("=== ".concat(toolClass.toolType, " ==="));
          console.log(measurement);
          measurementData[toolClass.toolType].push(measurement);
        }
      });

      // NOTE: There is no way of knowing the cornerstone imageIds as that could be anything.
      // That is up to the consumer to derive from the SOPInstanceUIDs.
      return measurementData;
    }
  }, {
    key: "registerTool",
    value: function registerTool(toolClass) {
      MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE[toolClass.utilityToolType] = toolClass;
      MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_TOOL_TYPE[toolClass.toolType] = toolClass;
      MeasurementReport.MEASUREMENT_BY_TOOLTYPE[toolClass.toolType] = toolClass.utilityToolType;
    }
  }]);
}();
MeasurementReport.MEASUREMENT_BY_TOOLTYPE = {};
MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE = {};
MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_TOOL_TYPE = {};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/cornerstone4Tag.js
var CORNERSTONE_4_TAG = "cornerstoneTools@^4.0.0";



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Length.js





var TID300Length = dcmjs_es/* utilities */.BF.TID300.Length;
var LENGTH = "Length";
var Length = /*#__PURE__*/function () {
  function Length() {
    _classCallCheck(this, Length);
  }
  return _createClass(Length, null, [{
    key: "getMeasurementData",
    value:
    // TODO: this function is required for all Cornerstone Tool Adapters, since it is called by MeasurementReport.
    function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup;
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        length: NUMGroup.MeasuredValueSequence.NumericValue,
        toolType: Length.toolType,
        handles: {
          start: {},
          end: {},
          textBox: {
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        }
      });
      var _SCOORDGroup$GraphicD = _slicedToArray(SCOORDGroup.GraphicData, 4);
      state.handles.start.x = _SCOORDGroup$GraphicD[0];
      state.handles.start.y = _SCOORDGroup$GraphicD[1];
      state.handles.end.x = _SCOORDGroup$GraphicD[2];
      state.handles.end.y = _SCOORDGroup$GraphicD[3];
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var handles = tool.handles,
        finding = tool.finding,
        findingSites = tool.findingSites;
      var point1 = handles.start;
      var point2 = handles.end;
      var distance = tool.length;
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:Length";
      return {
        point1: point1,
        point2: point2,
        distance: distance,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
Length.toolType = LENGTH;
Length.utilityToolType = LENGTH;
Length.TID300Representation = TID300Length;
Length.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === LENGTH;
};
MeasurementReport.registerTool(Length);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/FreehandRoi.js





var TID300Polyline = dcmjs_es/* utilities */.BF.TID300.Polyline;
var FreehandRoi = /*#__PURE__*/function () {
  function FreehandRoi() {
    _classCallCheck(this, FreehandRoi);
  }
  return _createClass(FreehandRoi, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        NUMGroup = _MeasurementReport$ge.NUMGroup;
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        toolType: FreehandRoi.toolType,
        handles: {
          points: [],
          textBox: {
            active: false,
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        },
        cachedStats: {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0
        },
        color: undefined,
        invalidated: true
      });
      var GraphicData = SCOORDGroup.GraphicData;
      for (var i = 0; i < GraphicData.length; i += 2) {
        state.handles.points.push({
          x: GraphicData[i],
          y: GraphicData[i + 1]
        });
      }
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var handles = tool.handles,
        finding = tool.finding,
        findingSites = tool.findingSites,
        _tool$cachedStats = tool.cachedStats,
        cachedStats = _tool$cachedStats === void 0 ? {} : _tool$cachedStats;
      var points = handles.points;
      var _cachedStats$area = cachedStats.area,
        area = _cachedStats$area === void 0 ? 0 : _cachedStats$area,
        _cachedStats$perimete = cachedStats.perimeter,
        perimeter = _cachedStats$perimete === void 0 ? 0 : _cachedStats$perimete;
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:FreehandRoi";
      return {
        points: points,
        area: area,
        perimeter: perimeter,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
FreehandRoi.toolType = "FreehandRoi";
FreehandRoi.utilityToolType = "FreehandRoi";
FreehandRoi.TID300Representation = TID300Polyline;
FreehandRoi.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === FreehandRoi.toolType;
};
MeasurementReport.registerTool(FreehandRoi);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Bidirectional.js







var TID300Bidirectional = dcmjs_es/* utilities */.BF.TID300.Bidirectional;
var BIDIRECTIONAL = "Bidirectional";
var LONG_AXIS = "Long Axis";
var SHORT_AXIS = "Short Axis";
var Bidirectional_FINDING = "121071";
var Bidirectional_FINDING_SITE = "G-C0E3";
var Bidirectional = /*#__PURE__*/function () {
  function Bidirectional() {
    _classCallCheck(this, Bidirectional);
  }
  return _createClass(Bidirectional, null, [{
    key: "getMeasurementData",
    value:
    // TODO: this function is required for all Cornerstone Tool Adapters, since it is called by MeasurementReport.
    function getMeasurementData(MeasurementGroup) {
      var ContentSequence = MeasurementGroup.ContentSequence;
      var findingGroup = toArray(ContentSequence).find(function (group) {
        return group.ConceptNameCodeSequence.CodeValue === Bidirectional_FINDING;
      });
      var findingSiteGroups = toArray(ContentSequence).filter(function (group) {
        return group.ConceptNameCodeSequence.CodeValue === Bidirectional_FINDING_SITE;
      });
      var longAxisNUMGroup = toArray(ContentSequence).find(function (group) {
        return group.ConceptNameCodeSequence.CodeMeaning === LONG_AXIS;
      });
      var longAxisSCOORDGroup = toArray(longAxisNUMGroup.ContentSequence).find(function (group) {
        return group.ValueType === "SCOORD";
      });
      var shortAxisNUMGroup = toArray(ContentSequence).find(function (group) {
        return group.ConceptNameCodeSequence.CodeMeaning === SHORT_AXIS;
      });
      var shortAxisSCOORDGroup = toArray(shortAxisNUMGroup.ContentSequence).find(function (group) {
        return group.ValueType === "SCOORD";
      });
      var ReferencedSOPSequence = longAxisSCOORDGroup.ContentSequence.ReferencedSOPSequence;
      var ReferencedSOPInstanceUID = ReferencedSOPSequence.ReferencedSOPInstanceUID,
        ReferencedFrameNumber = ReferencedSOPSequence.ReferencedFrameNumber;

      // Long axis

      var longestDiameter = String(longAxisNUMGroup.MeasuredValueSequence.NumericValue);
      var shortestDiameter = String(shortAxisNUMGroup.MeasuredValueSequence.NumericValue);
      var bottomRight = {
        x: Math.max(longAxisSCOORDGroup.GraphicData[0], longAxisSCOORDGroup.GraphicData[2], shortAxisSCOORDGroup.GraphicData[0], shortAxisSCOORDGroup.GraphicData[2]),
        y: Math.max(longAxisSCOORDGroup.GraphicData[1], longAxisSCOORDGroup.GraphicData[3], shortAxisSCOORDGroup.GraphicData[1], shortAxisSCOORDGroup.GraphicData[3])
      };
      var state = {
        sopInstanceUid: ReferencedSOPInstanceUID,
        frameIndex: ReferencedFrameNumber || 1,
        toolType: Bidirectional.toolType,
        active: false,
        handles: {
          start: {
            x: longAxisSCOORDGroup.GraphicData[0],
            y: longAxisSCOORDGroup.GraphicData[1],
            drawnIndependently: false,
            allowedOutsideImage: false,
            active: false,
            highlight: false,
            index: 0
          },
          end: {
            x: longAxisSCOORDGroup.GraphicData[2],
            y: longAxisSCOORDGroup.GraphicData[3],
            drawnIndependently: false,
            allowedOutsideImage: false,
            active: false,
            highlight: false,
            index: 1
          },
          perpendicularStart: {
            x: shortAxisSCOORDGroup.GraphicData[0],
            y: shortAxisSCOORDGroup.GraphicData[1],
            drawnIndependently: false,
            allowedOutsideImage: false,
            active: false,
            highlight: false,
            index: 2
          },
          perpendicularEnd: {
            x: shortAxisSCOORDGroup.GraphicData[2],
            y: shortAxisSCOORDGroup.GraphicData[3],
            drawnIndependently: false,
            allowedOutsideImage: false,
            active: false,
            highlight: false,
            index: 3
          },
          textBox: {
            highlight: false,
            hasMoved: true,
            active: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true,
            x: bottomRight.x + 10,
            y: bottomRight.y + 10
          }
        },
        invalidated: false,
        isCreating: false,
        longestDiameter: longestDiameter,
        shortestDiameter: shortestDiameter,
        toolName: "Bidirectional",
        visible: true,
        finding: findingGroup ? findingGroup.ConceptCodeSequence : undefined,
        findingSites: findingSiteGroups.map(function (fsg) {
          return fsg.ConceptCodeSequence;
        })
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var _tool$handles = tool.handles,
        start = _tool$handles.start,
        end = _tool$handles.end,
        perpendicularStart = _tool$handles.perpendicularStart,
        perpendicularEnd = _tool$handles.perpendicularEnd;
      var shortestDiameter = tool.shortestDiameter,
        longestDiameter = tool.longestDiameter,
        finding = tool.finding,
        findingSites = tool.findingSites;
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:Bidirectional";
      return {
        longAxis: {
          point1: start,
          point2: end
        },
        shortAxis: {
          point1: perpendicularStart,
          point2: perpendicularEnd
        },
        longAxisLength: longestDiameter,
        shortAxisLength: shortestDiameter,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
Bidirectional.toolType = BIDIRECTIONAL;
Bidirectional.utilityToolType = BIDIRECTIONAL;
Bidirectional.TID300Representation = TID300Bidirectional;
Bidirectional.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === BIDIRECTIONAL;
};
MeasurementReport.registerTool(Bidirectional);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/EllipticalRoi.js





var TID300Ellipse = dcmjs_es/* utilities */.BF.TID300.Ellipse;
var ELLIPTICALROI = "EllipticalRoi";
var EllipticalRoi = /*#__PURE__*/function () {
  function EllipticalRoi() {
    _classCallCheck(this, EllipticalRoi);
  }
  return _createClass(EllipticalRoi, null, [{
    key: "getMeasurementData",
    value:
    // TODO: this function is required for all Cornerstone Tool Adapters, since it is called by MeasurementReport.
    function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup;
      var GraphicData = SCOORDGroup.GraphicData;
      var majorAxis = [{
        x: GraphicData[0],
        y: GraphicData[1]
      }, {
        x: GraphicData[2],
        y: GraphicData[3]
      }];
      var minorAxis = [{
        x: GraphicData[4],
        y: GraphicData[5]
      }, {
        x: GraphicData[6],
        y: GraphicData[7]
      }];

      // Calculate two opposite corners of box defined by two axes.

      var minorAxisLength = Math.sqrt(Math.pow(minorAxis[0].x - minorAxis[1].x, 2) + Math.pow(minorAxis[0].y - minorAxis[1].y, 2));
      var minorAxisDirection = {
        x: (minorAxis[1].x - minorAxis[0].x) / minorAxisLength,
        y: (minorAxis[1].y - minorAxis[0].y) / minorAxisLength
      };
      var halfMinorAxisLength = minorAxisLength / 2;

      // First end point of major axis + half minor axis vector
      var corner1 = {
        x: majorAxis[0].x + minorAxisDirection.x * halfMinorAxisLength,
        y: majorAxis[0].y + minorAxisDirection.y * halfMinorAxisLength
      };

      // Second end point of major axis - half of minor axis vector
      var corner2 = {
        x: majorAxis[1].x - minorAxisDirection.x * halfMinorAxisLength,
        y: majorAxis[1].y - minorAxisDirection.y * halfMinorAxisLength
      };
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        toolType: EllipticalRoi.toolType,
        active: false,
        cachedStats: {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0
        },
        handles: {
          end: {
            x: corner1.x,
            y: corner1.y,
            highlight: false,
            active: false
          },
          initialRotation: 0,
          start: {
            x: corner2.x,
            y: corner2.y,
            highlight: false,
            active: false
          },
          textBox: {
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        },
        invalidated: true,
        visible: true
      });
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var _tool$cachedStats = tool.cachedStats,
        cachedStats = _tool$cachedStats === void 0 ? {} : _tool$cachedStats,
        handles = tool.handles,
        finding = tool.finding,
        findingSites = tool.findingSites;
      var start = handles.start,
        end = handles.end;
      var area = cachedStats.area;
      var halfXLength = Math.abs(start.x - end.x) / 2;
      var halfYLength = Math.abs(start.y - end.y) / 2;
      var points = [];
      var center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
      if (halfXLength > halfYLength) {
        // X-axis major
        // Major axis
        points.push({
          x: center.x - halfXLength,
          y: center.y
        });
        points.push({
          x: center.x + halfXLength,
          y: center.y
        });
        // Minor axis
        points.push({
          x: center.x,
          y: center.y - halfYLength
        });
        points.push({
          x: center.x,
          y: center.y + halfYLength
        });
      } else {
        // Y-axis major
        // Major axis
        points.push({
          x: center.x,
          y: center.y - halfYLength
        });
        points.push({
          x: center.x,
          y: center.y + halfYLength
        });
        // Minor axis
        points.push({
          x: center.x - halfXLength,
          y: center.y
        });
        points.push({
          x: center.x + halfXLength,
          y: center.y
        });
      }
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:EllipticalRoi";
      return {
        area: area,
        points: points,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
EllipticalRoi.toolType = ELLIPTICALROI;
EllipticalRoi.utilityToolType = ELLIPTICALROI;
EllipticalRoi.TID300Representation = TID300Ellipse;
EllipticalRoi.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === ELLIPTICALROI;
};
MeasurementReport.registerTool(EllipticalRoi);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/CircleRoi.js





var TID300Circle = dcmjs_es/* utilities */.BF.TID300.Circle;
var CIRCLEROI = "CircleRoi";
var CircleRoi = /*#__PURE__*/function () {
  function CircleRoi() {
    _classCallCheck(this, CircleRoi);
  }
  return _createClass(CircleRoi, null, [{
    key: "getMeasurementData",
    value: /** Gets the measurement data for cornerstone, given DICOM SR measurement data. */
    function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup;
      var GraphicData = SCOORDGroup.GraphicData;
      var center = {
        x: GraphicData[0],
        y: GraphicData[1]
      };
      var end = {
        x: GraphicData[2],
        y: GraphicData[3]
      };
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        toolType: CircleRoi.toolType,
        active: false,
        cachedStats: {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0,
          // Dummy values to be updated by cornerstone
          radius: 0,
          perimeter: 0
        },
        handles: {
          end: _objectSpread2(_objectSpread2({}, end), {}, {
            highlight: false,
            active: false
          }),
          initialRotation: 0,
          start: _objectSpread2(_objectSpread2({}, center), {}, {
            highlight: false,
            active: false
          }),
          textBox: {
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        },
        invalidated: true,
        visible: true
      });
      return state;
    }

    /**
     * Gets the TID 300 representation of a circle, given the cornerstone representation.
     *
     * @param {Object} tool
     * @returns
     */
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var _tool$cachedStats = tool.cachedStats,
        cachedStats = _tool$cachedStats === void 0 ? {} : _tool$cachedStats,
        handles = tool.handles,
        finding = tool.finding,
        findingSites = tool.findingSites;
      var center = handles.start,
        end = handles.end;
      var area = cachedStats.area,
        radius = cachedStats.radius;
      var perimeter = 2 * Math.PI * radius;
      var points = [];
      points.push(center);
      points.push(end);
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:CircleRoi";
      return {
        area: area,
        perimeter: perimeter,
        radius: radius,
        points: points,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
CircleRoi.toolType = CIRCLEROI;
CircleRoi.utilityToolType = CIRCLEROI;
CircleRoi.TID300Representation = TID300Circle;
CircleRoi.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === CIRCLEROI;
};
MeasurementReport.registerTool(CircleRoi);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/ArrowAnnotate.js





var TID300Point = dcmjs_es/* utilities */.BF.TID300.Point;
var ARROW_ANNOTATE = "ArrowAnnotate";
var CORNERSTONEFREETEXT = "CORNERSTONEFREETEXT";
var ArrowAnnotate = /*#__PURE__*/function () {
  function ArrowAnnotate() {
    _classCallCheck(this, ArrowAnnotate);
  }
  return _createClass(ArrowAnnotate, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        findingGroup = _MeasurementReport$ge.findingGroup;
      var text = findingGroup.ConceptCodeSequence.CodeMeaning;
      var GraphicData = SCOORDGroup.GraphicData;
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        toolType: ArrowAnnotate.toolType,
        active: false,
        handles: {
          start: {
            x: GraphicData[0],
            y: GraphicData[1],
            highlight: true,
            active: false
          },
          // Use a generic offset if the stored data doesn't have the endpoint, otherwise
          // use the actual endpoint.
          end: {
            x: GraphicData.length == 4 ? GraphicData[2] : GraphicData[0] + 20,
            y: GraphicData.length == 4 ? GraphicData[3] : GraphicData[1] + 20,
            highlight: true,
            active: false
          },
          textBox: {
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        },
        invalidated: true,
        text: text,
        visible: true
      });
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var points = [tool.handles.start, tool.handles.end];
      var finding = tool.finding,
        findingSites = tool.findingSites;
      var TID300RepresentationArguments = {
        points: points,
        trackingIdentifierTextValue: "cornerstoneTools@^4.0.0:ArrowAnnotate",
        findingSites: findingSites || []
      };

      // If freetext finding isn't present, add it from the tool text.
      if (!finding || finding.CodeValue !== CORNERSTONEFREETEXT) {
        finding = {
          CodeValue: CORNERSTONEFREETEXT,
          CodingSchemeDesignator: "CST4",
          CodeMeaning: tool.text
        };
      }
      TID300RepresentationArguments.finding = finding;
      return TID300RepresentationArguments;
    }
  }]);
}();
ArrowAnnotate.toolType = ARROW_ANNOTATE;
ArrowAnnotate.utilityToolType = ARROW_ANNOTATE;
ArrowAnnotate.TID300Representation = TID300Point;
ArrowAnnotate.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === ARROW_ANNOTATE;
};
MeasurementReport.registerTool(ArrowAnnotate);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/CobbAngle.js





var TID300CobbAngle = dcmjs_es/* utilities */.BF.TID300.CobbAngle;
var COBB_ANGLE = "CobbAngle";
var CobbAngle = /*#__PURE__*/function () {
  function CobbAngle() {
    _classCallCheck(this, CobbAngle);
  }
  return _createClass(CobbAngle, null, [{
    key: "getMeasurementData",
    value:
    // TODO: this function is required for all Cornerstone Tool Adapters, since it is called by MeasurementReport.
    function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup;
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        rAngle: NUMGroup.MeasuredValueSequence.NumericValue,
        toolType: CobbAngle.toolType,
        handles: {
          start: {},
          end: {},
          start2: {
            highlight: true,
            drawnIndependently: true
          },
          end2: {
            highlight: true,
            drawnIndependently: true
          },
          textBox: {
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        }
      });
      var _SCOORDGroup$GraphicD = _slicedToArray(SCOORDGroup.GraphicData, 8);
      state.handles.start.x = _SCOORDGroup$GraphicD[0];
      state.handles.start.y = _SCOORDGroup$GraphicD[1];
      state.handles.end.x = _SCOORDGroup$GraphicD[2];
      state.handles.end.y = _SCOORDGroup$GraphicD[3];
      state.handles.start2.x = _SCOORDGroup$GraphicD[4];
      state.handles.start2.y = _SCOORDGroup$GraphicD[5];
      state.handles.end2.x = _SCOORDGroup$GraphicD[6];
      state.handles.end2.y = _SCOORDGroup$GraphicD[7];
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var handles = tool.handles,
        finding = tool.finding,
        findingSites = tool.findingSites;
      var point1 = handles.start;
      var point2 = handles.end;
      var point3 = handles.start2;
      var point4 = handles.end2;
      var rAngle = tool.rAngle;
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:CobbAngle";
      return {
        point1: point1,
        point2: point2,
        point3: point3,
        point4: point4,
        rAngle: rAngle,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
CobbAngle.toolType = COBB_ANGLE;
CobbAngle.utilityToolType = COBB_ANGLE;
CobbAngle.TID300Representation = TID300CobbAngle;
CobbAngle.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === COBB_ANGLE;
};
MeasurementReport.registerTool(CobbAngle);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Angle.js





var TID300Angle = dcmjs_es/* utilities */.BF.TID300.Angle;
var ANGLE = "Angle";
var Angle = /*#__PURE__*/function () {
  function Angle() {
    _classCallCheck(this, Angle);
  }
  return _createClass(Angle, null, [{
    key: "getMeasurementData",
    value:
    /**
     * Generate TID300 measurement data for a plane angle measurement - use a Angle, but label it as Angle
     */
    function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup;
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        rAngle: NUMGroup.MeasuredValueSequence.NumericValue,
        toolType: Angle.toolType,
        handles: {
          start: {},
          middle: {},
          end: {},
          textBox: {
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          }
        }
      });
      var _SCOORDGroup$GraphicD = _slicedToArray(SCOORDGroup.GraphicData, 8);
      state.handles.start.x = _SCOORDGroup$GraphicD[0];
      state.handles.start.y = _SCOORDGroup$GraphicD[1];
      state.handles.middle.x = _SCOORDGroup$GraphicD[2];
      state.handles.middle.y = _SCOORDGroup$GraphicD[3];
      state.handles.middle.x = _SCOORDGroup$GraphicD[4];
      state.handles.middle.y = _SCOORDGroup$GraphicD[5];
      state.handles.end.x = _SCOORDGroup$GraphicD[6];
      state.handles.end.y = _SCOORDGroup$GraphicD[7];
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var handles = tool.handles,
        finding = tool.finding,
        findingSites = tool.findingSites;
      var point1 = handles.start;
      var point2 = handles.middle;
      var point3 = handles.middle;
      var point4 = handles.end;
      var rAngle = tool.rAngle;
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:Angle";
      return {
        point1: point1,
        point2: point2,
        point3: point3,
        point4: point4,
        rAngle: rAngle,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
Angle.toolType = ANGLE;
Angle.utilityToolType = ANGLE;
Angle.TID300Representation = TID300Angle;
Angle.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === ANGLE;
};
MeasurementReport.registerTool(Angle);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/RectangleRoi.js





var RectangleRoi_TID300Polyline = dcmjs_es/* utilities */.BF.TID300.Polyline;
var RectangleRoi = /*#__PURE__*/function () {
  function RectangleRoi() {
    _classCallCheck(this, RectangleRoi);
  }
  return _createClass(RectangleRoi, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup) {
      var _MeasurementReport$ge = MeasurementReport.getSetupMeasurementData(MeasurementGroup),
        defaultState = _MeasurementReport$ge.defaultState,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        NUMGroup = _MeasurementReport$ge.NUMGroup;
      var state = _objectSpread2(_objectSpread2({}, defaultState), {}, {
        toolType: RectangleRoi.toolType,
        handles: {
          start: {},
          end: {},
          textBox: {
            active: false,
            hasMoved: false,
            movesIndependently: false,
            drawnIndependently: true,
            allowedOutsideImage: true,
            hasBoundingBox: true
          },
          initialRotation: 0
        },
        cachedStats: {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0
        },
        color: undefined,
        invalidated: true
      });
      var _SCOORDGroup$GraphicD = _slicedToArray(SCOORDGroup.GraphicData, 6);
      state.handles.start.x = _SCOORDGroup$GraphicD[0];
      state.handles.start.y = _SCOORDGroup$GraphicD[1];
      _SCOORDGroup$GraphicD[2];
      _SCOORDGroup$GraphicD[3];
      state.handles.end.x = _SCOORDGroup$GraphicD[4];
      state.handles.end.y = _SCOORDGroup$GraphicD[5];
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool) {
      var finding = tool.finding,
        findingSites = tool.findingSites,
        _tool$cachedStats = tool.cachedStats,
        cachedStats = _tool$cachedStats === void 0 ? {} : _tool$cachedStats,
        handles = tool.handles;
      var start = handles.start,
        end = handles.end;
      var points = [start, {
        x: start.x,
        y: end.y
      }, end, {
        x: end.x,
        y: start.y
      }];
      var area = cachedStats.area,
        perimeter = cachedStats.perimeter;
      var trackingIdentifierTextValue = "cornerstoneTools@^4.0.0:RectangleRoi";
      return {
        points: points,
        area: area,
        perimeter: perimeter,
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
RectangleRoi.toolType = "RectangleRoi";
RectangleRoi.utilityToolType = "RectangleRoi";
RectangleRoi.TID300Representation = RectangleRoi_TID300Polyline;
RectangleRoi.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone4Tag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone4Tag !== CORNERSTONE_4_TAG) {
    return false;
  }
  return toolType === RectangleRoi.toolType;
};
MeasurementReport.registerTool(RectangleRoi);



// EXTERNAL MODULE: ../../../node_modules/ndarray/ndarray.js
var ndarray = __webpack_require__(3293);
var ndarray_default = /*#__PURE__*/__webpack_require__.n(ndarray);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/getDatasetsFromImages.js


var DicomMessage = dcmjs_es/* data */.p.DicomMessage,
  getDatasetsFromImages_DicomMetaDictionary = dcmjs_es/* data */.p.DicomMetaDictionary;
var getDatasetsFromImages_Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
function getDatasetsFromImages(images, isMultiframe, options) {
  var datasets = [];
  if (isMultiframe) {
    var image = images[0];
    var arrayBuffer = image.data.byteArray.buffer;
    var dicomData = DicomMessage.readFile(arrayBuffer);
    var dataset = getDatasetsFromImages_DicomMetaDictionary.naturalizeDataset(dicomData.dict);
    dataset._meta = getDatasetsFromImages_DicomMetaDictionary.namifyDataset(dicomData.meta);
    datasets.push(dataset);
  } else {
    for (var i = 0; i < images.length; i++) {
      var _image = images[i];
      var _arrayBuffer = _image.data.byteArray.buffer;
      var _dicomData = DicomMessage.readFile(_arrayBuffer);
      var _dataset = getDatasetsFromImages_DicomMetaDictionary.naturalizeDataset(_dicomData.dict);
      _dataset._meta = getDatasetsFromImages_DicomMetaDictionary.namifyDataset(_dicomData.meta);
      datasets.push(_dataset);
    }
  }
  if (options !== null && options !== void 0 && options.SpecificCharacterSet) {
    datasets.forEach(function (dataset) {
      return dataset.SpecificCharacterSet = options.SpecificCharacterSet;
    });
  }
  return getDatasetsFromImages_Normalizer.normalizeToDataset(datasets);
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Segmentation_3X.js





var _utilities$orientatio = dcmjs_es/* utilities */.BF.orientation,
  rotateDirectionCosinesInPlane = _utilities$orientatio.rotateDirectionCosinesInPlane,
  flipIOP = _utilities$orientatio.flipImageOrientationPatient,
  flipMatrix2D = _utilities$orientatio.flipMatrix2D,
  rotateMatrix902D = _utilities$orientatio.rotateMatrix902D;
var datasetToBlob = dcmjs_es/* utilities */.BF.datasetToBlob,
  BitArray = dcmjs_es/* utilities */.BF.BitArray,
  Segmentation_3X_DicomMessage = dcmjs_es/* utilities */.BF.DicomMessage,
  Segmentation_3X_DicomMetaDictionary = dcmjs_es/* utilities */.BF.DicomMetaDictionary;
var Segmentation_3X_Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
var SegmentationDerivation = dcmjs_es/* derivations */.h4.Segmentation;
var Segmentation = {
  generateSegmentation: generateSegmentation,
  generateToolState: generateToolState
};

/**
 *
 * @typedef {Object} BrushData
 * @property {Object} toolState - The cornerstoneTools global toolState.
 * @property {Object[]} segments - The cornerstoneTools segment metadata that corresponds to the
 *                                 seriesInstanceUid.
 */

/**
 * generateSegmentation - Generates cornerstoneTools brush data, given a stack of
 * imageIds, images and the cornerstoneTools brushData.
 *
 * @param  {object[]} images    An array of the cornerstone image objects.
 * @param  {BrushData} brushData and object containing the brushData.
 * @returns {type}           description
 */
function generateSegmentation(images, brushData) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    includeSliceSpacing: true
  };
  var toolState = brushData.toolState,
    segments = brushData.segments;

  // Calculate the dimensions of the data cube.
  var image0 = images[0];
  var dims = {
    x: image0.columns,
    y: image0.rows,
    z: images.length
  };
  dims.xy = dims.x * dims.y;
  var numSegments = _getSegCount(seg, segments);
  if (!numSegments) {
    throw new Error("No segments to export!");
  }
  var isMultiframe = image0.imageId.includes("?frame");
  var seg = _createSegFromImages(images, isMultiframe, options);
  var _getNumberOfFramesPer = _getNumberOfFramesPerSegment(toolState, images, segments),
    referencedFramesPerSegment = _getNumberOfFramesPer.referencedFramesPerSegment,
    segmentIndicies = _getNumberOfFramesPer.segmentIndicies;
  var NumberOfFrames = 0;
  for (var i = 0; i < referencedFramesPerSegment.length; i++) {
    NumberOfFrames += referencedFramesPerSegment[i].length;
  }
  seg.setNumberOfFrames(NumberOfFrames);
  for (var _i = 0; _i < segmentIndicies.length; _i++) {
    var segmentIndex = segmentIndicies[_i];
    var referencedFrameIndicies = referencedFramesPerSegment[_i];

    // Frame numbers start from 1.
    var referencedFrameNumbers = referencedFrameIndicies.map(function (element) {
      return element + 1;
    });
    var segment = segments[segmentIndex];
    seg.addSegment(segment, _extractCornerstoneToolsPixelData(segmentIndex, referencedFrameIndicies, toolState, images, dims), referencedFrameNumbers);
  }
  seg.bitPackPixelData();
  var segBlob = datasetToBlob(seg.dataset);
  return segBlob;
}
function _extractCornerstoneToolsPixelData(segmentIndex, referencedFrames, toolState, images, dims) {
  var pixelData = new Uint8Array(dims.xy * referencedFrames.length);
  var pixelDataIndex = 0;
  for (var i = 0; i < referencedFrames.length; i++) {
    var frame = referencedFrames[i];
    var imageId = images[frame].imageId;
    var imageIdSpecificToolState = toolState[imageId];
    var brushPixelData = imageIdSpecificToolState.brush.data[segmentIndex].pixelData;
    for (var p = 0; p < brushPixelData.length; p++) {
      pixelData[pixelDataIndex] = brushPixelData[p];
      pixelDataIndex++;
    }
  }
  return pixelData;
}
function _getNumberOfFramesPerSegment(toolState, images, segments) {
  var segmentIndicies = [];
  var referencedFramesPerSegment = [];
  for (var i = 0; i < segments.length; i++) {
    if (segments[i]) {
      segmentIndicies.push(i);
      referencedFramesPerSegment.push([]);
    }
  }
  for (var z = 0; z < images.length; z++) {
    var imageId = images[z].imageId;
    var imageIdSpecificToolState = toolState[imageId];
    for (var _i2 = 0; _i2 < segmentIndicies.length; _i2++) {
      var segIdx = segmentIndicies[_i2];
      if (imageIdSpecificToolState && imageIdSpecificToolState.brush && imageIdSpecificToolState.brush.data && imageIdSpecificToolState.brush.data[segIdx] && imageIdSpecificToolState.brush.data[segIdx].pixelData) {
        referencedFramesPerSegment[_i2].push(z);
      }
    }
  }
  return {
    referencedFramesPerSegment: referencedFramesPerSegment,
    segmentIndicies: segmentIndicies
  };
}
function _getSegCount(seg, segments) {
  var numSegments = 0;
  for (var i = 0; i < segments.length; i++) {
    if (segments[i]) {
      numSegments++;
    }
  }
  return numSegments;
}

/**
 * _createSegFromImages - description
 *
 * @param  {Object[]} images    An array of the cornerstone image objects.
 * @param  {Boolean} isMultiframe Whether the images are multiframe.
 * @returns {Object}              The Seg derived dataSet.
 */
function _createSegFromImages(images, isMultiframe, options) {
  var multiframe = getDatasetsFromImages(images, isMultiframe);
  return new SegmentationDerivation([multiframe], options);
}

/**
 * generateToolState - Given a set of cornrstoneTools imageIds and a Segmentation buffer,
 * derive cornerstoneTools toolState and brush metadata.
 *
 * @param  {string[]} imageIds    An array of the imageIds.
 * @param  {ArrayBuffer} arrayBuffer The SEG arrayBuffer.
 * @param {*} metadataProvider
 * @returns {Object}  The toolState and an object from which the
 *                    segment metadata can be derived.
 */
function generateToolState(imageIds, arrayBuffer, metadataProvider) {
  var dicomData = Segmentation_3X_DicomMessage.readFile(arrayBuffer);
  var dataset = Segmentation_3X_DicomMetaDictionary.naturalizeDataset(dicomData.dict);
  dataset._meta = Segmentation_3X_DicomMetaDictionary.namifyDataset(dicomData.meta);
  var multiframe = Segmentation_3X_Normalizer.normalizeToDataset([dataset]);
  var imagePlaneModule = metadataProvider.get("imagePlaneModule", imageIds[0]);
  if (!imagePlaneModule) {
    console.warn("Insufficient metadata, imagePlaneModule missing.");
  }
  var ImageOrientationPatient = Array.isArray(imagePlaneModule.rowCosines) ? [].concat(_toConsumableArray(imagePlaneModule.rowCosines), _toConsumableArray(imagePlaneModule.columnCosines)) : [imagePlaneModule.rowCosines.x, imagePlaneModule.rowCosines.y, imagePlaneModule.rowCosines.z, imagePlaneModule.columnCosines.x, imagePlaneModule.columnCosines.y, imagePlaneModule.columnCosines.z];

  // Get IOP from ref series, compute supported orientations:
  var validOrientations = getValidOrientations(ImageOrientationPatient);
  var SharedFunctionalGroupsSequence = multiframe.SharedFunctionalGroupsSequence;
  var sharedImageOrientationPatient = SharedFunctionalGroupsSequence.PlaneOrientationSequence ? SharedFunctionalGroupsSequence.PlaneOrientationSequence.ImageOrientationPatient : undefined;
  var sliceLength = multiframe.Columns * multiframe.Rows;
  var segMetadata = getSegmentMetadata(multiframe);
  var pixelData = unpackPixelData(multiframe);
  var PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence;
  var toolState = {};
  var inPlane = true;
  for (var i = 0; i < PerFrameFunctionalGroupsSequence.length; i++) {
    var PerFrameFunctionalGroups = PerFrameFunctionalGroupsSequence[i];
    var ImageOrientationPatientI = sharedImageOrientationPatient || PerFrameFunctionalGroups.PlaneOrientationSequence.ImageOrientationPatient;
    var pixelDataI2D = ndarray_default()(new Uint8Array(pixelData.buffer, i * sliceLength, sliceLength), [multiframe.Rows, multiframe.Columns]);
    var alignedPixelDataI = alignPixelDataWithSourceData(pixelDataI2D, ImageOrientationPatientI, validOrientations);
    if (!alignedPixelDataI) {
      console.warn("This segmentation object is not in-plane with the source data. Bailing out of IO. It'd be better to render this with vtkjs. ");
      inPlane = false;
      break;
    }
    var segmentIndex = PerFrameFunctionalGroups.SegmentIdentificationSequence.ReferencedSegmentNumber - 1;
    var SourceImageSequence = void 0;
    if (SharedFunctionalGroupsSequence.DerivationImageSequence && SharedFunctionalGroupsSequence.DerivationImageSequence.SourceImageSequence) {
      SourceImageSequence = SharedFunctionalGroupsSequence.DerivationImageSequence.SourceImageSequence[i];
    } else {
      SourceImageSequence = PerFrameFunctionalGroups.DerivationImageSequence.SourceImageSequence;
    }
    var imageId = getImageIdOfSourceImage(SourceImageSequence, imageIds, metadataProvider);
    addImageIdSpecificBrushToolState(toolState, imageId, segmentIndex, alignedPixelDataI);
  }
  if (!inPlane) {
    return;
  }
  return {
    toolState: toolState,
    segMetadata: segMetadata
  };
}

/**
 * unpackPixelData - Unpacks bitpacked pixelData if the Segmentation is BINARY.
 *
 * @param  {Object} multiframe The multiframe dataset.
 * @return {Uint8Array}      The unpacked pixelData.
 */
function unpackPixelData(multiframe) {
  var segType = multiframe.SegmentationType;
  if (segType === "BINARY") {
    return BitArray.unpack(multiframe.PixelData);
  }
  var pixelData = new Uint8Array(multiframe.PixelData);
  var max = multiframe.MaximumFractionalValue;
  var onlyMaxAndZero = pixelData.find(function (element) {
    return element !== 0 && element !== max;
  }) === undefined;
  if (!onlyMaxAndZero) {
    dcmjs_es/* log */.Rm.warn("This is a fractional segmentation, which is not currently supported.");
    return;
  }
  dcmjs_es/* log */.Rm.warn("This segmentation object is actually binary... processing as such.");
  return pixelData;
}

/**
 * addImageIdSpecificBrushToolState - Adds brush pixel data to cornerstoneTools
 * formatted toolState object.
 *
 * @param  {Object} toolState    The toolState object to modify
 * @param  {String} imageId      The imageId of the toolState to add the data.
 * @param  {Number} segmentIndex The index of the segment data being added.
 * @param  {Ndarray} pixelData2D  The pixelData in Ndarry 2D format.
 */
function addImageIdSpecificBrushToolState(toolState, imageId, segmentIndex, pixelData2D) {
  if (!toolState[imageId]) {
    toolState[imageId] = {};
    toolState[imageId].brush = {};
    toolState[imageId].brush.data = [];
  } else if (!toolState[imageId].brush) {
    toolState[imageId].brush = {};
    toolState[imageId].brush.data = [];
  } else if (!toolState[imageId].brush.data) {
    toolState[imageId].brush.data = [];
  }
  toolState[imageId].brush.data[segmentIndex] = {};
  var brushDataI = toolState[imageId].brush.data[segmentIndex];
  brushDataI.pixelData = new Uint8Array(pixelData2D.data.length);
  var cToolsPixelData = brushDataI.pixelData;
  for (var p = 0; p < cToolsPixelData.length; p++) {
    if (pixelData2D.data[p]) {
      cToolsPixelData[p] = 1;
    } else {
      cToolsPixelData[p] = 0;
    }
  }
}

/**
 * getImageIdOfSourceImage - Returns the Cornerstone imageId of the source image.
 *
 * @param  {Object} SourceImageSequence Sequence describing the source image.
 * @param  {String[]} imageIds          A list of imageIds.
 * @param  {Object} metadataProvider    A Cornerstone metadataProvider to query
 *                                      metadata from imageIds.
 * @return {String}                     The corresponding imageId.
 */
function getImageIdOfSourceImage(SourceImageSequence, imageIds, metadataProvider) {
  var ReferencedSOPInstanceUID = SourceImageSequence.ReferencedSOPInstanceUID,
    ReferencedFrameNumber = SourceImageSequence.ReferencedFrameNumber;
  return ReferencedFrameNumber ? getImageIdOfReferencedFrame(ReferencedSOPInstanceUID, ReferencedFrameNumber, imageIds, metadataProvider) : getImageIdOfReferencedSingleFramedSOPInstance(ReferencedSOPInstanceUID, imageIds, metadataProvider);
}

/**
 * getImageIdOfReferencedSingleFramedSOPInstance - Returns the imageId
 * corresponding to the specified sopInstanceUid for single-frame images.
 *
 * @param  {String} sopInstanceUid   The sopInstanceUid of the desired image.
 * @param  {String[]} imageIds         The list of imageIds.
 * @param  {Object} metadataProvider The metadataProvider to obtain sopInstanceUids
 *                                 from the cornerstone imageIds.
 * @return {String}                  The imageId that corresponds to the sopInstanceUid.
 */
function getImageIdOfReferencedSingleFramedSOPInstance(sopInstanceUid, imageIds, metadataProvider) {
  return imageIds.find(function (imageId) {
    var sopCommonModule = metadataProvider.get("sopCommonModule", imageId);
    if (!sopCommonModule) {
      return;
    }
    return sopCommonModule.sopInstanceUID === sopInstanceUid;
  });
}

/**
 * getImageIdOfReferencedFrame - Returns the imageId corresponding to the
 * specified sopInstanceUid and frameNumber for multi-frame images.
 *
 * @param  {String} sopInstanceUid   The sopInstanceUid of the desired image.
 * @param  {Number} frameNumber      The frame number.
 * @param  {String} imageIds         The list of imageIds.
 * @param  {Object} metadataProvider The metadataProvider to obtain sopInstanceUids
 *                                   from the cornerstone imageIds.
 * @return {String}                  The imageId that corresponds to the sopInstanceUid.
 */
function getImageIdOfReferencedFrame(sopInstanceUid, frameNumber, imageIds, metadataProvider) {
  var imageId = imageIds.find(function (imageId) {
    var sopCommonModule = metadataProvider.get("sopCommonModule", imageId);
    if (!sopCommonModule) {
      return;
    }
    var imageIdFrameNumber = Number(imageId.split("frame=")[1]);
    return (
      //frameNumber is zero indexed for cornerstoneDICOMImageLoader image Ids.
      sopCommonModule.sopInstanceUID === sopInstanceUid && imageIdFrameNumber === frameNumber - 1
    );
  });
  return imageId;
}

/**
 * getValidOrientations - returns an array of valid orientations.
 *
 * @param  iop - The row (0..2) an column (3..5) direction cosines.
 * @return  An array of valid orientations.
 */
function getValidOrientations(iop) {
  var orientations = [];

  // [0,  1,  2]: 0,   0hf,   0vf
  // [3,  4,  5]: 90,  90hf,  90vf
  // [6, 7]:      180, 270

  orientations[0] = iop;
  orientations[1] = flipIOP.h(iop);
  orientations[2] = flipIOP.v(iop);
  var iop90 = rotateDirectionCosinesInPlane(iop, Math.PI / 2);
  orientations[3] = iop90;
  orientations[4] = flipIOP.h(iop90);
  orientations[5] = flipIOP.v(iop90);
  orientations[6] = rotateDirectionCosinesInPlane(iop, Math.PI);
  orientations[7] = rotateDirectionCosinesInPlane(iop, 1.5 * Math.PI);
  return orientations;
}

/**
 * alignPixelDataWithSourceData -
 *
 * @param pixelData2D - The data to align.
 * @param iop - The orientation of the image slice.
 * @param orientations - An array of valid imageOrientationPatient values.
 * @return The aligned pixelData.
 */
function alignPixelDataWithSourceData(pixelData2D, iop, orientations) {
  if (compareIOP(iop, orientations[0])) {
    //Same orientation.
    return pixelData2D;
  } else if (compareIOP(iop, orientations[1])) {
    //Flipped vertically.
    return flipMatrix2D.v(pixelData2D);
  } else if (compareIOP(iop, orientations[2])) {
    //Flipped horizontally.
    return flipMatrix2D.h(pixelData2D);
  } else if (compareIOP(iop, orientations[3])) {
    //Rotated 90 degrees.
    return rotateMatrix902D(pixelData2D);
  } else if (compareIOP(iop, orientations[4])) {
    //Rotated 90 degrees and fliped horizontally.
    return flipMatrix2D.h(rotateMatrix902D(pixelData2D));
  } else if (compareIOP(iop, orientations[5])) {
    //Rotated 90 degrees and fliped vertically.
    return flipMatrix2D.v(rotateMatrix902D(pixelData2D));
  } else if (compareIOP(iop, orientations[6])) {
    //Rotated 180 degrees. // TODO -> Do this more effeciently, there is a 1:1 mapping like 90 degree rotation.
    return rotateMatrix902D(rotateMatrix902D(pixelData2D));
  } else if (compareIOP(iop, orientations[7])) {
    //Rotated 270 degrees.  // TODO -> Do this more effeciently, there is a 1:1 mapping like 90 degree rotation.
    return rotateMatrix902D(rotateMatrix902D(rotateMatrix902D(pixelData2D)));
  }
}
var dx = 1e-5;

/**
 * compareIOP - Returns true if iop1 and iop2 are equal
 * within a tollerance, dx.
 *
 * @param  iop1 - An ImageOrientationPatient array.
 * @param  iop2 - An ImageOrientationPatient array.
 * @return True if iop1 and iop2 are equal.
 */
function compareIOP(iop1, iop2) {
  return Math.abs(iop1[0] - iop2[0]) < dx && Math.abs(iop1[1] - iop2[1]) < dx && Math.abs(iop1[2] - iop2[2]) < dx && Math.abs(iop1[3] - iop2[3]) < dx && Math.abs(iop1[4] - iop2[4]) < dx && Math.abs(iop1[5] - iop2[5]) < dx;
}
function getSegmentMetadata(multiframe) {
  var data = [];
  var segmentSequence = multiframe.SegmentSequence;
  if (Array.isArray(segmentSequence)) {
    for (var segIdx = 0; segIdx < segmentSequence.length; segIdx++) {
      data.push(segmentSequence[segIdx]);
    }
  } else {
    // Only one segment, will be stored as an object.
    data.push(segmentSequence);
  }
  return {
    seriesInstanceUid: multiframe.ReferencedSeriesSequence.SeriesInstanceUID,
    data: data
  };
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/checkIfPerpendicular.js
function checkIfPerpendicular(iop1, iop2, tolerance) {
  var absDotColumnCosines = Math.abs(iop1[0] * iop2[0] + iop1[1] * iop2[1] + iop1[2] * iop2[2]);
  var absDotRowCosines = Math.abs(iop1[3] * iop2[3] + iop1[4] * iop2[4] + iop1[5] * iop2[5]);
  return (absDotColumnCosines < tolerance || Math.abs(absDotColumnCosines - 1) < tolerance) && (absDotRowCosines < tolerance || Math.abs(absDotRowCosines - 1) < tolerance);
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/compareArrays.js


var nearlyEqual = dcmjs_es/* utilities */.BF.orientation.nearlyEqual;
function compareArrays(array1, array2, tolerance) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (var i = 0; i < array1.length; ++i) {
    if (!nearlyEqual(array1[i], array2[i], tolerance)) {
      return false;
    }
  }
  return true;
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/checkOrientation.js



function checkOrientation(multiframe, validOrientations, sourceDataDimensions, tolerance) {
  var SharedFunctionalGroupsSequence = multiframe.SharedFunctionalGroupsSequence,
    PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence;
  var sharedImageOrientationPatient = SharedFunctionalGroupsSequence.PlaneOrientationSequence ? SharedFunctionalGroupsSequence.PlaneOrientationSequence.ImageOrientationPatient : undefined;
  var PerFrameFunctionalGroups = PerFrameFunctionalGroupsSequence[0];
  var iop = sharedImageOrientationPatient || PerFrameFunctionalGroups.PlaneOrientationSequence.ImageOrientationPatient;
  var inPlane = validOrientations.some(function (operation) {
    return compareArrays(iop, operation, tolerance);
  });
  if (inPlane) {
    return "Planar";
  }
  if (checkIfPerpendicular(iop, validOrientations[0], tolerance) && sourceDataDimensions.includes(multiframe.Rows) && sourceDataDimensions.includes(multiframe.Columns)) {
    return "Perpendicular";
  }
  return "Oblique";
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/enums/Events.js
var Events;
(function (Events) {
  Events["SEGMENTATION_LOAD_PROGRESS"] = "CORNERSTONE_ADAPTER_SEGMENTATION_LOAD_PROGRESS";
})(Events || (Events = {}));
var Events$1 = Events;



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Segmentation_4X.js








var Segmentation_4X_utilities$orientatio = dcmjs_es/* utilities */.BF.orientation,
  Segmentation_4X_rotateDirectionCosinesInPlane = Segmentation_4X_utilities$orientatio.rotateDirectionCosinesInPlane,
  Segmentation_4X_flipIOP = Segmentation_4X_utilities$orientatio.flipImageOrientationPatient,
  Segmentation_4X_flipMatrix2D = Segmentation_4X_utilities$orientatio.flipMatrix2D,
  Segmentation_4X_rotateMatrix902D = Segmentation_4X_utilities$orientatio.rotateMatrix902D;
var Segmentation_4X_BitArray = dcmjs_es/* data */.p.BitArray,
  Segmentation_4X_DicomMessage = dcmjs_es/* data */.p.DicomMessage,
  Segmentation_4X_DicomMetaDictionary = dcmjs_es/* data */.p.DicomMetaDictionary;
var Segmentation_4X_Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
var Segmentation_4X_SegmentationDerivation = dcmjs_es/* derivations */.h4.Segmentation;
var _utilities$compressio = dcmjs_es/* utilities */.BF.compression,
  encode = _utilities$compressio.encode,
  decode = _utilities$compressio.decode;

/**
 *
 * @typedef {Object} BrushData
 * @property {Object} toolState - The cornerstoneTools global toolState.
 * @property {Object[]} segments - The cornerstoneTools segment metadata that corresponds to the
 *                                 seriesInstanceUid.
 */
var generateSegmentationDefaultOptions = {
  includeSliceSpacing: true,
  rleEncode: false
};

/**
 * generateSegmentation - Generates cornerstoneTools brush data, given a stack of
 * imageIds, images and the cornerstoneTools brushData.
 *
 * @param  {object[]} images An array of cornerstone images that contain the source
 *                           data under `image.data.byteArray.buffer`.
 * @param  {Object|Object[]} inputLabelmaps3D The cornerstone `Labelmap3D` object, or an array of objects.
 * @param  {Object} userOptions Options to pass to the segmentation derivation and `fillSegmentation`.
 * @returns {Blob}
 */
function Segmentation_4X_generateSegmentation(images, inputLabelmaps3D) {
  var userOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var isMultiframe = images[0].imageId.includes("?frame");
  var segmentation = Segmentation_4X_createSegFromImages(images, isMultiframe, userOptions);
  return fillSegmentation(segmentation, inputLabelmaps3D, userOptions);
}

/**
 * Fills a given segmentation object with data from the input labelmaps3D
 *
 * @param segmentation - The segmentation object to be filled.
 * @param inputLabelmaps3D - An array of 3D labelmaps, or a single 3D labelmap.
 * @param userOptions - Optional configuration settings. Will override the default options.
 *
 * @returns {object} The filled segmentation object.
 */
function fillSegmentation(segmentation, inputLabelmaps3D) {
  var userOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = Object.assign({}, generateSegmentationDefaultOptions, userOptions);

  // Use another variable so we don't redefine labelmaps3D.
  var labelmaps3D = Array.isArray(inputLabelmaps3D) ? inputLabelmaps3D : [inputLabelmaps3D];
  var numberOfFrames = 0;
  var referencedFramesPerLabelmap = [];
  var _loop = function _loop() {
    var labelmap3D = labelmaps3D[labelmapIndex];
    var labelmaps2D = labelmap3D.labelmaps2D,
      metadata = labelmap3D.metadata;
    var referencedFramesPerSegment = [];
    for (var i = 1; i < metadata.length; i++) {
      if (metadata[i]) {
        referencedFramesPerSegment[i] = [];
      }
    }
    var _loop2 = function _loop2(_i) {
      var labelmap2D = labelmaps2D[_i];
      if (labelmaps2D[_i]) {
        var segmentsOnLabelmap = labelmap2D.segmentsOnLabelmap;
        segmentsOnLabelmap.forEach(function (segmentIndex) {
          if (segmentIndex !== 0) {
            referencedFramesPerSegment[segmentIndex].push(_i);
            numberOfFrames++;
          }
        });
      }
    };
    for (var _i = 0; _i < labelmaps2D.length; _i++) {
      _loop2(_i);
    }
    referencedFramesPerLabelmap[labelmapIndex] = referencedFramesPerSegment;
  };
  for (var labelmapIndex = 0; labelmapIndex < labelmaps3D.length; labelmapIndex++) {
    _loop();
  }
  segmentation.setNumberOfFrames(numberOfFrames);
  for (var _labelmapIndex = 0; _labelmapIndex < labelmaps3D.length; _labelmapIndex++) {
    var referencedFramesPerSegment = referencedFramesPerLabelmap[_labelmapIndex];
    var labelmap3D = labelmaps3D[_labelmapIndex];
    var metadata = labelmap3D.metadata;
    for (var segmentIndex = 1; segmentIndex < referencedFramesPerSegment.length; segmentIndex++) {
      var referencedFrameIndicies = referencedFramesPerSegment[segmentIndex];
      if (referencedFrameIndicies) {
        // Frame numbers start from 1.
        var referencedFrameNumbers = referencedFrameIndicies.map(function (element) {
          return element + 1;
        });
        var segmentMetadata = metadata[segmentIndex];
        var labelmaps = _getLabelmapsFromReferencedFrameIndicies(labelmap3D, referencedFrameIndicies);
        segmentation.addSegmentFromLabelmap(segmentMetadata, labelmaps, segmentIndex, referencedFrameNumbers);
      }
    }
  }
  if (options.rleEncode) {
    var rleEncodedFrames = encode(segmentation.dataset.PixelData, numberOfFrames, segmentation.dataset.Rows, segmentation.dataset.Columns);

    // Must use fractional now to RLE encode, as the DICOM standard only allows BitStored && BitsAllocated
    // to be 1 for BINARY. This is not ideal and there should be a better format for compression in this manner
    // added to the standard.
    segmentation.assignToDataset({
      BitsAllocated: "8",
      BitsStored: "8",
      HighBit: "7",
      SegmentationType: "FRACTIONAL",
      SegmentationFractionalType: "PROBABILITY",
      MaximumFractionalValue: "255"
    });
    segmentation.dataset._meta.TransferSyntaxUID = {
      Value: ["1.2.840.10008.1.2.5"],
      vr: "UI"
    };
    segmentation.dataset.SpecificCharacterSet = "ISO_IR 192";
    segmentation.dataset._vrMap.PixelData = "OB";
    segmentation.dataset.PixelData = rleEncodedFrames;
  } else {
    // If no rleEncoding, at least bitpack the data.
    segmentation.bitPackPixelData();
  }
  return segmentation;
}
function _getLabelmapsFromReferencedFrameIndicies(labelmap3D, referencedFrameIndicies) {
  var labelmaps2D = labelmap3D.labelmaps2D;
  var labelmaps = [];
  for (var i = 0; i < referencedFrameIndicies.length; i++) {
    var frame = referencedFrameIndicies[i];
    labelmaps.push(labelmaps2D[frame].pixelData);
  }
  return labelmaps;
}

/**
 * _createSegFromImages - description
 *
 * @param  {Object[]} images    An array of the cornerstone image objects.
 * @param  {Boolean} isMultiframe Whether the images are multiframe.
 * @returns {Object}              The Seg derived dataSet.
 */
function Segmentation_4X_createSegFromImages(images, isMultiframe, options) {
  var multiframe = getDatasetsFromImages(images, isMultiframe);
  return new Segmentation_4X_SegmentationDerivation([multiframe], options);
}

/**
 * generateToolState - Given a set of cornerstoneTools imageIds and a Segmentation buffer,
 * derive cornerstoneTools toolState and brush metadata.
 *
 * @param  {string[]} imageIds - An array of the imageIds.
 * @param  {ArrayBuffer} arrayBuffer - The SEG arrayBuffer.
 * @param  {*} metadataProvider.
 * @param  {obj} options - Options object.
 *
 * @return {[]ArrayBuffer}a list of array buffer for each labelMap
 * @return {Object} an object from which the segment metadata can be derived
 * @return {[][][]} 2D list containing the track of segments per frame
 * @return {[][][]} 3D list containing the track of segments per frame for each labelMap
 *                  (available only for the overlapping case).
 */
function Segmentation_4X_generateToolState(_x, _x2, _x3, _x4) {
  return _generateToolState.apply(this, arguments);
} // function insertPixelDataPerpendicular(
//     segmentsOnFrame,
//     labelmapBuffer,
//     pixelData,
//     multiframe,
//     imageIds,
//     validOrientations,
//     metadataProvider
// ) {
//     const {
//         SharedFunctionalGroupsSequence,
//         PerFrameFunctionalGroupsSequence,
//         Rows,
//         Columns
//     } = multiframe;
//     const firstImagePlaneModule = metadataProvider.get(
//         "imagePlaneModule",
//         imageIds[0]
//     );
//     const lastImagePlaneModule = metadataProvider.get(
//         "imagePlaneModule",
//         imageIds[imageIds.length - 1]
//     );
//     console.log(firstImagePlaneModule);
//     console.log(lastImagePlaneModule);
//     const corners = [
//         ...getCorners(firstImagePlaneModule),
//         ...getCorners(lastImagePlaneModule)
//     ];
//     console.log(`corners:`);
//     console.log(corners);
//     const indexToWorld = mat4.create();
//     const ippFirstFrame = firstImagePlaneModule.imagePositionPatient;
//     const rowCosines = Array.isArray(firstImagePlaneModule.rowCosines)
//         ? [...firstImagePlaneModule.rowCosines]
//         : [
//               firstImagePlaneModule.rowCosines.x,
//               firstImagePlaneModule.rowCosines.y,
//               firstImagePlaneModule.rowCosines.z
//           ];
//     const columnCosines = Array.isArray(firstImagePlaneModule.columnCosines)
//         ? [...firstImagePlaneModule.columnCosines]
//         : [
//               firstImagePlaneModule.columnCosines.x,
//               firstImagePlaneModule.columnCosines.y,
//               firstImagePlaneModule.columnCosines.z
//           ];
//     const { pixelSpacing } = firstImagePlaneModule;
//     mat4.set(
//         indexToWorld,
//         // Column 1
//         0,
//         0,
//         0,
//         ippFirstFrame[0],
//         // Column 2
//         0,
//         0,
//         0,
//         ippFirstFrame[1],
//         // Column 3
//         0,
//         0,
//         0,
//         ippFirstFrame[2],
//         // Column 4
//         0,
//         0,
//         0,
//         1
//     );
//     // TODO -> Get origin and (x,y,z) increments to build a translation matrix:
//     // TODO -> Equation C.7.6.2.1-1
//     // | cx*di rx* Xx 0 |  |x|
//     // | cy*di ry Xy 0 |  |y|
//     // | cz*di rz Xz 0 |  |z|
//     // | tx ty tz 1 |  |1|
//     // const [
//     //     0, 0 , 0 , 0,
//     //     0, 0 , 0 , 0,
//     //     0, 0 , 0 , 0,
//     //     ipp[0], ipp[1] , ipp[2] , 1,
//     // ]
//     // Each frame:
//     // Find which corner the first voxel lines up with (one of 8 corners.)
//     // Find how i,j,k orient with respect to source volume.
//     // Go through each frame, find location in source to start, and whether to increment +/ix,+/-y,+/-z
//     //   through each voxel.
//     // [1,0,0,0,1,0]
//     // const [
//     // ]
//     // Invert transformation matrix to get worldToIndex
//     // Apply world to index on each point to fill up the matrix.
//     // const sharedImageOrientationPatient = SharedFunctionalGroupsSequence.PlaneOrientationSequence
//     //     ? SharedFunctionalGroupsSequence.PlaneOrientationSequence
//     //           .ImageOrientationPatient
//     //     : undefined;
//     // const sliceLength = Columns * Rows;
// }
// function getCorners(imagePlaneModule) {
//     // console.log(imagePlaneModule);
//     const {
//         rows,
//         columns,
//         rowCosines,
//         columnCosines,
//         imagePositionPatient: ipp,
//         rowPixelSpacing,
//         columnPixelSpacing
//     } = imagePlaneModule;
//     const rowLength = columns * columnPixelSpacing;
//     const columnLength = rows * rowPixelSpacing;
//     const entireRowVector = [
//         rowLength * columnCosines[0],
//         rowLength * columnCosines[1],
//         rowLength * columnCosines[2]
//     ];
//     const entireColumnVector = [
//         columnLength * rowCosines[0],
//         columnLength * rowCosines[1],
//         columnLength * rowCosines[2]
//     ];
//     const topLeft = [ipp[0], ipp[1], ipp[2]];
//     const topRight = [
//         topLeft[0] + entireRowVector[0],
//         topLeft[1] + entireRowVector[1],
//         topLeft[2] + entireRowVector[2]
//     ];
//     const bottomLeft = [
//         topLeft[0] + entireColumnVector[0],
//         topLeft[1] + entireColumnVector[1],
//         topLeft[2] + entireColumnVector[2]
//     ];
//     const bottomRight = [
//         bottomLeft[0] + entireRowVector[0],
//         bottomLeft[1] + entireRowVector[1],
//         bottomLeft[2] + entireRowVector[2]
//     ];
//     return [topLeft, topRight, bottomLeft, bottomRight];
// }
/**
 * Find the reference frame of the segmentation frame in the source data.
 *
 * @param  {Object}      multiframe        dicom metadata
 * @param  {Int}         frameSegment      frame dicom index
 * @param  {String[]}    imageIds          A list of imageIds.
 * @param  {Object}      sopUIDImageIdIndexMap  A map of SOPInstanceUID to imageId
 * @param  {Float}       tolerance         The tolerance parameter
 *
 * @returns {String}     Returns the imageId
 */
function _generateToolState() {
  _generateToolState = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageIds, arrayBuffer, metadataProvider, options) {
    var _options$skipOverlapp, skipOverlapping, _options$tolerance, tolerance, _options$TypedArrayCo, TypedArrayConstructor, _options$maxBytesPerC, maxBytesPerChunk, eventTarget, triggerEvent, dicomData, dataset, multiframe, imagePlaneModule, generalSeriesModule, SeriesInstanceUID, ImageOrientationPatient, validOrientations, sliceLength, segMetadata, TransferSyntaxUID, pixelData, pixelDataChunks, rleEncodedFrames, orientation, sopUIDImageIdIndexMap, overlapping, insertFunction, segmentsOnFrameArray, segmentsOnFrame, arrayBufferLength, labelmapBufferArray, imageIdMaps, segmentsPixelIndices, overlappingSegments, centroidXYZ;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _options$skipOverlapp = options.skipOverlapping, skipOverlapping = _options$skipOverlapp === void 0 ? false : _options$skipOverlapp, _options$tolerance = options.tolerance, tolerance = _options$tolerance === void 0 ? 1e-3 : _options$tolerance, _options$TypedArrayCo = options.TypedArrayConstructor, TypedArrayConstructor = _options$TypedArrayCo === void 0 ? Uint8Array : _options$TypedArrayCo, _options$maxBytesPerC = options.maxBytesPerChunk, maxBytesPerChunk = _options$maxBytesPerC === void 0 ? 199000000 : _options$maxBytesPerC, eventTarget = options.eventTarget, triggerEvent = options.triggerEvent;
          dicomData = Segmentation_4X_DicomMessage.readFile(arrayBuffer);
          dataset = Segmentation_4X_DicomMetaDictionary.naturalizeDataset(dicomData.dict);
          dataset._meta = Segmentation_4X_DicomMetaDictionary.namifyDataset(dicomData.meta);
          multiframe = Segmentation_4X_Normalizer.normalizeToDataset([dataset]);
          imagePlaneModule = metadataProvider.get("imagePlaneModule", imageIds[0]);
          generalSeriesModule = metadataProvider.get("generalSeriesModule", imageIds[0]);
          SeriesInstanceUID = generalSeriesModule.seriesInstanceUID;
          if (!imagePlaneModule) {
            console.warn("Insufficient metadata, imagePlaneModule missing.");
          }
          ImageOrientationPatient = Array.isArray(imagePlaneModule.rowCosines) ? [].concat(_toConsumableArray(imagePlaneModule.rowCosines), _toConsumableArray(imagePlaneModule.columnCosines)) : [imagePlaneModule.rowCosines.x, imagePlaneModule.rowCosines.y, imagePlaneModule.rowCosines.z, imagePlaneModule.columnCosines.x, imagePlaneModule.columnCosines.y, imagePlaneModule.columnCosines.z]; // Get IOP from ref series, compute supported orientations:
          validOrientations = Segmentation_4X_getValidOrientations(ImageOrientationPatient);
          sliceLength = multiframe.Columns * multiframe.Rows;
          segMetadata = Segmentation_4X_getSegmentMetadata(multiframe, SeriesInstanceUID);
          TransferSyntaxUID = multiframe._meta.TransferSyntaxUID.Value[0];
          if (!(TransferSyntaxUID === "1.2.840.10008.1.2.5")) {
            _context.next = 23;
            break;
          }
          rleEncodedFrames = Array.isArray(multiframe.PixelData) ? multiframe.PixelData : [multiframe.PixelData];
          pixelData = decode(rleEncodedFrames, multiframe.Rows, multiframe.Columns);
          if (!(multiframe.BitsStored === 1)) {
            _context.next = 20;
            break;
          }
          console.warn("No implementation for rle + bitbacking.");
          return _context.abrupt("return");
        case 20:
          // Todo: need to test this with rle data
          pixelDataChunks = [pixelData];
          _context.next = 26;
          break;
        case 23:
          pixelDataChunks = Segmentation_4X_unpackPixelData(multiframe, {
            maxBytesPerChunk: maxBytesPerChunk
          });
          if (pixelDataChunks) {
            _context.next = 26;
            break;
          }
          throw new Error("Fractional segmentations are not yet supported");
        case 26:
          orientation = checkOrientation(multiframe, validOrientations, [imagePlaneModule.rows, imagePlaneModule.columns, imageIds.length], tolerance); // Pre-compute the sop UID to imageId index map so that in the for loop
          // we don't have to call metadataProvider.get() for each imageId over
          // and over again.
          sopUIDImageIdIndexMap = imageIds.reduce(function (acc, imageId) {
            var _metadataProvider$get = metadataProvider.get("generalImageModule", imageId),
              sopInstanceUID = _metadataProvider$get.sopInstanceUID;
            acc[sopInstanceUID] = imageId;
            return acc;
          }, {});
          overlapping = false;
          if (!skipOverlapping) {
            overlapping = checkSEGsOverlapping(pixelDataChunks, multiframe, imageIds, validOrientations, metadataProvider, tolerance, TypedArrayConstructor, sopUIDImageIdIndexMap);
          }
          _context.t0 = orientation;
          _context.next = _context.t0 === "Planar" ? 33 : _context.t0 === "Perpendicular" ? 35 : _context.t0 === "Oblique" ? 36 : 37;
          break;
        case 33:
          if (overlapping) {
            insertFunction = insertOverlappingPixelDataPlanar;
          } else {
            insertFunction = insertPixelDataPlanar;
          }
          return _context.abrupt("break", 37);
        case 35:
          throw new Error("Segmentations orthogonal to the acquisition plane of the source data are not yet supported.");
        case 36:
          throw new Error("Segmentations oblique to the acquisition plane of the source data are not yet supported.");
        case 37:
          /* if SEGs are overlapping:
          1) the labelmapBuffer will contain M volumes which have non-overlapping segments;
          2) segmentsOnFrame will have M * numberOfFrames values to track in which labelMap are the segments;
          3) insertFunction will return the number of LabelMaps
          4) generateToolState return is an array*/
          segmentsOnFrameArray = [];
          segmentsOnFrameArray[0] = [];
          segmentsOnFrame = [];
          arrayBufferLength = sliceLength * imageIds.length * TypedArrayConstructor.BYTES_PER_ELEMENT;
          labelmapBufferArray = [];
          labelmapBufferArray[0] = new ArrayBuffer(arrayBufferLength);

          // Pre-compute the indices and metadata so that we don't have to call
          // a function for each imageId in the for loop.
          imageIdMaps = imageIds.reduce(function (acc, curr, index) {
            acc.indices[curr] = index;
            acc.metadata[curr] = metadataProvider.get("instance", curr);
            return acc;
          }, {
            indices: {},
            metadata: {}
          }); // This is the centroid calculation for each segment Index, the data structure
          // is a Map with key = segmentIndex and value = {imageIdIndex: centroid, ...}
          // later on we will use this data structure to calculate the centroid of the
          // segment in the labelmapBuffer
          segmentsPixelIndices = new Map();
          _context.next = 47;
          return insertFunction(segmentsOnFrame, segmentsOnFrameArray, labelmapBufferArray, pixelDataChunks, multiframe, imageIds, validOrientations, metadataProvider, tolerance, TypedArrayConstructor, segmentsPixelIndices, sopUIDImageIdIndexMap, imageIdMaps, eventTarget, triggerEvent);
        case 47:
          overlappingSegments = _context.sent;
          // calculate the centroid of each segment
          centroidXYZ = new Map();
          segmentsPixelIndices.forEach(function (imageIdIndexBufferIndex, segmentIndex) {
            var centroids = calculateCentroid(imageIdIndexBufferIndex, multiframe, metadataProvider, imageIds);
            centroidXYZ.set(segmentIndex, centroids);
          });
          return _context.abrupt("return", {
            labelmapBufferArray: labelmapBufferArray,
            segMetadata: segMetadata,
            segmentsOnFrame: segmentsOnFrame,
            segmentsOnFrameArray: segmentsOnFrameArray,
            centroids: centroidXYZ,
            overlappingSegments: overlappingSegments
          });
        case 51:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _generateToolState.apply(this, arguments);
}
function findReferenceSourceImageId(multiframe, frameSegment, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap) {
  var imageId = undefined;
  if (!multiframe) {
    return imageId;
  }
  var FrameOfReferenceUID = multiframe.FrameOfReferenceUID,
    PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    SourceImageSequence = multiframe.SourceImageSequence,
    ReferencedSeriesSequence = multiframe.ReferencedSeriesSequence;
  if (!PerFrameFunctionalGroupsSequence || PerFrameFunctionalGroupsSequence.length === 0) {
    return imageId;
  }
  var PerFrameFunctionalGroup = PerFrameFunctionalGroupsSequence[frameSegment];
  if (!PerFrameFunctionalGroup) {
    return imageId;
  }
  var frameSourceImageSequence = undefined;
  if (PerFrameFunctionalGroup.DerivationImageSequence) {
    var DerivationImageSequence = PerFrameFunctionalGroup.DerivationImageSequence;
    if (Array.isArray(DerivationImageSequence)) {
      if (DerivationImageSequence.length !== 0) {
        DerivationImageSequence = DerivationImageSequence[0];
      } else {
        DerivationImageSequence = undefined;
      }
    }
    if (DerivationImageSequence) {
      frameSourceImageSequence = DerivationImageSequence.SourceImageSequence;
      if (Array.isArray(frameSourceImageSequence)) {
        if (frameSourceImageSequence.length !== 0) {
          frameSourceImageSequence = frameSourceImageSequence[0];
        } else {
          frameSourceImageSequence = undefined;
        }
      }
    }
  } else if (SourceImageSequence && SourceImageSequence.length !== 0) {
    console.warn("DerivationImageSequence not present, using SourceImageSequence assuming SEG has the same geometry as the source image.");
    frameSourceImageSequence = SourceImageSequence[frameSegment];
  }
  if (frameSourceImageSequence) {
    imageId = getImageIdOfSourceImageBySourceImageSequence(frameSourceImageSequence, sopUIDImageIdIndexMap);
  }
  if (imageId === undefined && ReferencedSeriesSequence) {
    var referencedSeriesSequence = Array.isArray(ReferencedSeriesSequence) ? ReferencedSeriesSequence[0] : ReferencedSeriesSequence;
    var ReferencedSeriesInstanceUID = referencedSeriesSequence.SeriesInstanceUID;
    imageId = getImageIdOfSourceImagebyGeometry(ReferencedSeriesInstanceUID, FrameOfReferenceUID, PerFrameFunctionalGroup, imageIds, metadataProvider, tolerance);
  }
  return imageId;
}

/**
 * Checks if there is any overlapping segmentations.
 *  @returns {boolean} Returns a flag if segmentations overlapping
 */

function checkSEGsOverlapping(pixelData, multiframe, imageIds, validOrientations, metadataProvider, tolerance, TypedArrayConstructor, sopUIDImageIdIndexMap) {
  var SharedFunctionalGroupsSequence = multiframe.SharedFunctionalGroupsSequence,
    PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    SegmentSequence = multiframe.SegmentSequence,
    Rows = multiframe.Rows,
    Columns = multiframe.Columns;
  var numberOfSegs = SegmentSequence.length;
  if (numberOfSegs < 2) {
    return false;
  }
  var sharedImageOrientationPatient = SharedFunctionalGroupsSequence.PlaneOrientationSequence ? SharedFunctionalGroupsSequence.PlaneOrientationSequence.ImageOrientationPatient : undefined;
  var sliceLength = Columns * Rows;
  var groupsLen = PerFrameFunctionalGroupsSequence.length;

  /** sort groupsLen to have all the segments for each frame in an array
   * frame 2 : 1, 2
   * frame 4 : 1, 3
   * frame 5 : 4
   */

  var frameSegmentsMapping = new Map();
  var _loop3 = function _loop3() {
      var segmentIndex = getSegmentIndex(multiframe, frameSegment);
      if (segmentIndex === undefined) {
        console.warn("Could not retrieve the segment index for frame segment " + frameSegment + ", skipping this frame.");
        return 0; // continue
      }
      var imageId = findReferenceSourceImageId(multiframe, frameSegment, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap);
      if (!imageId) {
        console.warn("Image not present in stack, can't import frame : " + frameSegment + ".");
        return 0; // continue
      }
      var imageIdIndex = imageIds.findIndex(function (element) {
        return element === imageId;
      });
      if (frameSegmentsMapping.has(imageIdIndex)) {
        var segmentArray = frameSegmentsMapping.get(imageIdIndex);
        if (!segmentArray.includes(frameSegment)) {
          segmentArray.push(frameSegment);
          frameSegmentsMapping.set(imageIdIndex, segmentArray);
        }
      } else {
        frameSegmentsMapping.set(imageIdIndex, [frameSegment]);
      }
    },
    _ret;
  for (var frameSegment = 0; frameSegment < groupsLen; ++frameSegment) {
    _ret = _loop3();
    if (_ret === 0) continue;
  }
  var _iterator = _createForOfIteratorHelper(frameSegmentsMapping.entries()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        role = _step$value[1];
      var temp2DArray = new TypedArrayConstructor(sliceLength).fill(0);
      for (var i = 0; i < role.length; ++i) {
        var _frameSegment = role[i];
        var PerFrameFunctionalGroups = PerFrameFunctionalGroupsSequence[_frameSegment];
        var ImageOrientationPatientI = sharedImageOrientationPatient || PerFrameFunctionalGroups.PlaneOrientationSequence.ImageOrientationPatient;
        var view = readFromUnpackedChunks(pixelData, _frameSegment * sliceLength, sliceLength);
        var pixelDataI2D = ndarray_default()(view, [Rows, Columns]);
        var alignedPixelDataI = Segmentation_4X_alignPixelDataWithSourceData(pixelDataI2D, ImageOrientationPatientI, validOrientations, tolerance);
        if (!alignedPixelDataI) {
          console.warn("Individual SEG frames are out of plane with respect to the first SEG frame, this is not yet supported, skipping this frame.");
          continue;
        }
        var data = alignedPixelDataI.data;
        for (var j = 0, len = data.length; j < len; ++j) {
          if (data[j] !== 0) {
            temp2DArray[j]++;
            if (temp2DArray[j] > 1) {
              return true;
            }
          }
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
}
function insertOverlappingPixelDataPlanar(segmentsOnFrame, segmentsOnFrameArray, labelmapBufferArray, pixelData, multiframe, imageIds, validOrientations, metadataProvider, tolerance, TypedArrayConstructor, segmentsPixelIndices, sopUIDImageIdIndexMap) {
  var SharedFunctionalGroupsSequence = multiframe.SharedFunctionalGroupsSequence,
    PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    Rows = multiframe.Rows,
    Columns = multiframe.Columns;
  var sharedImageOrientationPatient = SharedFunctionalGroupsSequence.PlaneOrientationSequence ? SharedFunctionalGroupsSequence.PlaneOrientationSequence.ImageOrientationPatient : undefined;
  var sliceLength = Columns * Rows;
  var arrayBufferLength = sliceLength * imageIds.length * TypedArrayConstructor.BYTES_PER_ELEMENT;
  // indicate the number of labelMaps
  var M = 1;

  // indicate the current labelMap array index;
  var m = 0;

  // temp array for checking overlaps
  var tempBuffer = labelmapBufferArray[m].slice(0);

  // temp list for checking overlaps
  var tempSegmentsOnFrame = structuredClone(segmentsOnFrameArray[m]);

  /** split overlapping SEGs algorithm for each segment:
   *  A) copy the labelmapBuffer in the array with index 0
   *  B) add the segment pixel per pixel on the copied buffer from (A)
   *  C) if no overlap, copy the results back on the orignal array from (A)
   *  D) if overlap, repeat increasing the index m up to M (if out of memory, add new buffer in the array and M++);
   */

  var numberOfSegs = multiframe.SegmentSequence.length;
  for (var segmentIndexToProcess = 1; segmentIndexToProcess <= numberOfSegs; ++segmentIndexToProcess) {
    var _loop4 = function _loop4(_i2) {
        var PerFrameFunctionalGroups = PerFrameFunctionalGroupsSequence[_i2];
        var segmentIndex = getSegmentIndex(multiframe, _i2);
        if (segmentIndex === undefined) {
          throw new Error("Could not retrieve the segment index. Aborting segmentation loading.");
        }
        if (segmentIndex !== segmentIndexToProcess) {
          i = _i2;
          return 0; // continue
        }
        var ImageOrientationPatientI = sharedImageOrientationPatient || PerFrameFunctionalGroups.PlaneOrientationSequence.ImageOrientationPatient;

        // Since we moved to the chunks approach, we need to read the data
        // and handle scenarios where the portion of data is in one chunk
        // and the other portion is in another chunk
        var view = readFromUnpackedChunks(pixelData, _i2 * sliceLength, sliceLength);
        var pixelDataI2D = ndarray_default()(view, [Rows, Columns]);
        var alignedPixelDataI = Segmentation_4X_alignPixelDataWithSourceData(pixelDataI2D, ImageOrientationPatientI, validOrientations, tolerance);
        if (!alignedPixelDataI) {
          throw new Error("Individual SEG frames are out of plane with respect to the first SEG frame. " + "This is not yet supported. Aborting segmentation loading.");
        }
        var imageId = findReferenceSourceImageId(multiframe, _i2, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap);
        if (!imageId) {
          console.warn("Image not present in stack, can't import frame : " + _i2 + ".");
          i = _i2;
          return 0; // continue
        }
        var sourceImageMetadata = metadataProvider.get("instance", imageId);
        if (Rows !== sourceImageMetadata.Rows || Columns !== sourceImageMetadata.Columns) {
          throw new Error("Individual SEG frames have different geometry dimensions (Rows and Columns) " + "respect to the source image reference frame. This is not yet supported. " + "Aborting segmentation loading. ");
        }
        var imageIdIndex = imageIds.findIndex(function (element) {
          return element === imageId;
        });
        var byteOffset = sliceLength * imageIdIndex * TypedArrayConstructor.BYTES_PER_ELEMENT;
        var labelmap2DView = new TypedArrayConstructor(tempBuffer, byteOffset, sliceLength);
        var data = alignedPixelDataI.data;
        var segmentOnFrame = false;
        for (var j = 0, len = alignedPixelDataI.data.length; j < len; ++j) {
          if (data[j]) {
            if (labelmap2DView[j] !== 0) {
              m++;
              if (m >= M) {
                labelmapBufferArray[m] = new ArrayBuffer(arrayBufferLength);
                segmentsOnFrameArray[m] = [];
                M++;
              }
              tempBuffer = labelmapBufferArray[m].slice(0);
              tempSegmentsOnFrame = structuredClone(segmentsOnFrameArray[m]);
              _i2 = 0;
              break;
            } else {
              labelmap2DView[j] = segmentIndex;
              segmentOnFrame = true;
            }
          }
        }
        if (segmentOnFrame) {
          if (!tempSegmentsOnFrame[imageIdIndex]) {
            tempSegmentsOnFrame[imageIdIndex] = [];
          }
          tempSegmentsOnFrame[imageIdIndex].push(segmentIndex);
          if (!segmentsOnFrame[imageIdIndex]) {
            segmentsOnFrame[imageIdIndex] = [];
          }
          segmentsOnFrame[imageIdIndex].push(segmentIndex);
        }
        i = _i2;
      },
      _ret2;
    for (var i = 0, groupsLen = PerFrameFunctionalGroupsSequence.length; i < groupsLen; ++i) {
      _ret2 = _loop4(i);
      if (_ret2 === 0) continue;
    }
    labelmapBufferArray[m] = tempBuffer.slice(0);
    segmentsOnFrameArray[m] = structuredClone(tempSegmentsOnFrame);

    // reset temp variables/buffers for new segment
    m = 0;
    tempBuffer = labelmapBufferArray[m].slice(0);
    tempSegmentsOnFrame = structuredClone(segmentsOnFrameArray[m]);
  }
}
var getSegmentIndex = function getSegmentIndex(multiframe, frame) {
  var PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    SharedFunctionalGroupsSequence = multiframe.SharedFunctionalGroupsSequence;
  var PerFrameFunctionalGroups = PerFrameFunctionalGroupsSequence[frame];
  return PerFrameFunctionalGroups && PerFrameFunctionalGroups.SegmentIdentificationSequence ? PerFrameFunctionalGroups.SegmentIdentificationSequence.ReferencedSegmentNumber : SharedFunctionalGroupsSequence.SegmentIdentificationSequence ? SharedFunctionalGroupsSequence.SegmentIdentificationSequence.ReferencedSegmentNumber : undefined;
};
function insertPixelDataPlanar(segmentsOnFrame, segmentsOnFrameArray, labelmapBufferArray, pixelData, multiframe, imageIds, validOrientations, metadataProvider, tolerance, TypedArrayConstructor, segmentsPixelIndices, sopUIDImageIdIndexMap, imageIdMaps, eventTarget, triggerEvent) {
  var SharedFunctionalGroupsSequence = multiframe.SharedFunctionalGroupsSequence,
    PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    Rows = multiframe.Rows,
    Columns = multiframe.Columns;
  var sharedImageOrientationPatient = SharedFunctionalGroupsSequence.PlaneOrientationSequence ? SharedFunctionalGroupsSequence.PlaneOrientationSequence.ImageOrientationPatient : undefined;
  var sliceLength = Columns * Rows;
  var i = 0;
  var groupsLen = PerFrameFunctionalGroupsSequence.length;
  var chunkSize = Math.ceil(groupsLen / 10); // 10% of total length

  var shouldTriggerEvent = triggerEvent && eventTarget;
  var overlapping = false;
  // Below, we chunk the processing of the frames to avoid blocking the main thread
  // if the segmentation is large. We also use a promise to allow the caller to
  // wait for the processing to finish.
  return new Promise(function (resolve) {
    function processInChunks() {
      // process one chunk
      for (var end = Math.min(i + chunkSize, groupsLen); i < end; ++i) {
        var PerFrameFunctionalGroups = PerFrameFunctionalGroupsSequence[i];
        var ImageOrientationPatientI = sharedImageOrientationPatient || PerFrameFunctionalGroups.PlaneOrientationSequence.ImageOrientationPatient;
        var view = readFromUnpackedChunks(pixelData, i * sliceLength, sliceLength);
        var pixelDataI2D = ndarray_default()(view, [Rows, Columns]);
        var alignedPixelDataI = Segmentation_4X_alignPixelDataWithSourceData(pixelDataI2D, ImageOrientationPatientI, validOrientations, tolerance);
        if (!alignedPixelDataI) {
          throw new Error("Individual SEG frames are out of plane with respect to the first SEG frame. " + "This is not yet supported. Aborting segmentation loading.");
        }
        var segmentIndex = getSegmentIndex(multiframe, i);
        if (segmentIndex === undefined) {
          throw new Error("Could not retrieve the segment index. Aborting segmentation loading.");
        }
        if (!segmentsPixelIndices.has(segmentIndex)) {
          segmentsPixelIndices.set(segmentIndex, {});
        }
        var imageId = findReferenceSourceImageId(multiframe, i, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap);
        if (!imageId) {
          console.warn("Image not present in stack, can't import frame : " + i + ".");
          continue;
        }
        var sourceImageMetadata = imageIdMaps.metadata[imageId];
        if (Rows !== sourceImageMetadata.Rows || Columns !== sourceImageMetadata.Columns) {
          throw new Error("Individual SEG frames have different geometry dimensions (Rows and Columns) " + "respect to the source image reference frame. This is not yet supported. " + "Aborting segmentation loading. ");
        }
        var imageIdIndex = imageIdMaps.indices[imageId];
        var byteOffset = sliceLength * imageIdIndex * TypedArrayConstructor.BYTES_PER_ELEMENT;
        var labelmap2DView = new TypedArrayConstructor(labelmapBufferArray[0], byteOffset, sliceLength);
        var data = alignedPixelDataI.data;
        var indexCache = [];
        for (var j = 0, len = alignedPixelDataI.data.length; j < len; ++j) {
          if (data[j]) {
            for (var x = j; x < len; ++x) {
              if (data[x]) {
                if (!overlapping && labelmap2DView[x] !== 0) {
                  overlapping = true;
                }
                labelmap2DView[x] = segmentIndex;
                indexCache.push(x);
              }
            }
            if (!segmentsOnFrame[imageIdIndex]) {
              segmentsOnFrame[imageIdIndex] = [];
            }
            segmentsOnFrame[imageIdIndex].push(segmentIndex);
            break;
          }
        }
        var segmentIndexObject = segmentsPixelIndices.get(segmentIndex);
        segmentIndexObject[imageIdIndex] = indexCache;
        segmentsPixelIndices.set(segmentIndex, segmentIndexObject);
      }

      // trigger an event after each chunk
      if (shouldTriggerEvent) {
        var percentComplete = Math.round(i / groupsLen * 100);
        triggerEvent(eventTarget, Events$1.SEGMENTATION_LOAD_PROGRESS, {
          percentComplete: percentComplete
        });
      }

      // schedule next chunk
      if (i < groupsLen) {
        setTimeout(processInChunks, 0);
      } else {
        // resolve the Promise when all chunks have been processed
        resolve(overlapping);
      }
    }
    processInChunks();
  });
}

/**
 * unpackPixelData - Unpacks bit packed pixelData if the Segmentation is BINARY.
 *
 * @param  {Object} multiframe The multiframe dataset.
 * @param  {Object} options    Options for the unpacking.
 * @return {Uint8Array}      The unpacked pixelData.
 */
function Segmentation_4X_unpackPixelData(multiframe, options) {
  var segType = multiframe.SegmentationType;
  var data;
  if (Array.isArray(multiframe.PixelData)) {
    data = multiframe.PixelData[0];
  } else {
    data = multiframe.PixelData;
  }
  if (data === undefined) {
    dcmjs_es/* log */.Rm.error("This segmentation pixelData is undefined.");
  }
  if (segType === "BINARY") {
    // For extreme big data, we can't unpack the data at once and we need to
    // chunk it and unpack each chunk separately.
    // MAX 2GB is the limit right now to allocate a buffer
    return getUnpackedChunks(data, options.maxBytesPerChunk);
  }
  var pixelData = new Uint8Array(data);
  var max = multiframe.MaximumFractionalValue;
  var onlyMaxAndZero = pixelData.find(function (element) {
    return element !== 0 && element !== max;
  }) === undefined;
  if (!onlyMaxAndZero) {
    // This is a fractional segmentation, which is not currently supported.
    return;
  }
  dcmjs_es/* log */.Rm.warn("This segmentation object is actually binary... processing as such.");
  return pixelData;
}
function getUnpackedChunks(data, maxBytesPerChunk) {
  var bitArray = new Uint8Array(data);
  var chunks = [];
  var maxBitsPerChunk = maxBytesPerChunk * 8;
  var numberOfChunks = Math.ceil(bitArray.length * 8 / maxBitsPerChunk);
  for (var i = 0; i < numberOfChunks; i++) {
    var startBit = i * maxBitsPerChunk;
    var endBit = Math.min(startBit + maxBitsPerChunk, bitArray.length * 8);
    var startByte = Math.floor(startBit / 8);
    var endByte = Math.ceil(endBit / 8);
    var chunk = bitArray.slice(startByte, endByte);
    var unpackedChunk = Segmentation_4X_BitArray.unpack(chunk);
    chunks.push(unpackedChunk);
  }
  return chunks;
}

/**
 * getImageIdOfSourceImageBySourceImageSequence - Returns the Cornerstone imageId of the source image.
 *
 * @param  {Object}   SourceImageSequence  Sequence describing the source image.
 * @param  {String[]} imageIds             A list of imageIds.
 * @param  {Object}   sopUIDImageIdIndexMap A map of SOPInstanceUIDs to imageIds.
 * @return {String}                        The corresponding imageId.
 */
function getImageIdOfSourceImageBySourceImageSequence(SourceImageSequence, sopUIDImageIdIndexMap) {
  var ReferencedSOPInstanceUID = SourceImageSequence.ReferencedSOPInstanceUID,
    ReferencedFrameNumber = SourceImageSequence.ReferencedFrameNumber;
  return ReferencedFrameNumber ? Segmentation_4X_getImageIdOfReferencedFrame(ReferencedSOPInstanceUID, ReferencedFrameNumber, sopUIDImageIdIndexMap) : sopUIDImageIdIndexMap[ReferencedSOPInstanceUID];
}

/**
 * getImageIdOfSourceImagebyGeometry - Returns the Cornerstone imageId of the source image.
 *
 * @param  {String}    ReferencedSeriesInstanceUID    Referenced series of the source image.
 * @param  {String}    FrameOfReferenceUID            Frame of reference.
 * @param  {Object}    PerFrameFunctionalGroup        Sequence describing segmentation reference attributes per frame.
 * @param  {String[]}  imageIds                       A list of imageIds.
 * @param  {Object}    sopUIDImageIdIndexMap          A map of SOPInstanceUIDs to imageIds.
 * @param  {Float}     tolerance                      The tolerance parameter
 *
 * @return {String}                                   The corresponding imageId.
 */
function getImageIdOfSourceImagebyGeometry(ReferencedSeriesInstanceUID, FrameOfReferenceUID, PerFrameFunctionalGroup, imageIds, metadataProvider, tolerance) {
  if (ReferencedSeriesInstanceUID === undefined || PerFrameFunctionalGroup.PlanePositionSequence === undefined || PerFrameFunctionalGroup.PlanePositionSequence[0] === undefined || PerFrameFunctionalGroup.PlanePositionSequence[0].ImagePositionPatient === undefined) {
    return undefined;
  }
  for (var imageIdsIndexc = 0; imageIdsIndexc < imageIds.length; ++imageIdsIndexc) {
    var sourceImageMetadata = metadataProvider.get("instance", imageIds[imageIdsIndexc]);
    if (sourceImageMetadata === undefined || sourceImageMetadata.ImagePositionPatient === undefined || sourceImageMetadata.FrameOfReferenceUID !== FrameOfReferenceUID || sourceImageMetadata.SeriesInstanceUID !== ReferencedSeriesInstanceUID) {
      continue;
    }
    if (compareArrays(PerFrameFunctionalGroup.PlanePositionSequence[0].ImagePositionPatient, sourceImageMetadata.ImagePositionPatient, tolerance)) {
      return imageIds[imageIdsIndexc];
    }
  }
}

/**
 * getImageIdOfReferencedFrame - Returns the imageId corresponding to the
 * specified sopInstanceUid and frameNumber for multi-frame images.
 *
 * @param  {String} sopInstanceUid   The sopInstanceUid of the desired image.
 * @param  {Number} frameNumber      The frame number.
 * @param  {String} imageIds         The list of imageIds.
 * @param  {Object} sopUIDImageIdIndexMap A map of SOPInstanceUIDs to imageIds.
 * @return {String}                  The imageId that corresponds to the sopInstanceUid.
 */
function Segmentation_4X_getImageIdOfReferencedFrame(sopInstanceUid, frameNumber, sopUIDImageIdIndexMap) {
  var imageId = sopUIDImageIdIndexMap[sopInstanceUid];
  if (!imageId) {
    return;
  }
  var imageIdFrameNumber = Number(imageId.split("frame=")[1]);
  return imageIdFrameNumber === frameNumber - 1 ? imageId : undefined;
}

/**
 * getValidOrientations - returns an array of valid orientations.
 *
 * @param  {Number[6]} iop The row (0..2) an column (3..5) direction cosines.
 * @return {Number[8][6]} An array of valid orientations.
 */
function Segmentation_4X_getValidOrientations(iop) {
  var orientations = [];

  // [0,  1,  2]: 0,   0hf,   0vf
  // [3,  4,  5]: 90,  90hf,  90vf
  // [6, 7]:      180, 270

  orientations[0] = iop;
  orientations[1] = Segmentation_4X_flipIOP.h(iop);
  orientations[2] = Segmentation_4X_flipIOP.v(iop);
  var iop90 = Segmentation_4X_rotateDirectionCosinesInPlane(iop, Math.PI / 2);
  orientations[3] = iop90;
  orientations[4] = Segmentation_4X_flipIOP.h(iop90);
  orientations[5] = Segmentation_4X_flipIOP.v(iop90);
  orientations[6] = Segmentation_4X_rotateDirectionCosinesInPlane(iop, Math.PI);
  orientations[7] = Segmentation_4X_rotateDirectionCosinesInPlane(iop, 1.5 * Math.PI);
  return orientations;
}

/**
 * alignPixelDataWithSourceData -
 *
 * @param {Ndarray} pixelData2D - The data to align.
 * @param {Number[6]} iop - The orientation of the image slice.
 * @param {Number[8][6]} orientations - An array of valid imageOrientationPatient values.
 * @param {Number} tolerance.
 * @return {Ndarray} The aligned pixelData.
 */
function Segmentation_4X_alignPixelDataWithSourceData(pixelData2D, iop, orientations, tolerance) {
  if (compareArrays(iop, orientations[0], tolerance)) {
    return pixelData2D;
  } else if (compareArrays(iop, orientations[1], tolerance)) {
    // Flipped vertically.

    // Undo Flip
    return Segmentation_4X_flipMatrix2D.v(pixelData2D);
  } else if (compareArrays(iop, orientations[2], tolerance)) {
    // Flipped horizontally.

    // Unfo flip
    return Segmentation_4X_flipMatrix2D.h(pixelData2D);
  } else if (compareArrays(iop, orientations[3], tolerance)) {
    //Rotated 90 degrees

    // Rotate back
    return Segmentation_4X_rotateMatrix902D(pixelData2D);
  } else if (compareArrays(iop, orientations[4], tolerance)) {
    //Rotated 90 degrees and fliped horizontally.

    // Undo flip and rotate back.
    return Segmentation_4X_rotateMatrix902D(Segmentation_4X_flipMatrix2D.h(pixelData2D));
  } else if (compareArrays(iop, orientations[5], tolerance)) {
    // Rotated 90 degrees and fliped vertically

    // Unfo flip and rotate back.
    return Segmentation_4X_rotateMatrix902D(Segmentation_4X_flipMatrix2D.v(pixelData2D));
  } else if (compareArrays(iop, orientations[6], tolerance)) {
    // Rotated 180 degrees. // TODO -> Do this more effeciently, there is a 1:1 mapping like 90 degree rotation.

    return Segmentation_4X_rotateMatrix902D(Segmentation_4X_rotateMatrix902D(pixelData2D));
  } else if (compareArrays(iop, orientations[7], tolerance)) {
    // Rotated 270 degrees

    // Rotate back.
    return Segmentation_4X_rotateMatrix902D(Segmentation_4X_rotateMatrix902D(Segmentation_4X_rotateMatrix902D(pixelData2D)));
  }
}
function Segmentation_4X_getSegmentMetadata(multiframe, seriesInstanceUid) {
  var segmentSequence = multiframe.SegmentSequence;
  var data = [];
  if (Array.isArray(segmentSequence)) {
    data = [undefined].concat(_toConsumableArray(segmentSequence));
  } else {
    // Only one segment, will be stored as an object.
    data = [undefined, segmentSequence];
  }
  return {
    seriesInstanceUid: seriesInstanceUid,
    data: data
  };
}

/**
 * Reads a range of bytes from an array of ArrayBuffer chunks and
 * aggregate them into a new Uint8Array.
 *
 * @param {ArrayBuffer[]} chunks - An array of ArrayBuffer chunks.
 * @param {number} offset - The offset of the first byte to read.
 * @param {number} length - The number of bytes to read.
 * @returns {Uint8Array} A new Uint8Array containing the requested bytes.
 */
function readFromUnpackedChunks(chunks, offset, length) {
  var mapping = getUnpackedOffsetAndLength(chunks, offset, length);

  // If all the data is in one chunk, we can just slice that chunk
  if (mapping.start.chunkIndex === mapping.end.chunkIndex) {
    return new Uint8Array(chunks[mapping.start.chunkIndex].buffer, mapping.start.offset, length);
  } else {
    // If the data spans multiple chunks, we need to create a new Uint8Array and copy the data from each chunk
    var result = new Uint8Array(length);
    var resultOffset = 0;
    for (var i = mapping.start.chunkIndex; i <= mapping.end.chunkIndex; i++) {
      var start = i === mapping.start.chunkIndex ? mapping.start.offset : 0;
      var end = i === mapping.end.chunkIndex ? mapping.end.offset : chunks[i].length;
      result.set(new Uint8Array(chunks[i].buffer, start, end - start), resultOffset);
      resultOffset += end - start;
    }
    return result;
  }
}
function getUnpackedOffsetAndLength(chunks, offset, length) {
  var totalBytes = chunks.reduce(function (total, chunk) {
    return total + chunk.length;
  }, 0);
  if (offset < 0 || offset + length > totalBytes) {
    throw new Error("Offset and length out of bounds");
  }
  var startChunkIndex = 0;
  var startOffsetInChunk = offset;
  while (startOffsetInChunk >= chunks[startChunkIndex].length) {
    startOffsetInChunk -= chunks[startChunkIndex].length;
    startChunkIndex++;
  }
  var endChunkIndex = startChunkIndex;
  var endOffsetInChunk = startOffsetInChunk + length;
  while (endOffsetInChunk > chunks[endChunkIndex].length) {
    endOffsetInChunk -= chunks[endChunkIndex].length;
    endChunkIndex++;
  }
  return {
    start: {
      chunkIndex: startChunkIndex,
      offset: startOffsetInChunk
    },
    end: {
      chunkIndex: endChunkIndex,
      offset: endOffsetInChunk
    }
  };
}
function calculateCentroid(imageIdIndexBufferIndex, multiframe, metadataProvider, imageIds) {
  var xAcc = 0;
  var yAcc = 0;
  var zAcc = 0;
  var worldXAcc = 0;
  var worldYAcc = 0;
  var worldZAcc = 0;
  var count = 0;
  for (var _i3 = 0, _Object$entries = Object.entries(imageIdIndexBufferIndex); _i3 < _Object$entries.length; _i3++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
      imageIdIndex = _Object$entries$_i[0],
      bufferIndices = _Object$entries$_i[1];
    var z = Number(imageIdIndex);
    if (!bufferIndices || bufferIndices.length === 0) {
      continue;
    }

    // Get metadata for this slice
    var imageId = imageIds[z];
    var imagePlaneModule = metadataProvider.get("imagePlaneModule", imageId);
    if (!imagePlaneModule) {
      console.debug("Missing imagePlaneModule metadata for centroid calculation");
      continue;
    }
    var imagePositionPatient = imagePlaneModule.imagePositionPatient,
      rowCosines = imagePlaneModule.rowCosines,
      columnCosines = imagePlaneModule.columnCosines,
      rowPixelSpacing = imagePlaneModule.rowPixelSpacing,
      columnPixelSpacing = imagePlaneModule.columnPixelSpacing;
    var _iterator2 = _createForOfIteratorHelper(bufferIndices),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var bufferIndex = _step2.value;
        var y = Math.floor(bufferIndex / multiframe.Rows);
        var x = bufferIndex % multiframe.Rows;

        // Image coordinates
        xAcc += x;
        yAcc += y;
        zAcc += z;

        // Calculate world coordinates
        // P(world) = P(image) * IOP * spacing + IPP
        var worldX = imagePositionPatient[0] + x * rowCosines[0] * columnPixelSpacing + y * columnCosines[0] * rowPixelSpacing;
        var worldY = imagePositionPatient[1] + x * rowCosines[1] * columnPixelSpacing + y * columnCosines[1] * rowPixelSpacing;
        var worldZ = imagePositionPatient[2] + x * rowCosines[2] * columnPixelSpacing + y * columnCosines[2] * rowPixelSpacing;
        worldXAcc += worldX;
        worldYAcc += worldY;
        worldZAcc += worldZ;
        count++;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return {
    image: {
      x: Math.floor(xAcc / count),
      y: Math.floor(yAcc / count),
      z: Math.floor(zAcc / count)
    },
    world: {
      x: worldXAcc / count,
      y: worldYAcc / count,
      z: worldZAcc / count
    },
    count: count
  };
}
var Segmentation_4X_Segmentation = {
  generateSegmentation: Segmentation_4X_generateSegmentation,
  generateToolState: Segmentation_4X_generateToolState,
  fillSegmentation: fillSegmentation
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/Segmentation.js



/**
 * generateSegmentation - Generates a DICOM Segmentation object given cornerstoneTools data.
 *
 * @param  {object[]} images    An array of the cornerstone image objects.
 * @param  {Object|Object[]} labelmaps3DorBrushData For 4.X: The cornerstone `Labelmap3D` object, or an array of objects.
 *                                                  For 3.X: the BrushData.
 * @param  {number} cornerstoneToolsVersion The cornerstoneTools major version to map against.
 * @returns {Object}
 */
function Segmentation_generateSegmentation(images, labelmaps3DorBrushData) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    includeSliceSpacing: true
  };
  var cornerstoneToolsVersion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
  if (cornerstoneToolsVersion === 4) {
    return Segmentation_4X_Segmentation.generateSegmentation(images, labelmaps3DorBrushData, options);
  }
  if (cornerstoneToolsVersion === 3) {
    return Segmentation.generateSegmentation(images, labelmaps3DorBrushData, options);
  }
  console.warn("No generateSegmentation adapter for cornerstone version ".concat(cornerstoneToolsVersion, ", exiting."));
}

/**
 * generateToolState - Given a set of cornerstoneTools imageIds and a Segmentation buffer,
 * derive cornerstoneTools toolState and brush metadata.
 *
 * @param  {string[]} imageIds    An array of the imageIds.
 * @param  {ArrayBuffer} arrayBuffer The SEG arrayBuffer.
 * @param {*} metadataProvider
 * @param  {boolean} skipOverlapping - skip checks for overlapping segs, default value false.
 * @param  {number} tolerance - default value 1.e-3.
 * @param  {number} cornerstoneToolsVersion - default value 4.
 *
 * @returns {Object}  The toolState and an object from which the
 *                    segment metadata can be derived.
 */
function Segmentation_generateToolState(imageIds, arrayBuffer, metadataProvider) {
  var skipOverlapping = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tolerance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1e-3;
  var cornerstoneToolsVersion = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 4;
  if (cornerstoneToolsVersion === 4) {
    return Segmentation_4X_Segmentation.generateToolState(imageIds, arrayBuffer, metadataProvider, skipOverlapping, tolerance);
  }
  if (cornerstoneToolsVersion === 3) {
    return Segmentation.generateToolState(imageIds, arrayBuffer, metadataProvider);
  }
  console.warn("No generateToolState adapter for cornerstone version ".concat(cornerstoneToolsVersion, ", exiting."));
}

/**
 * fillSegmentation - Fills a derived segmentation dataset with cornerstoneTools `LabelMap3D` data.
 *
 * @param  {object[]} segmentation An empty segmentation derived dataset.
 * @param  {Object|Object[]} inputLabelmaps3D The cornerstone `Labelmap3D` object, or an array of objects.
 * @param  {Object} userOptions Options object to override default options.
 * @returns {Blob}           description
 */
function Segmentation_fillSegmentation(segmentation, inputLabelmaps3D) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    includeSliceSpacing: true
  };
  var cornerstoneToolsVersion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
  if (cornerstoneToolsVersion === 4) {
    return Segmentation_4X_Segmentation.fillSegmentation(segmentation, inputLabelmaps3D, options);
  }
  console.warn("No generateSegmentation adapter for cornerstone version ".concat(cornerstoneToolsVersion, ", exiting."));
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/ParametricMap.js





var ParametricMap_DicomMessage = dcmjs_es/* data */.p.DicomMessage,
  ParametricMap_DicomMetaDictionary = dcmjs_es/* data */.p.DicomMetaDictionary;
var ParametricMap_Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
function ParametricMap_generateToolState(_x, _x2, _x3) {
  return Cornerstone_ParametricMap_generateToolState.apply(this, arguments);
}
function Cornerstone_ParametricMap_generateToolState() {
  Cornerstone_ParametricMap_generateToolState = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageIds, arrayBuffer, metadataProvider) {
    var tolerance,
      dicomData,
      dataset,
      multiframe,
      imagePlaneModule,
      ImageOrientationPatient,
      validOrientations,
      pixelData,
      orientation,
      sopUIDImageIdIndexMap,
      orientationText,
      imageIdMaps,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          tolerance = _args.length > 3 && _args[3] !== undefined ? _args[3] : 1e-3;
          dicomData = ParametricMap_DicomMessage.readFile(arrayBuffer);
          dataset = ParametricMap_DicomMetaDictionary.naturalizeDataset(dicomData.dict);
          dataset._meta = ParametricMap_DicomMetaDictionary.namifyDataset(dicomData.meta);
          multiframe = ParametricMap_Normalizer.normalizeToDataset([dataset]);
          imagePlaneModule = metadataProvider.get("imagePlaneModule", imageIds[0]);
          if (!imagePlaneModule) {
            console.warn("Insufficient metadata, imagePlaneModule missing.");
          }
          ImageOrientationPatient = Array.isArray(imagePlaneModule.rowCosines) ? [].concat(_toConsumableArray(imagePlaneModule.rowCosines), _toConsumableArray(imagePlaneModule.columnCosines)) : [imagePlaneModule.rowCosines.x, imagePlaneModule.rowCosines.y, imagePlaneModule.rowCosines.z, imagePlaneModule.columnCosines.x, imagePlaneModule.columnCosines.y, imagePlaneModule.columnCosines.z];
          validOrientations = [ImageOrientationPatient];
          pixelData = getPixelData(multiframe);
          orientation = checkOrientation(multiframe, validOrientations, [imagePlaneModule.rows, imagePlaneModule.columns, imageIds.length], tolerance);
          sopUIDImageIdIndexMap = imageIds.reduce(function (acc, imageId) {
            var _metadataProvider$get = metadataProvider.get("generalImageModule", imageId),
              sopInstanceUID = _metadataProvider$get.sopInstanceUID;
            acc[sopInstanceUID] = imageId;
            return acc;
          }, {});
          if (!(orientation !== "Planar")) {
            _context.next = 15;
            break;
          }
          orientationText = {
            Perpendicular: "orthogonal",
            Oblique: "oblique"
          };
          throw new Error("Parametric maps ".concat(orientationText[orientation], " to the acquisition plane of the source data are not yet supported."));
        case 15:
          imageIdMaps = imageIds.reduce(function (acc, curr, index) {
            acc.indices[curr] = index;
            acc.metadata[curr] = metadataProvider.get("instance", curr);
            return acc;
          }, {
            indices: {},
            metadata: {}
          });
          _context.next = 18;
          return ParametricMap_insertPixelDataPlanar(pixelData, multiframe, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap, imageIdMaps);
        case 18:
          return _context.abrupt("return", {
            pixelData: pixelData
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return Cornerstone_ParametricMap_generateToolState.apply(this, arguments);
}
function ParametricMap_insertPixelDataPlanar(sourcePixelData, multiframe, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap, imageIdMaps) {
  var targetPixelData = new sourcePixelData.constructor(sourcePixelData.length);
  var PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    Rows = multiframe.Rows,
    Columns = multiframe.Columns;
  var sliceLength = Columns * Rows;
  var numSlices = PerFrameFunctionalGroupsSequence.length;
  for (var i = 0; i < numSlices; i++) {
    var sourceSliceDataView = new sourcePixelData.constructor(sourcePixelData.buffer, i * sliceLength, sliceLength);
    var imageId = ParametricMap_findReferenceSourceImageId(multiframe, i, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap);
    if (!imageId) {
      console.warn("Image not present in stack, can't import frame : " + i + ".");
      continue;
    }
    var sourceImageMetadata = imageIdMaps.metadata[imageId];
    if (Rows !== sourceImageMetadata.Rows || Columns !== sourceImageMetadata.Columns) {
      throw new Error("Parametric map have different geometry dimensions (Rows and Columns) " + "respect to the source image reference frame. This is not yet supported.");
    }
    var imageIdIndex = imageIdMaps.indices[imageId];
    var byteOffset = sliceLength * imageIdIndex * targetPixelData.BYTES_PER_ELEMENT;
    var targetSliceDataView = new targetPixelData.constructor(targetPixelData.buffer, byteOffset, sliceLength);
    targetSliceDataView.set(sourceSliceDataView);
  }
  return targetPixelData;
}
function getPixelData(multiframe) {
  var TypedArrayClass;
  var data;
  if (multiframe.PixelData) {
    var _multiframe$PixelRepr;
    var validTypedArrays = multiframe.BitsAllocated === 16 ? [Uint16Array, Int16Array] : [Uint32Array, Int32Array];
    TypedArrayClass = validTypedArrays[(_multiframe$PixelRepr = multiframe.PixelRepresentation) !== null && _multiframe$PixelRepr !== void 0 ? _multiframe$PixelRepr : 0];
    data = multiframe.PixelData;
  } else if (multiframe.FloatPixelData) {
    TypedArrayClass = Float32Array;
    data = multiframe.FloatPixelData;
  } else if (multiframe.DoubleFloatPixelData) {
    TypedArrayClass = Float64Array;
    data = multiframe.DoubleFloatPixelData;
  }
  if (data === undefined) {
    dcmjs_es/* log */.Rm.error("This parametric map pixel data is undefined.");
  }
  if (Array.isArray(data)) {
    data = data[0];
  }
  return new TypedArrayClass(data);
}
function ParametricMap_findReferenceSourceImageId(multiframe, frameSegment, imageIds, metadataProvider, tolerance, sopUIDImageIdIndexMap) {
  var imageId = undefined;
  if (!multiframe) {
    return imageId;
  }
  var FrameOfReferenceUID = multiframe.FrameOfReferenceUID,
    PerFrameFunctionalGroupsSequence = multiframe.PerFrameFunctionalGroupsSequence,
    SourceImageSequence = multiframe.SourceImageSequence,
    ReferencedSeriesSequence = multiframe.ReferencedSeriesSequence;
  if (!PerFrameFunctionalGroupsSequence || PerFrameFunctionalGroupsSequence.length === 0) {
    return imageId;
  }
  var PerFrameFunctionalGroup = PerFrameFunctionalGroupsSequence[frameSegment];
  if (!PerFrameFunctionalGroup) {
    return imageId;
  }
  var frameSourceImageSequence = undefined;
  if (PerFrameFunctionalGroup.DerivationImageSequence) {
    var DerivationImageSequence = PerFrameFunctionalGroup.DerivationImageSequence;
    if (Array.isArray(DerivationImageSequence)) {
      if (DerivationImageSequence.length !== 0) {
        DerivationImageSequence = DerivationImageSequence[0];
      } else {
        DerivationImageSequence = undefined;
      }
    }
    if (DerivationImageSequence) {
      frameSourceImageSequence = DerivationImageSequence.SourceImageSequence;
      if (Array.isArray(frameSourceImageSequence)) {
        if (frameSourceImageSequence.length !== 0) {
          frameSourceImageSequence = frameSourceImageSequence[0];
        } else {
          frameSourceImageSequence = undefined;
        }
      }
    }
  } else if (SourceImageSequence && SourceImageSequence.length !== 0) {
    console.warn("DerivationImageSequence not present, using SourceImageSequence assuming SEG has the same geometry as the source image.");
    frameSourceImageSequence = SourceImageSequence[frameSegment];
  }
  if (frameSourceImageSequence) {
    imageId = ParametricMap_getImageIdOfSourceImageBySourceImageSequence(frameSourceImageSequence, sopUIDImageIdIndexMap);
  }
  if (imageId === undefined && ReferencedSeriesSequence) {
    var referencedSeriesSequence = Array.isArray(ReferencedSeriesSequence) ? ReferencedSeriesSequence[0] : ReferencedSeriesSequence;
    var ReferencedSeriesInstanceUID = referencedSeriesSequence.SeriesInstanceUID;
    imageId = ParametricMap_getImageIdOfSourceImagebyGeometry(ReferencedSeriesInstanceUID, FrameOfReferenceUID, PerFrameFunctionalGroup, imageIds, metadataProvider, tolerance);
  }
  return imageId;
}
function ParametricMap_getImageIdOfSourceImageBySourceImageSequence(SourceImageSequence, sopUIDImageIdIndexMap) {
  var ReferencedSOPInstanceUID = SourceImageSequence.ReferencedSOPInstanceUID,
    ReferencedFrameNumber = SourceImageSequence.ReferencedFrameNumber;
  return ReferencedFrameNumber ? ParametricMap_getImageIdOfReferencedFrame(ReferencedSOPInstanceUID, ReferencedFrameNumber, sopUIDImageIdIndexMap) : sopUIDImageIdIndexMap[ReferencedSOPInstanceUID];
}
function ParametricMap_getImageIdOfSourceImagebyGeometry(ReferencedSeriesInstanceUID, FrameOfReferenceUID, PerFrameFunctionalGroup, imageIds, metadataProvider, tolerance) {
  if (ReferencedSeriesInstanceUID === undefined || PerFrameFunctionalGroup.PlanePositionSequence === undefined || PerFrameFunctionalGroup.PlanePositionSequence[0] === undefined || PerFrameFunctionalGroup.PlanePositionSequence[0].ImagePositionPatient === undefined) {
    return undefined;
  }
  for (var imageIdsIndex = 0; imageIdsIndex < imageIds.length; ++imageIdsIndex) {
    var sourceImageMetadata = metadataProvider.get("instance", imageIds[imageIdsIndex]);
    if (sourceImageMetadata === undefined || sourceImageMetadata.ImagePositionPatient === undefined || sourceImageMetadata.FrameOfReferenceUID !== FrameOfReferenceUID || sourceImageMetadata.SeriesInstanceUID !== ReferencedSeriesInstanceUID) {
      continue;
    }
    if (compareArrays(PerFrameFunctionalGroup.PlanePositionSequence[0].ImagePositionPatient, sourceImageMetadata.ImagePositionPatient, tolerance)) {
      return imageIds[imageIdsIndex];
    }
  }
}
function ParametricMap_getImageIdOfReferencedFrame(sopInstanceUid, frameNumber, sopUIDImageIdIndexMap) {
  var imageId = sopUIDImageIdIndexMap[sopInstanceUid];
  if (!imageId) {
    return;
  }
  var imageIdFrameNumber = Number(imageId.split("frame=")[1]);
  return imageIdFrameNumber === frameNumber - 1 ? imageId : undefined;
}
var ParametricMapObj = {
  generateToolState: ParametricMap_generateToolState
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone/index.js













var CornerstoneSR = {
  Length: Length,
  FreehandRoi: FreehandRoi,
  Bidirectional: Bidirectional,
  EllipticalRoi: EllipticalRoi,
  CircleRoi: CircleRoi,
  ArrowAnnotate: ArrowAnnotate,
  MeasurementReport: MeasurementReport,
  CobbAngle: CobbAngle,
  Angle: Angle,
  RectangleRoi: RectangleRoi
};
var CornerstoneSEG = {
  Segmentation: Segmentation_namespaceObject
};
var CornerstonePMAP = {
  ParametricMap: ParametricMapObj
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/cornerstone3DTag.js
var CORNERSTONE_3D_TAG = "Cornerstone3DTools@^0.1.0";



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/CodingScheme.js
// This is a custom coding scheme defined to store some annotations from Cornerstone.
// Note: CodeMeaning is VR type LO, which means we only actually support 64 characters
// here this is fine for most labels, but may be problematic at some point.
var CodingScheme_CORNERSTONEFREETEXT = "CORNERSTONEFREETEXT";

// Cornerstone specified coding scheme for storing findings
var CodingSchemeDesignator = "CORNERSTONEJS";
var CodingScheme = {
  CodingSchemeDesignator: CodingSchemeDesignator,
  codeValues: {
    CORNERSTONEFREETEXT: CodingScheme_CORNERSTONEFREETEXT
  }
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/MeasurementReport.js








var _MeasurementReport;
var MeasurementReport_TID1500 = dcmjs_es/* utilities */.BF.TID1500,
  MeasurementReport_addAccessors = dcmjs_es/* utilities */.BF.addAccessors;
var MeasurementReport_StructuredReport = dcmjs_es/* derivations */.h4.StructuredReport;
var MeasurementReport_Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
var MeasurementReport_TID1500MeasurementReport = MeasurementReport_TID1500.TID1500MeasurementReport,
  MeasurementReport_TID1501MeasurementGroup = MeasurementReport_TID1500.TID1501MeasurementGroup;
var MeasurementReport_DicomMetaDictionary = dcmjs_es/* data */.p.DicomMetaDictionary;
var MeasurementReport_FINDING = {
  CodingSchemeDesignator: "DCM",
  CodeValue: "121071"
};
var MeasurementReport_FINDING_SITE = {
  CodingSchemeDesignator: "SCT",
  CodeValue: "363698007"
};
var MeasurementReport_FINDING_SITE_OLD = {
  CodingSchemeDesignator: "SRT",
  CodeValue: "G-C0E3"
};
var MeasurementReport_codeValueMatch = function codeValueMatch(group, code, oldCode) {
  var ConceptNameCodeSequence = group.ConceptNameCodeSequence;
  if (!ConceptNameCodeSequence) {
    return;
  }
  var CodingSchemeDesignator = ConceptNameCodeSequence.CodingSchemeDesignator,
    CodeValue = ConceptNameCodeSequence.CodeValue;
  return CodingSchemeDesignator == code.CodingSchemeDesignator && CodeValue == code.CodeValue || oldCode && CodingSchemeDesignator == oldCode.CodingSchemeDesignator && CodeValue == oldCode.CodeValue;
};
function MeasurementReport_getTID300ContentItem(tool, toolType, ReferencedSOPSequence, toolClass, worldToImageCoords) {
  var args = toolClass.getTID300RepresentationArguments(tool, worldToImageCoords);
  args.ReferencedSOPSequence = ReferencedSOPSequence;
  var TID300Measurement = new toolClass.TID300Representation(args);
  return TID300Measurement;
}
function MeasurementReport_getMeasurementGroup(toolType, toolData, ReferencedSOPSequence, worldToImageCoords) {
  var toolTypeData = toolData[toolType];
  var toolClass = MeasurementReport_MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_TOOL_TYPE[toolType];
  if (!toolTypeData || !toolTypeData.data || !toolTypeData.data.length || !toolClass) {
    return;
  }
  var Measurements = toolTypeData.data.map(function (tool) {
    return MeasurementReport_getTID300ContentItem(tool, toolType, ReferencedSOPSequence, toolClass, worldToImageCoords);
  });
  return new MeasurementReport_TID1501MeasurementGroup(Measurements);
}
var MeasurementReport_MeasurementReport = /*#__PURE__*/function () {
  function MeasurementReport() {
    _classCallCheck(this, MeasurementReport);
  }
  return _createClass(MeasurementReport, null, [{
    key: "getCornerstoneLabelFromDefaultState",
    value: function getCornerstoneLabelFromDefaultState(defaultState) {
      var _defaultState$finding = defaultState.findingSites,
        findingSites = _defaultState$finding === void 0 ? [] : _defaultState$finding,
        finding = defaultState.finding;
      var cornersoneFreeTextCodingValue = CodingScheme.codeValues.CORNERSTONEFREETEXT;
      var freeTextLabel = findingSites.find(function (fs) {
        return fs.CodeValue === cornersoneFreeTextCodingValue;
      });
      if (freeTextLabel) {
        return freeTextLabel.CodeMeaning;
      }
      if (finding && finding.CodeValue === cornersoneFreeTextCodingValue) {
        return finding.CodeMeaning;
      }
    }
  }, {
    key: "generateDatasetMeta",
    value: function generateDatasetMeta() {
      var fileMetaInformationVersionArray = new Uint8Array(2);
      fileMetaInformationVersionArray[1] = 1;
      var _meta = {
        FileMetaInformationVersion: {
          Value: [fileMetaInformationVersionArray.buffer],
          vr: "OB"
        },
        TransferSyntaxUID: {
          Value: ["1.2.840.10008.1.2.1"],
          vr: "UI"
        },
        ImplementationClassUID: {
          Value: [MeasurementReport_DicomMetaDictionary.uid()],
          vr: "UI"
        },
        ImplementationVersionName: {
          Value: ["dcmjs"],
          vr: "SH"
        }
      };
      return _meta;
    }
  }, {
    key: "getSetupMeasurementData",
    value: function getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, toolType) {
      var ContentSequence = MeasurementGroup.ContentSequence;
      var contentSequenceArr = toArray(ContentSequence);
      var findingGroup = contentSequenceArr.find(function (group) {
        return MeasurementReport_codeValueMatch(group, MeasurementReport_FINDING);
      });
      var findingSiteGroups = contentSequenceArr.filter(function (group) {
        return MeasurementReport_codeValueMatch(group, MeasurementReport_FINDING_SITE, MeasurementReport_FINDING_SITE_OLD);
      }) || [];
      var NUMGroup = contentSequenceArr.find(function (group) {
        return group.ValueType === "NUM";
      });
      var SCOORDGroup = toArray(NUMGroup.ContentSequence).find(function (group) {
        return group.ValueType === "SCOORD";
      });
      var ReferencedSOPSequence = SCOORDGroup.ContentSequence.ReferencedSOPSequence;
      var ReferencedSOPInstanceUID = ReferencedSOPSequence.ReferencedSOPInstanceUID,
        ReferencedFrameNumber = ReferencedSOPSequence.ReferencedFrameNumber;
      var referencedImageId = sopInstanceUIDToImageIdMap[ReferencedSOPInstanceUID];
      var imagePlaneModule = metadata.get("imagePlaneModule", referencedImageId);
      var finding = findingGroup ? MeasurementReport_addAccessors(findingGroup.ConceptCodeSequence) : undefined;
      var findingSites = findingSiteGroups.map(function (fsg) {
        return MeasurementReport_addAccessors(fsg.ConceptCodeSequence);
      });
      var defaultState = {
        description: undefined,
        sopInstanceUid: ReferencedSOPInstanceUID,
        annotation: {
          annotationUID: MeasurementReport_DicomMetaDictionary.uid(),
          metadata: {
            toolName: toolType,
            referencedImageId: referencedImageId,
            FrameOfReferenceUID: imagePlaneModule.frameOfReferenceUID,
            label: ""
          },
          data: undefined
        },
        finding: finding,
        findingSites: findingSites
      };
      if (defaultState.finding) {
        defaultState.description = defaultState.finding.CodeMeaning;
      }
      defaultState.annotation.metadata.label = MeasurementReport.getCornerstoneLabelFromDefaultState(defaultState);
      return {
        defaultState: defaultState,
        NUMGroup: NUMGroup,
        SCOORDGroup: SCOORDGroup,
        ReferencedSOPSequence: ReferencedSOPSequence,
        ReferencedSOPInstanceUID: ReferencedSOPInstanceUID,
        ReferencedFrameNumber: ReferencedFrameNumber
      };
    }
  }, {
    key: "generateReport",
    value: function generateReport(toolState, metadataProvider, worldToImageCoords, options) {
      var allMeasurementGroups = [];
      var sopInstanceUIDsToSeriesInstanceUIDMap = {};
      var derivationSourceDatasets = [];
      var _meta = MeasurementReport.generateDatasetMeta();
      Object.keys(toolState).forEach(function (imageId) {
        var sopCommonModule = metadataProvider.get("sopCommonModule", imageId);
        var instance = metadataProvider.get("instance", imageId);
        var sopInstanceUID = sopCommonModule.sopInstanceUID,
          sopClassUID = sopCommonModule.sopClassUID;
        var seriesInstanceUID = instance.SeriesInstanceUID;
        sopInstanceUIDsToSeriesInstanceUIDMap[sopInstanceUID] = seriesInstanceUID;
        if (!derivationSourceDatasets.find(function (dsd) {
          return dsd.SeriesInstanceUID === seriesInstanceUID;
        })) {
          var derivationSourceDataset = MeasurementReport.generateDerivationSourceDataset(instance);
          derivationSourceDatasets.push(derivationSourceDataset);
        }
        var frameNumber = metadataProvider.get("frameNumber", imageId);
        var toolData = toolState[imageId];
        var toolTypes = Object.keys(toolData);
        var ReferencedSOPSequence = {
          ReferencedSOPClassUID: sopClassUID,
          ReferencedSOPInstanceUID: sopInstanceUID,
          ReferencedFrameNumber: undefined
        };
        if (instance && instance.NumberOfFrames && instance.NumberOfFrames > 1 || MeasurementReport_Normalizer.isMultiframeSOPClassUID(sopClassUID)) {
          ReferencedSOPSequence.ReferencedFrameNumber = frameNumber;
        }
        var measurementGroups = [];
        toolTypes.forEach(function (toolType) {
          var group = MeasurementReport_getMeasurementGroup(toolType, toolData, ReferencedSOPSequence, worldToImageCoords);
          if (group) {
            measurementGroups.push(group);
          }
        });
        allMeasurementGroups = allMeasurementGroups.concat(measurementGroups);
      });
      var tid1500MeasurementReport = new MeasurementReport_TID1500MeasurementReport({
        TID1501MeasurementGroups: allMeasurementGroups
      }, options);
      var report = new MeasurementReport_StructuredReport(derivationSourceDatasets, options);
      var contentItem = tid1500MeasurementReport.contentItem(derivationSourceDatasets, _objectSpread2(_objectSpread2({}, options), {}, {
        sopInstanceUIDsToSeriesInstanceUIDMap: sopInstanceUIDsToSeriesInstanceUIDMap
      }));
      report.dataset = Object.assign(report.dataset, contentItem);
      report.dataset._meta = _meta;
      report.SpecificCharacterSet = "ISO_IR 192";
      return report;
    }
  }, {
    key: "generateToolState",
    value: function generateToolState(dataset, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata, hooks) {
      if (dataset.ContentTemplateSequence.TemplateIdentifier !== "1500") {
        throw new Error("This package can currently only interpret DICOM SR TID 1500");
      }
      var REPORT = "Imaging Measurements";
      var GROUP = "Measurement Group";
      var TRACKING_IDENTIFIER = "Tracking Identifier";
      var TRACKING_UNIQUE_IDENTIFIER = "Tracking Unique Identifier";
      var imagingMeasurementContent = toArray(dataset.ContentSequence).find(codeMeaningEquals(REPORT));
      var measurementGroups = toArray(imagingMeasurementContent.ContentSequence).filter(codeMeaningEquals(GROUP));
      var measurementData = {};
      var cornerstoneToolClasses = MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE;
      var registeredToolClasses = [];
      Object.keys(cornerstoneToolClasses).forEach(function (key) {
        registeredToolClasses.push(cornerstoneToolClasses[key]);
        measurementData[key] = [];
      });
      measurementGroups.forEach(function (measurementGroup) {
        try {
          var _hooks$getToolClass;
          var measurementGroupContentSequence = toArray(measurementGroup.ContentSequence);
          var TrackingIdentifierGroup = measurementGroupContentSequence.find(function (contentItem) {
            return contentItem.ConceptNameCodeSequence.CodeMeaning === TRACKING_IDENTIFIER;
          });
          var TrackingIdentifierValue = TrackingIdentifierGroup.TextValue;
          var TrackingUniqueIdentifierGroup = measurementGroupContentSequence.find(function (contentItem) {
            return contentItem.ConceptNameCodeSequence.CodeMeaning === TRACKING_UNIQUE_IDENTIFIER;
          });
          var TrackingUniqueIdentifierValue = TrackingUniqueIdentifierGroup === null || TrackingUniqueIdentifierGroup === void 0 ? void 0 : TrackingUniqueIdentifierGroup.UID;
          var toolClass = (hooks === null || hooks === void 0 || (_hooks$getToolClass = hooks.getToolClass) === null || _hooks$getToolClass === void 0 ? void 0 : _hooks$getToolClass.call(hooks, measurementGroup, dataset, registeredToolClasses)) || registeredToolClasses.find(function (tc) {
            return tc.isValidCornerstoneTrackingIdentifier(TrackingIdentifierValue);
          });
          if (toolClass) {
            var measurement = toolClass.getMeasurementData(measurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata);
            measurement.TrackingUniqueIdentifier = TrackingUniqueIdentifierValue;
            console.log("=== ".concat(toolClass.toolType, " ==="));
            console.log(measurement);
            measurementData[toolClass.toolType].push(measurement);
          }
        } catch (e) {
          console.warn("Unable to generate tool state for", measurementGroup, e);
        }
      });
      return measurementData;
    }
  }, {
    key: "registerTool",
    value: function registerTool(toolClass) {
      MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE[toolClass.utilityToolType] = toolClass;
      MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_TOOL_TYPE[toolClass.toolType] = toolClass;
      MeasurementReport.MEASUREMENT_BY_TOOLTYPE[toolClass.toolType] = toolClass.utilityToolType;
    }
  }]);
}();
_MeasurementReport = MeasurementReport_MeasurementReport;
_MeasurementReport.CORNERSTONE_3D_TAG = CORNERSTONE_3D_TAG;
_MeasurementReport.MEASUREMENT_BY_TOOLTYPE = {};
_MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE = {};
_MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_TOOL_TYPE = {};
_MeasurementReport.generateDerivationSourceDataset = function (instance) {
  var _vrMap = {
    PixelData: "OW"
  };
  var _meta = _MeasurementReport.generateDatasetMeta();
  var derivationSourceDataset = _objectSpread2(_objectSpread2({}, instance), {}, {
    _meta: _meta,
    _vrMap: _vrMap
  });
  return derivationSourceDataset;
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/ArrowAnnotate.js






var ArrowAnnotate_TID300Point = dcmjs_es/* utilities */.BF.TID300.Point;
var ArrowAnnotate_ARROW_ANNOTATE = "ArrowAnnotate";
var trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(ArrowAnnotate_ARROW_ANNOTATE);
var codeValues = CodingScheme.codeValues,
  ArrowAnnotate_CodingSchemeDesignator = CodingScheme.CodingSchemeDesignator;
var ArrowAnnotate_ArrowAnnotate = /*#__PURE__*/function () {
  function ArrowAnnotate() {
    _classCallCheck(this, ArrowAnnotate);
  }
  return _createClass(ArrowAnnotate, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, ArrowAnnotate.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var text = defaultState.annotation.metadata.label;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }

      // Since the arrowAnnotate measurement is just a point, to generate the tool state
      // we derive the second point based on the image size relative to the first point.
      if (worldCoords.length === 1) {
        var imagePixelModule = metadata.get("imagePixelModule", referencedImageId);
        var xOffset = 10;
        var yOffset = 10;
        if (imagePixelModule) {
          var columns = imagePixelModule.columns,
            rows = imagePixelModule.rows;
          xOffset = columns / 10;
          yOffset = rows / 10;
        }
        var secondPoint = imageToWorldCoords(referencedImageId, [GraphicData[0] + xOffset, GraphicData[1] + yOffset]);
        worldCoords.push(secondPoint);
      }
      var state = defaultState;
      state.annotation.data = {
        text: text,
        handles: {
          arrowFirst: true,
          points: [worldCoords[0], worldCoords[1]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        metadata = tool.metadata;
      var finding = tool.finding,
        findingSites = tool.findingSites;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("ArrowAnnotate.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var _data$handles = data.handles,
        points = _data$handles.points,
        arrowFirst = _data$handles.arrowFirst;
      var point;
      var point2;
      if (arrowFirst) {
        point = points[0];
        point2 = points[1];
      } else {
        point = points[1];
        point2 = points[0];
      }
      var pointImage = worldToImageCoords(referencedImageId, point);
      var pointImage2 = worldToImageCoords(referencedImageId, point2);
      var TID300RepresentationArguments = {
        points: [{
          x: pointImage[0],
          y: pointImage[1]
        }, {
          x: pointImage2[0],
          y: pointImage2[1]
        }],
        trackingIdentifierTextValue: trackingIdentifierTextValue,
        findingSites: findingSites || []
      };

      // If freetext finding isn't present, add it from the tool text.
      if (!finding || finding.CodeValue !== codeValues.CORNERSTONEFREETEXT) {
        finding = {
          CodeValue: codeValues.CORNERSTONEFREETEXT,
          CodingSchemeDesignator: ArrowAnnotate_CodingSchemeDesignator,
          CodeMeaning: data.text
        };
      }
      TID300RepresentationArguments.finding = finding;
      return TID300RepresentationArguments;
    }
  }]);
}();
ArrowAnnotate_ArrowAnnotate.toolType = ArrowAnnotate_ARROW_ANNOTATE;
ArrowAnnotate_ArrowAnnotate.utilityToolType = ArrowAnnotate_ARROW_ANNOTATE;
ArrowAnnotate_ArrowAnnotate.TID300Representation = ArrowAnnotate_TID300Point;
ArrowAnnotate_ArrowAnnotate.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === ArrowAnnotate_ARROW_ANNOTATE;
};
MeasurementReport_MeasurementReport.registerTool(ArrowAnnotate_ArrowAnnotate);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Bidirectional.js







var _Bidirectional;
var Bidirectional_TID300Bidirectional = dcmjs_es/* utilities */.BF.TID300.Bidirectional;
var Bidirectional_BIDIRECTIONAL = "Bidirectional";
var Bidirectional_LONG_AXIS = "Long Axis";
var Bidirectional_SHORT_AXIS = "Short Axis";
var Bidirectional_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(Bidirectional_BIDIRECTIONAL);
var Bidirectional_Bidirectional = /*#__PURE__*/function () {
  function Bidirectional() {
    _classCallCheck(this, Bidirectional);
  }
  return _createClass(Bidirectional, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, Bidirectional.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var ContentSequence = MeasurementGroup.ContentSequence;
      var longAxisNUMGroup = toArray(ContentSequence).find(function (group) {
        return group.ConceptNameCodeSequence.CodeMeaning === Bidirectional_LONG_AXIS;
      });
      var longAxisSCOORDGroup = toArray(longAxisNUMGroup.ContentSequence).find(function (group) {
        return group.ValueType === "SCOORD";
      });
      var shortAxisNUMGroup = toArray(ContentSequence).find(function (group) {
        return group.ConceptNameCodeSequence.CodeMeaning === Bidirectional_SHORT_AXIS;
      });
      var shortAxisSCOORDGroup = toArray(shortAxisNUMGroup.ContentSequence).find(function (group) {
        return group.ValueType === "SCOORD";
      });
      var worldCoords = [];
      [longAxisSCOORDGroup, shortAxisSCOORDGroup].forEach(function (group) {
        var GraphicData = group.GraphicData;
        for (var i = 0; i < GraphicData.length; i += 2) {
          var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
          worldCoords.push(point);
        }
      });
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [worldCoords[0], worldCoords[1], worldCoords[2], worldCoords[3]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          length: longAxisNUMGroup.MeasuredValueSequence.NumericValue,
          width: shortAxisNUMGroup.MeasuredValueSequence.NumericValue
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("Bidirectional.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var _ref = cachedStats["imageId:".concat(referencedImageId)] || {},
        length = _ref.length,
        width = _ref.width;
      var points = handles.points;
      var firstPointPairs = [points[0], points[1]];
      var secondPointPairs = [points[2], points[3]];
      var firstPointPairsDistance = Math.sqrt(Math.pow(firstPointPairs[0][0] - firstPointPairs[1][0], 2) + Math.pow(firstPointPairs[0][1] - firstPointPairs[1][1], 2) + Math.pow(firstPointPairs[0][2] - firstPointPairs[1][2], 2));
      var secondPointPairsDistance = Math.sqrt(Math.pow(secondPointPairs[0][0] - secondPointPairs[1][0], 2) + Math.pow(secondPointPairs[0][1] - secondPointPairs[1][1], 2) + Math.pow(secondPointPairs[0][2] - secondPointPairs[1][2], 2));
      var shortAxisPoints;
      var longAxisPoints;
      if (firstPointPairsDistance > secondPointPairsDistance) {
        shortAxisPoints = firstPointPairs;
        longAxisPoints = secondPointPairs;
      } else {
        shortAxisPoints = secondPointPairs;
        longAxisPoints = firstPointPairs;
      }
      var longAxisStartImage = worldToImageCoords(referencedImageId, shortAxisPoints[0]);
      var longAxisEndImage = worldToImageCoords(referencedImageId, shortAxisPoints[1]);
      var shortAxisStartImage = worldToImageCoords(referencedImageId, longAxisPoints[0]);
      var shortAxisEndImage = worldToImageCoords(referencedImageId, longAxisPoints[1]);
      return {
        longAxis: {
          point1: {
            x: longAxisStartImage[0],
            y: longAxisStartImage[1]
          },
          point2: {
            x: longAxisEndImage[0],
            y: longAxisEndImage[1]
          }
        },
        shortAxis: {
          point1: {
            x: shortAxisStartImage[0],
            y: shortAxisStartImage[1]
          },
          point2: {
            x: shortAxisEndImage[0],
            y: shortAxisEndImage[1]
          }
        },
        longAxisLength: length,
        shortAxisLength: width,
        trackingIdentifierTextValue: Bidirectional_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_Bidirectional = Bidirectional_Bidirectional;
_Bidirectional.toolType = Bidirectional_BIDIRECTIONAL;
_Bidirectional.utilityToolType = Bidirectional_BIDIRECTIONAL;
_Bidirectional.TID300Representation = Bidirectional_TID300Bidirectional;
_Bidirectional.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === Bidirectional_BIDIRECTIONAL;
};
MeasurementReport_MeasurementReport.registerTool(Bidirectional_Bidirectional);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Angle.js





var _Angle;
var Angle_TID300CobbAngle = dcmjs_es/* utilities */.BF.TID300.CobbAngle;
var MEASUREMENT_TYPE = "Angle";
var Angle_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(MEASUREMENT_TYPE);
var Angle_Angle = /*#__PURE__*/function () {
  function Angle() {
    _classCallCheck(this, Angle);
  }
  return _createClass(Angle, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, Angle.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [worldCoords[0], worldCoords[1], worldCoords[3]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          angle: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : null
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("Angle.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var start1 = worldToImageCoords(referencedImageId, handles.points[0]);
      var middle = worldToImageCoords(referencedImageId, handles.points[1]);
      var end = worldToImageCoords(referencedImageId, handles.points[2]);
      var point1 = {
        x: start1[0],
        y: start1[1]
      };
      var point2 = {
        x: middle[0],
        y: middle[1]
      };
      var point3 = point2;
      var point4 = {
        x: end[0],
        y: end[1]
      };
      var _ref = cachedStats["imageId:".concat(referencedImageId)] || {},
        angle = _ref.angle;
      return {
        point1: point1,
        point2: point2,
        point3: point3,
        point4: point4,
        rAngle: angle,
        trackingIdentifierTextValue: Angle_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_Angle = Angle_Angle;
_Angle.toolType = MEASUREMENT_TYPE;
_Angle.utilityToolType = MEASUREMENT_TYPE;
_Angle.TID300Representation = Angle_TID300CobbAngle;
_Angle.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === MEASUREMENT_TYPE;
};
MeasurementReport_MeasurementReport.registerTool(Angle_Angle);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/CobbAngle.js





var _CobbAngle;
var CobbAngle_TID300CobbAngle = dcmjs_es/* utilities */.BF.TID300.CobbAngle;
var CobbAngle_MEASUREMENT_TYPE = "CobbAngle";
var CobbAngle_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(CobbAngle_MEASUREMENT_TYPE);
var CobbAngle_CobbAngle = /*#__PURE__*/function () {
  function CobbAngle() {
    _classCallCheck(this, CobbAngle);
  }
  return _createClass(CobbAngle, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, CobbAngle.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [worldCoords[0], worldCoords[1], worldCoords[2], worldCoords[3]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          angle: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : null
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("CobbAngle.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var start1 = worldToImageCoords(referencedImageId, handles.points[0]);
      var end1 = worldToImageCoords(referencedImageId, handles.points[1]);
      var start2 = worldToImageCoords(referencedImageId, handles.points[2]);
      var end2 = worldToImageCoords(referencedImageId, handles.points[3]);
      var point1 = {
        x: start1[0],
        y: start1[1]
      };
      var point2 = {
        x: end1[0],
        y: end1[1]
      };
      var point3 = {
        x: start2[0],
        y: start2[1]
      };
      var point4 = {
        x: end2[0],
        y: end2[1]
      };
      var _ref = cachedStats["imageId:".concat(referencedImageId)] || {},
        angle = _ref.angle;
      return {
        point1: point1,
        point2: point2,
        point3: point3,
        point4: point4,
        rAngle: angle,
        trackingIdentifierTextValue: CobbAngle_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_CobbAngle = CobbAngle_CobbAngle;
_CobbAngle.toolType = CobbAngle_MEASUREMENT_TYPE;
_CobbAngle.utilityToolType = CobbAngle_MEASUREMENT_TYPE;
_CobbAngle.TID300Representation = CobbAngle_TID300CobbAngle;
_CobbAngle.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === CobbAngle_MEASUREMENT_TYPE;
};
MeasurementReport_MeasurementReport.registerTool(CobbAngle_CobbAngle);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/isValidCornerstoneTrackingIdentifier.js



function isValidCornerstoneTrackingIdentifier(trackingIdentifier) {
  if (!trackingIdentifier.includes(":")) {
    return false;
  }
  var _trackingIdentifier$s = trackingIdentifier.split(":"),
    _trackingIdentifier$s2 = _slicedToArray(_trackingIdentifier$s, 2),
    cornerstone3DTag = _trackingIdentifier$s2[0],
    toolType = _trackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType.toLowerCase() === this.toolType.toLowerCase();
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/CircleROI.js






var _CircleROI;
var CircleROI_TID300Circle = dcmjs_es/* utilities */.BF.TID300.Circle;
var CircleROI_CIRCLEROI = "CircleROI";
var CircleROI = /*#__PURE__*/function () {
  function CircleROI() {
    _classCallCheck(this, CircleROI);
  }
  return _createClass(CircleROI, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, CircleROI.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var pointsWorld = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var worldPos = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        pointsWorld.push(worldPos);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [].concat(pointsWorld),
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0,
          radius: 0,
          perimeter: 0
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("CircleROI.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var center = worldToImageCoords(referencedImageId, handles.points[0]);
      var end = worldToImageCoords(referencedImageId, handles.points[1]);
      var points = [];
      points.push({
        x: center[0],
        y: center[1]
      });
      points.push({
        x: end[0],
        y: end[1]
      });
      var _ref = cachedStats["imageId:".concat(referencedImageId)] || {},
        area = _ref.area,
        radius = _ref.radius;
      var perimeter = 2 * Math.PI * radius;
      return {
        area: area,
        perimeter: perimeter,
        radius: radius,
        points: points,
        trackingIdentifierTextValue: this.trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_CircleROI = CircleROI;
_CircleROI.trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(CircleROI_CIRCLEROI);
_CircleROI.toolType = CircleROI_CIRCLEROI;
_CircleROI.utilityToolType = CircleROI_CIRCLEROI;
_CircleROI.TID300Representation = CircleROI_TID300Circle;
_CircleROI.isValidCornerstoneTrackingIdentifier = isValidCornerstoneTrackingIdentifier;
MeasurementReport_MeasurementReport.registerTool(CircleROI);



// EXTERNAL MODULE: ../../../node_modules/gl-matrix/esm/index.js + 1 modules
var esm = __webpack_require__(3823);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/EllipticalROI.js







var _EllipticalROI;
var EllipticalROI_TID300Ellipse = dcmjs_es/* utilities */.BF.TID300.Ellipse;
var EllipticalROI_ELLIPTICALROI = "EllipticalROI";
var EPSILON = 1e-4;
var EllipticalROI = /*#__PURE__*/function () {
  function EllipticalROI() {
    _classCallCheck(this, EllipticalROI);
  }
  return _createClass(EllipticalROI, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, EllipticalROI.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var pointsWorld = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var worldPos = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        pointsWorld.push(worldPos);
      }
      var majorAxisStart = esm/* vec3.fromValues */.eR.fromValues.apply(esm/* vec3 */.eR, _toConsumableArray(pointsWorld[0]));
      var majorAxisEnd = esm/* vec3.fromValues */.eR.fromValues.apply(esm/* vec3 */.eR, _toConsumableArray(pointsWorld[1]));
      var minorAxisStart = esm/* vec3.fromValues */.eR.fromValues.apply(esm/* vec3 */.eR, _toConsumableArray(pointsWorld[2]));
      var minorAxisEnd = esm/* vec3.fromValues */.eR.fromValues.apply(esm/* vec3 */.eR, _toConsumableArray(pointsWorld[3]));
      var majorAxisVec = esm/* vec3.create */.eR.create();
      esm/* vec3.sub */.eR.sub(majorAxisVec, majorAxisEnd, majorAxisStart);
      esm/* vec3.normalize */.eR.normalize(majorAxisVec, majorAxisVec);
      var minorAxisVec = esm/* vec3.create */.eR.create();
      esm/* vec3.sub */.eR.sub(minorAxisVec, minorAxisEnd, minorAxisStart);
      esm/* vec3.normalize */.eR.normalize(minorAxisVec, minorAxisVec);
      var imagePlaneModule = metadata.get("imagePlaneModule", referencedImageId);
      if (!imagePlaneModule) {
        throw new Error("imageId does not have imagePlaneModule metadata");
      }
      var columnCosines = imagePlaneModule.columnCosines;
      var columnCosinesVec = esm/* vec3.fromValues */.eR.fromValues(columnCosines[0], columnCosines[1], columnCosines[2]);
      var projectedMajorAxisOnColVec = esm/* vec3.dot */.eR.dot(columnCosinesVec, majorAxisVec);
      var projectedMinorAxisOnColVec = esm/* vec3.dot */.eR.dot(columnCosinesVec, minorAxisVec);
      var absoluteOfMajorDotProduct = Math.abs(projectedMajorAxisOnColVec);
      var absoluteOfMinorDotProduct = Math.abs(projectedMinorAxisOnColVec);
      var ellipsePoints = [];
      if (Math.abs(absoluteOfMajorDotProduct - 1) < EPSILON) {
        ellipsePoints = [pointsWorld[0], pointsWorld[1], pointsWorld[2], pointsWorld[3]];
      } else if (Math.abs(absoluteOfMinorDotProduct - 1) < EPSILON) {
        ellipsePoints = [pointsWorld[2], pointsWorld[3], pointsWorld[0], pointsWorld[1]];
      } else {
        console.warn("OBLIQUE ELLIPSE NOT YET SUPPORTED");
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: _toConsumableArray(ellipsePoints),
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var rotation = data.initialRotation || 0;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("EllipticalROI.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var top, bottom, left, right;
      if (rotation == 90 || rotation == 270) {
        bottom = worldToImageCoords(referencedImageId, handles.points[2]);
        top = worldToImageCoords(referencedImageId, handles.points[3]);
        left = worldToImageCoords(referencedImageId, handles.points[0]);
        right = worldToImageCoords(referencedImageId, handles.points[1]);
      } else {
        top = worldToImageCoords(referencedImageId, handles.points[0]);
        bottom = worldToImageCoords(referencedImageId, handles.points[1]);
        left = worldToImageCoords(referencedImageId, handles.points[2]);
        right = worldToImageCoords(referencedImageId, handles.points[3]);
      }
      var topBottomLength = Math.abs(top[1] - bottom[1]);
      var leftRightLength = Math.abs(left[0] - right[0]);
      var points = [];
      if (topBottomLength > leftRightLength) {
        points.push({
          x: top[0],
          y: top[1]
        });
        points.push({
          x: bottom[0],
          y: bottom[1]
        });
        points.push({
          x: left[0],
          y: left[1]
        });
        points.push({
          x: right[0],
          y: right[1]
        });
      } else {
        points.push({
          x: left[0],
          y: left[1]
        });
        points.push({
          x: right[0],
          y: right[1]
        });
        points.push({
          x: top[0],
          y: top[1]
        });
        points.push({
          x: bottom[0],
          y: bottom[1]
        });
      }
      var _ref = cachedStats["imageId:".concat(referencedImageId)] || {},
        area = _ref.area;
      return {
        area: area,
        points: points,
        trackingIdentifierTextValue: this.trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_EllipticalROI = EllipticalROI;
_EllipticalROI.trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(EllipticalROI_ELLIPTICALROI);
_EllipticalROI.toolType = EllipticalROI_ELLIPTICALROI;
_EllipticalROI.utilityToolType = EllipticalROI_ELLIPTICALROI;
_EllipticalROI.TID300Representation = EllipticalROI_TID300Ellipse;
_EllipticalROI.isValidCornerstoneTrackingIdentifier = isValidCornerstoneTrackingIdentifier;
MeasurementReport_MeasurementReport.registerTool(EllipticalROI);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RectangleROI.js





var _RectangleROI;
var RectangleROI_TID300Polyline = dcmjs_es/* utilities */.BF.TID300.Polyline;
var TOOLTYPE = "RectangleROI";
var RectangleROI_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(TOOLTYPE);
var RectangleROI = /*#__PURE__*/function () {
  function RectangleROI() {
    _classCallCheck(this, RectangleROI);
  }
  return _createClass(RectangleROI, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, RectangleROI.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [worldCoords[0], worldCoords[1], worldCoords[3], worldCoords[2]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : null
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("CobbAngle.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var corners = handles.points.map(function (point) {
        return worldToImageCoords(referencedImageId, point);
      });
      var area = cachedStats.area,
        perimeter = cachedStats.perimeter;
      return {
        points: [corners[0], corners[1], corners[3], corners[2], corners[0]],
        area: area,
        perimeter: perimeter,
        trackingIdentifierTextValue: RectangleROI_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_RectangleROI = RectangleROI;
_RectangleROI.toolType = TOOLTYPE;
_RectangleROI.utilityToolType = TOOLTYPE;
_RectangleROI.TID300Representation = RectangleROI_TID300Polyline;
_RectangleROI.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === TOOLTYPE;
};
MeasurementReport_MeasurementReport.registerTool(RectangleROI);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Length.js





var Length_TID300Length = dcmjs_es/* utilities */.BF.TID300.Length;
var Length_LENGTH = "Length";
var Length_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(Length_LENGTH);
var Length_Length = /*#__PURE__*/function () {
  function Length() {
    _classCallCheck(this, Length);
  }
  return _createClass(Length, null, [{
    key: "getMeasurementData",
    value:
    // TODO: this function is required for all Cornerstone Tool Adapters, since it is called by MeasurementReport.
    function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, Length.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [worldCoords[0], worldCoords[1]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          length: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : 0
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$cachedStats = data.cachedStats,
        cachedStats = _data$cachedStats === void 0 ? {} : _data$cachedStats,
        handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("Length.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var start = worldToImageCoords(referencedImageId, handles.points[0]);
      var end = worldToImageCoords(referencedImageId, handles.points[1]);
      var point1 = {
        x: start[0],
        y: start[1]
      };
      var point2 = {
        x: end[0],
        y: end[1]
      };
      var _ref = cachedStats["imageId:".concat(referencedImageId)] || {},
        distance = _ref.length;
      return {
        point1: point1,
        point2: point2,
        distance: distance,
        trackingIdentifierTextValue: Length_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
Length_Length.toolType = Length_LENGTH;
Length_Length.utilityToolType = Length_LENGTH;
Length_Length.TID300Representation = Length_TID300Length;
Length_Length.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === Length_LENGTH;
};
MeasurementReport_MeasurementReport.registerTool(Length_Length);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/PlanarFreehandROI.js






var _PlanarFreehandROI;
var PlanarFreehandROI_TID300Polyline = dcmjs_es/* utilities */.BF.TID300.Polyline;
var PLANARFREEHANDROI = "PlanarFreehandROI";
var PlanarFreehandROI_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(PLANARFREEHANDROI);
var closedContourThreshold = 1e-5;
var PlanarFreehandROI = /*#__PURE__*/function () {
  function PlanarFreehandROI() {
    _classCallCheck(this, PlanarFreehandROI);
  }
  return _createClass(PlanarFreehandROI, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, PlanarFreehandROI.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        NUMGroup = _MeasurementReport$ge.NUMGroup,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var distanceBetweenFirstAndLastPoint = esm/* vec3.distance */.eR.distance(worldCoords[worldCoords.length - 1], worldCoords[0]);
      var isOpenContour = true;
      if (distanceBetweenFirstAndLastPoint < closedContourThreshold) {
        worldCoords.pop();
        isOpenContour = false;
      }
      var points = [];
      if (isOpenContour) {
        points.push(worldCoords[0], worldCoords[worldCoords.length - 1]);
      }
      var state = defaultState;
      state.annotation.data = {
        contour: {
          polyline: worldCoords,
          closed: !isOpenContour
        },
        handles: {
          points: points,
          activeHandleIndex: null,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: _defineProperty({}, "imageId:".concat(referencedImageId), {
          area: NUMGroup ? NUMGroup.MeasuredValueSequence.NumericValue : null
        }),
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var _data$contour = data.contour,
        polyline = _data$contour.polyline,
        closed = _data$contour.closed;
      var isOpenContour = closed !== true;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("PlanarFreehandROI.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var points = polyline.map(function (worldPos) {
        return worldToImageCoords(referencedImageId, worldPos);
      });
      if (!isOpenContour) {
        var firstPoint = points[0];
        points.push([firstPoint[0], firstPoint[1]]);
      }
      var _ref = data.cachedStats["imageId:".concat(referencedImageId)] || {},
        area = _ref.area,
        areaUnit = _ref.areaUnit,
        modalityUnit = _ref.modalityUnit,
        perimeter = _ref.perimeter,
        mean = _ref.mean,
        max = _ref.max,
        stdDev = _ref.stdDev;
      return {
        points: points,
        area: area,
        areaUnit: areaUnit,
        perimeter: perimeter,
        modalityUnit: modalityUnit,
        mean: mean,
        max: max,
        stdDev: stdDev,
        trackingIdentifierTextValue: PlanarFreehandROI_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_PlanarFreehandROI = PlanarFreehandROI;
_PlanarFreehandROI.toolType = PLANARFREEHANDROI;
_PlanarFreehandROI.utilityToolType = PLANARFREEHANDROI;
_PlanarFreehandROI.TID300Representation = PlanarFreehandROI_TID300Polyline;
_PlanarFreehandROI.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === PLANARFREEHANDROI;
};
MeasurementReport_MeasurementReport.registerTool(PlanarFreehandROI);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Probe.js





var Probe_TID300Point = dcmjs_es/* utilities */.BF.TID300.Point;
var PROBE = "Probe";
var Probe_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(PROBE);
var Probe = /*#__PURE__*/function () {
  function Probe() {
    _classCallCheck(this, Probe);
  }
  return _createClass(Probe, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, Probe.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: worldCoords,
          activeHandleIndex: null,
          textBox: {
            hasMoved: false
          }
        },
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        metadata = tool.metadata;
      var finding = tool.finding,
        findingSites = tool.findingSites;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("Probe.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var points = data.handles.points;
      var pointsImage = points.map(function (point) {
        var pointImage = worldToImageCoords(referencedImageId, point);
        return {
          x: pointImage[0],
          y: pointImage[1]
        };
      });
      var TID300RepresentationArguments = {
        points: pointsImage,
        trackingIdentifierTextValue: Probe_trackingIdentifierTextValue,
        findingSites: findingSites || [],
        finding: finding
      };
      return TID300RepresentationArguments;
    }
  }]);
}();
Probe.toolType = PROBE;
Probe.utilityToolType = PROBE;
Probe.TID300Representation = Probe_TID300Point;
Probe.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === PROBE;
};
MeasurementReport_MeasurementReport.registerTool(Probe);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/UltrasoundDirectional.js





var _UltrasoundDirectional;
var UltrasoundDirectional_TID300Length = dcmjs_es/* utilities */.BF.TID300.Length;
var ULTRASOUND_DIRECTIONAL = "UltrasoundDirectionalTool";
var UltrasoundDirectional_trackingIdentifierTextValue = "".concat(CORNERSTONE_3D_TAG, ":").concat(ULTRASOUND_DIRECTIONAL);
var UltrasoundDirectional = /*#__PURE__*/function () {
  function UltrasoundDirectional() {
    _classCallCheck(this, UltrasoundDirectional);
  }
  return _createClass(UltrasoundDirectional, null, [{
    key: "getMeasurementData",
    value: function getMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, imageToWorldCoords, metadata) {
      var _MeasurementReport$ge = MeasurementReport_MeasurementReport.getSetupMeasurementData(MeasurementGroup, sopInstanceUIDToImageIdMap, metadata, UltrasoundDirectional.toolType),
        defaultState = _MeasurementReport$ge.defaultState,
        SCOORDGroup = _MeasurementReport$ge.SCOORDGroup,
        ReferencedFrameNumber = _MeasurementReport$ge.ReferencedFrameNumber;
      var referencedImageId = defaultState.annotation.metadata.referencedImageId;
      var GraphicData = SCOORDGroup.GraphicData;
      var worldCoords = [];
      for (var i = 0; i < GraphicData.length; i += 2) {
        var point = imageToWorldCoords(referencedImageId, [GraphicData[i], GraphicData[i + 1]]);
        worldCoords.push(point);
      }
      var state = defaultState;
      state.annotation.data = {
        handles: {
          points: [worldCoords[0], worldCoords[1]],
          activeHandleIndex: 0,
          textBox: {
            hasMoved: false
          }
        },
        cachedStats: {},
        frameNumber: ReferencedFrameNumber
      };
      return state;
    }
  }, {
    key: "getTID300RepresentationArguments",
    value: function getTID300RepresentationArguments(tool, worldToImageCoords) {
      var data = tool.data,
        finding = tool.finding,
        findingSites = tool.findingSites,
        metadata = tool.metadata;
      var handles = data.handles;
      var referencedImageId = metadata.referencedImageId;
      if (!referencedImageId) {
        throw new Error("UltrasoundDirectionalTool.getTID300RepresentationArguments: referencedImageId is not defined");
      }
      var start = worldToImageCoords(referencedImageId, handles.points[0]);
      var end = worldToImageCoords(referencedImageId, handles.points[1]);
      var point1 = {
        x: start[0],
        y: start[1]
      };
      var point2 = {
        x: end[0],
        y: end[1]
      };
      return {
        point1: point1,
        point2: point2,
        trackingIdentifierTextValue: UltrasoundDirectional_trackingIdentifierTextValue,
        finding: finding,
        findingSites: findingSites || []
      };
    }
  }]);
}();
_UltrasoundDirectional = UltrasoundDirectional;
_UltrasoundDirectional.toolType = ULTRASOUND_DIRECTIONAL;
_UltrasoundDirectional.utilityToolType = ULTRASOUND_DIRECTIONAL;
_UltrasoundDirectional.TID300Representation = UltrasoundDirectional_TID300Length;
_UltrasoundDirectional.isValidCornerstoneTrackingIdentifier = function (TrackingIdentifier) {
  if (!TrackingIdentifier.includes(":")) {
    return false;
  }
  var _TrackingIdentifier$s = TrackingIdentifier.split(":"),
    _TrackingIdentifier$s2 = _slicedToArray(_TrackingIdentifier$s, 2),
    cornerstone3DTag = _TrackingIdentifier$s2[0],
    toolType = _TrackingIdentifier$s2[1];
  if (cornerstone3DTag !== CORNERSTONE_3D_TAG) {
    return false;
  }
  return toolType === ULTRASOUND_DIRECTIONAL;
};
MeasurementReport_MeasurementReport.registerTool(UltrasoundDirectional);



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Segmentation/generateSegmentation.js




var generateSegmentation_Normalizer = dcmjs_es/* normalizers */.z8.Normalizer;
var generateSegmentation_SegmentationDerivation = dcmjs_es/* derivations */.h4.Segmentation;
function generateSegmentation_generateSegmentation(images, labelmaps, metadata) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var segmentation = _createMultiframeSegmentationFromReferencedImages(images, metadata, options);
  return fillSegmentation(segmentation, labelmaps, options);
}
function _createMultiframeSegmentationFromReferencedImages(images, metadata, options) {
  var datasets = images.map(function (image) {
    var instance = metadata.get("instance", image.imageId);
    return _objectSpread2(_objectSpread2(_objectSpread2({}, image), instance), {}, {
      SOPClassUID: instance.SopClassUID || instance.SOPClassUID,
      SOPInstanceUID: instance.SopInstanceUID || instance.SOPInstanceUID,
      PixelData: image.voxelManager.getScalarData(),
      _vrMap: {
        PixelData: "OW"
      },
      _meta: {}
    });
  });
  var multiframe = generateSegmentation_Normalizer.normalizeToDataset(datasets);
  if (!multiframe) {
    throw new Error("Failed to normalize the multiframe dataset, the data is not multi-frame.");
  }
  return new generateSegmentation_SegmentationDerivation([multiframe], options);
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Segmentation/generateLabelMaps2DFrom3D.js
function generateLabelMaps2DFrom3D(labelmap3D) {
  var scalarData = labelmap3D.scalarData,
    dimensions = labelmap3D.dimensions;
  var labelmaps2D = [];
  var segmentsOnLabelmap3D = new Set();
  for (var z = 0; z < dimensions[2]; z++) {
    var pixelData = scalarData.slice(z * dimensions[0] * dimensions[1], (z + 1) * dimensions[0] * dimensions[1]);
    var segmentsOnLabelmap = [];
    for (var i = 0; i < pixelData.length; i++) {
      var segment = pixelData[i];
      if (!segmentsOnLabelmap.includes(segment) && segment !== 0) {
        segmentsOnLabelmap.push(segment);
      }
    }
    var labelmap2D = {
      segmentsOnLabelmap: segmentsOnLabelmap,
      pixelData: pixelData,
      rows: dimensions[1],
      columns: dimensions[0]
    };
    if (segmentsOnLabelmap.length === 0) {
      continue;
    }
    segmentsOnLabelmap.forEach(function (segmentIndex) {
      segmentsOnLabelmap3D.add(segmentIndex);
    });
    labelmaps2D[dimensions[2] - 1 - z] = labelmap2D;
  }
  labelmap3D.segmentsOnLabelmap = Array.from(segmentsOnLabelmap3D);
  labelmap3D.labelmaps2D = labelmaps2D;
  return labelmap3D;
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Segmentation/generateToolState.js


function generateToolState_generateToolState(imageIds, arrayBuffer, metadataProvider) {
  var skipOverlapping = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tolerance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1e-3;
  return Segmentation_generateToolState(imageIds, arrayBuffer, metadataProvider, skipOverlapping, tolerance);
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/Segmentation/index.js




;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/ParametricMap/generateToolState.js


var ParametricMap = CornerstonePMAP.ParametricMap;
var generateToolStateCornerstone = ParametricMap.generateToolState;
function ParametricMap_generateToolState_generateToolState(imageIds, arrayBuffer, metadataProvider) {
  var skipOverlapping = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tolerance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1e-3;
  return generateToolStateCornerstone(imageIds, arrayBuffer, metadataProvider, skipOverlapping, tolerance);
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/ParametricMap/index.js


// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/index.js + 82 modules
var dist_esm = __webpack_require__(55139);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/utilities/getPatientModule.js
function getPatientModule(imageId, metadataProvider) {
  var generalSeriesModule = metadataProvider.get("generalSeriesModule", imageId);
  var generalStudyModule = metadataProvider.get("generalStudyModule", imageId);
  var patientStudyModule = metadataProvider.get("patientStudyModule", imageId);
  var patientModule = metadataProvider.get("patientModule", imageId);
  var patientDemographicModule = metadataProvider.get("patientDemographicModule", imageId);
  return {
    Modality: generalSeriesModule.modality,
    PatientID: patientModule.patientId,
    PatientName: patientModule.patientName,
    PatientBirthDate: "",
    PatientAge: patientStudyModule.patientAge,
    PatientSex: patientDemographicModule.patientSex,
    PatientWeight: patientStudyModule.patientWeight,
    StudyDate: generalStudyModule.studyDate,
    StudyTime: generalStudyModule.studyTime,
    StudyID: "ToDo",
    AccessionNumber: generalStudyModule.accessionNumber
  };
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/utilities/getReferencedFrameOfReferenceSequence.js


function getReferencedFrameOfReferenceSequence(metadata, metadataProvider, dataset) {
  var imageId = metadata.referencedImageId,
    FrameOfReferenceUID = metadata.FrameOfReferenceUID;
  var instance = metadataProvider.get("instance", imageId);
  var SeriesInstanceUID = instance.SeriesInstanceUID;
  var ReferencedSeriesSequence = dataset.ReferencedSeriesSequence;
  return [{
    FrameOfReferenceUID: FrameOfReferenceUID,
    RTReferencedStudySequence: [{
      ReferencedSOPClassUID: dataset.SOPClassUID,
      ReferencedSOPInstanceUID: dataset.SOPInstanceUID,
      RTReferencedSeriesSequence: [{
        SeriesInstanceUID: SeriesInstanceUID,
        ContourImageSequence: _toConsumableArray(ReferencedSeriesSequence[0].ReferencedInstanceSequence)
      }]
    }]
  }];
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/utilities/getReferencedSeriesSequence.js
function getReferencedSeriesSequence(metadata, _index, metadataProvider, DicomMetadataStore) {
  // grab imageId from toolData
  var imageId = metadata.referencedImageId;
  var instance = metadataProvider.get("instance", imageId);
  var SeriesInstanceUID = instance.SeriesInstanceUID,
    StudyInstanceUID = instance.StudyInstanceUID;
  var ReferencedSeriesSequence = [];
  if (SeriesInstanceUID) {
    var series = DicomMetadataStore.getSeries(StudyInstanceUID, SeriesInstanceUID);
    var ReferencedSeries = {
      SeriesInstanceUID: SeriesInstanceUID,
      ReferencedInstanceSequence: []
    };
    series.instances.forEach(function (instance) {
      var SOPInstanceUID = instance.SOPInstanceUID,
        SOPClassUID = instance.SOPClassUID;
      ReferencedSeries.ReferencedInstanceSequence.push({
        ReferencedSOPClassUID: SOPClassUID,
        ReferencedSOPInstanceUID: SOPInstanceUID
      });
    });
    ReferencedSeriesSequence.push(ReferencedSeries);
  }
  return ReferencedSeriesSequence;
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/utilities/getRTROIObservationsSequence.js
function getRTROIObservationsSequence(toolData, index) {
  return {
    ObservationNumber: index + 1,
    ReferencedROINumber: index + 1,
    RTROIInterpretedType: "Todo: type",
    ROIInterpreter: "Todo: interpreter"
  };
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/utilities/getRTSeriesModule.js
function getRTSeriesModule(DicomMetaDictionary) {
  return {
    SeriesInstanceUID: DicomMetaDictionary.uid(),
    // generate a new series instance uid
    SeriesNumber: "99" // Todo:: what should be the series number?
  };
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/utilities/getStructureSetModule.js
function getStructureSetModule(contour, index) {
  var FrameOfReferenceUID = contour.metadata.FrameOfReferenceUID;
  return {
    ROINumber: index + 1,
    ROIName: contour.name || "Todo: name ".concat(index + 1),
    ROIDescription: "Todo: description ".concat(index + 1),
    ROIGenerationAlgorithm: "Todo: algorithm",
    ReferencedFrameOfReferenceUID: FrameOfReferenceUID
  };
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/RTSS.js










var _utilities$contours = dist_esm.utilities.contours,
  generateContourSetsFromLabelmap = _utilities$contours.generateContourSetsFromLabelmap,
  AnnotationToPointData = _utilities$contours.AnnotationToPointData;
var RTSS_DicomMetaDictionary = dcmjs_es/* default.data */.Ay.data.DicomMetaDictionary;
function generateRTSSFromSegmentations(segmentations, metadataProvider, DicomMetadataStore) {
  var roiContours = [];
  var contourSets = generateContourSetsFromLabelmap({
    segmentations: segmentations
  });
  contourSets.forEach(function (contourSet, segIndex) {
    if (contourSet) {
      var contourSequence = [];
      contourSet.sliceContours.forEach(function (sliceContour) {
        var sopCommon = metadataProvider.get("sopCommonModule", sliceContour.referencedImageId);
        var ReferencedSOPClassUID = sopCommon.sopClassUID;
        var ReferencedSOPInstanceUID = sopCommon.sopInstanceUID;
        var ContourImageSequence = [{
          ReferencedSOPClassUID: ReferencedSOPClassUID,
          ReferencedSOPInstanceUID: ReferencedSOPInstanceUID
        }];
        var sliceContourPolyData = sliceContour.polyData;
        sliceContour.contours.forEach(function (contour, index) {
          var ContourGeometricType = contour.type;
          var NumberOfContourPoints = contour.contourPoints.length;
          var ContourData = [];
          contour.contourPoints.forEach(function (point) {
            var pointData = sliceContourPolyData.points[point];
            pointData[0] = +pointData[0].toFixed(2);
            pointData[1] = +pointData[1].toFixed(2);
            pointData[2] = +pointData[2].toFixed(2);
            ContourData.push(pointData[0]);
            ContourData.push(pointData[1]);
            ContourData.push(pointData[2]);
          });
          contourSequence.push({
            ContourImageSequence: ContourImageSequence,
            ContourGeometricType: ContourGeometricType,
            NumberOfContourPoints: NumberOfContourPoints,
            ContourNumber: index + 1,
            ContourData: ContourData
          });
        });
      });
      var segLabel = contourSet.label || "Segment ".concat(segIndex + 1);
      var ROIContour = {
        name: segLabel,
        description: segLabel,
        contourSequence: contourSequence,
        color: contourSet.color,
        metadata: contourSet.metadata
      };
      roiContours.push(ROIContour);
    }
  });
  var rtMetadata = {
    name: segmentations.label,
    label: segmentations.label
  };
  var dataset = _initializeDataset(rtMetadata, roiContours[0].metadata, metadataProvider);
  roiContours.forEach(function (contour, index) {
    var roiContour = {
      ROIDisplayColor: contour.color || [255, 0, 0],
      ContourSequence: contour.contourSequence,
      ReferencedROINumber: index + 1
    };
    dataset.StructureSetROISequence.push(getStructureSetModule(contour, index));
    dataset.ROIContourSequence.push(roiContour);
    dataset.ReferencedSeriesSequence = getReferencedSeriesSequence(contour.metadata, index, metadataProvider, DicomMetadataStore);
    dataset.ReferencedFrameOfReferenceSequence = getReferencedFrameOfReferenceSequence(contour.metadata, metadataProvider, dataset);
  });
  var fileMetaInformationVersionArray = new Uint8Array(2);
  fileMetaInformationVersionArray[1] = 1;
  var _meta = {
    FileMetaInformationVersion: {
      Value: [fileMetaInformationVersionArray.buffer],
      vr: "OB"
    },
    TransferSyntaxUID: {
      Value: ["1.2.840.10008.1.2.1"],
      vr: "UI"
    },
    ImplementationClassUID: {
      Value: [RTSS_DicomMetaDictionary.uid()],
      vr: "UI"
    },
    ImplementationVersionName: {
      Value: ["dcmjs"],
      vr: "SH"
    }
  };
  dataset._meta = _meta;
  dataset.SpecificCharacterSet = "ISO_IR 192";
  return dataset;
}
function generateRTSSFromAnnotations(annotations, metadataProvider, DicomMetadataStore) {
  var rtMetadata = {
    name: "RTSS from Annotations",
    label: "RTSS from Annotations"
  };
  var dataset = _initializeDataset(rtMetadata, annotations[0].metadata, metadataProvider);
  annotations.forEach(function (annotation, index) {
    var ContourSequence = AnnotationToPointData.convert(annotation, index, metadataProvider);
    dataset.StructureSetROISequence.push(getStructureSetModule(annotation, index));
    dataset.ROIContourSequence.push(ContourSequence);
    dataset.RTROIObservationsSequence.push(getRTROIObservationsSequence(annotation, index));
    dataset.ReferencedSeriesSequence = getReferencedSeriesSequence(annotation.metadata, index, metadataProvider, DicomMetadataStore);
    dataset.ReferencedFrameOfReferenceSequence = getReferencedFrameOfReferenceSequence(annotation.metadata, metadataProvider, dataset);
  });
  var fileMetaInformationVersionArray = new Uint8Array(2);
  fileMetaInformationVersionArray[1] = 1;
  var _meta = {
    FileMetaInformationVersion: {
      Value: [fileMetaInformationVersionArray.buffer],
      vr: "OB"
    },
    TransferSyntaxUID: {
      Value: ["1.2.840.10008.1.2.1"],
      vr: "UI"
    },
    ImplementationClassUID: {
      Value: [RTSS_DicomMetaDictionary.uid()],
      vr: "UI"
    },
    ImplementationVersionName: {
      Value: ["dcmjs"],
      vr: "SH"
    }
  };
  dataset._meta = _meta;
  dataset.SpecificCharacterSet = "ISO_IR 192";
  return dataset;
}
function _initializeDataset(rtMetadata, imgMetadata, metadataProvider) {
  var rtSOPInstanceUID = RTSS_DicomMetaDictionary.uid();
  var imageId = imgMetadata.referencedImageId,
    FrameOfReferenceUID = imgMetadata.FrameOfReferenceUID;
  var _metadataProvider$get = metadataProvider.get("generalSeriesModule", imageId),
    studyInstanceUID = _metadataProvider$get.studyInstanceUID;
  var patientModule = getPatientModule(imageId, metadataProvider);
  var rtSeriesModule = getRTSeriesModule(RTSS_DicomMetaDictionary);
  return _objectSpread2(_objectSpread2(_objectSpread2({
    StructureSetROISequence: [],
    ROIContourSequence: [],
    RTROIObservationsSequence: [],
    ReferencedSeriesSequence: [],
    ReferencedFrameOfReferenceSequence: []
  }, patientModule), rtSeriesModule), {}, {
    StudyInstanceUID: studyInstanceUID,
    SOPClassUID: "1.2.840.10008.5.1.4.1.1.481.3",
    SOPInstanceUID: rtSOPInstanceUID,
    Manufacturer: "dcmjs",
    Modality: "RTSTRUCT",
    FrameOfReferenceUID: FrameOfReferenceUID,
    PositionReferenceIndicator: "",
    StructureSetLabel: rtMetadata.label || "",
    StructureSetName: rtMetadata.name || "",
    ReferringPhysicianName: "",
    OperatorsName: "",
    StructureSetDate: RTSS_DicomMetaDictionary.date(),
    StructureSetTime: RTSS_DicomMetaDictionary.time(),
    _meta: null
  });
}



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/RTStruct/index.js



var RTStruct_generateContourSetsFromLabelmap = dist_esm.utilities.contours.generateContourSetsFromLabelmap;



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/Cornerstone3D/index.js


















var Cornerstone3DSR = {
  Bidirectional: Bidirectional_Bidirectional,
  CobbAngle: CobbAngle_CobbAngle,
  Angle: Angle_Angle,
  Length: Length_Length,
  CircleROI: CircleROI,
  EllipticalROI: EllipticalROI,
  RectangleROI: RectangleROI,
  ArrowAnnotate: ArrowAnnotate_ArrowAnnotate,
  Probe: Probe,
  PlanarFreehandROI: PlanarFreehandROI,
  UltrasoundDirectional: UltrasoundDirectional,
  MeasurementReport: MeasurementReport_MeasurementReport,
  CodeScheme: CodingScheme,
  CORNERSTONE_3D_TAG: CORNERSTONE_3D_TAG
};
var Cornerstone3DSEG = {
  Segmentation: Cornerstone3D_Segmentation_namespaceObject
};
var Cornerstone3DPMAP = {
  ParametricMap: Cornerstone3D_ParametricMap_namespaceObject
};
var Cornerstone3DRT = {
  RTSS: RTStruct_namespaceObject
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/VTKjs/Segmentation.js



var Colors = dcmjs_es/* data */.p.Colors,
  Segmentation_BitArray = dcmjs_es/* data */.p.BitArray;

// TODO: Is there a better name for this? RGBAInt?
// Should we move it to Colors.js
function dicomlab2RGBA(cielab) {
  var rgba = Colors.dicomlab2RGB(cielab).map(function (x) {
    return Math.round(x * 255);
  });
  rgba.push(255);
  return rgba;
}

// TODO: Copied these functions in from VTK Math so we don't need a dependency.
// I guess we should put them somewhere
// https://github.com/Kitware/vtk-js/blob/master/Sources/Common/Core/Math/index.js
function cross(x, y, out) {
  var Zx = x[1] * y[2] - x[2] * y[1];
  var Zy = x[2] * y[0] - x[0] * y[2];
  var Zz = x[0] * y[1] - x[1] * y[0];
  out[0] = Zx;
  out[1] = Zy;
  out[2] = Zz;
}
function norm(x) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  switch (n) {
    case 1:
      return Math.abs(x);
    case 2:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
    case 3:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    default:
      {
        var sum = 0;
        for (var i = 0; i < n; i++) {
          sum += x[i] * x[i];
        }
        return Math.sqrt(sum);
      }
  }
}
function normalize(x) {
  var den = norm(x);
  if (den !== 0.0) {
    x[0] /= den;
    x[1] /= den;
    x[2] /= den;
  }
  return den;
}
function subtract(a, b, out) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
}

// TODO: This is a useful utility on its own. We should move it somewhere?
// dcmjs.adapters.vtk.Multiframe? dcmjs.utils?
function geometryFromFunctionalGroups(dataset, PerFrameFunctionalGroups) {
  var geometry = {};
  var pixelMeasures = dataset.SharedFunctionalGroupsSequence.PixelMeasuresSequence;
  var planeOrientation = dataset.SharedFunctionalGroupsSequence.PlaneOrientationSequence;

  // Find the origin of the volume from the PerFrameFunctionalGroups' ImagePositionPatient values
  //
  // TODO: assumes sorted frames. This should read the ImagePositionPatient from each frame and
  // sort them to obtain the first and last position along the acquisition axis.
  var firstFunctionalGroup = PerFrameFunctionalGroups[0];
  var lastFunctionalGroup = PerFrameFunctionalGroups[PerFrameFunctionalGroups.length - 1];
  var firstPosition = firstFunctionalGroup.PlanePositionSequence.ImagePositionPatient.map(Number);
  var lastPosition = lastFunctionalGroup.PlanePositionSequence.ImagePositionPatient.map(Number);
  geometry.origin = firstPosition;

  // NB: DICOM PixelSpacing is defined as Row then Column,
  // unlike ImageOrientationPatient
  geometry.spacing = [pixelMeasures.PixelSpacing[1], pixelMeasures.PixelSpacing[0], pixelMeasures.SpacingBetweenSlices].map(Number);
  geometry.dimensions = [dataset.Columns, dataset.Rows, PerFrameFunctionalGroups.length].map(Number);
  var orientation = planeOrientation.ImageOrientationPatient.map(Number);
  var columnStepToPatient = orientation.slice(0, 3);
  var rowStepToPatient = orientation.slice(3, 6);
  geometry.planeNormal = [];
  cross(columnStepToPatient, rowStepToPatient, geometry.planeNormal);
  geometry.sliceStep = [];
  subtract(lastPosition, firstPosition, geometry.sliceStep);
  normalize(geometry.sliceStep);
  geometry.direction = columnStepToPatient.concat(rowStepToPatient).concat(geometry.sliceStep);
  return geometry;
}
var Segmentation_Segmentation = /*#__PURE__*/function () {
  function Segmentation() {
    _classCallCheck(this, Segmentation);
  }

  /**
   * Produces an array of Segments from an input DICOM Segmentation dataset
   *
   * Segments are returned with Geometry values that can be used to create
   * VTK Image Data objects.
   *
   * @example Example usage to create VTK Volume actors from each segment:
   *
   * const actors = [];
   * const segments = generateToolState(dataset);
   * segments.forEach(segment => {
   *   // now make actors using the segment information
   *   const scalarArray = vtk.Common.Core.vtkDataArray.newInstance({
   *        name: "Scalars",
   *        numberOfComponents: 1,
   *        values: segment.pixelData,
   *    });
   *
   *    const imageData = vtk.Common.DataModel.vtkImageData.newInstance();
   *    imageData.getPointData().setScalars(scalarArray);
   *    imageData.setDimensions(geometry.dimensions);
   *    imageData.setSpacing(geometry.spacing);
   *    imageData.setOrigin(geometry.origin);
   *    imageData.setDirection(geometry.direction);
   *
   *    const mapper = vtk.Rendering.Core.vtkVolumeMapper.newInstance();
   *    mapper.setInputData(imageData);
   *    mapper.setSampleDistance(2.);
   *
   *    const actor = vtk.Rendering.Core.vtkVolume.newInstance();
   *    actor.setMapper(mapper);
   *
   *    actors.push(actor);
   * });
   *
   * @param dataset
   * @return {{}}
   */
  return _createClass(Segmentation, null, [{
    key: "generateSegments",
    value: function generateSegments(dataset) {
      if (dataset.SegmentSequence.constructor.name !== "Array") {
        dataset.SegmentSequence = [dataset.SegmentSequence];
      }
      dataset.SegmentSequence.forEach(function (segment) {
        // TODO: other interesting fields could be extracted from the segment
        // TODO: Read SegmentsOverlay field
        // http://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.8.20.2.html

        // TODO: Looks like vtkColor only wants RGB in 0-1 values.
        // Why was this example converting to RGBA with 0-255 values?
        var color = dicomlab2RGBA(segment.RecommendedDisplayCIELabValue);
        segments[segment.SegmentNumber] = {
          color: color,
          functionalGroups: [],
          offset: null,
          size: null,
          pixelData: null
        };
      });

      // make a list of functional groups per segment
      dataset.PerFrameFunctionalGroupsSequence.forEach(function (functionalGroup) {
        var segmentNumber = functionalGroup.SegmentIdentificationSequence.ReferencedSegmentNumber;
        segments[segmentNumber].functionalGroups.push(functionalGroup);
      });

      // determine per-segment index into the pixel data
      // TODO: only handles one-bit-per pixel
      var frameSize = Math.ceil(dataset.Rows * dataset.Columns / 8);
      var nextOffset = 0;
      Object.keys(segments).forEach(function (segmentNumber) {
        var segment = segments[segmentNumber];
        segment.numberOfFrames = segment.functionalGroups.length;
        segment.size = segment.numberOfFrames * frameSize;
        segment.offset = nextOffset;
        nextOffset = segment.offset + segment.size;
        var packedSegment = dataset.PixelData.slice(segment.offset, nextOffset);
        segment.pixelData = Segmentation_BitArray.unpack(packedSegment);
        var geometry = geometryFromFunctionalGroups(dataset, segment.functionalGroups);
        segment.geometry = geometry;
      });
      return segments;
    }
  }]);
}();



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/VTKjs/index.js


var VTKjsSEG = {
  Segmentation: Segmentation_Segmentation
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/index.js






var adaptersSR = {
  Cornerstone: CornerstoneSR,
  Cornerstone3D: Cornerstone3DSR
};
var adaptersSEG = {
  Cornerstone: CornerstoneSEG,
  Cornerstone3D: Cornerstone3DSEG,
  VTKjs: VTKjsSEG
};
var adaptersPMAP = {
  Cornerstone: CornerstonePMAP,
  Cornerstone3D: Cornerstone3DPMAP
};
var adaptersRT = {
  Cornerstone3D: Cornerstone3DRT
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/enums/index.js


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/graphicTypeEquals.js
var graphicTypeEquals = function graphicTypeEquals(graphicType) {
  return function (contentItem) {
    return contentItem && contentItem.GraphicType === graphicType;
  };
};



;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/adapters/helpers/index.js





;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js







/***/ }),

/***/ 26337:
/***/ ((module) => {

"use strict";


function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota

/***/ }),

/***/ 11604:
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ 3293:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var iota = __webpack_require__(26337)
var isBuffer = __webpack_require__(11604)

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")

  if(dimension === -1) {
    //Special case for trivial arrays
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]

  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+")
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",")
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",")
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)

  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }

  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }

  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }

  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}")

  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")

  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")

  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(isBuffer(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
      case "[object BigInt64Array]":
        return "bigint64"
      case "[object BigUint64Array]":
        return "biguint64"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "bigint64": [],
  "biguint64": [],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor


/***/ })

}]);