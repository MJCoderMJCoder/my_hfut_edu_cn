/*
 * Compressed by JSA(www.xidea.org)
 */
var Prototype = {
  Version: "1.5.0",
  BrowserFeatures: {XPath: !!document.evaluate},
  ScriptFragment: "(?:<script.*?>)((\n|\r|.)*?)(?:</script>)",
  emptyFunction: function () {
  },
  K: function ($) {
    return $
  }
}, Class = {
  create: function () {
    return function () {
      this.initialize.apply(this, arguments)
    }
  }
}, Abstract = new Object();
Object.extend = function ($, A) {
  for (var _ in A) $[_] = A[_];
  return $
};
Object.extend(Object, {
  inspect: function ($) {
    try {
      if ($ === undefined) return "undefined";
      if ($ === null) return "null";
      return $.inspect ? $.inspect() : $.toString()
    } catch (_) {
      if (_ instanceof RangeError) return "...";
      throw _
    }
  }, keys: function (_) {
    var $ = [];
    for (var A in _) $.push(A);
    return $
  }, values: function ($) {
    var A = [];
    for (var _ in $) A.push($[_]);
    return A
  }, clone: function ($) {
    return Object.extend({}, $)
  }
});
Function.prototype.bind = function () {
  var _ = this, A = $A(arguments), $ = A.shift();
  return function () {
    return _.apply($, A.concat($A(arguments)))
  }
};
Function.prototype.bindAsEventListener = function ($) {
  var _ = this, A = $A(arguments), $ = A.shift();
  return function (B) {
    return _.apply($, [(B || window.event)].concat(A).concat($A(arguments)))
  }
};
Object.extend(Number.prototype, {
  toColorPart: function () {
    var $ = this.toString(16);
    if (this < 16) return "0" + $;
    return $
  }, succ: function () {
    return this + 1
  }, times: function ($) {
    $R(0, this, true).each($);
    return this
  }
});
var Try = {
  these: function () {
    var B;
    for (var $ = 0, A = arguments.length; $ < A; $++) {
      var _ = arguments[$];
      try {
        B = _();
        break
      } catch (C) {
      }
    }
    return B
  }
}, PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
  initialize: function ($, _) {
    this.callback = $;
    this.frequency = _;
    this.currentlyExecuting = false;
    this.registerCallback()
  }, registerCallback: function () {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000)
  }, stop: function () {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null
  }, onTimerEvent: function () {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.callback(this)
      } finally {
        this.currentlyExecuting = false
      }
    }
  }
};
String.interpret = function ($) {
  return $ == null ? "" : String($)
};
Object.extend(String.prototype, {
  gsub: function (B, A) {
    var _ = "", C = this, $;
    A = arguments.callee.prepareReplacement(A);
    while (C.length > 0) if ($ = C.match(B)) {
      _ += C.slice(0, $.index);
      _ += String.interpret(A($));
      C = C.slice($.index + $[0].length)
    } else _ += C, C = "";
    return _
  }, sub: function (_, $, A) {
    $ = this.gsub.prepareReplacement($);
    A = A === undefined ? 1 : A;
    return this.gsub(_, function (_) {
      if (--A < 0) return _[0];
      return $(_)
    })
  }, scan: function (_, $) {
    this.gsub(_, $);
    return this
  }, truncate: function (_, $) {
    _ = _ || 30;
    $ = $ === undefined ? "..." : $;
    return this.length > _ ? this.slice(0, _ - $.length) + $ : this
  }, strip: function () {
    return this.replace(/^\s+/, "").replace(/\s+$/, "")
  }, stripTags: function () {
    return this.replace(/<\/?[^>]+>/gi, "")
  }, stripScripts: function () {
    return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
  }, extractScripts: function () {
    var _ = new RegExp(Prototype.ScriptFragment, "img"), $ = new RegExp(Prototype.ScriptFragment, "im");
    return (this.match(_) || []).map(function (_) {
      return (_.match($) || ["", ""])[1]
    })
  }, evalScripts: function () {
    return this.extractScripts().map(function (script) {
      return eval(script)
    })
  }, escapeHTML: function () {
    var _ = document.createElement("div"), $ = document.createTextNode(this);
    _.appendChild($);
    return _.innerHTML
  }, unescapeHTML: function () {
    var $ = document.createElement("div");
    $.innerHTML = this.stripTags();
    return $.childNodes[0] ? ($.childNodes.length > 1 ? $A($.childNodes).inject("", function ($, _) {
      return $ + _.nodeValue
    }) : $.childNodes[0].nodeValue) : ""
  }, toQueryParams: function (_) {
    var $ = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!$) return {};
    return $[1].split(_ || "&").inject({}, function (B, _) {
      if ((_ = _.split("="))[0]) {
        var A = decodeURIComponent(_[0]), $ = _[1] ? decodeURIComponent(_[1]) : undefined;
        if (B[A] !== undefined) {
          if (B[A].constructor != Array) B[A] = [B[A]];
          if ($) B[A].push($)
        } else B[A] = $
      }
      return B
    })
  }, toArray: function () {
    return this.split("")
  }, succ: function () {
    return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
  }, camelize: function () {
    var _ = this.split("-"), $ = _.length;
    if ($ == 1) return _[0];
    var B = this.charAt(0) == "-" ? _[0].charAt(0).toUpperCase() + _[0].substring(1) : _[0];
    for (var A = 1; A < $; A++) B += _[A].charAt(0).toUpperCase() + _[A].substring(1);
    return B
  }, capitalize: function () {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
  }, underscore: function () {
    return this.gsub(/::/, "/").gsub(/([A-Z]+)([A-Z][a-z])/, "#{1}_#{2}").gsub(/([a-z\d])([A-Z])/, "#{1}_#{2}").gsub(/-/, "_").toLowerCase()
  }, dasherize: function () {
    return this.gsub(/_/, "-")
  }, inspect: function (_) {
    var $ = this.replace(/\\/g, "\\\\");
    if (_) return "\"" + $.replace(/"/g, "\\\"") + "\""; else return "'" + $.replace(/'/g, "\\'") + "'"
  }
});
String.prototype.gsub.prepareReplacement = function (_) {
  if (typeof _ == "function") return _;
  var $ = new Template(_);
  return function (_) {
    return $.evaluate(_)
  }
};
String.prototype.parseQuery = String.prototype.toQueryParams;
var Template = Class.create();
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype = {
  initialize: function ($, _) {
    this.template = $.toString();
    this.pattern = _ || Template.Pattern
  }, evaluate: function ($) {
    return this.template.gsub(this.pattern, function (_) {
      var A = _[1];
      if (A == "\\") return _[2];
      return A + String.interpret($[_[3]])
    })
  }
};
var $break = new Object(), $continue = new Object(), Enumerable = {
  each: function (_) {
    var $ = 0;
    try {
      this._each(function (A) {
        try {
          _(A, $++)
        } catch (B) {
          if (B != $continue) throw B
        }
      })
    } catch (A) {
      if (A != $break) throw A
    }
    return this
  }, eachSlice: function (C, _) {
    var $ = -C, A = [], B = this.toArray();
    while (($ += C) < B.length) A.push(B.slice($, $ + C));
    return A.map(_)
  }, all: function ($) {
    var _ = true;
    this.each(function (B, A) {
      _ = _ && !!($ || Prototype.K)(B, A);
      if (!_) throw $break
    });
    return _
  }, any: function ($) {
    var _ = false;
    this.each(function (B, A) {
      if (_ = !!($ || Prototype.K)(B, A)) throw $break
    });
    return _
  }, collect: function ($) {
    var _ = [];
    this.each(function (B, A) {
      _.push(($ || Prototype.K)(B, A))
    });
    return _
  }, detect: function ($) {
    var _;
    this.each(function (B, A) {
      if ($(B, A)) {
        _ = B;
        throw $break
      }
    });
    return _
  }, findAll: function ($) {
    var _ = [];
    this.each(function (B, A) {
      if ($(B, A)) _.push(B)
    });
    return _
  }, grep: function (_, $) {
    var A = [];
    this.each(function (C, B) {
      var D = C.toString();
      if (D.match(_)) A.push(($ || Prototype.K)(C, B))
    });
    return A
  }, include: function ($) {
    var _ = false;
    this.each(function (A) {
      if (A == $) {
        _ = true;
        throw $break
      }
    });
    return _
  }, inGroupsOf: function (_, $) {
    $ = $ === undefined ? null : $;
    return this.eachSlice(_, function (A) {
      while (A.length < _) A.push($);
      return A
    })
  }, inject: function (_, $) {
    this.each(function (B, A) {
      _ = $(_, B, A)
    });
    return _
  }, invoke: function (_) {
    var $ = $A(arguments).slice(1);
    return this.map(function (A) {
      return A[_].apply(A, $)
    })
  }, max: function ($) {
    var _;
    this.each(function (B, A) {
      B = ($ || Prototype.K)(B, A);
      if (_ == undefined || B >= _) _ = B
    });
    return _
  }, min: function ($) {
    var _;
    this.each(function (B, A) {
      B = ($ || Prototype.K)(B, A);
      if (_ == undefined || B < _) _ = B
    });
    return _
  }, partition: function (_) {
    var A = [], $ = [];
    this.each(function (C, B) {
      ((_ || Prototype.K)(C, B) ? A : $).push(C)
    });
    return [A, $]
  }, pluck: function ($) {
    var _ = [];
    this.each(function (B, A) {
      _.push(B[$])
    });
    return _
  }, reject: function ($) {
    var _ = [];
    this.each(function (B, A) {
      if (!$(B, A)) _.push(B)
    });
    return _
  }, sortBy: function ($) {
    return this.map(function (A, _) {
      return {value: A, criteria: $(A, _)}
    }).sort(function (A, $) {
      var _ = A.criteria, B = $.criteria;
      return _ < B ? -1 : _ > B ? 1 : 0
    }).pluck("value")
  }, toArray: function () {
    return this.map()
  }, zip: function () {
    var $ = Prototype.K, A = $A(arguments);
    if (typeof A.last() == "function") $ = A.pop();
    var _ = [this].concat(A).map($A);
    return this.map(function (B, A) {
      return $(_.pluck(A))
    })
  }, size: function () {
    return this.toArray().length
  }, inspect: function () {
    return "#<Enumerable:" + this.toArray().inspect() + ">"
  }
};
Object.extend(Enumerable, {
  map: Enumerable.collect,
  find: Enumerable.detect,
  select: Enumerable.findAll,
  member: Enumerable.include,
  entries: Enumerable.toArray
});
var $A = Array.from = function ($) {
  if (!$) return [];
  if ($.toArray) return $.toArray(); else {
    var B = [];
    for (var _ = 0, A = $.length; _ < A; _++) B.push($[_]);
    return B
  }
};
Object.extend(Array.prototype, Enumerable);
if (!Array.prototype._reverse) Array.prototype._reverse = Array.prototype.reverse;
Object.extend(Array.prototype, {
  _each: function (_) {
    for (var $ = 0, A = this.length; $ < A; $++) _(this[$])
  }, clear: function () {
    this.length = 0;
    return this
  }, first: function () {
    return this[0]
  }, last: function () {
    return this[this.length - 1]
  }, compact: function () {
    return this.select(function ($) {
      return $ != null
    })
  }, flatten: function () {
    return this.inject([], function (_, $) {
      return _.concat($ && $.constructor == Array ? $.flatten() : [$])
    })
  }, without: function () {
    var $ = $A(arguments);
    return this.select(function (_) {
      return !$.include(_)
    })
  }, indexOf: function (_) {
    for (var $ = 0, A = this.length; $ < A; $++) if (this[$] == _) return $;
    return -1
  }, reverse: function ($) {
    return ($ !== false ? this : this.toArray())._reverse()
  }, reduce: function () {
    return this.length > 1 ? this : this[0]
  }, uniq: function () {
    return this.inject([], function (_, $) {
      return _.include($) ? _ : _.concat([$])
    })
  }, clone: function () {
    return [].concat(this)
  }, size: function () {
    return this.length
  }, inspect: function () {
    return "[" + this.map(Object.inspect).join(", ") + "]"
  }
});
Array.prototype.toArray = Array.prototype.clone;

function $w($) {
  $ = $.strip();
  return $ ? $.split(/\s+/) : []
}

if (window.opera) Array.prototype.concat = function () {
  var C = [];
  for (var $ = 0, A = this.length; $ < A; $++) C.push(this[$]);
  for ($ = 0, A = arguments.length; $ < A; $++) if (arguments[$].constructor == Array) {
    for (var B = 0, _ = arguments[$].length; B < _; B++) C.push(arguments[$][B])
  } else C.push(arguments[$]);
  return C
};
var Hash = function ($) {
  Object.extend(this, $ || {})
};
Object.extend(Hash, {
  toQueryString: function (_) {
    var $ = [];
    this.prototype._each.call(_, function (_) {
      if (!_.key) return;
      if (_.value && _.value.constructor == Array) {
        var A = _.value.compact();
        if (A.length < 2) _.value = A.reduce(); else {
          key = encodeURIComponent(_.key);
          A.each(function (_) {
            _ = _ != undefined ? encodeURIComponent(_) : "";
            $.push(key + "=" + encodeURIComponent(_))
          });
          return
        }
      }
      if (_.value == undefined) _[1] = "";
      $.push(_.map(encodeURIComponent).join("="))
    });
    return $.join("&")
  }
});
Object.extend(Hash.prototype, Enumerable);
Object.extend(Hash.prototype, {
  _each: function (A) {
    for (var $ in this) {
      var _ = this[$];
      if (_ && _ == Hash.prototype[$]) continue;
      var B = [$, _];
      B.key = $;
      B.value = _;
      A(B)
    }
  }, keys: function () {
    return this.pluck("key")
  }, values: function () {
    return this.pluck("value")
  }, merge: function ($) {
    return $H($).inject(this, function ($, _) {
      $[_.key] = _.value;
      return $
    })
  }, remove: function () {
    var B;
    for (var $ = 0, A = arguments.length; $ < A; $++) {
      var _ = this[arguments[$]];
      if (_ !== undefined) if (B === undefined) B = _; else {
        if (B.constructor != Array) B = [B];
        B.push(_)
      }
      delete this[arguments[$]]
    }
    return B
  }, toQueryString: function () {
    return Hash.toQueryString(this)
  }, inspect: function () {
    return "#<Hash:{" + this.map(function ($) {
      return $.map(Object.inspect).join(": ")
    }).join(", ") + "}>"
  }
});

function $H($) {
  if ($ && $.constructor == Hash) return $;
  return new Hash($)
}

ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
  initialize: function ($, _, A) {
    this.start = $;
    this.end = _;
    this.exclusive = A
  }, _each: function (_) {
    var $ = this.start;
    while (this.include($)) {
      _($);
      $ = $.succ()
    }
  }, include: function ($) {
    if ($ < this.start) return false;
    if (this.exclusive) return $ < this.end;
    return $ <= this.end
  }
});
var $R = function ($, _, A) {
  return new ObjectRange($, _, A)
}, Ajax = {
  getTransport: function () {
    return Try.these(function () {
      return new XMLHttpRequest()
    }, function () {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }, function () {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }) || false
  }, activeRequestCount: 0
};
Ajax.Responders = {
  responders: [], _each: function ($) {
    this.responders._each($)
  }, register: function ($) {
    if (!this.include($)) this.responders.push($)
  }, unregister: function ($) {
    this.responders = this.responders.without($)
  }, dispatch: function ($, A, B, _) {
    this.each(function (C) {
      if (typeof C[$] == "function") {
        try {
          C[$].apply(C, [A, B, _])
        } catch (D) {
        }
      }
    })
  }
};
Object.extend(Ajax.Responders, Enumerable);
Ajax.Responders.register({
  onCreate: function () {
    Ajax.activeRequestCount++
  }, onComplete: function () {
    Ajax.activeRequestCount--
  }
});
Ajax.Base = function () {
};
Ajax.Base.prototype = {
  setOptions: function ($) {
    this.options = {
      method: "post",
      asynchronous: true,
      contentType: "application/x-www-form-urlencoded",
      encoding: "UTF-8",
      parameters: ""
    };
    Object.extend(this.options, $ || {});
    this.options.method = this.options.method.toLowerCase();
    if (typeof this.options.parameters == "string") this.options.parameters = this.options.parameters.toQueryParams()
  }
};
Ajax.Request = Class.create();
Ajax.Request.Events = ["Uninitialized", "Loading", "Loaded", "Interactive", "Complete"];
Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  _complete: false, initialize: function ($, _) {
    this.transport = Ajax.getTransport();
    this.setOptions(_);
    this.request($)
  }, request: function (_) {
    this.url = _;
    this.method = this.options.method;
    var $ = this.options.parameters;
    if (!["get", "post"].include(this.method)) {
      $["_method"] = this.method;
      this.method = "post"
    }
    $ = Hash.toQueryString($);
    if ($ && /Konqueror|Safari|KHTML/.test(navigator.userAgent)) $ += "&_=";
    if (this.method == "get" && $) this.url += (this.url.indexOf("?") > -1 ? "&" : "?") + $;
    try {
      Ajax.Responders.dispatch("onCreate", this, this.transport);
      this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous);
      if (this.options.asynchronous) setTimeout(function () {
        this.respondToReadyState(1)
      }.bind(this), 10);
      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();
      var A = this.method == "post" ? (this.options.postBody || $) : null;
      this.transport.send(A);
      if (!this.options.asynchronous && this.transport.overrideMimeType) this.onStateChange()
    } catch (B) {
      this.dispatchException(B)
    }
  }, onStateChange: function () {
    var $ = this.transport.readyState;
    if ($ > 1 && !(($ == 4) && this._complete)) this.respondToReadyState(this.transport.readyState)
  }, setRequestHeaders: function () {
    var _ = {
      "X-Requested-With": "XMLHttpRequest",
      "X-Prototype-Version": Prototype.Version,
      "Accept": "text/javascript, text/html, application/xml, text/xml, */*"
    };
    if (this.method == "post") {
      _["Content-type"] = this.options.contentType + (this.options.encoding ? "; charset=" + this.options.encoding : "");
      if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005) _["Connection"] = "close"
    }
    if (typeof this.options.requestHeaders == "object") {
      var B = this.options.requestHeaders;
      if (typeof B.push == "function") {
        for (var $ = 0, A = B.length; $ < A; $ += 2) _[B[$]] = B[$ + 1]
      } else $H(B).each(function ($) {
        _[$.key] = $.value
      })
    }
    for (var C in _) this.transport.setRequestHeader(C, _[C])
  }, success: function () {
    return !this.transport.status || (this.transport.status >= 200 && this.transport.status < 300)
  }, respondToReadyState: function ($) {
    var A = Ajax.Request.Events[$], B = this.transport, _ = this.evalJSON();
    if (A == "Complete") {
      try {
        this._complete = true;
        (this.options["on" + this.transport.status] || this.options["on" + (this.success() ? "Success" : "Failure")] || Prototype.emptyFunction)(B, _)
      } catch (C) {
        this.dispatchException(C)
      }
      if ((this.getHeader("Content-type") || "text/javascript").strip().match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i)) this.evalResponse()
    }
    try {
      (this.options["on" + A] || Prototype.emptyFunction)(B, _);
      Ajax.Responders.dispatch("on" + A, this, B, _)
    } catch (C) {
      this.dispatchException(C)
    }
    if (A == "Complete") this.transport.onreadystatechange = Prototype.emptyFunction
  }, getHeader: function ($) {
    try {
      return this.transport.getResponseHeader($)
    } catch (_) {
      return null
    }
  }, evalJSON: function () {
    try {
      var json = this.getHeader("X-JSON");
      return json ? eval("(" + json + ")") : null
    } catch (e) {
      return null
    }
  }, evalResponse: function () {
    try {
      return eval(this.transport.responseText)
    } catch (e) {
      this.dispatchException(e)
    }
  }, dispatchException: function ($) {
    (this.options.onException || Prototype.emptyFunction)(this, $);
    Ajax.Responders.dispatch("onException", this, $)
  }
});
Ajax.Updater = Class.create();
Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function (_, A, B) {
    this.container = {success: (_.success || _), failure: (_.failure || (_.success ? null : _))};
    this.transport = Ajax.getTransport();
    this.setOptions(B);
    var $ = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function (A, _) {
      this.updateContent();
      $(A, _)
    }).bind(this);
    this.request(A)
  }, updateContent: function () {
    var _ = this.container[this.success() ? "success" : "failure"], A = this.transport.responseText;
    if (!this.options.evalScripts) A = A.stripScripts();
    if (_ = $(_)) if (this.options.insertion) new this.options.insertion(_, A); else _.update(A);
    if (this.success()) if (this.onComplete) setTimeout(this.onComplete.bind(this), 10)
  }
});
Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function ($, _, A) {
    this.setOptions(A);
    this.onComplete = this.options.onComplete;
    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);
    this.updater = {};
    this.container = $;
    this.url = _;
    this.start()
  }, start: function () {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent()
  }, stop: function () {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments)
  }, updateComplete: function ($) {
    if (this.options.decay) {
      this.decay = ($.responseText == this.lastText ? this.decay * this.options.decay : 1);
      this.lastText = $.responseText
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this), this.decay * this.frequency * 1000)
  }, onTimerEvent: function () {
    this.updater = new Ajax.Updater(this.container, this.url, this.options)
  }
});

function $(_) {
  if (arguments.length > 1) {
    for (var A = 0, C = [], B = arguments.length; A < B; A++) C.push($(arguments[A]));
    return C
  }
  if (typeof _ == "string") _ = document.getElementById(_);
  return Element.extend(_)
}

if (Prototype.BrowserFeatures.XPath) document._getElementsByXPath = function (D, A) {
  var E = [], B = document.evaluate(D, $(A) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var _ = 0, C = B.snapshotLength; _ < C; _++) E.push(B.snapshotItem(_));
  return E
};
document.getElementsByClassName = function (D, B) {
  if (Prototype.BrowserFeatures.XPath) {
    var E = ".//*[contains(concat(' ', @class, ' '), ' " + D + " ')]";
    return document._getElementsByXPath(E, B)
  } else {
    var F = ($(B) || document.body).getElementsByTagName("*"), G = [], _;
    for (var A = 0, C = F.length; A < C; A++) {
      _ = F[A];
      if (Element.hasClassName(_, D)) G.push(Element.extend(_))
    }
    return G
  }
};
if (!window.Element) var Element = new Object();
Element.extend = function (_) {
  if (!_ || _nativeExtensions || _.nodeType == 3) return _;
  if (!_._extended && _.tagName && _ != window) {
    var C = Object.clone(Element.Methods), $ = Element.extend.cache;
    if (_.tagName == "FORM") Object.extend(C, Form.Methods);
    if (["INPUT", "TEXTAREA", "SELECT"].include(_.tagName)) Object.extend(C, Form.Element.Methods);
    Object.extend(C, Element.Methods.Simulated);
    for (var B in C) {
      var A = C[B];
      if (typeof A == "function" && !(B in _)) _[B] = $.findOrStore(A)
    }
  }
  _._extended = true;
  return _
};
Element.extend.cache = {
  findOrStore: function ($) {
    return this[$] = this[$] || function () {
      return $.apply(null, [this].concat($A(arguments)))
    }
  }
};
Element.Methods = {
  visible: function (_) {
    return $(_).style.display != "none"
  }, toggle: function (_) {
    _ = $(_);
    Element[Element.visible(_) ? "hide" : "show"](_);
    return _
  }, hide: function (_) {
    $(_).style.display = "none";
    return _
  }, show: function (_) {
    $(_).style.display = "";
    return _
  }, remove: function (_) {
    _ = $(_);
    _.parentNode.removeChild(_);
    return _
  }, update: function (_, A) {
    A = typeof A == "undefined" ? "" : A.toString();
    $(_).innerHTML = A.stripScripts();
    setTimeout(function () {
      A.evalScripts()
    }, 10);
    return _
  }, replace: function (_, A) {
    _ = $(_);
    A = typeof A == "undefined" ? "" : A.toString();
    if (_.outerHTML) _.outerHTML = A.stripScripts(); else {
      var B = _.ownerDocument.createRange();
      B.selectNodeContents(_);
      _.parentNode.replaceChild(B.createContextualFragment(A.stripScripts()), _)
    }
    setTimeout(function () {
      A.evalScripts()
    }, 10);
    return _
  }, inspect: function (_) {
    _ = $(_);
    var A = "<" + _.tagName.toLowerCase();
    $H({"id": "id", "className": "class"}).each(function (C) {
      var D = C.first(), B = C.last(), $ = (_[D] || "").toString();
      if ($) A += " " + B + "=" + $.inspect(true)
    });
    return A + ">"
  }, recursivelyCollect: function (_, A) {
    _ = $(_);
    var B = [];
    while (_ = _[A]) if (_.nodeType == 1) B.push(Element.extend(_));
    return B
  }, ancestors: function (_) {
    return $(_).recursivelyCollect("parentNode")
  }, descendants: function (_) {
    return $A($(_).getElementsByTagName("*"))
  }, immediateDescendants: function (_) {
    if (!(_ = $(_).firstChild)) return [];
    while (_ && _.nodeType != 1) _ = _.nextSibling;
    if (_) return [_].concat($(_).nextSiblings());
    return []
  }, previousSiblings: function (_) {
    return $(_).recursivelyCollect("previousSibling")
  }, nextSiblings: function (_) {
    return $(_).recursivelyCollect("nextSibling")
  }, siblings: function (_) {
    _ = $(_);
    return _.previousSiblings().reverse().concat(_.nextSiblings())
  }, match: function (_, A) {
    if (typeof A == "string") A = new Selector(A);
    return A.match($(_))
  }, up: function (A, B, _) {
    return Selector.findElement($(A).ancestors(), B, _)
  }, down: function (A, B, _) {
    return Selector.findElement($(A).descendants(), B, _)
  }, previous: function (A, B, _) {
    return Selector.findElement($(A).previousSiblings(), B, _)
  }, next: function (A, B, _) {
    return Selector.findElement($(A).nextSiblings(), B, _)
  }, getElementsBySelector: function () {
    var A = $A(arguments), _ = $(A.shift());
    return Selector.findChildElements(_, A)
  }, getElementsByClassName: function ($, _) {
    return document.getElementsByClassName(_, $)
  }, readAttribute: function (_, C) {
    _ = $(_);
    if (document.all && !window.opera) {
      var B = Element._attributeTranslations;
      if (B.values[C]) return B.values[C](_, C);
      if (B.names[C]) C = B.names[C];
      var A = _.attributes[C];
      if (A) return A.nodeValue
    }
    return _.getAttribute(C)
  }, getHeight: function (_) {
    return $(_).getDimensions().height
  }, getWidth: function (_) {
    return $(_).getDimensions().width
  }, classNames: function ($) {
    return new Element.ClassNames($)
  }, hasClassName: function (_, A) {
    if (!(_ = $(_))) return;
    var B = _.className;
    if (B.length == 0) return false;
    if (B == A || B.match(new RegExp("(^|\\s)" + A + "(\\s|$)"))) return true;
    return false
  }, addClassName: function (_, A) {
    if (!(_ = $(_))) return;
    Element.classNames(_).add(A);
    return _
  }, removeClassName: function (_, A) {
    if (!(_ = $(_))) return;
    Element.classNames(_).remove(A);
    return _
  }, toggleClassName: function (_, A) {
    if (!(_ = $(_))) return;
    Element.classNames(_)[_.hasClassName(A) ? "remove" : "add"](A);
    return _
  }, observe: function () {
    Event.observe.apply(Event, arguments);
    return $A(arguments).first()
  }, stopObserving: function () {
    Event.stopObserving.apply(Event, arguments);
    return $A(arguments).first()
  }, cleanWhitespace: function (_) {
    _ = $(_);
    var A = _.firstChild;
    while (A) {
      var B = A.nextSibling;
      if (A.nodeType == 3 && !/\S/.test(A.nodeValue)) _.removeChild(A);
      A = B
    }
    return _
  }, empty: function (_) {
    return $(_).innerHTML.match(/^\s*$/)
  }, descendantOf: function (_, A) {
    _ = $(_), A = $(A);
    while (_ = _.parentNode) if (_ == A) return true;
    return false
  }, scrollTo: function (_) {
    _ = $(_);
    var A = Position.cumulativeOffset(_);
    window.scrollTo(A[0], A[1]);
    return _
  }, getStyle: function (_, B) {
    _ = $(_);
    if (["float", "cssFloat"].include(B)) B = (typeof _.style.styleFloat != "undefined" ? "styleFloat" : "cssFloat");
    B = B.camelize();
    var A = _.style[B];
    if (!A) if (document.defaultView && document.defaultView.getComputedStyle) {
      var C = document.defaultView.getComputedStyle(_, null);
      A = C ? C[B] : null
    } else if (_.currentStyle) A = _.currentStyle[B];
    if ((A == "auto") && ["width", "height"].include(B) && (_.getStyle("display") != "none")) A = _["offset" + B.capitalize()] + "px";
    if (window.opera && ["left", "top", "right", "bottom"].include(B)) if (Element.getStyle(_, "position") == "static") A = "auto";
    if (B == "opacity") {
      if (A) return parseFloat(A);
      if (A = (_.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/)) if (A[1]) return parseFloat(A[1]) / 100;
      return 1
    }
    return A == "auto" ? null : A
  }, setStyle: function (_, B) {
    _ = $(_);
    for (var C in B) {
      var A = B[C];
      if (C == "opacity") {
        if (A == 1) {
          A = (/Gecko/.test(navigator.userAgent) && !/Konqueror|Safari|KHTML/.test(navigator.userAgent)) ? 0.999999 : 1;
          if (/MSIE/.test(navigator.userAgent) && !window.opera) _.style.filter = _.getStyle("filter").replace(/alpha\([^\)]*\)/gi, "")
        } else if (A == "") {
          if (/MSIE/.test(navigator.userAgent) && !window.opera) _.style.filter = _.getStyle("filter").replace(/alpha\([^\)]*\)/gi, "")
        } else {
          if (A < 0.00001) A = 0;
          if (/MSIE/.test(navigator.userAgent) && !window.opera) _.style.filter = _.getStyle("filter").replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + A * 100 + ")"
        }
      } else if (["float", "cssFloat"].include(C)) C = (typeof _.style.styleFloat != "undefined") ? "styleFloat" : "cssFloat";
      _.style[C.camelize()] = A
    }
    return _
  }, getDimensions: function (A) {
    A = $(A);
    var _ = $(A).getStyle("display");
    if (_ != "none" && _ != null) return {width: A.offsetWidth, height: A.offsetHeight};
    var F = A.style, G = F.visibility, E = F.position, D = F.display;
    F.visibility = "hidden";
    F.position = "absolute";
    F.display = "block";
    var C = A.clientWidth, B = A.clientHeight;
    F.display = D;
    F.position = E;
    F.visibility = G;
    return {width: C, height: B}
  }, makePositioned: function (_) {
    _ = $(_);
    var A = Element.getStyle(_, "position");
    if (A == "static" || !A) {
      _._madePositioned = true;
      _.style.position = "relative";
      if (window.opera) {
        _.style.top = 0;
        _.style.left = 0
      }
    }
    return _
  }, undoPositioned: function (_) {
    _ = $(_);
    if (_._madePositioned) {
      _._madePositioned = undefined;
      _.style.position = _.style.top = _.style.left = _.style.bottom = _.style.right = ""
    }
    return _
  }, makeClipping: function (_) {
    _ = $(_);
    if (_._overflow) return _;
    _._overflow = _.style.overflow || "auto";
    if ((Element.getStyle(_, "overflow") || "visible") != "hidden") _.style.overflow = "hidden";
    return _
  }, undoClipping: function (_) {
    _ = $(_);
    if (!_._overflow) return _;
    _.style.overflow = _._overflow == "auto" ? "" : _._overflow;
    _._overflow = null;
    return _
  }
};
Object.extend(Element.Methods, {childOf: Element.Methods.descendantOf});
Element._attributeTranslations = {};
Element._attributeTranslations.names = {
  colspan: "colSpan",
  rowspan: "rowSpan",
  valign: "vAlign",
  datetime: "dateTime",
  accesskey: "accessKey",
  tabindex: "tabIndex",
  enctype: "encType",
  maxlength: "maxLength",
  readonly: "readOnly",
  longdesc: "longDesc"
};
Element._attributeTranslations.values = {
  _getAttr: function ($, _) {
    return $.getAttribute(_, 2)
  }, _flag: function (_, A) {
    return $(_).hasAttribute(A) ? A : null
  }, style: function ($) {
    return $.style.cssText.toLowerCase()
  }, title: function ($) {
    var _ = $.getAttributeNode("title");
    return _.specified ? _.nodeValue : null
  }
};
Object.extend(Element._attributeTranslations.values, {
  href: Element._attributeTranslations.values._getAttr,
  src: Element._attributeTranslations.values._getAttr,
  disabled: Element._attributeTranslations.values._flag,
  checked: Element._attributeTranslations.values._flag,
  readonly: Element._attributeTranslations.values._flag,
  multiple: Element._attributeTranslations.values._flag
});
Element.Methods.Simulated = {
  hasAttribute: function (_, A) {
    var B = Element._attributeTranslations;
    A = B.names[A] || A;
    return $(_).getAttributeNode(A).specified
  }
};
if (document.all && !window.opera) Element.Methods.update = function (_, B) {
  _ = $(_);
  B = typeof B == "undefined" ? "" : B.toString();
  var C = _.tagName.toUpperCase();
  if (["THEAD", "TBODY", "TR", "TD"].include(C)) {
    var A = document.createElement("div");
    switch (C) {
      case"THEAD":
      case"TBODY":
        A.innerHTML = "<table><tbody>" + B.stripScripts() + "</tbody></table>";
        depth = 2;
        break;
      case"TR":
        A.innerHTML = "<table><tbody><tr>" + B.stripScripts() + "</tr></tbody></table>";
        depth = 3;
        break;
      case"TD":
        A.innerHTML = "<table><tbody><tr><td>" + B.stripScripts() + "</td></tr></tbody></table>";
        depth = 4
    }
    $A(_.childNodes).each(function ($) {
      _.removeChild($)
    });
    depth.times(function () {
      A = A.firstChild
    });
    $A(A.childNodes).each(function ($) {
      _.appendChild($)
    })
  } else _.innerHTML = B.stripScripts();
  setTimeout(function () {
    B.evalScripts()
  }, 10);
  return _
};
Object.extend(Element, Element.Methods);
var _nativeExtensions = false;
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) ["", "Form", "Input", "TextArea", "Select"].each(function ($) {
  var _ = "HTML" + $ + "Element";
  if (window[_]) return;
  var A = window[_] = {};
  A.prototype = document.createElement($ ? $.toLowerCase() : "div").__proto__
});
Element.addMethods = function (_) {
  Object.extend(Element.Methods, _ || {});

  function $(C, A, D) {
    D = D || false;
    var $ = Element.extend.cache;
    for (var B in C) {
      var _ = C[B];
      if (!D || !(B in A)) A[B] = $.findOrStore(_)
    }
  }

  if (typeof HTMLElement != "undefined") {
    $(Element.Methods, HTMLElement.prototype);
    $(Element.Methods.Simulated, HTMLElement.prototype, true);
    $(Form.Methods, HTMLFormElement.prototype);
    [HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement].each(function (_) {
      $(Form.Element.Methods, _.prototype)
    });
    _nativeExtensions = true
  }
};
var Toggle = new Object();
Toggle.display = Element.toggle;
Abstract.Insertion = function ($) {
  this.adjacency = $
};
Abstract.Insertion.prototype = {
  initialize: function (_, A) {
    this.element = $(_);
    this.content = A.stripScripts();
    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content)
      } catch (C) {
        var B = this.element.tagName.toUpperCase();
        if (["TBODY", "TR"].include(B)) this.insertContent(this.contentFromAnonymousTable()); else throw C
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) this.initializeRange();
      this.insertContent([this.range.createContextualFragment(this.content)])
    }
    setTimeout(function () {
      A.evalScripts()
    }, 10)
  }, contentFromAnonymousTable: function () {
    var $ = document.createElement("div");
    $.innerHTML = "<table><tbody>" + this.content + "</tbody></table>";
    return $A($.childNodes[0].childNodes[0].childNodes)
  }
};
var Insertion = new Object();
Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion("beforeBegin"), {
  initializeRange: function () {
    this.range.setStartBefore(this.element)
  }, insertContent: function ($) {
    $.each((function ($) {
      this.element.parentNode.insertBefore($, this.element)
    }).bind(this))
  }
});
Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion("afterBegin"), {
  initializeRange: function () {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true)
  }, insertContent: function ($) {
    $.reverse(false).each((function ($) {
      this.element.insertBefore($, this.element.firstChild)
    }).bind(this))
  }
});
Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion("beforeEnd"), {
  initializeRange: function () {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element)
  }, insertContent: function ($) {
    $.each((function ($) {
      this.element.appendChild($)
    }).bind(this))
  }
});
Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion("afterEnd"), {
  initializeRange: function () {
    this.range.setStartAfter(this.element)
  }, insertContent: function ($) {
    $.each((function ($) {
      this.element.parentNode.insertBefore($, this.element.nextSibling)
    }).bind(this))
  }
});
Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function (_) {
    this.element = $(_)
  }, _each: function ($) {
    this.element.className.split(/\s+/).select(function ($) {
      return $.length > 0
    })._each($)
  }, set: function ($) {
    this.element.className = $
  }, add: function ($) {
    if (this.include($)) return;
    this.set($A(this).concat($).join(" "))
  }, remove: function ($) {
    if (!this.include($)) return;
    this.set($A(this).without($).join(" "))
  }, toString: function () {
    return $A(this).join(" ")
  }
};
Object.extend(Element.ClassNames.prototype, Enumerable);
var Selector = Class.create();
Selector.prototype = {
  initialize: function ($) {
    this.params = {classNames: []};
    this.expression = $.toString().strip();
    this.parseExpression();
    this.compileMatcher()
  }, parseExpression: function () {
    function $($) {
      throw"Parse error in selector: " + $
    }

    if (this.expression == "") $("empty expression");
    var D = this.params, A = this.expression, _, C, B, E;
    while (_ = A.match(/^(.*)\[([a-z0-9_:-]+?)(?:([~\|!]?=)(?:"([^"]*)"|([^\]\s]*)))?\]$/i)) {
      D.attributes = D.attributes || [];
      D.attributes.push({name: _[2], operator: _[3], value: _[4] || _[5] || ""});
      A = _[1]
    }
    if (A == "*") return this.params.wildcard = true;
    while (_ = A.match(/^([^a-z0-9_-])?([a-z0-9_-]+)(.*)/i)) {
      C = _[1], B = _[2], E = _[3];
      switch (C) {
        case"#":
          D.id = B;
          break;
        case".":
          D.classNames.push(B);
          break;
        case"":
        case undefined:
          D.tagName = B.toUpperCase();
          break;
        default:
          $(A.inspect())
      }
      A = E
    }
    if (A.length > 0) $(A.inspect())
  }, buildMatchExpression: function () {
    var A = this.params, C = [], _;
    if (A.wildcard) C.push("true");
    if (_ = A.id) C.push("element.readAttribute(\"id\") == " + _.inspect());
    if (_ = A.tagName) C.push("element.tagName.toUpperCase() == " + _.inspect());
    if ((_ = A.classNames).length > 0) for (var $ = 0, B = _.length; $ < B; $++) C.push("element.hasClassName(" + _[$].inspect() + ")");
    if (_ = A.attributes) _.each(function (_) {
      var $ = "element.readAttribute(" + _.name.inspect() + ")", A = function (_) {
        return $ + " && " + $ + ".split(" + _.inspect() + ")"
      };
      switch (_.operator) {
        case"=":
          C.push($ + " == " + _.value.inspect());
          break;
        case"~=":
          C.push(A(" ") + ".include(" + _.value.inspect() + ")");
          break;
        case"|=":
          C.push(A("-") + ".first().toUpperCase() == " + _.value.toUpperCase().inspect());
          break;
        case"!=":
          C.push($ + " != " + _.value.inspect());
          break;
        case"":
        case undefined:
          C.push("element.hasAttribute(" + _.name.inspect() + ")");
          break;
        default:
          throw"Unknown operator " + _.operator + " in selector"
      }
    });
    return C.join(" && ")
  }, compileMatcher: function () {
    this.match = new Function("element", "if (!element.tagName) return false;       element = $(element);       return " + this.buildMatchExpression())
  }, findElements: function (C) {
    var _;
    if (_ = $(this.params.id)) if (this.match(_)) if (!C || Element.childOf(_, C)) return [_];
    C = (C || document).getElementsByTagName(this.params.tagName || "*");
    var D = [];
    for (var A = 0, B = C.length; A < B; A++) if (this.match(_ = C[A])) D.push(Element.extend(_));
    return D
  }, toString: function () {
    return this.expression
  }
};
Object.extend(Selector, {
  matchElements: function (A, _) {
    var $ = new Selector(_);
    return A.select($.match.bind($)).map(Element.extend)
  }, findElement: function (A, _, $) {
    if (typeof _ == "number") $ = _, _ = false;
    return Selector.matchElements(A, _ || "*")[$ || 0]
  }, findChildElements: function ($, _) {
    return _.map(function (_) {
      return _.match(/[^\s"]+(?:"[^"]*"[^\s"]+)*/g).inject([null], function (B, _) {
        var A = new Selector(_);
        return B.inject([], function (B, _) {
          return B.concat(A.findElements(_ || $))
        })
      })
    }).flatten()
  }
});

function $$() {
  return Selector.findChildElements(document, $A(arguments))
}

var Form = {
  reset: function (_) {
    $(_).reset();
    return _
  }, serializeElements: function (B, _) {
    var A = B.inject({}, function (C, A) {
      if (!A.disabled && A.name) {
        var _ = A.name, B = $(A).getValue();
        if (B != undefined) if (C[_]) {
          if (C[_].constructor != Array) C[_] = [C[_]];
          C[_].push(B)
        } else C[_] = B
      }
      return C
    });
    return _ ? A : Hash.toQueryString(A)
  }
};
Form.Methods = {
  serialize: function (_, $) {
    return Form.serializeElements(Form.getElements(_), $)
  }, getElements: function (_) {
    return $A($(_).getElementsByTagName("*")).inject([], function (_, $) {
      if (Form.Element.Serializers[$.tagName.toLowerCase()]) _.push(Element.extend($));
      return _
    })
  }, getInputs: function (C, B, E) {
    C = $(C);
    var F = C.getElementsByTagName("input");
    if (!B && !E) return $A(F).map(Element.extend);
    for (var _ = 0, G = [], D = F.length; _ < D; _++) {
      var A = F[_];
      if ((B && A.type != B) || (E && A.name != E)) continue;
      G.push(Element.extend(A))
    }
    return G
  }, disable: function (_) {
    _ = $(_);
    _.getElements().each(function ($) {
      $.blur();
      $.disabled = "true"
    });
    return _
  }, enable: function (_) {
    _ = $(_);
    _.getElements().each(function ($) {
      $.disabled = ""
    });
    return _
  }, findFirstElement: function (_) {
    return $(_).getElements().find(function ($) {
      return $.type != "hidden" && !$.disabled && ["input", "select", "textarea"].include($.tagName.toLowerCase())
    })
  }, focusFirstElement: function (_) {
    _ = $(_);
    _.findFirstElement().activate();
    return _
  }
};
Object.extend(Form, Form.Methods);
Form.Element = {
  focus: function (_) {
    $(_).focus();
    return _
  }, select: function (_) {
    $(_).select();
    return _
  }
};
Form.Element.Methods = {
  serialize: function (_) {
    _ = $(_);
    if (!_.disabled && _.name) {
      var A = _.getValue();
      if (A != undefined) {
        var B = {};
        B[_.name] = A;
        return Hash.toQueryString(B)
      }
    }
    return ""
  }, getValue: function (_) {
    _ = $(_);
    var A = _.tagName.toLowerCase();
    return Form.Element.Serializers[A](_)
  }, clear: function (_) {
    $(_).value = "";
    return _
  }, present: function (_) {
    return $(_).value != ""
  }, activate: function (_) {
    _ = $(_);
    _.focus();
    if (_.select && (_.tagName.toLowerCase() != "input" || !["button", "reset", "submit"].include(_.type))) _.select();
    return _
  }, disable: function (_) {
    _ = $(_);
    _.disabled = true;
    return _
  }, enable: function (_) {
    _ = $(_);
    _.blur();
    _.disabled = false;
    return _
  }
};
Object.extend(Form.Element, Form.Element.Methods);
var Field = Form.Element, $F = Form.Element.getValue;
Form.Element.Serializers = {
  input: function ($) {
    switch ($.type.toLowerCase()) {
      case"checkbox":
      case"radio":
        return Form.Element.Serializers.inputSelector($);
      default:
        return Form.Element.Serializers.textarea($)
    }
  }, inputSelector: function ($) {
    return $.checked ? $.value : null
  }, textarea: function ($) {
    return $.value
  }, select: function ($) {
    return this[$.type == "select-one" ? "selectOne" : "selectMany"]($)
  }, selectOne: function (_) {
    var $ = _.selectedIndex;
    return $ >= 0 ? this.optionValue(_.options[$]) : null
  }, selectMany: function ($) {
    var B, A = $.length;
    if (!A) return null;
    for (var _ = 0, B = []; _ < A; _++) {
      var C = $.options[_];
      if (C.selected) B.push(this.optionValue(C))
    }
    return B
  }, optionValue: function ($) {
    return Element.extend($).hasAttribute("value") ? $.value : $.text
  }
};
Abstract.TimedObserver = function () {
};
Abstract.TimedObserver.prototype = {
  initialize: function (_, B, A) {
    this.frequency = B;
    this.element = $(_);
    this.callback = A;
    this.lastValue = this.getValue();
    this.registerCallback()
  }, registerCallback: function () {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000)
  }, onTimerEvent: function () {
    var _ = this.getValue(),
      $ = ("string" == typeof this.lastValue && "string" == typeof _ ? this.lastValue != _ : String(this.lastValue) != String(_));
    if ($) {
      this.callback(this.element, _);
      this.lastValue = _
    }
  }
};
Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function () {
    return Form.Element.getValue(this.element)
  }
});
Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function () {
    return Form.serialize(this.element)
  }
});
Abstract.EventObserver = function () {
};
Abstract.EventObserver.prototype = {
  initialize: function (_, A) {
    this.element = $(_);
    this.callback = A;
    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == "form") this.registerFormCallbacks(); else this.registerCallback(this.element)
  }, onElementEvent: function () {
    var $ = this.getValue();
    if (this.lastValue != $) {
      this.callback(this.element, $);
      this.lastValue = $
    }
  }, registerFormCallbacks: function () {
    Form.getElements(this.element).each(this.registerCallback.bind(this))
  }, registerCallback: function ($) {
    if ($.type) switch ($.type.toLowerCase()) {
      case"checkbox":
      case"radio":
        Event.observe($, "click", this.onElementEvent.bind(this));
        break;
      default:
        Event.observe($, "change", this.onElementEvent.bind(this));
        break
    }
  }
};
Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function () {
    return Form.Element.getValue(this.element)
  }
});
Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function () {
    return Form.serialize(this.element)
  }
});
if (!window.Event) var Event = new Object();
Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB: 9,
  KEY_RETURN: 13,
  KEY_ESC: 27,
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
  KEY_DELETE: 46,
  KEY_HOME: 36,
  KEY_END: 35,
  KEY_PAGEUP: 33,
  KEY_PAGEDOWN: 34,
  element: function ($) {
    return $.target || $.srcElement
  },
  isLeftClick: function ($) {
    return ((($.which) && ($.which == 1)) || (($.button) && ($.button == 1)))
  },
  pointerX: function ($) {
    return $.pageX || ($.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft))
  },
  pointerY: function ($) {
    return $.pageY || ($.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
  },
  stop: function ($) {
    if ($.preventDefault) {
      $.preventDefault();
      $.stopPropagation()
    } else {
      $.returnValue = false;
      $.cancelBubble = true
    }
  },
  findElement: function (_, A) {
    var $ = Event.element(_);
    while ($.parentNode && (!$.tagName || ($.tagName.toUpperCase() != A.toUpperCase()))) $ = $.parentNode;
    return $
  },
  observers: false,
  _observeAndCache: function ($, B, _, A) {
    if (!this.observers) this.observers = [];
    if ($.addEventListener) {
      this.observers.push([$, B, _, A]);
      $.addEventListener(B, _, A)
    } else if ($.attachEvent) {
      this.observers.push([$, B, _, A]);
      $.attachEvent("on" + B, _)
    }
  },
  unloadCache: function () {
    if (!Event.observers) return;
    for (var $ = 0, _ = Event.observers.length; $ < _; $++) {
      Event.stopObserving.apply(this, Event.observers[$]);
      Event.observers[$][0] = null
    }
    Event.observers = false
  },
  observe: function (_, C, A, B) {
    _ = $(_);
    if (_) {
      B = B || false;
      if (C == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || _.attachEvent)) C = "keydown";
      Event._observeAndCache(_, C, A, B)
    }
  },
  stopObserving: function (_, C, A, B) {
    _ = $(_);
    B = B || false;
    if (C == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || _.detachEvent)) C = "keydown";
    if (_.removeEventListener) _.removeEventListener(C, A, B); else if (_.detachEvent) {
      try {
        _.detachEvent("on" + C, A)
      } catch (D) {
      }
    }
  }
});
if (navigator.appVersion.match(/\bMSIE\b/)) Event.observe(window, "unload", Event.unloadCache, false);
var Position = {
  includeScrollOffsets: false, prepare: function () {
    this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    this.deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }, realOffset: function (_) {
    var A = 0, $ = 0;
    do {
      A += _.scrollTop || 0;
      $ += _.scrollLeft || 0;
      _ = _.parentNode
    } while (_);
    return [$, A]
  }, cumulativeOffset: function (_) {
    var A = 0, $ = 0;
    do {
      A += _.offsetTop || 0;
      $ += _.offsetLeft || 0;
      _ = _.offsetParent
    } while (_);
    return [$, A]
  }, positionedOffset: function (_) {
    var B = 0, $ = 0;
    do {
      B += _.offsetTop || 0;
      $ += _.offsetLeft || 0;
      _ = _.offsetParent;
      if (_) {
        if (_.tagName == "BODY") break;
        var A = Element.getStyle(_, "position");
        if (A == "relative" || A == "absolute") break
      }
    } while (_);
    return [$, B]
  }, offsetParent: function ($) {
    if ($.offsetParent) return $.offsetParent;
    if ($ == document.body) return $;
    while (($ = $.parentNode) && $ != document.body) if (Element.getStyle($, "position") != "static") return $;
    return document.body
  }, within: function ($, A, _) {
    if (this.includeScrollOffsets) return this.withinIncludingScrolloffsets($, A, _);
    this.xcomp = A;
    this.ycomp = _;
    this.offset = this.cumulativeOffset($);
    return (_ >= this.offset[1] && _ < this.offset[1] + $.offsetHeight && A >= this.offset[0] && A < this.offset[0] + $.offsetWidth)
  }, withinIncludingScrolloffsets: function ($, B, A) {
    var _ = this.realOffset($);
    this.xcomp = B + _[0] - this.deltaX;
    this.ycomp = A + _[1] - this.deltaY;
    this.offset = this.cumulativeOffset($);
    return (this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + $.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + $.offsetWidth)
  }, overlap: function (_, $) {
    if (!_) return 0;
    if (_ == "vertical") return ((this.offset[1] + $.offsetHeight) - this.ycomp) / $.offsetHeight;
    if (_ == "horizontal") return ((this.offset[0] + $.offsetWidth) - this.xcomp) / $.offsetWidth
  }, page: function (A) {
    var B = 0, _ = 0, $ = A;
    do {
      B += $.offsetTop || 0;
      _ += $.offsetLeft || 0;
      if ($.offsetParent == document.body) if (Element.getStyle($, "position") == "absolute") break
    } while ($ = $.offsetParent);
    $ = A;
    do if (!window.opera || $.tagName == "BODY") {
      B -= $.scrollTop || 0;
      _ -= $.scrollLeft || 0
    } while ($ = $.parentNode);
    return [_, B]
  }, clone: function (C, _) {
    var E = Object.extend({
      setLeft: true,
      setTop: true,
      setWidth: true,
      setHeight: true,
      offsetTop: 0,
      offsetLeft: 0
    }, arguments[2] || {});
    C = $(C);
    var B = Position.page(C);
    _ = $(_);
    var A = [0, 0], D = null;
    if (Element.getStyle(_, "position") == "absolute") {
      D = Position.offsetParent(_);
      A = Position.page(D)
    }
    if (D == document.body) {
      A[0] -= document.body.offsetLeft;
      A[1] -= document.body.offsetTop
    }
    if (E.setLeft) _.style.left = (B[0] - A[0] + E.offsetLeft) + "px";
    if (E.setTop) _.style.top = (B[1] - A[1] + E.offsetTop) + "px";
    if (E.setWidth) _.style.width = C.offsetWidth + "px";
    if (E.setHeight) _.style.height = C.offsetHeight + "px"
  }, absolutize: function (_) {
    _ = $(_);
    if (_.style.position == "absolute") return;
    Position.prepare();
    var A = Position.positionedOffset(_), C = A[1], E = A[0], B = _.clientWidth, D = _.clientHeight;
    _._originalLeft = E - parseFloat(_.style.left || 0);
    _._originalTop = C - parseFloat(_.style.top || 0);
    _._originalWidth = _.style.width;
    _._originalHeight = _.style.height;
    _.style.position = "absolute";
    _.style.top = C + "px";
    _.style.left = E + "px";
    _.style.width = B + "px";
    _.style.height = D + "px"
  }, relativize: function (_) {
    _ = $(_);
    if (_.style.position == "relative") return;
    Position.prepare();
    _.style.position = "relative";
    var A = parseFloat(_.style.top || 0) - (_._originalTop || 0),
      B = parseFloat(_.style.left || 0) - (_._originalLeft || 0);
    _.style.top = A + "px";
    _.style.left = B + "px";
    _.style.height = _._originalHeight;
    _.style.width = _._originalWidth
  }
};
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) Position.cumulativeOffset = function (_) {
  var A = 0, $ = 0;
  do {
    A += _.offsetTop || 0;
    $ += _.offsetLeft || 0;
    if (_.offsetParent == document.body) if (Element.getStyle(_, "position") == "absolute") break;
    _ = _.offsetParent
  } while (_);
  return [$, A]
};
Element.addMethods();
var Builder = {
  NODEMAP: {
    AREA: "map",
    CAPTION: "table",
    COL: "table",
    COLGROUP: "table",
    LEGEND: "fieldset",
    OPTGROUP: "select",
    OPTION: "select",
    PARAM: "object",
    TBODY: "table",
    TD: "table",
    TFOOT: "table",
    TH: "table",
    THEAD: "table",
    TR: "table"
  }, node: function (B) {
    B = B.toUpperCase();
    var A = this.NODEMAP[B] || "div", _ = document.createElement(A);
    try {
      _.innerHTML = "<" + B + "></" + B + ">"
    } catch (C) {
    }
    var $ = _.firstChild || null;
    if ($ && ($.tagName.toUpperCase() != B)) $ = $.getElementsByTagName(B)[0];
    if (!$) $ = document.createElement(B);
    if (!$) return;
    if (arguments[1]) if (this._isStringOrNumber(arguments[1]) || (arguments[1] instanceof Array)) this._children($, arguments[1]); else {
      var D = this._attributes(arguments[1]);
      if (D.length) {
        try {
          _.innerHTML = "<" + B + " " + D + "></" + B + ">"
        } catch (C) {
        }
        $ = _.firstChild || null;
        if (!$) {
          $ = document.createElement(B);
          for (attr in arguments[1]) $[attr == "class" ? "className" : attr] = arguments[1][attr]
        }
        if ($.tagName.toUpperCase() != B) $ = _.getElementsByTagName(B)[0]
      }
    }
    if (arguments[2]) this._children($, arguments[2]);
    return $
  }, _text: function ($) {
    return document.createTextNode($)
  }, ATTR_MAP: {"className": "class", "htmlFor": "for"}, _attributes: function ($) {
    var _ = [];
    for (attribute in $) _.push((attribute in this.ATTR_MAP ? this.ATTR_MAP[attribute] : attribute) + "=\"" + $[attribute].toString().escapeHTML() + "\"");
    return _.join(" ")
  }, _children: function ($, _) {
    if (typeof _ == "object") _.flatten().each(function (_) {
      if (typeof _ == "object") $.appendChild(_); else if (Builder._isStringOrNumber(_)) $.appendChild(Builder._text(_))
    }); else if (Builder._isStringOrNumber(_)) $.appendChild(Builder._text(_))
  }, _isStringOrNumber: function ($) {
    return (typeof $ == "string" || typeof $ == "number")
  }, build: function (A) {
    var _ = this.node("div");
    $(_).update(A.strip());
    return _.down()
  }, dump: function (_) {
    if (typeof _ != "object" && typeof _ != "function") _ = window;
    var $ = ("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY " + "BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET " + "FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX " + "KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P " + "PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD " + "TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);
    $.each(function ($) {
      _[$] = function () {
        return Builder.node.apply(Builder, [$].concat($A(arguments)))
      }
    })
  }
}, Tooltip = Class.create();
Tooltip.prototype = {
  initialize: function (_, A) {
    this.el = $(_);
    this.initialized = false;
    this.setOptions(A);
    this.showEvent = this.show.bindAsEventListener(this);
    this.hideEvent = this.hide.bindAsEventListener(this);
    this.updateEvent = this.update.bindAsEventListener(this);
    Event.observe(this.el, "mouseover", this.showEvent);
    Event.observe(this.el, "mouseout", this.hideEvent);
    this.content = this.el.title;
    this.el.title = "";
    this.el.descendants().each(function ($) {
      if (Element.readAttribute($, "alt")) $.alt = ""
    })
  }, setOptions: function ($) {
    this.options = {
      backgroundColor: "#999",
      borderColor: "#666",
      textColor: "",
      textShadowColor: "",
      maxWidth: 250,
      align: "left",
      delay: 250,
      mouseFollow: true,
      opacity: 0.75,
      appearDuration: 0.25,
      hideDuration: 0.25
    };
    Object.extend(this.options, $ || {})
  }, show: function ($) {
    this.xCord = Event.pointerX($);
    this.yCord = Event.pointerY($);
    if (!this.initialized) this.timeout = window.setTimeout(this.appear.bind(this), this.options.delay)
  }, hide: function ($) {
    if (this.initialized) {
      if (this.options.mouseFollow) Event.stopObserving(this.el, "mousemove", this.updateEvent);
      this.tooltip.hide()
    }
    this._clearTimeout(this.timeout);
    this.initialized = false
  }, update: function ($) {
    this.xCord = Event.pointerX($);
    this.yCord = Event.pointerY($);
    this.setup()
  }, appear: function () {
    this.tooltip = Builder.node("div", {
      className: "tooltip",
      style: "display: none;"
    }, [Builder.node("div", {className: "xtop"}, [Builder.node("div", {
      className: "xb1",
      style: "background-color:" + this.options.borderColor + ";"
    }), Builder.node("div", {
      className: "xb2",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";"
    }), Builder.node("div", {
      className: "xb3",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";"
    }), Builder.node("div", {
      className: "xb4",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";"
    })]), Builder.node("div", {
      className: "xboxcontent",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ((this.options.textColor != "") ? "; color:" + this.options.textColor : "") + ((this.options.textShadowColor != "") ? "; text-shadow:2px 2px 0" + this.options.textShadowColor + ";" : "")
    }, this.content), Builder.node("div", {className: "xbottom"}, [Builder.node("div", {
      className: "xb4",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";"
    }), Builder.node("div", {
      className: "xb3",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";"
    }), Builder.node("div", {
      className: "xb2",
      style: "background-color:" + this.options.backgroundColor + "; border-color:" + this.options.borderColor + ";"
    }), Builder.node("div", {className: "xb1", style: "background-color:" + this.options.borderColor + ";"})]),]);
    document.body.insertBefore(this.tooltip, document.body.childNodes[0]);
    Element.extend(this.tooltip);
    this.options.width = this.tooltip.getWidth();
    this.tooltip.style.width = this.options.width + "px";
    this.setup();
    if (this.options.mouseFollow) Event.observe(this.el, "mousemove", this.updateEvent);
    this.initialized = true;
    this.tooltip.show()
  }, setup: function () {
    if (this.options.width > this.options.maxWidth) {
      this.options.width = this.options.maxWidth;
      this.tooltip.style.width = this.options.width + "px"
    }
    if (this.xCord + this.options.width >= Element.getWidth(document.body)) {
      this.options.align = "right";
      this.xCord = this.xCord - this.options.width + 20
    }
    this.tooltip.style.left = this.xCord - 7 + "px";
    this.tooltip.style.top = this.yCord + 12 + "px"
  }, stop: function () {
    this.hide();
    Event.stopObserving(this.el, "mouseover", this.showEvent);
    Event.stopObserving(this.el, "mouseout", this.hideEvent);
    Event.stopObserving(this.el, "mousemove", this.updateEvent)
  }, _clearTimeout: function ($) {
    clearTimeout($);
    clearInterval($);
    return null
  }
};
var ValidationDefaultOptions = function () {
};
ValidationDefaultOptions.prototype = {
  onSubmit: true,
  stopOnFirst: false,
  immediate: false,
  focusOnError: true,
  useTitles: false,
  onFormValidate: function (_, $) {
  },
  onElementValidate: function ($, _) {
  }
};
var ValidatorDefaultOptions = function () {
};
ValidatorDefaultOptions.prototype = {ignoreEmptyValue: true, depends: []};
Validator = Class.create();
Validator.messageSource = {};
Validator.messageSource["en-us"] = [["validation-failed", "Validation failed."], ["required", "This is a required field."], ["validate-number", "Please enter a valid number in this field."], ["validate-digits", "Please use numbers only in this field. please avoid spaces or other characters such as dots or commas."], ["validate-alpha", "Please use letters only (a-z) in this field."], ["validate-alphanum", "Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed."], ["validate-email", "Please enter a valid email address. For example fred@domain.com ."], ["validate-url", "Please enter a valid URL."], ["validate-currency-dollar", "Please enter a valid $ amount. For example $100.00 ."], ["validate-one-required", "Please select one of the above options."], ["validate-integer", "Please enter a valid integer in this field"], ["validate-pattern", "Validation failed."], ["validate-ip", "Please enter a valid IP address"], ["min-value", "min value is %s."], ["max-value", "max value is %s."], ["min-length", "min length is %s,current length is %s."], ["max-length", "max length is %s,current length is %s."], ["int-range", "Please enter integer value between %s and %s"], ["float-range", "Please enter number between %s and %s"], ["length-range", "Please enter value length between %s and %s,current length is %s"], ["equals", "Conflicting with above value."], ["less-than", "Input value must be less than above value."], ["less-than-equal", "Input value must be less than or equal above value."], ["great-than", "Input value must be great than above value."], ["great-than-equal", "Input value must be great than or equal above value."], ["validate-date", "Please use this date format: %s. For example %s."], ["validate-selection", "Please make a selection."], ["validate-file", function (B, A, $, _) {
  return ValidationUtils.format("Please enter file type in [%s]", [$.join(",")])
}], ["validate-id-number", "Please enter a valid id number."], ["validate-chinese", "Please enter chinese"], ["validate-phone", "Please enter a valid phone number,current length is %s."], ["validate-mobile-phone", "Please enter a valid mobile phone,For example 13910001000.current length is %s."], ["validate-zip", "Please enter a valid zip code."], ["validate-qq", "Please enter a valid qq number"]];
Validator.messageSource["en"] = Validator.messageSource["en-us"];
Validator.messageSource["zh-cn"] = [["validation-failed", "\u9a8c\u8bc1\u5931\u8d25."], ["required", "\u8bf7\u8f93\u5165\u503c."], ["validate-number", "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u6570\u5b57."], ["validate-digits", "\u8bf7\u8f93\u5165\u6570\u5b57."], ["validate-alpha", "\u8bf7\u8f93\u5165\u82f1\u6587\u5b57\u6bcd."], ["validate-alphanum", "\u8bf7\u8f93\u5165\u82f1\u6587\u5b57\u6bcd\u6216\u662f\u6570\u5b57,\u5176\u5b83\u5b57\u7b26\u662f\u4e0d\u5141\u8bb8\u7684."], ["validate-email", "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u4ef6\u5730\u5740,\u5982 username@example.com."], ["validate-url", "\u8bf7\u8f93\u5165\u6709\u6548\u7684URL\u5730\u5740."], ["validate-currency-dollar", "Please enter a valid $ amount. For example $100.00 ."], ["validate-one-required", "\u5728\u524d\u9762\u9009\u9879\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a."], ["validate-integer", "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u6574\u6570"], ["validate-pattern", "\u8f93\u5165\u7684\u503c\u4e0d\u5339\u914d"], ["validate-ip", "\u8bf7\u8f93\u5165\u6b63\u786e\u7684IP\u5730\u5740"], ["min-value", "\u6700\u5c0f\u503c\u4e3a%s"], ["max-value", "\u6700\u5927\u503c\u4e3a%s"], ["min-length", "\u6700\u5c0f\u957f\u5ea6\u4e3a%s,\u5f53\u524d\u957f\u5ea6\u4e3a%s."], ["max-length", "\u6700\u5927\u957f\u5ea6\u4e3a%s,\u5f53\u524d\u957f\u5ea6\u4e3a%s."], ["int-range", "\u8f93\u5165\u503c\u5e94\u8be5\u4e3a %s \u81f3 %s \u7684\u6574\u6570"], ["float-range", "\u8f93\u5165\u503c\u5e94\u8be5\u4e3a %s \u81f3 %s \u7684\u6570\u5b57"], ["length-range", "\u8f93\u5165\u503c\u7684\u957f\u5ea6\u5e94\u8be5\u5728 %s \u81f3 %s \u4e4b\u95f4,\u5f53\u524d\u957f\u5ea6\u4e3a%s"], ["equals", "\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4,\u8bf7\u91cd\u65b0\u8f93\u5165"], ["less-than", "\u8bf7\u8f93\u5165\u5c0f\u4e8e\u524d\u9762\u7684\u503c"], ["less-than-equal", "\u8bf7\u8f93\u5165\u5c0f\u4e8e\u6216\u7b49\u4e8e\u524d\u9762\u7684\u503c"], ["great-than", "\u8bf7\u8f93\u5165\u5927\u4e8e\u524d\u9762\u7684\u503c"], ["great-than-equal", "\u8bf7\u8f93\u5165\u5927\u4e8e\u6216\u7b49\u4e8e\u524d\u9762\u7684\u503c"], ["validate-date", "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u65e5\u671f,\u683c\u5f0f\u4e3a %s. \u4f8b\u5982:%s."], ["validate-selection", "\u8bf7\u9009\u62e9."], ["validate-file", function (B, A, $, _) {
  return ValidationUtils.format("\u6587\u4ef6\u7c7b\u578b\u5e94\u8be5\u4e3a[%s]\u5176\u4e2d\u4e4b\u4e00", [$.join(",")])
}], ["validate-id-number", "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u8eab\u4efd\u8bc1\u53f7\u7801"], ["validate-chinese", "\u8bf7\u8f93\u5165\u4e2d\u6587"], ["validate-phone", "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7535\u8bdd\u53f7\u7801,\u5982:010-29392929,\u5f53\u524d\u957f\u5ea6\u4e3a%s."], ["validate-mobile-phone", "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801,\u5f53\u524d\u957f\u5ea6\u4e3a%s."], ["validate-zip", "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u653f\u7f16\u7801"], ["validate-qq", "\u8bf7\u8f93\u5165\u6709\u6548\u7684QQ\u53f7\u7801."]];
ValidationUtils = {
  isVisible: function (_) {
    while (_ && _.tagName != "BODY") {
      if (!$(_).visible()) return false;
      _ = _.parentNode
    }
    return true
  }, getReferenceForm: function ($) {
    while ($ && $.tagName != "BODY") {
      if ($.tagName == "FORM") return $;
      $ = $.parentNode
    }
    return null
  }, getInputValue: function (_) {
    var _ = $(_);
    if (_.type.toLowerCase() == "file") return _.value; else return $F(_)
  }, getElmID: function ($) {
    return $.id ? $.id : $.name
  }, format: function (B, A) {
    A = A || [];
    ValidationUtils.assert(A.constructor == Array, "ValidationUtils.format() arguement 'args' must is Array");
    var _ = B;
    for (var $ = 0; $ < A.length; $++) _ = _.replace(/%s/, A[$]);
    return _
  }, getArgumentsByClassName: function (A, B) {
    if (!B || !A) return [];
    var C = new RegExp(A + "-(\\S+)"), D = B.match(C);
    if (!D) return [];
    var E = [];
    E.singleArgument = D[1];
    var _ = D[1].split("-");
    for (var $ = 0; $ < _.length; $++) if (_[$] == "") {
      if ($ + 1 < _.length) _[$ + 1] = "-" + _[$ + 1]
    } else E.push(_[$]);
    return E
  }, assert: function (A, $) {
    var _ = $ || ("assert failed error,condition=" + A);
    if (!A) {
      alert(_);
      throw new Error(_)
    } else return A
  }, isDate: function (H, E) {
    var B = "MM", F = "dd", A = "yyyy",
      G = "^" + E.replace(A, "\\d{4}").replace(B, "\\d{2}").replace(F, "\\d{2}") + "$";
    if (!new RegExp(G).test(H)) return false;
    var D = H.substr(E.indexOf(A), 4), _ = H.substr(E.indexOf(B), 2), C = H.substr(E.indexOf(F), 2),
      $ = new Date(ValidationUtils.format("%s/%s/%s", [D, _, C]));
    return (parseInt(_, 10) == (1 + $.getMonth())) && (parseInt(C, 10) == $.getDate()) && (parseInt(D, 10) == $.getFullYear())
  }, fireSubmit: function (_) {
    var _ = $(_);
    if (_.fireEvent) {
      if (_.fireEvent("onsubmit")) _.submit()
    } else if (document.createEvent) {
      var A = document.createEvent("HTMLEvents");
      A.initEvent("submit", false, true);
      _.dispatchEvent(A)
    }
  }, getLanguage: function () {
    var $ = null;
    if (typeof navigator.userLanguage == "undefined") $ = navigator.language.toLowerCase(); else $ = navigator.userLanguage.toLowerCase();
    return $
  }, getMessageSource: function () {
    var _ = ValidationUtils.getLanguage(), $ = Validator.messageSource["zh-cn"];
    if (Validator.messageSource[_]) $ = Validator.messageSource[_];
    return $
  }
};
Validator.messages = {};
ValidationUtils.getMessageSource().each(function ($) {
  Validator.messages[$[0]] = $[1]
});
Validator.prototype = {
  initialize: function ($, _, A) {
    this.options = Object.extend(new ValidatorDefaultOptions(), A || {});
    this._test = _ ? _ : function (_, $) {
      return true
    };
    this._error = Validator.messages[$] ? Validator.messages[$] : Validator.messages["validation-failed"];
    this.className = $;
    this._dependsTest = this._dependsTest.bind(this);
    this._getDependError = this._getDependError.bind(this)
  }, _dependsTest: function (A, _) {
    if (this.options.depends && this.options.depends.length > 0) {
      var $ = $A(this.options.depends).all(function ($) {
        return Validation.get($).test(A, _)
      });
      return $
    }
    return true
  }, test: function (A, _) {
    if (!this._dependsTest(A, _)) return false;
    if (!_) _ = {};
    var $ = (this.options.ignoreEmptyValue && ((A == null) || (A.length == 0)));
    return $ || this._test(A, _, ValidationUtils.getArgumentsByClassName(this.className, _.className), this)
  }, _getDependError: function (B, A, $) {
    var _ = null;
    $A(this.options.depends).any(function (D) {
      var C = Validation.get(D);
      if (!C.test(B, A)) {
        _ = C.error(B, A, $);
        return true
      }
      return false
    });
    return _
  }, error: function (D, B, $) {
    var _ = this._getDependError(D, B, $);
    if (_ != null) return _;
    var A = ValidationUtils.getArgumentsByClassName(this.className, B.className), C = this._error;
    if (typeof C == "string") {
      if (D) A.push(D.length);
      C = ValidationUtils.format(this._error, A)
    } else if (typeof C == "function") C = C(D, B, A, this); else alert("property \"_error\" must type of string or function");
    if (!$) $ = B.className.indexOf("useTitle") >= 0;
    if (B.getAttribute("eMsg")) B.title = B.getAttribute("eMsg");
    return $ ? ((B && B.title) ? B.title : C) : C
  }
};
var Validation = Class.create();
Validation.prototype = {
  initialize: function (B, D) {
    this.options = Object.extend(new ValidationDefaultOptions(), D || {});
    this.form = $(B);
    this.form.validator = this;
    var _ = ValidationUtils.getElmID($(B));
    Validation.validations[_] = this;
    if (this.options.onSubmit) Event.observe(this.form, "submit", this.onSubmit.bind(this), false);
    if (this.options.immediate) {
      var C = this.options.useTitles, A = this.options.onElementValidate;
      Form.getElements(this.form).each(function ($) {
        Event.observe($, "blur", function ($) {
          Validation.validateElement(Event.element($), {useTitle: C, onElementValidate: A})
        })
      })
    }
  }, onSubmit: function ($) {
    if (!this.validate()) Event.stop($)
  }, validate: function () {
    var B = false, A = this.options.useTitles, _ = this.options.onElementValidate;
    if (this.options.stopOnFirst) B = Form.getElements(this.form).all(function ($) {
      return Validation.validateElement($, {useTitle: A, onElementValidate: _})
    }); else B = Form.getElements(this.form).collect(function ($) {
      return Validation.validateElement($, {useTitle: A, onElementValidate: _})
    }).all();
    if (!B && this.options.focusOnError) {
      var C = Form.getElements(this.form).findAll(function (_) {
        return $(_).hasClassName("validation-failed")
      }).first();
      if (C.select) C.select();
      C.focus()
    }
    this.options.onFormValidate(B, this.form);
    return B
  }, reset: function () {
    Form.getElements(this.form).each(Validation.reset)
  }
};
Object.extend(Validation, {
  validateElement: function (A, B) {
    B = Object.extend({
      useTitle: false, onElementValidate: function ($, _) {
      }
    }, B || {});
    A = $(A);
    var _ = A.classNames();
    return _.all(function ($) {
      var _ = Validation.test($, A, B.useTitle);
      B.onElementValidate(_, A);
      return _
    })
  }, newErrorMsgAdvice: function (C, B, _) {
    var D = "<div class=\"validation-advice\" id=\"advice-" + C + "-" + ValidationUtils.getElmID(B) + "\" style=\"display:none\">" + _ + "</div>";
    switch (B.type.toLowerCase()) {
      case"checkbox":
      case"radio":
        var A = B.parentNode;
        if (A) new Insertion.Bottom(A, D); else new Insertion.After(B, D);
        break;
      default:
        new Insertion.After(B, D)
    }
    D = $("advice-" + C + "-" + ValidationUtils.getElmID(B));
    return D
  }, showErrorMsg: function (C, B, A) {
    var B = $(B);
    if (typeof Tooltip != "undefined") {
      if (!B.tooltip) B.tooltip = new Tooltip(B, {
        backgroundColor: "#FC9",
        borderColor: "#C96",
        textColor: "#000",
        textShadowColor: "#FFF"
      });
      B.tooltip.content = A
    } else {
      var _ = Validation._getAdviceProp(C), D = Validation.getAdvice(C, B);
      if (!B[_]) if (!D) D = Validation.newErrorMsgAdvice(C, B, A);
      if (D && !D.visible()) if (typeof Effect == "undefined") D.style.display = "block"; else new Effect.Appear(D, {duration: 1});
      D.innerHTML = A;
      B[_] = true
    }
    B.removeClassName("validation-passed");
    B.addClassName("validation-failed")
  }, showErrorMsgByValidator: function (A, _, $) {
    Validation.showErrorMsg(A, _, Validation.get(A).error(ValidationUtils.getInputValue(_), _, $))
  }, hideErrorMsg: function (B, A) {
    var A = $(A);
    if (typeof Tooltip != "undefined") {
      if (A.tooltip) {
        A.tooltip.stop();
        A.tooltip = false
      }
    } else {
      var _ = Validation._getAdviceProp(B), C = Validation.getAdvice(B, A);
      if (C && A[_]) if (typeof Effect == "undefined") C.hide(); else new Effect.Fade(C, {duration: 1});
      A[_] = false
    }
    A.removeClassName("validation-failed");
    A.addClassName("validation-passed")
  }, _getAdviceProp: function ($) {
    return "__advice" + $.camelize()
  }, test: function (A, _, $) {
    var B = Validation.get(A);
    if (ValidationUtils.isVisible(_) && !B.test(ValidationUtils.getInputValue(_), _)) {
      Validation.showErrorMsgByValidator(A, _, $);
      return false
    } else {
      Validation.hideErrorMsg(A, _);
      return true
    }
  }, getAdvice: function (A, _) {
    return $("advice-" + A + "-" + ValidationUtils.getElmID(_)) || $("advice-" + ValidationUtils.getElmID(_))
  }, reset: function (A) {
    A = $(A);
    var _ = A.classNames();
    _.each(function ($) {
      var _ = Validation._getAdviceProp($);
      if (A[_]) {
        var B = Validation.getAdvice($, A);
        B.hide();
        A[_] = ""
      }
      A.removeClassName("validation-failed");
      A.removeClassName("validation-passed")
    })
  }, add: function (_, B, C) {
    var $ = {}, A = B;
    if (B instanceof RegExp) A = function (C, A, $, _) {
      return B.test(C)
    };
    $[_] = new Validator(_, A, C);
    Object.extend(Validation.methods, $)
  }, addAllThese: function ($) {
    $A($).each(function ($) {
      Validation.add($[0], $[1], ($.length > 2 ? $[2] : {}))
    })
  }, get: function (_) {
    var $;
    for (var A in Validation.methods) {
      if (_ == A) {
        $ = A;
        break
      }
      if (_.indexOf(A) >= 0) $ = A
    }
    return Validation.methods[$] ? Validation.methods[$] : new Validator()
  }, $: function ($) {
    return Validation.validations[$]
  }, methods: {}, validations: {}
});
Validation.addAllThese([["required", function ($) {
  return !(($ == null) || ($.length == 0) || /^[\s|\u3000]+$/.test($))
}, {ignoreEmptyValue: false}], ["validate-number", function ($) {
  return (!isNaN($) && !/^\s+$/.test($))
}], ["validate-digits", function ($) {
  return !/[^\d]/.test($)
}], ["validate-alphanum", function ($) {
  return !/\W/.test($)
}], ["validate-one-required", function (B, _) {
  var $ = _.parentNode, A = $.getElementsByTagName("INPUT");
  return $A(A).any(function ($) {
    return $F($)
  })
}, {ignoreEmptyValue: false}], ["validate-digits", /^[\d]+$/], ["validate-alphanum", /^[a-zA-Z0-9]+$/], ["validate-alpha", /^[a-zA-Z]+$/], ["validate-email", /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/], ["validate-url", /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i], ["validate-currency-dollar", /^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/]]);
Validation.addAllThese([["equals", function (B, A, $, _) {
  return $F($[0]) == B
}, {ignoreEmptyValue: false}], ["less-than", function (B, A, $, _) {
  if (Validation.get("validate-number").test(B) && Validation.get("validate-number").test($F($[0]))) return parseFloat(B) < parseFloat($F($[0]));
  return B < $F($[0])
}], ["less-than-equal", function (B, A, $, _) {
  if (Validation.get("validate-number").test(B) && Validation.get("validate-number").test($F($[0]))) return parseFloat(B) <= parseFloat($F($[0]));
  return B < $F($[0]) || B == $F($[0])
}], ["great-than", function (B, A, $, _) {
  if (Validation.get("validate-number").test(B) && Validation.get("validate-number").test($F($[0]))) return parseFloat(B) > parseFloat($F($[0]));
  return B > $F($[0])
}], ["great-than-equal", function (B, A, $, _) {
  if (Validation.get("validate-number").test(B) && Validation.get("validate-number").test($F($[0]))) return parseFloat(B) >= parseFloat($F($[0]));
  return B > $F($[0]) || B == $F($[0])
}], ["min-length", function (B, A, $, _) {
  return B.length >= parseInt($[0])
}], ["max-length", function (B, A, $, _) {
  return B.length <= parseInt($[0])
}], ["validate-file", function (B, A, $, _) {
  return $A($).any(function ($) {
    return new RegExp("\\." + $ + "$", "i").test(B)
  })
}], ["float-range", function (B, A, $, _) {
  return (parseFloat(B) >= parseFloat($[0]) && parseFloat(B) <= parseFloat($[1]))
}, {depends: ["validate-number"]}], ["int-range", function (B, A, $, _) {
  return (parseInt(B) >= parseInt($[0]) && parseInt(B) <= parseInt($[1]))
}, {depends: ["validate-integer"]}], ["length-range", function (B, A, $, _) {
  return (B.length >= parseInt($[0]) && B.length <= parseInt($[1]))
}], ["max-value", function (B, A, $, _) {
  return parseFloat(B) <= parseFloat($[0])
}, {depends: ["validate-number"]}], ["min-value", function (B, A, $, _) {
  return parseFloat(B) >= parseFloat($[0])
}, {depends: ["validate-number"]}], ["validate-pattern", function (v, elm, args, metadata) {
  return eval("(" + args.singleArgument + ".test(v))")
}], ["validate-ajax", function (F, C, A, B) {
  var $ = null, _ = ($ ? Form.serialize($) : Form.Element.serialize(C));
  _ += ValidationUtils.format("&what=%s&value=%s", [C.name, encodeURIComponent(F)]);
  var D = new Ajax.Request(A.singleArgument, {parameters: _, asynchronous: false, method: "get"}),
    E = D.transport.responseText;
  if ("" == E.strip()) return true;
  B._error = E;
  return false
}], ["validate-dwr", function (v, elm, args, metadata) {
  var result = false, callback = function ($) {
    if ($) metadata._error = $; else result = true
  }, call = args.singleArgument + "('" + v + "',callback)";
  DWREngine.setAsync(false);
  eval(call);
  DWREngine.setAsync(true);
  return result
}], ["validate-buffalo", function (E, D, B, C) {
  var A = false, $ = function ($) {
    if (replay.getResult()) C._error = replay.getResult(); else A = true
  };
  if (!BUFFALO_END_POINT) alert("not found \"BUFFALO_END_POINT\" variable");
  var _ = new Buffalo(BUFFALO_END_POINT, false);
  _.remoteCall(B.singleArgument, E, $);
  return A
}], ["validate-date", function (C, B, $, A) {
  var _ = $.singleArgument || "yyyy-MM-dd";
  A._error = ValidationUtils.format(Validator.messages[A.className], [_, _.replace("yyyy", "2006").replace("MM", "03").replace("dd", "12")]);
  return ValidationUtils.isDate(C, _)
}], ["validate-selection", function (B, A, $, _) {
  return A.options ? A.selectedIndex > 0 : !((B == null) || (B.length == 0))
}], ["validate-integer", /^[-+]?[1-9]\d*$|^0$/], ["validate-ip", /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/], ["validate-id-number", function (G, D, A, B) {
  if (!(/^\d{17}(\d|x)$/i.test(G) || /^\d{15}$/i.test(G))) return false;
  var E = parseInt(G.substr(0, 2));
  if ((E < 11) || (E > 91)) return false;
  var C = G.length == 18 ? G : G.substr(0, 6) + "19" + G.substr(6, 15), F = C.substr(6, 8);
  if (!ValidationUtils.isDate(F, "yyyyMMdd")) return false;
  if (G.length == 18) {
    G = G.replace(/x$/i, "a");
    var _ = 0;
    for (var $ = 17; $ >= 0; $--) _ += (Math.pow(2, $) % 11) * parseInt(G.charAt(17 - $), 11);
    if (_ % 11 != 1) return false
  }
  return true
}], ["validate-chinese", /^[\u4e00-\u9fa5]+$/], ["validate-phone", /^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/], ["validate-mobile-phone", /(^0?[1][358][0-9]{9}$)/], ["validate-zip", /^[1-9]\d{5}$/], ["validate-qq", /^[1-9]\d{4,10}$/]]);
var lf = $("loginForm"), cImg = $("captchaImg"), cContent = $("captchaContent"), hf, maskDiv, loadDiv;
Element.addClassName(lf.user, "required min-length-1");
Element.addClassName(lf.pwd, "required min-length-1");
Element.addClassName(lf.captcha, "required min-length-4 validate-ajax-captchaValidate.portal");
$("username").focus();
if (Login.hideCaptcha && cContent) cContent.hide(); else reloadCaptcha();
var valid = new Validation(lf, {immediate: true, useTitles: true, stopOnFirst: true, onSubmit: false});
Event.observe(lf, "reset", function () {
  valid.reset();
  $("passwordSpan").innerHTML = "<input type=\"text\" name=\"pwd\" id=\"password\" class=\"input required min-length-1 validation-passed\" style=\"width:150px;color:#CCCCCC\" tabindex=\"2\" value=\"password\" />";
  $("username").value = "username";
  $("username").setStyle({color: "#CCCCCC"});
  Event.observe("password", "focus", function () {
    if ($("password").type != "password") {
      $("passwordSpan").innerHTML = "<input type=\"password\" tabindex=\"2\" style=\"width: 150px;\" class=\"input required min-length-1 validation-passed\" id=\"password\" name=\"pwd\">";
      setTimeout(function () {
        $("password").focus()
      }, 50)
    }
  })
}, false);
Event.observe(lf, "submit", doLogin);
Event.observe(cImg, "click", function () {
  reloadCaptcha()
}, false);
Event.observe("username", "focus", function () {
  if (lf.user.value == "username") {
    lf.user.value = "";
    $("username").setStyle({color: "#030303"})
  }
});
Event.observe("password", "focus", function () {
  if ($("password").type != "password") {
    $("passwordSpan").innerHTML = "<input type=\"password\" tabindex=\"2\" style=\"width: 150px;\" class=\"input required min-length-1 validation-passed\" id=\"password\" name=\"pwd\">";
    setTimeout(function () {
      $("password").focus()
    }, 50)
  }
});

function showMsg(_) {
  $("loginMsg").style.visibility = "";
  $("loginMsg").innerHTML = _;
  if ($("getPasswordBack")) $("getPasswordBack").style.visibility = ""
}

function hideMsg() {
  $("loginMsg").style.visibility = "hidden";
  if ($("getPasswordBack")) $("getPasswordBack").style.visibility = "hidden"
}

function reloadCaptcha() {
  cImg.src = "http://my.hfut.edu.cn/captchaGenerate.portal?s=" + Math.random()
}

function doLogin(A) {
  Event.stop(A);
  hideMsg();
  if (!valid.validate()) {
    return
  }
  if (!hf) {
    var $ = document.createElement("div"), _ = ["<form action=\""];
    _.push(Login["loginURL"], "\" method=\"post\" target=\"loginFrame\"><input type=\"hidden\" name=\"", Login["nameField"], "\"/><input type=\"hidden\" name=\"", Login["pwdField"], "\"/><input type=\"hidden\" name=\"captchaField\"/><input type=\"hidden\" name=\"goto\" value=\"", Login["gotoUrl"], "\"/><input type=\"hidden\" name=\"gotoOnFail\" value=\"", Login["gotoFailUrl"], "\"/></form><iframe name=\"loginFrame\"></iframe>");
    $.innerHTML = _.join("");
    $.style.display = "none";
    document.body.appendChild($);
    hf = $.firstChild
  }
  hf[Login["nameField"]].value = lf.user.value;
  hf[Login["pwdField"]].value = lf.pwd.value;
  hf['captchaField'].value = lf.captcha.value;
  hf.submit();
  showMask(lf)
}

function showMask(A) {
  if (!maskDiv) {
    maskDiv = document.createElement("div");
    maskDiv.className = "el-mask";
    maskDiv.style.width = (document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth) + "px";
    maskDiv.style.height = (document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight) + "px";
    document.body.appendChild(maskDiv)
  }
  if (!loadDiv) {
    loadDiv = document.createElement("div");
    loadDiv.className = "mask-loading";
    loadDiv.appendChild(document.createTextNode("\u6b63\u5728\u767b\u5f55\uff0c\u8bf7\u7a0d\u7b49.."));
    document.body.appendChild(loadDiv)
  }
  Element.show(maskDiv);
  Element.show(loadDiv);
  var $ = MyEl.getXY(document.getElementsByName("user")[0]), _ = MyEl.getXY(document.getElementsByName("pwd")[0]);
  loadDiv.style.top = ($["y"] + _["y"]) / 2 + "px";
  loadDiv.style.left = ($["x"] + _["x"]) / 2 + "px"
}

function hideMask() {
  Element.hide(maskDiv);
  Element.hide(loadDiv)
}

function handleLoginSuccessed() {
  location.href = Login["forwardUrl"] ? Login["forwardUrl"] : "index.portal"
}

function handleLoginFailure(A, $) {
  var _ = function ($) {
    hideMask();
    lf.captcha.value = "";
    lf.pwd.value = "";
    lf.pwd.focus();
    if (cContent && !cContent.visible()) {
      cContent.show()
    }
    reloadCaptcha();
    showMsg(/<error>(.*)<\/error>/i.test($) ? RegExp.$1 : $)
  };
  if (A) {
    new Ajax.Request("thirdpartyUserPasswordValidate.portal", {
      parameters: "userName=" + lf.user.value + "&password=" + lf.pwd.value + "&s=" + Math.random(),
      onSuccess: function (A) {
        var $ = A.responseText;
        if ($.indexOf("yes") > -1) {
          handleLoginSuccessed()
        } else {
          _($)
        }
      }
    })
  } else {
    _($)
  }
}

var MyEl = {
  getX: function ($) {
    return $.offsetLeft + ($.offsetParent ? MyEl.getX($.offsetParent) : $.x ? $.x : 0)
  }, getY: function ($) {
    return ($.offsetParent ? $.offsetTop + MyEl.getY($.offsetParent) : $.y ? $.y : 0)
  }, getXY: function ($) {
    var _ = [];
    _["x"] = MyEl.getX($);
    _["y"] = MyEl.getY($);
    return _
  }
}
