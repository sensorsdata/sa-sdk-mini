!(function (e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : e();
})(function () {
  try {
    var sd = { modules: {} },
      _ = (sd._ = {});
    'object' != typeof JSON && (JSON = {}),
      (function () {
        'use strict';
        var rx_one = /^[\],:{}\s]*$/,
          rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
          rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          rx_four = /(?:^|:|,)(?:\s*\[)+/g,
          rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          gap,
          indent,
          meta,
          rep;
        function f(e) {
          return e < 10 ? '0' + e : e;
        }
        function this_value() {
          return this.valueOf();
        }
        function quote(e) {
          return (
            (rx_escapable.lastIndex = 0),
            rx_escapable.test(e)
              ? '"' +
                e.replace(rx_escapable, function (e) {
                  var t = meta[e];
                  return 'string' == typeof t
                    ? t
                    : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
              : '"' + e + '"'
          );
        }
        function str(e, t) {
          var r,
            s,
            a,
            i,
            n,
            o = gap,
            d = t[e];
          switch (
            (d &&
              'object' == typeof d &&
              'function' == typeof d.toJSON &&
              (d = d.toJSON(e)),
            'function' == typeof rep && (d = rep.call(t, e, d)),
            typeof d)
          ) {
            case 'string':
              return quote(d);
            case 'number':
              return isFinite(d) ? String(d) : 'null';
            case 'boolean':
            case 'null':
              return String(d);
            case 'object':
              if (!d) return 'null';
              if (
                ((gap += indent),
                (n = []),
                '[object Array]' === Object.prototype.toString.apply(d))
              ) {
                for (i = d.length, r = 0; r < i; r += 1)
                  n[r] = str(r, d) || 'null';
                return (
                  (a =
                    0 === n.length
                      ? '[]'
                      : gap
                      ? '[\n' + gap + n.join(',\n' + gap) + '\n' + o + ']'
                      : '[' + n.join(',') + ']'),
                  (gap = o),
                  a
                );
              }
              if (rep && 'object' == typeof rep)
                for (i = rep.length, r = 0; r < i; r += 1)
                  'string' == typeof rep[r] &&
                    (a = str((s = rep[r]), d)) &&
                    n.push(quote(s) + (gap ? ': ' : ':') + a);
              else
                for (s in d)
                  Object.prototype.hasOwnProperty.call(d, s) &&
                    (a = str(s, d)) &&
                    n.push(quote(s) + (gap ? ': ' : ':') + a);
              return (
                (a =
                  0 === n.length
                    ? '{}'
                    : gap
                    ? '{\n' + gap + n.join(',\n' + gap) + '\n' + o + '}'
                    : '{' + n.join(',') + '}'),
                (gap = o),
                a
              );
          }
        }
        'function' != typeof Date.prototype.toJSON &&
          ((Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
              ? this.getUTCFullYear() +
                  '-' +
                  f(this.getUTCMonth() + 1) +
                  '-' +
                  f(this.getUTCDate()) +
                  'T' +
                  f(this.getUTCHours()) +
                  ':' +
                  f(this.getUTCMinutes()) +
                  ':' +
                  f(this.getUTCSeconds()) +
                  'Z'
              : null;
          }),
          (Boolean.prototype.toJSON = this_value),
          (Number.prototype.toJSON = this_value),
          (String.prototype.toJSON = this_value)),
          'function' != typeof JSON.stringify &&
            ((meta = {
              '\b': '\\b',
              '\t': '\\t',
              '\n': '\\n',
              '\f': '\\f',
              '\r': '\\r',
              '"': '\\"',
              '\\': '\\\\',
            }),
            (JSON.stringify = function (e, t, r) {
              var s;
              if (((gap = ''), (indent = ''), 'number' == typeof r))
                for (s = 0; s < r; s += 1) indent += ' ';
              else 'string' == typeof r && (indent = r);
              if (
                ((rep = t),
                t &&
                  'function' != typeof t &&
                  ('object' != typeof t || 'number' != typeof t.length))
              )
                throw new Error('JSON.stringify');
              return str('', { '': e });
            })),
          'function' != typeof JSON.parse &&
            (JSON.parse = function (text, reviver) {
              var j;
              function walk(e, t) {
                var r,
                  s,
                  a = e[t];
                if (a && 'object' == typeof a)
                  for (r in a)
                    Object.prototype.hasOwnProperty.call(a, r) &&
                      (void 0 !== (s = walk(a, r)) ? (a[r] = s) : delete a[r]);
                return reviver.call(e, t, a);
              }
              if (
                ((text = String(text)),
                (rx_dangerous.lastIndex = 0),
                rx_dangerous.test(text) &&
                  (text = text.replace(rx_dangerous, function (e) {
                    return (
                      '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4)
                    );
                  })),
                rx_one.test(
                  text
                    .replace(rx_two, '@')
                    .replace(rx_three, ']')
                    .replace(rx_four, '')
                ))
              )
                return (
                  (j = eval('(' + text + ')')),
                  'function' == typeof reviver ? walk({ '': j }, '') : j
                );
              throw new SyntaxError('JSON.parse');
            });
      })(),
      (function (e) {
        if (e.atob)
          try {
            e.atob(' ');
          } catch (s) {
            e.atob =
              ((t = e.atob),
              ((r = function (e) {
                return t(String(e).replace(/[\t\n\f\r ]+/g, ''));
              }).original = t),
              r);
          }
        else {
          var t,
            r,
            s =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            a = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
          (e.btoa = function (e) {
            e = String(e);
            for (
              var t, r, a, i, n = '', o = 0, d = e.length % 3;
              o < e.length;

            )
              ((r = e.charCodeAt(o++)) > 255 ||
                (a = e.charCodeAt(o++)) > 255 ||
                (i = e.charCodeAt(o++)) > 255) &&
                sd.log(
                  "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
                ),
                (n +=
                  s.charAt(((t = (r << 16) | (a << 8) | i) >> 18) & 63) +
                  s.charAt((t >> 12) & 63) +
                  s.charAt((t >> 6) & 63) +
                  s.charAt(63 & t));
            return d ? n.slice(0, d - 3) + '==='.substring(d) : n;
          }),
            (e.atob = function (e) {
              (e = String(e).replace(/[\t\n\f\r ]+/g, '')),
                a.test(e) ||
                  sd.log(
                    "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
                  ),
                (e += '=='.slice(2 - (3 & e.length)));
              for (var t, r, i, n = '', o = 0; o < e.length; )
                (t =
                  (s.indexOf(e.charAt(o++)) << 18) |
                  (s.indexOf(e.charAt(o++)) << 12) |
                  ((r = s.indexOf(e.charAt(o++))) << 6) |
                  (i = s.indexOf(e.charAt(o++)))),
                  (n +=
                    64 === r
                      ? String.fromCharCode((t >> 16) & 255)
                      : 64 === i
                      ? String.fromCharCode((t >> 16) & 255, (t >> 8) & 255)
                      : String.fromCharCode(
                          (t >> 16) & 255,
                          (t >> 8) & 255,
                          255 & t
                        ));
              return n;
            });
        }
      })(window),
      (ArrayProto = Array.prototype),
      (FuncProto = Function.prototype),
      (ObjProto = Object.prototype),
      (slice = ArrayProto.slice),
      (toString = ObjProto.toString),
      (hasOwnProperty = ObjProto.hasOwnProperty),
      FuncProto.bind,
      (nativeForEach = ArrayProto.forEach),
      ArrayProto.indexOf,
      (nativeIsArray = Array.isArray),
      (breaker = {}),
      (each = _.each = function (e, t, r) {
        if (null == e) return !1;
        if (nativeForEach && e.forEach === nativeForEach) e.forEach(t, r);
        else if (_.isArray(e) && e.length === +e.length) {
          for (var s = 0, a = e.length; s < a; s++)
            if (s in e && t.call(r, e[s], s, e) === breaker) return !1;
        } else
          for (var i in e)
            if (hasOwnProperty.call(e, i) && t.call(r, e[i], i, e) === breaker)
              return !1;
      }),
      (_.map = function (e, t) {
        var r = [];
        return null == e
          ? r
          : Array.prototype.map && e.map === Array.prototype.map
          ? e.map(t)
          : (each(e, function (e, s, a) {
              r.push(t(e, s, a));
            }),
            r);
      }),
      (_.extend = function (e) {
        return (
          each(slice.call(arguments, 1), function (t) {
            for (var r in t)
              hasOwnProperty.call(t, r) && void 0 !== t[r] && (e[r] = t[r]);
          }),
          e
        );
      }),
      (_.extend2Lev = function (e) {
        return (
          each(slice.call(arguments, 1), function (t) {
            for (var r in t)
              void 0 !== t[r] &&
                (_.isObject(t[r]) && _.isObject(e[r])
                  ? _.extend(e[r], t[r])
                  : (e[r] = t[r]));
          }),
          e
        );
      }),
      (_.coverExtend = function (e) {
        return (
          each(slice.call(arguments, 1), function (t) {
            for (var r in t)
              void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r]);
          }),
          e
        );
      }),
      (_.isArray =
        nativeIsArray ||
        function (e) {
          return '[object Array]' === toString.call(e);
        }),
      (_.isFunction = function (e) {
        if (!e) return !1;
        try {
          return /^\s*\bfunction\b/.test(e);
        } catch (e) {
          return !1;
        }
      }),
      (_.isArguments = function (e) {
        return !(!e || !hasOwnProperty.call(e, 'callee'));
      }),
      (_.toArray = function (e) {
        return e
          ? e.toArray
            ? e.toArray()
            : _.isArray(e)
            ? slice.call(e)
            : _.isArguments(e)
            ? slice.call(e)
            : _.values(e)
          : [];
      }),
      (_.values = function (e) {
        var t = [];
        return null == e
          ? t
          : (each(e, function (e) {
              t[t.length] = e;
            }),
            t);
      }),
      (_.indexOf = function (e, t) {
        var r = e.indexOf;
        if (r) return r.call(e, t);
        for (var s = 0; s < e.length; s++) if (t === e[s]) return s;
        return -1;
      }),
      (_.hasAttributes = function (e, t) {
        if ('string' == typeof t) return _.hasAttribute(e, t);
        if (_.isArray(t)) {
          for (var r = !1, s = 0; s < t.length; s++)
            if (_.hasAttribute(e, t[s])) {
              r = !0;
              break;
            }
          return r;
        }
      }),
      (_.hasAttribute = function (e, t) {
        return e.hasAttribute
          ? e.hasAttribute(t)
          : !(!e.attributes[t] || !e.attributes[t].specified);
      }),
      (_.filter = function (e, t, r) {
        var s = Object.prototype.hasOwnProperty;
        if (e.filter) return e.filter(t);
        for (var a = [], i = 0; i < e.length; i++)
          if (s.call(e, i)) {
            var n = e[i];
            t.call(r, n, i, e) && a.push(n);
          }
        return a;
      }),
      (_.inherit = function (e, t) {
        return (
          (e.prototype = new t()),
          (e.prototype.constructor = e),
          (e.superclass = t.prototype),
          e
        );
      }),
      (_.trim = function (e) {
        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      }),
      (_.isObject = function (e) {
        return null != e && '[object Object]' == toString.call(e);
      }),
      (_.isEmptyObject = function (e) {
        if (_.isObject(e)) {
          for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
          return !0;
        }
        return !1;
      }),
      (_.isUndefined = function (e) {
        return void 0 === e;
      }),
      (_.isString = function (e) {
        return '[object String]' == toString.call(e);
      }),
      (_.isDate = function (e) {
        return '[object Date]' == toString.call(e);
      }),
      (_.isBoolean = function (e) {
        return '[object Boolean]' == toString.call(e);
      }),
      (_.isNumber = function (e) {
        return (
          '[object Number]' == toString.call(e) && /[\d\.]+/.test(String(e))
        );
      }),
      (_.isElement = function (e) {
        return !(!e || 1 !== e.nodeType);
      }),
      (_.isJSONString = function (e) {
        try {
          JSON.parse(e);
        } catch (e) {
          return !1;
        }
        return !0;
      }),
      (_.safeJSONParse = function (e) {
        var t = null;
        try {
          t = JSON.parse(e);
        } catch (e) {
          return !1;
        }
        return t;
      }),
      (_.decodeURIComponent = function (e) {
        var t = e;
        try {
          t = decodeURIComponent(e);
        } catch (r) {
          t = e;
        }
        return t;
      }),
      (_.encodeDates = function (e) {
        return (
          _.each(e, function (t, r) {
            _.isDate(t)
              ? (e[r] = _.formatDate(t))
              : _.isObject(t) && (e[r] = _.encodeDates(t));
          }),
          e
        );
      }),
      (_.mediaQueriesSupported = function () {
        return void 0 !== window.matchMedia || void 0 !== window.msMatchMedia;
      }),
      (_.getScreenOrientation = function () {
        var e =
            screen.msOrientation ||
            screen.mozOrientation ||
            (screen.orientation || {}).type,
          t = '\u672a\u53d6\u5230\u503c';
        if (e) t = e.indexOf('landscape') > -1 ? 'landscape' : 'portrait';
        else if (_.mediaQueriesSupported()) {
          var r = window.matchMedia || window.msMatchMedia;
          r('(orientation: landscape)').matches
            ? (t = 'landscape')
            : r('(orientation: portrait)').matches && (t = 'portrait');
        }
        return t;
      }),
      (_.now =
        Date.now ||
        function () {
          return new Date().getTime();
        }),
      (_.throttle = function (e, t, r) {
        var s,
          a,
          i,
          n = null,
          o = 0;
        r || (r = {});
        var d = function () {
          (o = !1 === r.leading ? 0 : _.now()),
            (n = null),
            (i = e.apply(s, a)),
            n || (s = a = null);
        };
        return function () {
          var c = _.now();
          o || !1 !== r.leading || (o = c);
          var u = t - (c - o);
          return (
            (s = this),
            (a = arguments),
            u <= 0 || u > t
              ? (n && (clearTimeout(n), (n = null)),
                (o = c),
                (i = e.apply(s, a)),
                n || (s = a = null))
              : n || !1 === r.trailing || (n = setTimeout(d, u)),
            i
          );
        };
      }),
      (_.hashCode = function (e) {
        if ('string' != typeof e) return 0;
        var t = 0;
        if (0 == e.length) return t;
        for (var r = 0; r < e.length; r++)
          (t = (t << 5) - t + e.charCodeAt(r)), (t &= t);
        return t;
      }),
      (_.formatDate = function (e) {
        function t(e) {
          return e < 10 ? '0' + e : e;
        }
        return (
          e.getFullYear() +
          '-' +
          t(e.getMonth() + 1) +
          '-' +
          t(e.getDate()) +
          ' ' +
          t(e.getHours()) +
          ':' +
          t(e.getMinutes()) +
          ':' +
          t(e.getSeconds()) +
          '.' +
          t(e.getMilliseconds())
        );
      }),
      (_.searchObjDate = function (e) {
        _.isObject(e) &&
          _.each(e, function (t, r) {
            _.isObject(t)
              ? _.searchObjDate(e[r])
              : _.isDate(t) && (e[r] = _.formatDate(t));
          });
      }),
      (_.searchZZAppStyle = function (e) {
        void 0 !== e.properties.$project &&
          ((e.project = e.properties.$project), delete e.properties.$project),
          void 0 !== e.properties.$token &&
            ((e.token = e.properties.$token), delete e.properties.$token);
      }),
      (_.formatJsonString = function (e) {
        try {
          return JSON.stringify(e, null, '  ');
        } catch (t) {
          return JSON.stringify(e);
        }
      }),
      (_.formatString = function (e, t) {
        return _.isNumber(t) && e.length > t
          ? (sd.log(
              '\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--' +
                e
            ),
            e.slice(0, t))
          : e;
      }),
      (_.searchObjString = function (e) {
        _.isObject(e) &&
          _.each(e, function (t, r) {
            _.isObject(t)
              ? _.searchObjString(e[r])
              : _.isString(t) &&
                (e[r] = _.formatString(
                  t,
                  '$element_selector' === r ? 1024 : sd.para.max_string_length
                ));
          });
      }),
      (_.parseSuperProperties = function (e) {
        _.isObject(e) &&
          (_.each(e, function (t, r) {
            if (_.isFunction(t))
              try {
                (e[r] = t()),
                  _.isFunction(e[r]) &&
                    (sd.log(
                      '\u60a8\u7684\u5c5e\u6027- ' +
                        r +
                        ' \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664'
                    ),
                    delete e[r]);
              } catch (t) {
                delete e[r],
                  sd.log(
                    '\u60a8\u7684\u5c5e\u6027- ' +
                      r +
                      ' \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664'
                  );
              }
          }),
          _.strip_sa_properties(e));
      }),
      (_.filterReservedProperties = function (e) {
        _.isObject(e) &&
          _.each(
            [
              'distinct_id',
              'user_id',
              'id',
              'date',
              'datetime',
              'event',
              'events',
              'first_id',
              'original_id',
              'device_id',
              'properties',
              'second_id',
              'time',
              'users',
            ],
            function (t, r) {
              t in e &&
                (r < 3
                  ? (delete e[t],
                    sd.log(
                      '\u60a8\u7684\u5c5e\u6027- ' +
                        t +
                        '\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664'
                    ))
                  : sd.log(
                      '\u60a8\u7684\u5c5e\u6027- ' +
                        t +
                        '\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u8bf7\u907f\u514d\u5176\u4f5c\u4e3a\u5c5e\u6027\u540d'
                    ));
            }
          );
      }),
      (_.searchConfigData = function (e) {
        if ('object' == typeof e && e.$option) {
          var t = e.$option;
          return delete e.$option, t;
        }
        return {};
      }),
      (_.unique = function (e) {
        for (var t, r = [], s = {}, a = 0; a < e.length; a++)
          (t = e[a]) in s || ((s[t] = !0), r.push(t));
        return r;
      }),
      (_.strip_sa_properties = function (e) {
        return _.isObject(e)
          ? (_.each(e, function (t, r) {
              if (_.isArray(t)) {
                var s = [];
                _.each(t, function (e) {
                  _.isString(e)
                    ? s.push(e)
                    : sd.log(
                        '\u60a8\u7684\u6570\u636e-',
                        r,
                        t,
                        '\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664'
                      );
                }),
                  0 !== s.length
                    ? (e[r] = s)
                    : (delete e[r],
                      sd.log(
                        '\u5df2\u7ecf\u5220\u9664\u7a7a\u7684\u6570\u7ec4'
                      ));
              }
              _.isString(t) ||
                _.isNumber(t) ||
                _.isDate(t) ||
                _.isBoolean(t) ||
                _.isArray(t) ||
                _.isFunction(t) ||
                '$option' === r ||
                (sd.log(
                  '\u60a8\u7684\u6570\u636e-',
                  r,
                  t,
                  '-\u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664'
                ),
                delete e[r]);
            }),
            e)
          : e;
      }),
      (_.strip_empty_properties = function (e) {
        var t = {};
        return (
          _.each(e, function (e, r) {
            null != e && (t[r] = e);
          }),
          t
        );
      }),
      (_.base64Encode = function (e) {
        return btoa(
          encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
            return String.fromCharCode('0x' + t);
          })
        );
      }),
      (_.base64Decode = function (e) {
        var t = _.map(atob(e).split(''), function (e) {
          return '%' + ('00' + e.charCodeAt(0).toString(16)).slice(-2);
        });
        return decodeURIComponent(t.join(''));
      }),
      (_.UUID =
        ((T = function () {
          for (var e = 1 * new Date(), t = 0; e == 1 * new Date(); ) t++;
          return e.toString(16) + t.toString(16);
        }),
        function () {
          var e = String(screen.height * screen.width);
          e =
            e && /\d{5,}/.test(e)
              ? e.toString(16)
              : String(31242 * Math.random())
                  .replace('.', '')
                  .slice(0, 8);
          var t =
            T() +
            '-' +
            Math.random().toString(16).replace('.', '') +
            '-' +
            (function (e) {
              var t,
                r,
                s = navigator.userAgent,
                a = [],
                i = 0;
              function n(e, t) {
                var r,
                  s = 0;
                for (r = 0; r < t.length; r++) s |= a[r] << (8 * r);
                return e ^ s;
              }
              for (t = 0; t < s.length; t++)
                (r = s.charCodeAt(t)),
                  a.unshift(255 & r),
                  a.length >= 4 && ((i = n(i, a)), (a = []));
              return a.length > 0 && (i = n(i, a)), i.toString(16);
            })() +
            '-' +
            e +
            '-' +
            T();
          return (
            t ||
            (
              String(Math.random()) +
              String(Math.random()) +
              String(Math.random())
            ).slice(2, 15)
          );
        })),
      (_.getQueryParam = function (e, t) {
        (t = t.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')),
          (e = _.decodeURIComponent(e));
        var r = new RegExp('[\\?&]' + t + '=([^&#]*)').exec(e);
        return null === r || (r && 'string' != typeof r[1] && r[1].length)
          ? ''
          : _.decodeURIComponent(r[1]);
      }),
      (_.urlParse = function (e) {
        var t = function (e) {
          (this._fields = {
            Username: 4,
            Password: 5,
            Port: 7,
            Protocol: 2,
            Host: 6,
            Path: 8,
            URL: 0,
            QueryString: 9,
            Fragment: 10,
          }),
            (this._values = {}),
            (this._regex = null),
            (this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/),
            void 0 !== e && this._parse(e);
        };
        return (
          (t.prototype.setUrl = function (e) {
            this._parse(e);
          }),
          (t.prototype._initValues = function () {
            for (var e in this._fields) this._values[e] = '';
          }),
          (t.prototype.addQueryString = function (e) {
            if ('object' != typeof e) return !1;
            var t = this._values.QueryString || '';
            for (var r in e)
              t = new RegExp(r + '[^&]+').test(t)
                ? t.replace(new RegExp(r + '[^&]+'), r + '=' + e[r])
                : '&' === t.slice(-1)
                ? t + r + '=' + e[r]
                : '' === t
                ? r + '=' + e[r]
                : t + '&' + r + '=' + e[r];
            this._values.QueryString = t;
          }),
          (t.prototype.getUrl = function () {
            var e = '';
            return (
              (e += this._values.Origin),
              (e += this._values.Port ? ':' + this._values.Port : ''),
              (e += this._values.Path),
              (e += this._values.QueryString
                ? '?' + this._values.QueryString
                : ''),
              (e += this._values.Fragment ? '#' + this._values.Fragment : '')
            );
          }),
          (t.prototype.getUrl = function () {
            var e = '';
            return (
              (e += this._values.Origin),
              (e += this._values.Port ? ':' + this._values.Port : ''),
              (e += this._values.Path),
              (e += this._values.QueryString
                ? '?' + this._values.QueryString
                : '')
            );
          }),
          (t.prototype._parse = function (e) {
            this._initValues();
            var t = this._regex.exec(e);
            for (var r in (t || sd.log('DPURLParser::_parse -> Invalid URL'),
            this._fields))
              void 0 !== t[this._fields[r]] &&
                (this._values[r] = t[this._fields[r]]);
            (this._values.Hostname = this._values.Host.replace(/:\d+$/, '')),
              (this._values.Origin =
                this._values.Protocol + '://' + this._values.Hostname);
          }),
          new t(e)
        );
      }),
      (_.addEvent = function () {
        function e(t) {
          return (
            t &&
              ((t.preventDefault = e.preventDefault),
              (t.stopPropagation = e.stopPropagation),
              (t._getPath = e._getPath)),
            t
          );
        }
        (e._getPath = function () {
          var e = this;
          return (
            this.path ||
            (this.composedPath && this.composedPath()) ||
            (function () {
              try {
                var t = e.target,
                  r = [t];
                if (null === t || null === t.parentElement) return [];
                for (; null !== t.parentElement; )
                  (t = t.parentElement), r.unshift(t);
                return r;
              } catch (e) {
                return [];
              }
            })()
          );
        }),
          (e.preventDefault = function () {
            this.returnValue = !1;
          }),
          (e.stopPropagation = function () {
            this.cancelBubble = !0;
          }),
          function (t, r, s) {
            var a = !(
              !_.isObject(sd.para.heatmap) || !sd.para.heatmap.useCapture
            );
            if (
              (_.isObject(sd.para.heatmap) &&
                void 0 === sd.para.heatmap.useCapture &&
                'click' === r &&
                (a = !0),
              t && t.addEventListener)
            )
              t.addEventListener(
                r,
                function (t) {
                  (t._getPath = e._getPath), s.call(this, t);
                },
                a
              );
            else {
              var i = 'on' + r,
                n = t[i];
              t[i] = (function (t, r, s) {
                return function (a) {
                  if ((a = a || e(window.event))) {
                    a.target = a.srcElement;
                    var i,
                      n,
                      o = !0;
                    return (
                      'function' == typeof s && (i = s(a)),
                      (n = r.call(t, a)),
                      (!1 !== i && !1 !== n) || (o = !1),
                      o
                    );
                  }
                };
              })(t, s, n);
            }
          }.apply(null, arguments);
      }),
      (_.addHashEvent = function (e) {
        var t = 'pushState' in window.history ? 'popstate' : 'hashchange';
        _.addEvent(window, t, e);
      }),
      (_.addSinglePageEvent = function (e) {
        var t = location.href,
          r = window.history.pushState,
          s = window.history.replaceState;
        (window.history.pushState = function () {
          r.apply(window.history, arguments), e(t), (t = location.href);
        }),
          (window.history.replaceState = function () {
            s.apply(window.history, arguments), e(t), (t = location.href);
          });
        var a = r ? 'popstate' : 'hashchange';
        _.addEvent(window, a, function () {
          e(t), (t = location.href);
        });
      }),
      (_.cookie = {
        get: function (e) {
          for (
            var t = e + '=', r = document.cookie.split(';'), s = 0;
            s < r.length;
            s++
          ) {
            for (var a = r[s]; ' ' == a.charAt(0); )
              a = a.substring(1, a.length);
            if (0 == a.indexOf(t))
              return _.decodeURIComponent(a.substring(t.length, a.length));
          }
          return null;
        },
        set: function (e, t, r, s, a) {
          var i = '',
            n = '',
            o = '';
          if (
            ((r = null == r ? 73e3 : r),
            (s = void 0 === s ? sd.para.cross_subdomain : s))
          ) {
            var d = _.getCurrentDomain(location.href);
            'url\u89e3\u6790\u5931\u8d25' === d && (d = ''),
              (i = d ? '; domain=' + d : '');
          }
          if (0 !== r) {
            var c = new Date();
            's' === String(r).slice(-1)
              ? c.setTime(c.getTime() + 1e3 * Number(String(r).slice(0, -1)))
              : c.setTime(c.getTime() + 24 * r * 60 * 60 * 1e3),
              (n = '; expires=' + c.toGMTString());
          }
          a && (o = '; secure'),
            (document.cookie =
              e + '=' + encodeURIComponent(t) + n + '; path=/' + i + o);
        },
        remove: function (e, t) {
          (t = void 0 === t ? sd.para.cross_subdomain : t),
            _.cookie.set(e, '', -1, t);
        },
        getCookieName: function (e, t) {
          var r = '';
          if (((t = t || location.href), !1 === sd.para.cross_subdomain)) {
            try {
              r = _.URL(t).hostname;
            } catch (e) {
              sd.log(e);
            }
            r =
              'string' == typeof r && '' !== r
                ? 'sajssdk_2015_' + e + '_' + r.replace(/\./g, '_')
                : 'sajssdk_2015_root_' + e;
          } else r = 'sajssdk_2015_cross_' + e;
          return r;
        },
        getNewUser: function () {
          return (
            null !== this.get('sensorsdata_is_new_user') ||
            null !== this.get(this.getCookieName('new_user'))
          );
        },
      }),
      (_.getElementContent = function (e, t) {
        var r = '',
          s = '';
        return (
          e.textContent
            ? (r = _.trim(e.textContent))
            : e.innerText && (r = _.trim(e.innerText)),
          r &&
            (r = r
              .replace(/[\r\n]/g, ' ')
              .replace(/[ ]+/g, ' ')
              .substring(0, 255)),
          (s = r || ''),
          ('input' !== t && 'INPUT' !== t) ||
            ('button' === e.type || 'submit' === e.type
              ? (s = e.value || '')
              : sd.para.heatmap &&
                'function' == typeof sd.para.heatmap.collect_input &&
                sd.para.heatmap.collect_input(e) &&
                (s = e.value || '')),
          s
        );
      }),
      (_.getEleInfo = function (e) {
        if (!e.target) return !1;
        var t = e.target,
          r = t.tagName.toLowerCase(),
          s = {};
        return (
          (s.$element_type = r),
          (s.$element_name = t.getAttribute('name')),
          (s.$element_id = t.getAttribute('id')),
          (s.$element_class_name =
            'string' == typeof t.className ? t.className : null),
          (s.$element_target_url = t.getAttribute('href')),
          (s.$element_content = _.getElementContent(t, r)),
          ((s = _.strip_empty_properties(s)).$url = location.href),
          (s.$url_path = location.pathname),
          (s.$title = document.title),
          (s.$viewport_width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            0),
          s
        );
      }),
      (_.localStorage = {
        get: function (e) {
          return window.localStorage.getItem(e);
        },
        parse: function (e) {
          var t;
          try {
            t = JSON.parse(_.localStorage.get(e)) || null;
          } catch (e) {
            sd.log(e);
          }
          return t;
        },
        set: function (e, t) {
          window.localStorage.setItem(e, t);
        },
        remove: function (e) {
          window.localStorage.removeItem(e);
        },
        isSupport: function () {
          var e = !0;
          try {
            var t = '__sensorsdatasupport__',
              r = 'testIsSupportStorage';
            _.localStorage.set(t, r),
              _.localStorage.get(t) !== r && (e = !1),
              _.localStorage.remove(t);
          } catch (t) {
            e = !1;
          }
          return e;
        },
      }),
      (_.sessionStorage = {
        isSupport: function () {
          var e = !0,
            t = '__sensorsdatasupport__',
            r = 'testIsSupportStorage';
          try {
            sessionStorage && sessionStorage.setItem
              ? (sessionStorage.setItem(t, r),
                sessionStorage.removeItem(t, r),
                (e = !0))
              : (e = !1);
          } catch (t) {
            e = !1;
          }
          return e;
        },
      }),
      (_.isSupportCors = function () {
        return (
          void 0 !== window.XMLHttpRequest &&
          ('withCredentials' in new XMLHttpRequest() ||
            'undefined' != typeof XDomainRequest)
        );
      }),
      (_.xhr = function (e) {
        if (e)
          return void 0 !== window.XMLHttpRequest &&
            'withCredentials' in new XMLHttpRequest()
            ? new XMLHttpRequest()
            : 'undefined' != typeof XDomainRequest
            ? new XDomainRequest()
            : null;
        if (void 0 !== window.XMLHttpRequest) return new XMLHttpRequest();
        if (window.ActiveXObject)
          try {
            return new ActiveXObject('Msxml2.XMLHTTP');
          } catch (e) {
            try {
              return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
              sd.log(e);
            }
          }
      }),
      (_.ajax = function (e) {
        function t(e) {
          if (!e) return '';
          try {
            return JSON.parse(e);
          } catch (e) {
            return {};
          }
        }
        (e.timeout = e.timeout || 2e4),
          (e.credentials = void 0 === e.credentials || e.credentials);
        var r = _.xhr(e.cors);
        if (!r) return !1;
        e.type || (e.type = e.data ? 'POST' : 'GET'),
          (e = _.extend({ success: function () {}, error: function () {} }, e)),
          sd.debug.protocol.ajax(e.url);
        var s,
          a = e.success,
          i = e.error;
        (e.success = function (e) {
          a(e), s && (clearTimeout(s), (s = null));
        }),
          (e.error = function (e) {
            i(e), s && (clearTimeout(s), (s = null));
          }),
          (s = setTimeout(function () {
            !(function () {
              try {
                _.isObject(r) && r.abort && r.abort();
              } catch (e) {
                sd.log(e);
              }
              s &&
                (clearTimeout(s),
                (s = null),
                e.error && e.error(),
                (r.onreadystatechange = null),
                (r.onload = null),
                (r.onerror = null));
            })();
          }, e.timeout)),
          'undefined' != typeof XDomainRequest &&
            r instanceof XDomainRequest &&
            ((r.onload = function () {
              e.success && e.success(t(r.responseText)),
                (r.onreadystatechange = null),
                (r.onload = null),
                (r.onerror = null);
            }),
            (r.onerror = function () {
              e.error && e.error(t(r.responseText), r.status),
                (r.onreadystatechange = null),
                (r.onerror = null),
                (r.onload = null);
            })),
          (r.onreadystatechange = function () {
            try {
              4 == r.readyState &&
                ((r.status >= 200 && r.status < 300) || 304 == r.status
                  ? e.success(t(r.responseText))
                  : e.error(t(r.responseText), r.status),
                (r.onreadystatechange = null),
                (r.onload = null));
            } catch (e) {
              (r.onreadystatechange = null), (r.onload = null);
            }
          }),
          r.open(e.type, e.url, !0);
        try {
          e.credentials && (r.withCredentials = !0),
            _.isObject(e.header) &&
              _.each(e.header, function (e, t) {
                r.setRequestHeader && r.setRequestHeader(t, e);
              }),
            e.data &&
              (e.cors ||
                (r.setRequestHeader &&
                  r.setRequestHeader('X-Requested-With', 'XMLHttpRequest')),
              'application/json' === e.contentType
                ? r.setRequestHeader &&
                  r.setRequestHeader(
                    'Content-type',
                    'application/json; charset=UTF-8'
                  )
                : r.setRequestHeader &&
                  r.setRequestHeader(
                    'Content-type',
                    'application/x-www-form-urlencoded'
                  ));
        } catch (e) {
          sd.log(e);
        }
        r.send(e.data || null);
      }),
      (_.loadScript = function (e) {
        e = _.extend(
          {
            success: function () {},
            error: function () {},
            appendCall: function (e) {
              document.getElementsByTagName('head')[0].appendChild(e);
            },
          },
          e
        );
        var t = null;
        'css' === e.type &&
          (((t = document.createElement('link')).rel = 'stylesheet'),
          (t.href = e.url)),
          'js' === e.type &&
            (((t = document.createElement('script')).async = 'async'),
            t.setAttribute('charset', 'UTF-8'),
            (t.src = e.url),
            (t.type = 'text/javascript')),
          (t.onload = t.onreadystatechange = function () {
            (this.readyState &&
              'loaded' !== this.readyState &&
              'complete' !== this.readyState) ||
              (e.success(), (t.onload = t.onreadystatechange = null));
          }),
          (t.onerror = function () {
            e.error(), (t.onerror = null);
          }),
          e.appendCall(t);
      }),
      (_.getHostname = function (e, t) {
        (t && 'string' == typeof t) || (t = 'hostname\u89e3\u6790\u5f02\u5e38');
        var r = null;
        try {
          r = _.URL(e).hostname;
        } catch (e) {
          sd.log(
            'getHostname\u4f20\u5165\u7684url\u53c2\u6570\u4e0d\u5408\u6cd5\uff01'
          );
        }
        return r || t;
      }),
      (_.getQueryParamsFromUrl = function (e) {
        var t = {},
          r = e.split('?')[1] || '';
        return r && (t = _.getURLSearchParams('?' + r)), t;
      }),
      (_.getURLSearchParams = function (e) {
        for (
          var t = function (e) {
              return decodeURIComponent(e);
            },
            r = {},
            s = (e = e || '').substring(1).split('&'),
            a = 0;
          a < s.length;
          a++
        ) {
          var i = s[a].indexOf('=');
          if (-1 !== i) {
            var n = s[a].substring(0, i),
              o = s[a].substring(i + 1);
            (n = t(n)), (o = t(o)), (r[n] = o);
          }
        }
        return r;
      }),
      (_.URL = function (e) {
        var t,
          r = {},
          s = [
            'hash',
            'host',
            'hostname',
            'href',
            'origin',
            'password',
            'pathname',
            'port',
            'protocol',
            'search',
            'username',
          ];
        if (
          'function' == typeof window.URL &&
          (function () {
            try {
              return (
                'http://modernizr.com/' ===
                new URL('http://modernizr.com/').href
              );
            } catch (e) {
              return !1;
            }
          })()
        )
          (r = new URL(e)).searchParams ||
            (r.searchParams =
              ((t = _.getURLSearchParams(r.search)),
              {
                get: function (e) {
                  return t[e];
                },
              }));
        else {
          !1 === /^https?:\/\/.+/.test(e) && sd.log('Invalid URL');
          var a = document.createElement('a');
          a.href = e;
          for (var i = s.length - 1; i >= 0; i--) {
            var n = s[i];
            r[n] = a[n];
          }
          r.hostname &&
            'string' == typeof r.pathname &&
            0 !== r.pathname.indexOf('/') &&
            (r.pathname = '/' + r.pathname),
            (r.searchParams = (function () {
              var e = _.getURLSearchParams(r.search);
              return {
                get: function (t) {
                  return e[t];
                },
              };
            })());
        }
        return r;
      }),
      (_.getCurrentDomain = function (e) {
        var t = sd.para.current_domain;
        switch (typeof t) {
          case 'function':
            var r = t();
            return '' === r || '' === _.trim(r)
              ? 'url\u89e3\u6790\u5931\u8d25'
              : -1 !== r.indexOf('.')
              ? r
              : 'url\u89e3\u6790\u5931\u8d25';
          case 'string':
            return '' === t || '' === _.trim(t)
              ? 'url\u89e3\u6790\u5931\u8d25'
              : -1 !== t.indexOf('.')
              ? t
              : 'url\u89e3\u6790\u5931\u8d25';
          default:
            var s = _.getCookieTopLevelDomain();
            return '' === e
              ? 'url\u89e3\u6790\u5931\u8d25'
              : '' === s
              ? 'url\u89e3\u6790\u5931\u8d25'
              : s;
        }
      }),
      (_.getCookieTopLevelDomain = function (e) {
        var t = (e = e || window.location.hostname).split('.');
        if (_.isArray(t) && t.length >= 2 && !/^(\d+\.)+\d+$/.test(e))
          for (var r = '.' + t.splice(t.length - 1, 1); t.length > 0; )
            if (
              ((r = '.' + t.splice(t.length - 1, 1) + r),
              (document.cookie =
                'sensorsdata_domain_test=true; path=/; domain=' + r),
              -1 !== document.cookie.indexOf('sensorsdata_domain_test=true'))
            ) {
              var s = new Date();
              return (
                s.setTime(s.getTime() - 1e3),
                (document.cookie =
                  'sensorsdata_domain_test=true; expires=' +
                  s.toGMTString() +
                  '; path=/; domain=' +
                  r),
                r
              );
            }
        return '';
      }),
      (_.isReferralTraffic = function (e) {
        return (
          '' === (e = e || document.referrer) ||
          _.getCookieTopLevelDomain(_.getHostname(e)) !==
            _.getCookieTopLevelDomain()
        );
      }),
      (_.ry = function (e) {
        return new _.ry.init(e);
      }),
      (_.ry.init = function (e) {
        this.ele = e;
      }),
      (_.ry.init.prototype = {
        addClass: function (e) {
          return (
            -1 === (' ' + this.ele.className + ' ').indexOf(' ' + e + ' ') &&
              (this.ele.className =
                this.ele.className +
                ('' === this.ele.className ? '' : ' ') +
                e),
            this
          );
        },
        removeClass: function (e) {
          var t = ' ' + this.ele.className + ' ';
          return (
            -1 !== t.indexOf(' ' + e + ' ') &&
              (this.ele.className = t.replace(' ' + e + ' ', ' ').slice(1, -1)),
            this
          );
        },
        hasClass: function (e) {
          return -1 !== (' ' + this.ele.className + ' ').indexOf(' ' + e + ' ');
        },
        attr: function (e, t) {
          return 'string' == typeof e && _.isUndefined(t)
            ? this.ele.getAttribute(e)
            : ('string' == typeof e &&
                ((t = String(t)), this.ele.setAttribute(e, t)),
              this);
        },
        offset: function () {
          var e = this.ele.getBoundingClientRect();
          if (e.width || e.height) {
            var t = this.ele.ownerDocument.documentElement;
            return {
              top: e.top + window.pageYOffset - t.clientTop,
              left: e.left + window.pageXOffset - t.clientLeft,
            };
          }
          return { top: 0, left: 0 };
        },
        getSize: function () {
          if (!window.getComputedStyle)
            return {
              width: this.ele.offsetWidth,
              height: this.ele.offsetHeight,
            };
          try {
            var e = this.ele.getBoundingClientRect();
            return { width: e.width, height: e.height };
          } catch (e) {
            return { width: 0, height: 0 };
          }
        },
        getStyle: function (e) {
          return this.ele.currentStyle
            ? this.ele.currentStyle[e]
            : this.ele.ownerDocument.defaultView
                .getComputedStyle(this.ele, null)
                .getPropertyValue(e);
        },
        wrap: function (e) {
          var t = document.createElement(e);
          return (
            this.ele.parentNode.insertBefore(t, this.ele),
            t.appendChild(this.ele),
            _.ry(t)
          );
        },
        getCssStyle: function (e) {
          var t = this.ele.style.getPropertyValue(e);
          if (t) return t;
          var r = null;
          if (
            ('function' == typeof window.getMatchedCSSRules &&
              (r = getMatchedCSSRules(this.ele)),
            !r || !_.isArray(r))
          )
            return null;
          for (var s = r.length - 1; s >= 0; s--)
            if ((t = r[s].style.getPropertyValue(e))) return t;
        },
        sibling: function (e, t) {
          for (; (e = e[t]) && 1 !== e.nodeType; );
          return e;
        },
        next: function () {
          return this.sibling(this.ele, 'nextSibling');
        },
        prev: function (e) {
          return this.sibling(this.ele, 'previousSibling');
        },
        siblings: function (e) {
          return this.siblings(
            (this.ele.parentNode || {}).firstChild,
            this.ele
          );
        },
        children: function (e) {
          return this.siblings(this.ele.firstChild);
        },
        parent: function () {
          var e = this.ele.parentNode;
          return (e = e && 11 !== e.nodeType ? e : null), _.ry(e);
        },
      }),
      (_.strToUnicode = function (e) {
        if ('string' != typeof e)
          return sd.log('\u8f6c\u6362unicode\u9519\u8bef', e), e;
        for (var t = '', r = 0; r < e.length; r++)
          t += '\\' + e.charCodeAt(r).toString(16);
        return t;
      }),
      (_.getReferrer = function (e) {
        return 'string' != typeof (e = e || document.referrer)
          ? '\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_' + String(e)
          : (0 === e.indexOf('https://www.baidu.com/') && (e = e.split('?')[0]),
            'string' ==
            typeof (e = e.slice(0, sd.para.max_referrer_string_length))
              ? e
              : '');
      }),
      (_.getKeywordFromReferrer = function (e) {
        e = e || document.referrer;
        var t = sd.para.source_type.keyword;
        if (document && 'string' == typeof e) {
          if (0 === e.indexOf('http')) {
            var r = _.getReferSearchEngine(e),
              s = _.getQueryParamsFromUrl(e);
            if (_.isEmptyObject(s)) return '\u672a\u53d6\u5230\u503c';
            var a = null;
            for (var i in t)
              if (r === i && 'object' == typeof s)
                if (((a = t[i]), _.isArray(a)))
                  for (i = 0; i < a.length; i++) {
                    var n = s[a[i]];
                    if (n) return n;
                  }
                else if (s[a]) return s[a];
            return '\u672a\u53d6\u5230\u503c';
          }
          return '' === e
            ? '\u672a\u53d6\u5230\u503c_\u76f4\u63a5\u6253\u5f00'
            : '\u672a\u53d6\u5230\u503c_\u975ehttp\u7684url';
        }
        return '\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_' + String(e);
      }),
      (_.getWxAdIdFromUrl = function (e) {
        var t = _.getQueryParam(e, 'gdt_vid'),
          r = _.getQueryParam(e, 'hash_key'),
          s = _.getQueryParam(e, 'callbacks'),
          a = { click_id: '', hash_key: '', callbacks: '' };
        return (
          _.isString(t) &&
            t.length &&
            ((a.click_id =
              16 == t.length || 18 == t.length
                ? t
                : '\u53c2\u6570\u89e3\u6790\u4e0d\u5408\u6cd5'),
            _.isString(r) && r.length && (a.hash_key = r),
            _.isString(s) && s.length && (a.callbacks = s)),
          a
        );
      }),
      (_.getReferSearchEngine = function (e) {
        var t = _.getHostname(e);
        if (!t || 'hostname\u89e3\u6790\u5f02\u5e38' === t) return '';
        sd.para.source_type.keyword;
        var r = {
          baidu: [/^.*\.baidu\.com$/],
          bing: [/^.*\.bing\.com$/],
          google: [
            /^www\.google\.com$/,
            /^www\.google\.com\.[a-z]{2}$/,
            /^www\.google\.[a-z]{2}$/,
          ],
          sm: [/^m\.sm\.cn$/],
          so: [/^.+\.so\.com$/],
          sogou: [/^.*\.sogou\.com$/],
          yahoo: [/^.*\.yahoo\.com$/],
        };
        for (var s in r)
          for (var a = r[s], i = 0, n = a.length; i < n; i++)
            if (a[i].test(t)) return s;
        return '\u672a\u77e5\u641c\u7d22\u5f15\u64ce';
      }),
      (_.getSourceFromReferrer = function () {
        function e(e, t) {
          for (var r = 0; r < e.length; r++)
            if (-1 !== t.split('?')[0].indexOf(e[r])) return !0;
        }
        var t = '(' + sd.para.source_type.utm.join('|') + ')\\=[^&]+',
          r = sd.para.source_type.search,
          s = sd.para.source_type.social,
          a = document.referrer || '',
          i = _.info.pageProp.url;
        if (i) {
          var n = i.match(new RegExp(t));
          return n && n[0]
            ? '\u4ed8\u8d39\u5e7f\u544a\u6d41\u91cf'
            : e(r, a)
            ? '\u81ea\u7136\u641c\u7d22\u6d41\u91cf'
            : e(s, a)
            ? '\u793e\u4ea4\u7f51\u7ad9\u6d41\u91cf'
            : '' === a
            ? '\u76f4\u63a5\u6d41\u91cf'
            : '\u5f15\u8350\u6d41\u91cf';
        }
        return '\u83b7\u53d6url\u5f02\u5e38';
      }),
      (_.info = {
        initPage: function () {
          var e = _.getReferrer(),
            t = location.href,
            r = _.getCurrentDomain(t);
          r || sd.debug.jssdkDebug('url_domain\u5f02\u5e38_' + t + '_' + r),
            (this.pageProp = {
              referrer: e,
              referrer_host: e ? _.getHostname(e) : '',
              url: t,
              url_host: _.getHostname(t, 'url_host\u53d6\u503c\u5f02\u5e38'),
              url_domain: r,
            });
        },
        pageProp: {},
        campaignParams: function () {
          var e = sd.source_channel_standard.split(' '),
            t = '',
            r = {};
          return (
            _.isArray(sd.para.source_channel) &&
              sd.para.source_channel.length > 0 &&
              ((e = e.concat(sd.para.source_channel)), (e = _.unique(e))),
            _.each(e, function (e) {
              (t = _.getQueryParam(location.href, e)).length && (r[e] = t);
            }),
            r
          );
        },
        campaignParamsStandard: function (e, t) {
          (e = e || ''), (t = t || '');
          var r = _.info.campaignParams(),
            s = {},
            a = {};
          return (
            _.each(r, function (r, i, n) {
              -1 !==
              (' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ')
                ? (s[e + i] = n[i])
                : (a[t + i] = n[i]);
            }),
            { $utms: s, otherUtms: a }
          );
        },
        properties: function () {
          return {
            $timezone_offset: new Date().getTimezoneOffset(),
            $screen_height: Number(screen.height) || 0,
            $screen_width: Number(screen.width) || 0,
            $lib: 'js',
            $lib_version: String(sd.lib_version),
          };
        },
        currentProps: {},
        register: function (e) {
          _.extend(_.info.currentProps, e);
        },
      }),
      (_.autoExeQueue = function () {
        return {
          items: [],
          enqueue: function (e) {
            this.items.push(e), this.start();
          },
          dequeue: function () {
            return this.items.shift();
          },
          getCurrentItem: function () {
            return this.items[0];
          },
          isRun: !1,
          start: function () {
            this.items.length > 0 &&
              !this.isRun &&
              ((this.isRun = !0), this.getCurrentItem().start());
          },
          close: function () {
            this.dequeue(), (this.isRun = !1), this.start();
          },
        };
      }),
      (_.trackLink = function (e, t, r) {
        var s = null;
        if (
          ((e = e || {}).ele && (s = e.ele),
          e.event && (s = e.target ? e.target : e.event.target),
          (r = r || {}),
          !s || 'object' != typeof s)
        )
          return !1;
        if (
          !s.href ||
          /^javascript/.test(s.href) ||
          s.target ||
          s.download ||
          s.onclick
        )
          return sd.track(t, r), !1;
        function a(e) {
          e.stopPropagation(), e.preventDefault();
          var a = !1;
          function i() {
            a || ((a = !0), (location.href = s.href));
          }
          setTimeout(i, 1e3), sd.track(t, r, i);
        }
        e.event && a(e.event),
          e.ele &&
            _.addEvent(e.ele, 'click', function (e) {
              a(e);
            });
      }),
      (_.eventEmitter = function () {
        (this._events = []), (this.pendingEvents = []);
      }),
      (_.eventEmitter.prototype = {
        emit: function (e) {
          var t = [].slice.call(arguments, 1);
          _.each(this._events, function (r) {
            r.type === e && r.callback.apply(r.context, t);
          });
        },
        on: function (e, t, r) {
          'function' == typeof t &&
            this._events.push({ type: e, callback: t, context: r || this });
        },
        tempAdd: function (e, t) {
          t &&
            e &&
            (this.pendingEvents.push({ type: e, data: t }),
            this.pendingEvents.length > 20 && this.pendingEvents.shift());
        },
        isReady: function () {
          var e = this;
          (this.tempAdd = this.emit),
            0 !== this.pendingEvents.length &&
              (_.each(this.pendingEvents, function (t) {
                e.emit(t.type, t.data);
              }),
              (this.pendingEvents = []));
        },
      }),
      (_.rot13obfs = function (e, t) {
        t = 'number' == typeof t ? t : 13;
        for (var r = (e = String(e)).split(''), s = 0, a = r.length; s < a; s++)
          r[s].charCodeAt(0) < 126 &&
            (r[s] = String.fromCharCode((r[s].charCodeAt(0) + t) % 126));
        return r.join('');
      }),
      (_.rot13defs = function (e) {
        return (e = String(e)), _.rot13obfs(e, 113);
      }),
      (_.urlSafeBase64 =
        ((ENC = { '+': '-', '/': '_', '=': '.' }),
        (DEC = { '-': '+', _: '/', '.': '=' }),
        {
          encode: function (e) {
            return e.replace(/[+\/=]/g, function (e) {
              return ENC[e];
            });
          },
          decode: function (e) {
            return e.replace(/[-_.]/g, function (e) {
              return DEC[e];
            });
          },
          trim: function (e) {
            return e.replace(/[.=]{1,2}$/, '');
          },
          isBase64: function (e) {
            return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e);
          },
          isUrlSafeBase64: function (e) {
            return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e);
          },
        })),
      (_.setCssStyle = function (e) {
        var t = document.createElement('style');
        t.type = 'text/css';
        try {
          t.appendChild(document.createTextNode(e));
        } catch (r) {
          t.styleSheet.cssText = e;
        }
        var r = document.getElementsByTagName('head')[0],
          s = document.getElementsByTagName('script')[0];
        r
          ? r.children.length
            ? r.insertBefore(t, r.children[0])
            : r.appendChild(t)
          : s.parentNode.insertBefore(t, s);
      }),
      (_.isIOS = function () {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
      }),
      (_.getIOSVersion = function () {
        try {
          var e = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
          return e && e[1] ? Number.parseInt(e[1], 10) : '';
        } catch (e) {
          return '';
        }
      }),
      (_.getUA = function () {
        var e,
          t = {},
          r = navigator.userAgent.toLowerCase();
        return (
          (e = r.match(/opera.([\d.]+)/))
            ? (t.opera = Number(e[1].split('.')[0]))
            : (e = r.match(/msie ([\d.]+)/))
            ? (t.ie = Number(e[1].split('.')[0]))
            : (e = r.match(/edge.([\d.]+)/))
            ? (t.edge = Number(e[1].split('.')[0]))
            : (e = r.match(/firefox\/([\d.]+)/))
            ? (t.firefox = Number(e[1].split('.')[0]))
            : (e = r.match(/chrome\/([\d.]+)/))
            ? (t.chrome = Number(e[1].split('.')[0]))
            : (e = r.match(/version\/([\d.]+).*safari/)) &&
              (t.safari = Number(e[1].match(/^\d*.\d*/))),
          t
        );
      }),
      (_.isSupportBeaconSend = function () {
        var e = _.getUA(),
          t = !1,
          r = navigator.userAgent.toLowerCase();
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
        ) {
          var s = (r.match(/os [\d._]*/gi) + '')
            .replace(/[^0-9|_.]/gi, '')
            .replace(/_/gi, '.')
            .split('.');
          s[0] && s[0] < 13
            ? (e.chrome > 41 ||
                e.firefox > 30 ||
                e.opera > 25 ||
                e.safari > 12) &&
              (t = !0)
            : (e.chrome > 41 ||
                e.firefox > 30 ||
                e.opera > 25 ||
                e.safari > 11.3) &&
              (t = !0);
        } else
          (e.chrome > 38 ||
            e.edge > 13 ||
            e.firefox > 30 ||
            e.opera > 25 ||
            e.safari > 11) &&
            (t = !0);
        return t;
      }),
      (sd.para_default = {
        preset_properties: {
          latest_utm: !0,
          latest_traffic_source_type: !0,
          latest_search_keyword: !0,
          latest_referrer: !0,
          latest_referrer_host: !1,
          latest_landing_page: !1,
          latest_wx_ad_click_id: !1,
          url: !1,
          title: !1,
        },
        img_use_crossorigin: !1,
        name: 'sa',
        max_referrer_string_length: 200,
        max_string_length: 500,
        cross_subdomain: !0,
        show_log: !0,
        is_debug: !1,
        debug_mode: !1,
        debug_mode_upload: !1,
        session_time: 0,
        use_client_time: !1,
        source_channel: [],
        send_type: 'image',
        vtrack_ignore: {},
        auto_init: !0,
        is_track_single_page: !1,
        is_single_page: !1,
        batch_send: !1,
        source_type: {},
        callback_timeout: 200,
        datasend_timeout: 3e3,
        queue_timeout: 300,
        is_track_device_id: !1,
        ignore_oom: !0,
        app_js_bridge: !1,
      }),
      (sd.addReferrerHost = function (e) {
        _.isObject(e.properties) &&
          (e.properties.$first_referrer &&
            (e.properties.$first_referrer_host = _.getHostname(
              e.properties.$first_referrer,
              '\u53d6\u503c\u5f02\u5e38'
            )),
          ('track' !== e.type && 'track_signup' !== e.type) ||
            ('$referrer' in e.properties &&
              (e.properties.$referrer_host =
                '' === e.properties.$referrer
                  ? ''
                  : _.getHostname(
                      e.properties.$referrer,
                      '\u53d6\u503c\u5f02\u5e38'
                    )),
            sd.para.preset_properties.latest_referrer &&
              sd.para.preset_properties.latest_referrer_host &&
              (e.properties.$latest_referrer_host =
                '' === e.properties.$latest_referrer
                  ? ''
                  : _.getHostname(
                      e.properties.$latest_referrer,
                      '\u53d6\u503c\u5f02\u5e38'
                    ))));
      }),
      (sd.addPropsHook = function (e) {
        sd.para.preset_properties &&
          sd.para.preset_properties.url &&
          ('track' === e.type || 'track_signup' === e.type) &&
          void 0 === e.properties.$url &&
          (e.properties.$url = window.location.href),
          sd.para.preset_properties &&
            sd.para.preset_properties.title &&
            ('track' === e.type || 'track_signup' === e.type) &&
            void 0 === e.properties.$title &&
            (e.properties.$title = document.title);
      }),
      (sd.initPara = function (e) {
        sd.para = e || sd.para || {};
        var t,
          r = {};
        if (_.isObject(sd.para.is_track_latest))
          for (var s in sd.para.is_track_latest)
            r['latest_' + s] = sd.para.is_track_latest[s];
        for (t in ((sd.para.preset_properties = _.extend(
          {},
          sd.para_default.preset_properties,
          r,
          sd.para.preset_properties || {}
        )),
        sd.para.preset_properties.latest_wx_ad_click_id &&
          (sd.para.preset_properties.url = !0),
        sd.para_default))
          void 0 === sd.para[t] && (sd.para[t] = sd.para_default[t]);
        'string' == typeof sd.para.server_url &&
          '://' === sd.para.server_url.slice(0, 3) &&
          (sd.para.server_url =
            location.protocol.slice(-1) + sd.para.server_url),
          'string' == typeof sd.para.web_url &&
            '://' === sd.para.web_url.slice(0, 3) &&
            (sd.para.web_url = location.protocol.slice(-1) + sd.para.web_url),
          'image' !== sd.para.send_type &&
            'ajax' !== sd.para.send_type &&
            'beacon' !== sd.para.send_type &&
            (sd.para.send_type = 'image'),
          sd.debug.protocol.serverUrl(),
          sd.bridge.initPara(),
          sd.bridge.initState();
        var a = { datasend_timeout: 6e3, send_interval: 6e3 };
        _.localStorage.isSupport() &&
        _.isSupportCors() &&
        'object' == typeof localStorage
          ? !0 === sd.para.batch_send
            ? ((sd.para.batch_send = _.extend({}, a)),
              (sd.para.use_client_time = !0))
            : 'object' == typeof sd.para.batch_send &&
              ((sd.para.use_client_time = !0),
              (sd.para.batch_send = _.extend({}, a, sd.para.batch_send)))
          : (sd.para.batch_send = !1);
        var i = [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_content',
            'utm_term',
          ],
          n = [
            'www.baidu.',
            'm.baidu.',
            'm.sm.cn',
            'so.com',
            'sogou.com',
            'youdao.com',
            'google.',
            'yahoo.com/',
            'bing.com/',
            'ask.com/',
          ],
          o = [
            'weibo.com',
            'renren.com',
            'kaixin001.com',
            'douban.com',
            'qzone.qq.com',
            'zhihu.com',
            'tieba.baidu.com',
            'weixin.qq.com',
          ],
          d = {
            baidu: ['wd', 'word', 'kw', 'keyword'],
            google: 'q',
            bing: 'q',
            yahoo: 'p',
            sogou: ['query', 'keyword'],
            so: 'q',
            sm: 'q',
          };
        'object' == typeof sd.para.source_type &&
          ((sd.para.source_type.utm = _.isArray(sd.para.source_type.utm)
            ? sd.para.source_type.utm.concat(i)
            : i),
          (sd.para.source_type.search = _.isArray(sd.para.source_type.search)
            ? sd.para.source_type.search.concat(n)
            : n),
          (sd.para.source_type.social = _.isArray(sd.para.source_type.social)
            ? sd.para.source_type.social.concat(o)
            : o),
          (sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword)
            ? _.extend(d, sd.para.source_type.keyword)
            : d));
        var c = [
          'mark',
          '/mark',
          'strong',
          'b',
          'em',
          'i',
          'u',
          'abbr',
          'ins',
          'del',
          's',
          'sup',
        ];
        if (_.isObject(sd.para.heatmap)) {
          (sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default'),
            (sd.para.heatmap.scroll_notice_map =
              sd.para.heatmap.scroll_notice_map || 'default'),
            (sd.para.heatmap.scroll_delay_time =
              sd.para.heatmap.scroll_delay_time || 4e3),
            (sd.para.heatmap.scroll_event_duration =
              sd.para.heatmap.scroll_event_duration || 18e3),
            (sd.para.heatmap.renderRefreshTime =
              sd.para.heatmap.renderRefreshTime || 1e3),
            (sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1e3);
          var u = _.isArray(sd.para.heatmap.track_attr)
            ? _.filter(sd.para.heatmap.track_attr, function (e) {
                return e && 'string' == typeof e;
              })
            : [];
          u.push('data-sensors-click'),
            (sd.para.heatmap.track_attr = u),
            _.isObject(sd.para.heatmap.collect_tags)
              ? !0 === sd.para.heatmap.collect_tags.div
                ? (sd.para.heatmap.collect_tags.div = { ignore_tags: c })
                : _.isObject(sd.para.heatmap.collect_tags.div)
                ? sd.para.heatmap.collect_tags.div.ignore_tags
                  ? _.isArray(sd.para.heatmap.collect_tags.div.ignore_tags) ||
                    (sd.log(
                      'ignore_tags \u53c2\u6570\u5fc5\u987b\u662f\u6570\u7ec4\u683c\u5f0f'
                    ),
                    (sd.para.heatmap.collect_tags.div.ignore_tags = c))
                  : (sd.para.heatmap.collect_tags.div.ignore_tags = c)
                : (sd.para.heatmap.collect_tags.div = !1)
              : (sd.para.heatmap.collect_tags = { div: !1 });
        }
        if (_.isArray(sd.para.server_url) && sd.para.server_url.length)
          for (t = 0; t < sd.para.server_url.length; t++)
            /sa\.gif[^\/]*$/.test(sd.para.server_url[t]) ||
              (sd.para.server_url[t] = sd.para.server_url[t]
                .replace(/\/sa$/, '/sa.gif')
                .replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2'));
        else
          /sa\.gif[^\/]*$/.test(sd.para.server_url) ||
            'string' != typeof sd.para.server_url ||
            (sd.para.server_url = sd.para.server_url
              .replace(/\/sa$/, '/sa.gif')
              .replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2'));
        'string' == typeof sd.para.server_url &&
          (sd.para.debug_mode_url =
            sd.para.debug_mode_url ||
            sd.para.server_url.replace('sa.gif', 'debug')),
          !0 === sd.para.noCache
            ? (sd.para.noCache = '?' + new Date().getTime())
            : (sd.para.noCache = ''),
          sd.para.callback_timeout > sd.para.datasend_timeout &&
            (sd.para.datasend_timeout = sd.para.callback_timeout),
          sd.para.callback_timeout > sd.para.queue_timeout &&
            (sd.para.queue_timeout = sd.para.callback_timeout),
          sd.para.queue_timeout > sd.para.datasend_timeout &&
            (sd.para.datasend_timeout = sd.para.queue_timeout);
      }),
      (sd.readyState = {
        state: 0,
        historyState: [],
        stateType: {
          1: '1-init\u672a\u5f00\u59cb',
          2: '2-init\u5f00\u59cb',
          3: '3-store\u5b8c\u6210',
        },
        getState: function () {
          return this.historyState.join('\n');
        },
        setState: function (e) {
          String(e) in this.stateType && (this.state = e),
            this.historyState.push(this.stateType[e]);
        },
      }),
      (sd.setPreConfig = function (e) {
        (sd.para = e.para), (sd._q = e._q);
      }),
      (sd.setInitVar = function () {
        (sd._t = sd._t || 1 * new Date()),
          (sd.lib_version = '1.16.1'),
          (sd.is_first_visitor = !1),
          (sd.source_channel_standard =
            'utm_source utm_medium utm_campaign utm_content utm_term');
      }),
      (sd.log = function () {
        if (
          ((_.sessionStorage.isSupport() &&
            'true' === sessionStorage.getItem('sensorsdata_jssdk_debug')) ||
            sd.para.show_log) &&
          (!_.isObject(arguments[0]) ||
            (!0 !== sd.para.show_log &&
              'string' !== sd.para.show_log &&
              !1 !== sd.para.show_log) ||
            (arguments[0] = _.formatJsonString(arguments[0])),
          'object' == typeof console && console.log)
        )
          try {
            return console.log.apply(console, arguments);
          } catch (e) {
            console.log(arguments[0]);
          }
      }),
      (sd.enableLocalLog = function () {
        if (_.sessionStorage.isSupport())
          try {
            sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
          } catch (e) {
            sd.log('enableLocalLog error: ' + e.message);
          }
      }),
      (sd.disableLocalLog = function () {
        _.sessionStorage.isSupport() &&
          sessionStorage.removeItem('sensorsdata_jssdk_debug');
      }),
      (sd.debug = {
        distinct_id: function () {},
        jssdkDebug: function () {},
        _sendDebug: function (e) {
          sd.track('_sensorsdata2019_debug', { _jssdk_debug_info: e });
        },
        apph5: function (e) {
          var t = 'app_h5\u6253\u901a\u5931\u8d25-',
            r = {
              1: t + 'use_app_track\u4e3afalse',
              2:
                t +
                'Android\u6216\u8005iOS\uff0c\u6ca1\u6709\u66b4\u9732\u76f8\u5e94\u65b9\u6cd5',
              3.1: t + 'Android\u6821\u9a8cserver_url\u5931\u8d25',
              3.2: t + 'iOS\u6821\u9a8cserver_url\u5931\u8d25',
              4.1: t + 'H5 \u6821\u9a8c iOS server_url \u5931\u8d25',
              4.2: t + 'H5 \u6821\u9a8c Android server_url \u5931\u8d25',
            },
            s = e.output,
            a = e.step,
            i = e.data || '';
          ('all' !== s && 'console' !== s) || sd.log(r[a]),
            ('all' === s || 'code' === s) &&
              _.isObject(sd.para.is_debug) &&
              sd.para.is_debug.apph5 &&
              ((i.type && 'profile' === i.type.slice(0, 7)) ||
                (i.properties._jssdk_debug_info = 'apph5-' + String(a)));
        },
        defineMode: function (e) {
          var t = {
            1: {
              title:
                '\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9',
              message:
                'App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 App SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002',
              link_text: '\u914d\u7f6e\u6587\u6863',
              link_url:
                'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html',
            },
            2: {
              title:
                '\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9',
              message:
                'App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 Web JS SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002',
              link_text: '\u914d\u7f6e\u6587\u6863',
              link_url:
                'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html',
            },
            3: {
              title:
                '\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9',
              message:
                'Web JS SDK \u6ca1\u6709\u5f00\u542f\u5168\u57cb\u70b9\u914d\u7f6e\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002',
              link_text: '\u914d\u7f6e\u6587\u6863',
              link_url:
                'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html',
            },
            4: {
              title:
                '\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9',
              message:
                'Web JS SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0e App SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0d\u4e00\u81f4\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002',
              link_text: '\u914d\u7f6e\u6587\u6863',
              link_url:
                'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html',
            },
          };
          return !(!e || !t[e]) && t[e];
        },
        protocol: {
          protocolIsSame: function (e, t) {
            try {
              if (_.URL(e).protocol !== _.URL(t).protocol) return !1;
            } catch (e) {
              return sd.log(e), !1;
            }
            return !0;
          },
          serverUrl: function () {
            _.isString(sd.para.server_url) &&
              '' !== sd.para.server_url &&
              !this.protocolIsSame(sd.para.server_url, location.href) &&
              sd.log(
                'SDK \u68c0\u6d4b\u5230\u60a8\u7684\u6570\u636e\u53d1\u9001\u5730\u5740\u548c\u5f53\u524d\u9875\u9762\u5730\u5740\u7684\u534f\u8bae\u4e0d\u4e00\u81f4\uff0c\u5efa\u8bae\u60a8\u4fee\u6539\u6210\u4e00\u81f4\u7684\u534f\u8bae\u3002\n\u56e0\u4e3a\uff1a1\u3001https \u4e0b\u9762\u53d1\u9001 http \u7684\u56fe\u7247\u8bf7\u6c42\u4f1a\u5931\u8d25\u30022\u3001http \u9875\u9762\u4f7f\u7528 https + ajax \u65b9\u5f0f\u53d1\u6570\u636e\uff0c\u5728 ie9 \u53ca\u4ee5\u4e0b\u4f1a\u4e22\u5931\u6570\u636e\u3002'
              );
          },
          ajax: function (e) {
            if (e === sd.para.server_url) return !1;
            _.isString(e) &&
              '' !== e &&
              !this.protocolIsSame(e, location.href) &&
              sd.log(
                'SDK \u68c0\u6d4b\u5230\u60a8\u7684\u6570\u636e\u53d1\u9001\u5730\u5740\u548c\u5f53\u524d\u9875\u9762\u5730\u5740\u7684\u534f\u8bae\u4e0d\u4e00\u81f4\uff0c\u5efa\u8bae\u60a8\u4fee\u6539\u6210\u4e00\u81f4\u7684\u534f\u8bae\u3002\u56e0\u4e3a http \u9875\u9762\u4f7f\u7528 https + ajax \u65b9\u5f0f\u53d1\u6570\u636e\uff0c\u5728 ie9 \u53ca\u4ee5\u4e0b\u4f1a\u4e22\u5931\u6570\u636e\u3002'
              );
          },
        },
      });
    var commonWays = {
      setOnlineState: function (e) {
        if (
          !0 === e &&
          _.isObject(sd.para.jsapp) &&
          'function' == typeof sd.para.jsapp.getData
        ) {
          sd.para.jsapp.isOnline = !0;
          var t = sd.para.jsapp.getData();
          _.isArray(t) &&
            t.length > 0 &&
            _.each(t, function (e) {
              _.isJSONString(e) && sd.sendState.pushSend(JSON.parse(e));
            });
        } else sd.para.jsapp.isOnline = !1;
      },
      autoTrackIsUsed: !1,
      isReady: function (e) {
        e();
      },
      getUtm: function () {
        return _.info.campaignParams();
      },
      getStayTime: function () {
        return (new Date() - sd._t) / 1e3;
      },
      setProfileLocal: function (e) {
        if (!_.localStorage.isSupport()) return sd.setProfile(e), !1;
        if (!_.isObject(e) || _.isEmptyObject(e)) return !1;
        var t = _.localStorage.parse('sensorsdata_2015_jssdk_profile'),
          r = !1;
        if (_.isObject(t) && !_.isEmptyObject(t)) {
          for (var s in e)
            (!(s in t && t[s] !== e[s]) && s in t) || ((t[s] = e[s]), (r = !0));
          r &&
            (_.localStorage.set(
              'sensorsdata_2015_jssdk_profile',
              JSON.stringify(t)
            ),
            sd.setProfile(e));
        } else
          _.localStorage.set(
            'sensorsdata_2015_jssdk_profile',
            JSON.stringify(e)
          ),
            sd.setProfile(e);
      },
      setInitReferrer: function () {
        var e = _.getReferrer();
        sd.setOnceProfile({
          _init_referrer: e,
          _init_referrer_host: _.info.pageProp.referrer_host,
        });
      },
      setSessionReferrer: function () {
        var e = _.getReferrer();
        store.setSessionPropsOnce({
          _session_referrer: e,
          _session_referrer_host: _.info.pageProp.referrer_host,
        });
      },
      setDefaultAttr: function () {
        _.info.register({
          _current_url: location.href,
          _referrer: _.getReferrer(),
          _referring_host: _.info.pageProp.referrer_host,
        });
      },
      trackHeatMap: function (e, t, r) {
        if ('object' == typeof e && e.tagName) {
          var s = e.tagName.toLowerCase(),
            a = e.parentNode.tagName.toLowerCase(),
            i =
              sd.para.heatmap && sd.para.heatmap.track_attr
                ? sd.para.heatmap.track_attr
                : ['data-sensors-click'];
          'button' === s ||
            'a' === s ||
            'a' === a ||
            'button' === a ||
            'input' === s ||
            'textarea' === s ||
            _.hasAttributes(e, i) ||
            heatmap.start(null, e, s, t, r);
        }
      },
      trackAllHeatMap: function (e, t, r) {
        if ('object' == typeof e && e.tagName) {
          var s = e.tagName.toLowerCase();
          heatmap.start(null, e, s, t, r);
        }
      },
      autoTrackSinglePage: function (e, t) {
        if (this.autoTrackIsUsed) var r = _.info.pageProp.url;
        else r = _.info.pageProp.referrer;
        function s() {
          var e = _.info.campaignParams(),
            t = {};
          return (
            _.each(e, function (e, r, s) {
              -1 !==
              (' ' + sd.source_channel_standard + ' ').indexOf(' ' + r + ' ')
                ? (t['$' + r] = s[r])
                : (t[r] = s[r]);
            }),
            t
          );
        }
        function a(e, t) {
          sd.track(
            '$pageview',
            _.extend(
              {
                $referrer: r,
                $url: location.href,
                $url_path: location.pathname,
                $title: document.title,
              },
              e,
              s()
            ),
            t
          ),
            (r = location.href);
        }
        (e = _.isObject(e) ? e : {}),
          (e = _.isObject(e) ? e : {}),
          sd.is_first_visitor &&
            !e.not_set_profile &&
            (sd.setOnceProfile(
              _.extend(
                {
                  $first_visit_time: new Date(),
                  $first_referrer: _.getReferrer(),
                  $first_browser_language:
                    navigator.language || '\u53d6\u503c\u5f02\u5e38',
                  $first_browser_charset:
                    'string' == typeof document.charset
                      ? document.charset.toUpperCase()
                      : '\u53d6\u503c\u5f02\u5e38',
                  $first_traffic_source_type: _.getSourceFromReferrer(),
                  $first_search_keyword: _.getKeywordFromReferrer(),
                },
                s()
              )
            ),
            (sd.is_first_visitor = !1)),
          e.not_set_profile && delete e.not_set_profile,
          a(e, t),
          (this.autoTrackSinglePage = a);
      },
      autoTrackWithoutProfile: function (e, t) {
        (e = _.isObject(e) ? e : {}),
          this.autoTrack(_.extend(e, { not_set_profile: !0 }), t);
      },
      autoTrack: function (e, t) {
        e = _.isObject(e) ? e : {};
        var r = _.info.campaignParams(),
          s = {};
        _.each(r, function (e, t, r) {
          -1 !== (' ' + sd.source_channel_standard + ' ').indexOf(' ' + t + ' ')
            ? (s['$' + t] = r[t])
            : (s[t] = r[t]);
        }),
          sd.is_first_visitor &&
            !e.not_set_profile &&
            (sd.setOnceProfile(
              _.extend(
                {
                  $first_visit_time: new Date(),
                  $first_referrer: _.getReferrer(),
                  $first_browser_language:
                    navigator.language || '\u53d6\u503c\u5f02\u5e38',
                  $first_browser_charset:
                    'string' == typeof document.charset
                      ? document.charset.toUpperCase()
                      : '\u53d6\u503c\u5f02\u5e38',
                  $first_traffic_source_type: _.getSourceFromReferrer(),
                  $first_search_keyword: _.getKeywordFromReferrer(),
                },
                s
              )
            ),
            (sd.is_first_visitor = !1)),
          e.not_set_profile && delete e.not_set_profile;
        var a = location.href;
        sd.para.is_single_page &&
          _.addHashEvent(function () {
            var r = _.getReferrer(a);
            sd.track(
              '$pageview',
              _.extend(
                {
                  $referrer: r,
                  $url: location.href,
                  $url_path: location.pathname,
                  $title: document.title,
                },
                s,
                e
              ),
              t
            ),
              (a = location.href);
          }),
          sd.track(
            '$pageview',
            _.extend(
              {
                $referrer: _.getReferrer(),
                $url: location.href,
                $url_path: location.pathname,
                $title: document.title,
              },
              s,
              e
            ),
            t
          ),
          (this.autoTrackIsUsed = !0);
      },
      getAnonymousID: function () {
        return _.isEmptyObject(sd.store._state)
          ? '\u8bf7\u5148\u521d\u59cb\u5316SDK'
          : sd.store._state._first_id ||
              sd.store._state.first_id ||
              sd.store._state._distinct_id ||
              sd.store._state.distinct_id;
      },
      setPlugin: function (e) {
        if (!_.isObject(e)) return !1;
        _.each(e, function (e, t) {
          _.isFunction(e) &&
            (_.isObject(window.SensorsDataWebJSSDKPlugin) &&
            window.SensorsDataWebJSSDKPlugin[t]
              ? e(window.SensorsDataWebJSSDKPlugin[t])
              : sd.log(
                  t +
                    '\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574' +
                    t +
                    '\u7684\u5f15\u5165\u987a\u5e8f\uff01'
                ));
        });
      },
      useModulePlugin: function () {
        sd.use.apply(sd, arguments);
      },
      useAppPlugin: function () {
        this.setPlugin.apply(this, arguments);
      },
    };
    function BatchSend() {
      (this.sendingData = 0), (this.sendingItemKeys = []);
    }
    (sd.quick = function () {
      var e = Array.prototype.slice.call(arguments),
        t = e[0],
        r = e.slice(1);
      if ('string' == typeof t && commonWays[t])
        return commonWays[t].apply(commonWays, r);
      'function' == typeof t
        ? t.apply(sd, r)
        : sd.log(
            'quick\u65b9\u6cd5\u4e2d\u6ca1\u6709\u8fd9\u4e2a\u529f\u80fd' + e[0]
          );
    }),
      (sd.use = function (e, t) {
        return _.isString(e)
          ? _.isObject(window.SensorsDataWebJSSDKPlugin) &&
            _.isObject(window.SensorsDataWebJSSDKPlugin[e]) &&
            _.isFunction(window.SensorsDataWebJSSDKPlugin[e].init)
            ? (window.SensorsDataWebJSSDKPlugin[e].init(sd, t),
              window.SensorsDataWebJSSDKPlugin[e])
            : _.isObject(sd.modules) &&
              _.isObject(sd.modules[e]) &&
              _.isFunction(sd.modules[e].init)
            ? (sd.modules[e].init(sd, t), sd.modules[e])
            : void sd.log(
                e +
                  '\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574' +
                  e +
                  '\u7684\u5f15\u5165\u987a\u5e8f\uff01'
              )
          : (sd.log(
              'use\u63d2\u4ef6\u540d\u79f0\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff01'
            ),
            !1);
      }),
      (sd.track = function (e, t, r) {
        saEvent.check({ event: e, properties: t }) &&
          saEvent.send({ type: 'track', event: e, properties: t }, r);
      }),
      (sd.trackLink = function (e, t, r) {
        'object' == typeof e && e.tagName
          ? _.trackLink({ ele: e }, t, r)
          : 'object' == typeof e && e.target && e.event && _.trackLink(e, t, r);
      }),
      (sd.trackLinks = function (e, t, r) {
        return (
          (r = r || {}),
          !(!e || 'object' != typeof e) &&
            !(!e.href || /^javascript/.test(e.href) || e.target) &&
            void _.addEvent(e, 'click', function (s) {
              s.preventDefault();
              var a = !1;
              function i() {
                a || ((a = !0), (location.href = e.href));
              }
              setTimeout(i, 1e3), sd.track(t, r, i);
            })
        );
      }),
      (sd.setProfile = function (e, t) {
        saEvent.check({ propertiesMust: e }) &&
          saEvent.send({ type: 'profile_set', properties: e }, t);
      }),
      (sd.setOnceProfile = function (e, t) {
        saEvent.check({ propertiesMust: e }) &&
          saEvent.send({ type: 'profile_set_once', properties: e }, t);
      }),
      (sd.appendProfile = function (e, t) {
        saEvent.check({ propertiesMust: e }) &&
          (_.each(e, function (t, r) {
            _.isString(t)
              ? (e[r] = [t])
              : _.isArray(t)
              ? (e[r] = t)
              : (delete e[r],
                sd.log(
                  'appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4'
                ));
          }),
          _.isEmptyObject(e) ||
            saEvent.send({ type: 'profile_append', properties: e }, t));
      }),
      (sd.incrementProfile = function (e, t) {
        var r = e;
        _.isString(e) && ((e = {})[r] = 1),
          saEvent.check({ propertiesMust: e }) &&
            (!(function (e) {
              for (var t in e)
                if (
                  Object.prototype.hasOwnProperty.call(e, t) &&
                  !/-*\d+/.test(String(e[t]))
                )
                  return !1;
              return !0;
            })(e)
              ? sd.log(
                  'profile_increment\u7684\u503c\u53ea\u80fd\u662f\u6570\u5b57'
                )
              : saEvent.send({ type: 'profile_increment', properties: e }, t));
      }),
      (sd.deleteProfile = function (e) {
        saEvent.send({ type: 'profile_delete' }, e),
          store.set('distinct_id', _.UUID()),
          store.set('first_id', '');
      }),
      (sd.unsetProfile = function (e, t) {
        var r = e,
          s = {};
        _.isString(e) && (e = []).push(r),
          _.isArray(e)
            ? (_.each(e, function (e) {
                _.isString(e)
                  ? (s[e] = !0)
                  : sd.log(
                      'profile_unset\u7ed9\u7684\u6570\u7ec4\u91cc\u9762\u7684\u503c\u5fc5\u987b\u65f6string,\u5df2\u7ecf\u8fc7\u6ee4\u6389',
                      e
                    );
              }),
              saEvent.send({ type: 'profile_unset', properties: s }, t))
            : sd.log('profile_unset\u7684\u53c2\u6570\u662f\u6570\u7ec4');
      }),
      (sd.identify = function (e, t) {
        'number' == typeof e && (e = String(e));
        var r = store.getFirstId();
        if (void 0 === e) {
          var s = _.UUID();
          r ? store.set('first_id', s) : store.set('distinct_id', s);
        } else
          saEvent.check({ distinct_id: e })
            ? !0 === t
              ? r
                ? store.set('first_id', e)
                : store.set('distinct_id', e)
              : r
              ? store.change('first_id', e)
              : store.change('distinct_id', e)
            : sd.log(
                'identify\u7684\u53c2\u6570\u5fc5\u987b\u662f\u5b57\u7b26\u4e32'
              );
      }),
      (sd.trackSignup = function (e, t, r, s) {
        if (saEvent.check({ distinct_id: e, event: t, properties: r })) {
          var a = store.getFirstId() || store.getDistinctId();
          store.set('distinct_id', e),
            saEvent.send(
              {
                original_id: a,
                distinct_id: e,
                type: 'track_signup',
                event: t,
                properties: r,
              },
              s
            );
        }
      }),
      (sd.registerPage = function (e) {
        saEvent.check({ properties: e })
          ? _.extend(_.info.currentProps, e)
          : sd.log('register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef');
      }),
      (sd.clearAllRegister = function (e) {
        store.clearAllProps(e);
      }),
      (sd.register = function (e) {
        saEvent.check({ properties: e })
          ? store.setProps(e)
          : sd.log('register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef');
      }),
      (sd.registerOnce = function (e) {
        saEvent.check({ properties: e })
          ? store.setPropsOnce(e)
          : sd.log('registerOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef');
      }),
      (sd.registerSession = function (e) {
        saEvent.check({ properties: e })
          ? store.setSessionProps(e)
          : sd.log('registerSession\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef');
      }),
      (sd.registerSessionOnce = function (e) {
        saEvent.check({ properties: e })
          ? store.setSessionPropsOnce(e)
          : sd.log(
              'registerSessionOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef'
            );
      }),
      (sd.login = function (e, t) {
        if (
          ('number' == typeof e && (e = String(e)),
          saEvent.check({ distinct_id: e }))
        ) {
          var r = store.getFirstId(),
            s = store.getDistinctId();
          e !== s
            ? (r || store.set('first_id', s),
              sd.trackSignup(e, '$SignUp', {}, t))
            : t && t();
        } else
          sd.log('login\u7684\u53c2\u6570\u5fc5\u987b\u662f\u5b57\u7b26\u4e32'),
            t && t();
      }),
      (sd.logout = function (e) {
        var t = store.getFirstId();
        if (t)
          if ((store.set('first_id', ''), !0 === e)) {
            var r = _.UUID();
            store.set('distinct_id', r);
          } else store.set('distinct_id', t);
        else sd.log('\u6ca1\u6709first_id\uff0clogout\u5931\u8d25');
      }),
      (sd.getPresetProperties = function () {
        var e,
          t,
          r = {
            $is_first_day: _.cookie.getNewUser(),
            $referrer: _.info.pageProp.referrer || '',
            $referrer_host: _.info.pageProp.referrer
              ? _.getHostname(_.info.pageProp.referrer)
              : '',
            $url: location.href,
            $url_path: location.pathname,
            $title: document.title || '',
            _distinct_id: store.getDistinctId(),
          },
          s = _.extend(
            {},
            _.info.properties(),
            sd.store.getProps(),
            ((e = _.info.campaignParams()),
            (t = {}),
            _.each(e, function (e, r, s) {
              -1 !==
              (' ' + sd.source_channel_standard + ' ').indexOf(' ' + r + ' ')
                ? (t['$' + r] = s[r])
                : (t[r] = s[r]);
            }),
            t),
            r
          );
        return (
          sd.para.preset_properties.latest_referrer &&
            sd.para.preset_properties.latest_referrer_host &&
            (s.$latest_referrer_host =
              '' === s.$latest_referrer
                ? ''
                : _.getHostname(s.$latest_referrer)),
          s
        );
      }),
      (sd.detectMode = function () {
        var e = {
            searchKeywordMatch: location.search.match(/sa-request-id=([^&#]+)/),
            isSeachHasKeyword: function () {
              var e = this.searchKeywordMatch;
              return (
                !!(e && e[0] && e[1]) &&
                ('string' ==
                  typeof sessionStorage.getItem('sensors-visual-mode') &&
                  sessionStorage.removeItem('sensors-visual-mode'),
                !0)
              );
            },
            hasKeywordHandle: function () {
              var e = this.searchKeywordMatch,
                t = location.search.match(/sa-request-type=([^&#]+)/),
                r = location.search.match(/sa-request-url=([^&#]+)/);
              heatmap.setNotice(r),
                _.sessionStorage.isSupport() &&
                  (r &&
                    r[0] &&
                    r[1] &&
                    sessionStorage.setItem(
                      'sensors_heatmap_url',
                      decodeURIComponent(r[1])
                    ),
                  sessionStorage.setItem('sensors_heatmap_id', e[1]),
                  t && t[0] && t[1]
                    ? '1' === t[1] || '2' === t[1] || '3' === t[1]
                      ? ((t = t[1]),
                        sessionStorage.setItem('sensors_heatmap_type', t))
                      : (t = null)
                    : (t =
                        null !== sessionStorage.getItem('sensors_heatmap_type')
                          ? sessionStorage.getItem('sensors_heatmap_type')
                          : null)),
                this.isReady(e[1], t);
            },
            isReady: function (e, t, r) {
              sd.para.heatmap_url
                ? _.loadScript({
                    success: function () {
                      setTimeout(function () {
                        'undefined' != typeof sa_jssdk_heatmap_render &&
                          (sa_jssdk_heatmap_render(sd, e, t, r),
                          'object' == typeof console &&
                            'function' == typeof console.log &&
                            ((sd.heatmap_version &&
                              sd.heatmap_version === sd.lib_version) ||
                              console.log(
                                'heatmap.js\u4e0esensorsdata.js\u7248\u672c\u53f7\u4e0d\u4e00\u81f4\uff0c\u53ef\u80fd\u5b58\u5728\u98ce\u9669!'
                              )));
                      }, 0);
                    },
                    error: function () {},
                    type: 'js',
                    url: sd.para.heatmap_url,
                  })
                : sd.log(
                    '\u6ca1\u6709\u6307\u5b9aheatmap_url\u7684\u8def\u5f84'
                  );
            },
            isStorageHasKeyword: function () {
              return (
                _.sessionStorage.isSupport() &&
                'string' == typeof sessionStorage.getItem('sensors_heatmap_id')
              );
            },
            storageHasKeywordHandle: function () {
              heatmap.setNotice(),
                e.isReady(
                  sessionStorage.getItem('sensors_heatmap_id'),
                  sessionStorage.getItem('sensors_heatmap_type'),
                  location.href
                );
            },
          },
          t = {
            isStorageHasKeyword: function () {
              return (
                _.sessionStorage.isSupport() &&
                'string' == typeof sessionStorage.getItem('sensors-visual-mode')
              );
            },
            isSearchHasKeyword: function () {
              return (
                !!location.search.match(/sa-visual-mode=true/) &&
                ('string' ==
                  typeof sessionStorage.getItem('sensors_heatmap_id') &&
                  sessionStorage.removeItem('sensors_heatmap_id'),
                !0)
              );
            },
            loadVtrack: function () {
              _.loadScript({
                success: function () {},
                error: function () {},
                type: 'js',
                url: sd.para.vtrack_url
                  ? sd.para.vtrack_url
                  : location.protocol +
                    '//static.sensorsdata.cn/sdk/' +
                    sd.lib_version +
                    '/vtrack.min.js',
              });
            },
            messageListener: function (e) {
              if ('sa-fe' !== e.data.source) return !1;
              'v-track-mode' === e.data.type &&
                (e.data.data &&
                  e.data.data.isVtrack &&
                  (_.sessionStorage.isSupport() &&
                    sessionStorage.setItem('sensors-visual-mode', 'true'),
                  e.data.data.userURL &&
                  location.search.match(/sa-visual-mode=true/)
                    ? (window.location.href = e.data.data.userURL)
                    : t.loadVtrack()),
                window.removeEventListener('message', t.messageListener, !1));
            },
            removeMessageHandle: function () {
              window.removeEventListener &&
                window.removeEventListener('message', t.messageListener, !1);
            },
            verifyVtrackMode: function () {
              window.addEventListener &&
                window.addEventListener('message', t.messageListener, !1),
                t.postMessage();
            },
            postMessage: function () {
              window.parent &&
                window.parent.postMessage &&
                window.parent.postMessage(
                  {
                    source: 'sa-web-sdk',
                    type: 'v-is-vtrack',
                    data: { sdkversion: '1.16.1' },
                  },
                  '*'
                );
            },
            notifyUser: function () {
              var e = function (t) {
                if ('sa-fe' !== t.data.source) return !1;
                'v-track-mode' === t.data.type &&
                  (t.data.data &&
                    t.data.data.isVtrack &&
                    alert(
                      '\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\uff0c\u8bf7\u5347\u7ea7\u90e8\u7f72\u795e\u7b56\u6570\u636e\u6cbb\u7406'
                    ),
                  window.removeEventListener('message', e, !1));
              };
              window.addEventListener &&
                window.addEventListener('message', e, !1),
                t.postMessage();
            },
          },
          r = function (e) {
            var t = sd.bridge.initDefineBridgeInfo();
            function r() {
              var e = [];
              t.touch_app_bridge || e.push(sd.debug.defineMode('1')),
                _.isObject(sd.para.app_js_bridge) ||
                  (e.push(sd.debug.defineMode('2')), (t.verify_success = !1)),
                (_.isObject(sd.para.heatmap) &&
                  'default' == sd.para.heatmap.clickmap) ||
                  e.push(sd.debug.defineMode('3')),
                'fail' === t.verify_success && e.push(sd.debug.defineMode('4'));
              var r = { callType: 'app_alert', data: e };
              SensorsData_App_Visual_Bridge &&
              SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info
                ? SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(
                    JSON.stringify(r)
                  )
                : window.webkit &&
                  window.webkit.messageHandlers &&
                  window.webkit.messageHandlers.sensorsdataNativeTracker &&
                  window.webkit.messageHandlers.sensorsdataNativeTracker
                    .postMessage &&
                  window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(
                    JSON.stringify(r)
                  );
            }
            if (
              _.isObject(window.SensorsData_App_Visual_Bridge) &&
              window.SensorsData_App_Visual_Bridge
                .sensorsdata_visualized_mode &&
              (!0 ===
                window.SensorsData_App_Visual_Bridge
                  .sensorsdata_visualized_mode ||
                window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode())
            )
              if (
                _.isObject(sd.para.heatmap) &&
                'default' == sd.para.heatmap.clickmap
              )
                if (
                  _.isObject(sd.para.app_js_bridge) &&
                  'success' === t.verify_success
                )
                  if (e) sa_jssdk_app_define_mode(sd, e);
                  else {
                    var s = location.protocol;
                    (s = _.indexOf(['http:', 'https:'], s) > -1 ? s : 'https:'),
                      _.loadScript({
                        success: function () {
                          setTimeout(function () {
                            'undefined' != typeof sa_jssdk_app_define_mode &&
                              sa_jssdk_app_define_mode(sd, e);
                          }, 0);
                        },
                        error: function () {},
                        type: 'js',
                        url:
                          s +
                          '//static.sensorsdata.cn/sdk/' +
                          sd.lib_version +
                          '/vapph5define.min.js',
                      });
                  }
                else r();
              else r();
          };
        e.isSeachHasKeyword()
          ? e.hasKeywordHandle()
          : window.parent !== self && t.isSearchHasKeyword()
          ? t.verifyVtrackMode()
          : e.isStorageHasKeyword()
          ? e.storageHasKeywordHandle()
          : window.parent !== self && t.isStorageHasKeyword()
          ? t.verifyVtrackMode()
          : (sd.readyState.setState(3),
            new sd.JSBridge({
              type: 'visualized',
              app_call_js: function () {
                'undefined' != typeof sa_jssdk_app_define_mode ? r(!0) : r(!1);
              },
            }),
            r(!1),
            sd.bridge.app_js_bridge_v1(),
            _.info.initPage(),
            sd.para.is_track_single_page &&
              _.addSinglePageEvent(function (e) {
                var t = function (t) {
                  (t = t || {}),
                    e !== location.href &&
                      ((_.info.pageProp.referrer = e),
                      sd.quick(
                        'autoTrack',
                        _.extend({ $url: location.href, $referrer: e }, t)
                      ));
                };
                if ('boolean' == typeof sd.para.is_track_single_page) t();
                else if ('function' == typeof sd.para.is_track_single_page) {
                  var r = sd.para.is_track_single_page();
                  _.isObject(r) ? t(r) : !0 === r && t();
                }
              }),
            sd.para.batch_send &&
              (_.addEvent(
                window,
                'onpagehide' in window ? 'pagehide' : 'unload',
                function (e) {
                  sd.batchSend.clearPendingStatus();
                }
              ),
              sd.batchSend.batchInterval()),
            sd.store.init(),
            sd.readyState.setState(4),
            sd._q &&
              _.isArray(sd._q) &&
              sd._q.length > 0 &&
              _.each(sd._q, function (e) {
                sd[e[0]].apply(sd, Array.prototype.slice.call(e[1]));
              }),
            _.isObject(sd.para.heatmap) &&
              (heatmap.initHeatmap(), heatmap.initScrollmap()),
            t.notifyUser());
      }),
      (BatchSend.prototype = {
        add: function (e) {
          _.isObject(e) &&
            (this.writeStore(e),
            ('track_signup' !== e.type && '$pageview' !== e.event) ||
              this.sendStrategy());
        },
        clearPendingStatus: function () {
          this.sendingItemKeys.length &&
            this.removePendingItems(this.sendingItemKeys);
        },
        remove: function (e) {
          this.sendingData > 0 && --this.sendingData,
            _.isArray(e) &&
              e.length > 0 &&
              _.each(e, function (e) {
                _.localStorage.remove(e);
              });
        },
        send: function (e) {
          var t,
            r = this;
          (_.isString(sd.para.server_url) && '' !== sd.para.server_url) ||
          (_.isArray(sd.para.server_url) && sd.para.server_url.length)
            ? ((t = _.isArray(sd.para.server_url)
                ? sd.para.server_url[0]
                : sd.para.server_url),
              _.ajax({
                url: t,
                type: 'POST',
                data:
                  'data_list=' +
                  encodeURIComponent(_.base64Encode(JSON.stringify(e.vals))),
                credentials: !1,
                timeout: sd.para.batch_send.datasend_timeout,
                cors: !0,
                success: function () {
                  r.remove(e.keys), r.removePendingItems(e.keys);
                },
                error: function () {
                  r.sendingData > 0 && --r.sendingData,
                    r.removePendingItems(e.keys);
                },
              }))
            : sd.log(
                '\u5f53\u524d server_url \u4e3a\u7a7a\u6216\u4e0d\u6b63\u786e\uff0c\u53ea\u5728\u63a7\u5236\u53f0\u6253\u5370\u65e5\u5fd7\uff0cnetwork \u4e2d\u4e0d\u4f1a\u53d1\u6570\u636e\uff0c\u8bf7\u914d\u7f6e\u6b63\u786e\u7684 server_url\uff01'
              );
        },
        appendPendingItems: function (e) {
          if (!1 !== _.isArray(e)) {
            this.sendingItemKeys = _.unique(this.sendingItemKeys.concat(e));
            try {
              var t = this.getPendingItems(),
                r = _.unique(t.concat(e));
              localStorage.setItem(
                'sawebjssdk-sendingitems',
                JSON.stringify(r)
              );
            } catch (e) {}
          }
        },
        removePendingItems: function (e) {
          if (!1 !== _.isArray(e)) {
            this.sendingItemKeys.length &&
              (this.sendingItemKeys = _.filter(
                this.sendingItemKeys,
                function (t) {
                  return -1 === _.indexOf(e, t);
                }
              ));
            try {
              var t = this.getPendingItems(),
                r = _.filter(t, function (t) {
                  return -1 === _.indexOf(e, t);
                });
              localStorage.setItem(
                'sawebjssdk-sendingitems',
                JSON.stringify(r)
              );
            } catch (e) {}
          }
        },
        getPendingItems: function () {
          var e = [];
          try {
            var t = localStorage.getItem('sawebjssdk-sendingitems');
            t && (e = JSON.parse(t));
          } catch (e) {}
          return e;
        },
        sendPrepare: function (e) {
          this.appendPendingItems(e.keys);
          var t = e.vals;
          t.length > 0 && this.send({ keys: e.keys, vals: t });
        },
        sendStrategy: function () {
          if (!1 === document.hasFocus()) return !1;
          var e = this.readStore();
          e.keys.length > 0 &&
            0 === this.sendingData &&
            ((this.sendingData = 1), this.sendPrepare(e));
        },
        batchInterval: function () {
          var e = this;
          setInterval(function () {
            e.sendStrategy();
          }, sd.para.batch_send.send_interval);
        },
        readStore: function () {
          for (
            var e = [],
              t = [],
              r = null,
              s = new Date().getTime(),
              a = localStorage.length,
              i = this.getPendingItems(),
              n = 0;
            n < a;
            n++
          ) {
            var o = localStorage.key(n);
            if (0 === o.indexOf('sawebjssdk-') && /^sawebjssdk\-\d+$/.test(o)) {
              if (i.length && _.indexOf(i, o) > -1) continue;
              (r = localStorage.getItem(o))
                ? (r = _.safeJSONParse(r)) && _.isObject(r)
                  ? ((r._flush_time = s), e.push(o), t.push(r))
                  : (localStorage.removeItem(o),
                    sd.log('localStorage-\u6570\u636eparse\u5f02\u5e38' + r))
                : (localStorage.removeItem(o),
                  sd.log(
                    'localStorage-\u6570\u636e\u53d6\u503c\u5f02\u5e38' + r
                  ));
            }
          }
          return { keys: e, vals: t };
        },
        writeStore: function (e) {
          var t =
            String(Math.random()).slice(2, 5) +
            String(Math.random()).slice(2, 5) +
            String(new Date().getTime()).slice(3);
          localStorage.setItem('sawebjssdk-' + t, JSON.stringify(e));
        },
      }),
      (sd.batchSend = new BatchSend());
    var dataSend = {
      getSendUrl: function (e, t) {
        var r = _.base64Encode(t),
          s = 'crc=' + _.hashCode(r);
        return -1 !== e.indexOf('?')
          ? e +
              '&data=' +
              encodeURIComponent(r) +
              '&ext=' +
              encodeURIComponent(s)
          : e +
              '?data=' +
              encodeURIComponent(r) +
              '&ext=' +
              encodeURIComponent(s);
      },
      getSendData: function (e) {
        var t = _.base64Encode(e),
          r = 'crc=' + _.hashCode(t);
        return (
          'data=' + encodeURIComponent(t) + '&ext=' + encodeURIComponent(r)
        );
      },
      getInstance: function (e) {
        var t = new this[this.getSendType(e)](e),
          r = t.start;
        return (
          (t.start = function () {
            _.isObject(sd.para.is_debug) &&
              sd.para.is_debug.storage &&
              sd.store.requests &&
              sd.store.requests.push({
                name: this.server_url,
                initiatorType: this.img ? 'img' : 'xmlhttprequest',
                entryType: 'resource',
                requestData: this.data,
              });
            var e = this;
            r.apply(this, arguments),
              setTimeout(function () {
                e.isEnd(!0);
              }, sd.para.callback_timeout);
          }),
          (t.end = function () {
            this.callback && this.callback();
            var e = this;
            setTimeout(function () {
              e.lastClear && e.lastClear();
            }, sd.para.datasend_timeout - sd.para.callback_timeout);
          }),
          (t.isEnd = function (e) {
            if (!this.received) {
              (this.received = !0), this.end();
              var t = this;
              e
                ? sd.para.queue_timeout - sd.para.callback_timeout <= 0
                  ? t.close()
                  : setTimeout(function () {
                      t.close();
                    }, sd.para.queue_timeout - sd.para.callback_timeout)
                : t.close();
            }
          }),
          t
        );
      },
      getRealtimeInstance: function (e) {
        var t = new this[this.getSendType(e)](e);
        t.defaultData = e;
        var r = t.start;
        return (
          (t.start = function () {
            var e = this;
            r.apply(this, arguments),
              setTimeout(function () {
                e.isEnd(!0);
              }, sd.para.callback_timeout);
          }),
          (t.end = function () {
            this.callback && this.callback();
            var e = this;
            setTimeout(function () {
              e.lastClear && e.lastClear();
            }, sd.para.datasend_timeout - sd.para.callback_timeout);
          }),
          (t.isEnd = function (e) {
            this.received || ((this.received = !0), this.end());
          }),
          t
        );
      },
      getSendType: function (e) {
        var t = ['image', 'ajax', 'beacon'],
          r = t[0];
        return (
          'beacon' ===
            (r =
              e.config && _.indexOf(t, e.config.send_type) > -1
                ? e.config.send_type
                : sd.para.send_type) &&
            !1 === _.isSupportBeaconSend() &&
            (r = 'image'),
          'ajax' === r && !1 === _.isSupportCors() && (r = 'image'),
          r
        );
      },
      image: function (e) {
        (this.callback = e.callback),
          (this.img = document.createElement('img')),
          (this.img.width = 1),
          (this.img.height = 1),
          sd.para.img_use_crossorigin && (this.img.crossOrigin = 'anonymous'),
          (this.data = e.data),
          (this.server_url = dataSend.getSendUrl(e.server_url, e.data));
      },
    };
    (dataSend.image.prototype.start = function () {
      var e = this;
      sd.para.ignore_oom &&
        ((this.img.onload = function () {
          (this.onload = null),
            (this.onerror = null),
            (this.onabort = null),
            e.isEnd();
        }),
        (this.img.onerror = function () {
          (this.onload = null),
            (this.onerror = null),
            (this.onabort = null),
            e.isEnd();
        }),
        (this.img.onabort = function () {
          (this.onload = null),
            (this.onerror = null),
            (this.onabort = null),
            e.isEnd();
        })),
        (this.img.src = this.server_url);
    }),
      (dataSend.image.prototype.lastClear = function () {
        this.img.src = '';
      }),
      (dataSend.ajax = function (e) {
        (this.callback = e.callback),
          (this.server_url = e.server_url),
          (this.data = dataSend.getSendData(e.data));
      }),
      (dataSend.ajax.prototype.start = function () {
        var e = this;
        _.ajax({
          url: this.server_url,
          type: 'POST',
          data: this.data,
          credentials: !1,
          timeout: sd.para.datasend_timeout,
          cors: !0,
          success: function () {
            e.isEnd();
          },
          error: function () {
            e.isEnd();
          },
        });
      }),
      (dataSend.beacon = function (e) {
        (this.callback = e.callback),
          (this.server_url = e.server_url),
          (this.data = dataSend.getSendData(e.data));
      }),
      (dataSend.beacon.prototype.start = function () {
        var e = this;
        'object' == typeof navigator &&
          'function' == typeof navigator.sendBeacon &&
          (navigator.sendBeacon(this.server_url, this.data) ||
            ((this.defaultData.config.send_type = 'image'),
            sendState.realtimeSend(this.defaultData))),
          setTimeout(function () {
            e.isEnd();
          }, 40);
      });
    var sendState = {};
    (sd.sendState = sendState),
      (sd.events = new _.eventEmitter()),
      (sendState.queue = _.autoExeQueue()),
      (sendState.requestData = null),
      (sendState.getSendCall = function (e, t, r) {
        if (sd.is_heatmap_render_mode) return !1;
        if (sd.readyState.state < 3)
          return sd.log('\u521d\u59cb\u5316\u6ca1\u6709\u5b8c\u6210'), !1;
        (e._track_id = Number(
          String(Math.random()).slice(2, 5) +
            String(Math.random()).slice(2, 4) +
            String(new Date().getTime()).slice(-4)
        )),
          sd.para.use_client_time && (e._flush_time = new Date().getTime());
        var s = e;
        if (
          ((e = JSON.stringify(e)),
          (this.requestData = { data: s, config: t, callback: r }),
          sd.events.tempAdd('send', s),
          !sd.para.app_js_bridge &&
            sd.para.batch_send &&
            localStorage.length < 200)
        )
          return sd.log(s), sd.batchSend.add(this.requestData.data), !1;
        sd.bridge.dataSend(s, this, r), sd.log(s);
      }),
      (sendState.prepareServerUrl = function () {
        if (
          'object' == typeof this.requestData.config &&
          this.requestData.config.server_url
        )
          this.sendCall(
            this.requestData.config.server_url,
            this.requestData.callback
          );
        else if (_.isArray(sd.para.server_url) && sd.para.server_url.length)
          for (var e = 0; e < sd.para.server_url.length; e++)
            this.sendCall(sd.para.server_url[e]);
        else
          'string' == typeof sd.para.server_url && '' !== sd.para.server_url
            ? this.sendCall(sd.para.server_url, this.requestData.callback)
            : sd.log(
                '\u5f53\u524d server_url \u4e3a\u7a7a\u6216\u4e0d\u6b63\u786e\uff0c\u53ea\u5728\u63a7\u5236\u53f0\u6253\u5370\u65e5\u5fd7\uff0cnetwork \u4e2d\u4e0d\u4f1a\u53d1\u6570\u636e\uff0c\u8bf7\u914d\u7f6e\u6b63\u786e\u7684 server_url\uff01'
              );
      }),
      (sendState.sendCall = function (e, t) {
        var r = {
          server_url: e,
          data: JSON.stringify(this.requestData.data),
          callback: t,
          config: this.requestData.config,
        };
        _.isObject(sd.para.jsapp) &&
        !sd.para.jsapp.isOnline &&
        'function' == typeof sd.para.jsapp.setData
          ? (delete r.callback,
            (r = JSON.stringify(r)),
            sd.para.jsapp.setData(r))
          : sd.para.use_client_time
          ? this.realtimeSend(r)
          : this.pushSend(r);
      }),
      (sendState.pushSend = function (e) {
        var t = dataSend.getInstance(e),
          r = this;
        (t.close = function () {
          r.queue.close();
        }),
          this.queue.enqueue(t);
      }),
      (sendState.realtimeSend = function (e) {
        dataSend.getRealtimeInstance(e).start();
      });
    var saEvent = {};
    (sd.saEvent = saEvent),
      (saEvent.checkOption = {
        regChecks: {
          regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i,
        },
        checkPropertiesKey: function (e) {
          var t = this,
            r = !0;
          return (
            _.each(e, function (e, s) {
              t.regChecks.regName.test(s) || (r = !1);
            }),
            r
          );
        },
        check: function (e, t) {
          return 'string' == typeof this[e]
            ? this[this[e]](t)
            : _.isFunction(this[e])
            ? this[e](t)
            : void 0;
        },
        str: function (e) {
          return (
            !!_.isString(e) ||
            (sd.log(
              '\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f,\u5fc5\u987b\u662f\u5b57\u7b26\u4e32'
            ),
            !0)
          );
        },
        properties: function (e) {
          return (
            _.strip_sa_properties(e),
            !e ||
              (_.isObject(e)
                ? !!this.checkPropertiesKey(e) ||
                  (sd.log(
                    'properties \u91cc\u7684\u81ea\u5b9a\u4e49\u5c5e\u6027\u540d\u9700\u8981\u662f\u5408\u6cd5\u7684\u53d8\u91cf\u540d\uff0c\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934\uff0c\u4e14\u53ea\u5305\u542b\uff1a\u5927\u5c0f\u5199\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u4e0d\u80fd\u4ee5 $ \u5f00\u5934'
                  ),
                  !0)
                : (sd.log(
                    'properties\u53ef\u4ee5\u6ca1\u6709\uff0c\u4f46\u6709\u7684\u8bdd\u5fc5\u987b\u662f\u5bf9\u8c61'
                  ),
                  !0))
          );
        },
        propertiesMust: function (e) {
          return (
            _.strip_sa_properties(e),
            void 0 === e || !_.isObject(e) || _.isEmptyObject(e)
              ? (sd.log(
                  'properties\u5fc5\u987b\u662f\u5bf9\u8c61\u4e14\u6709\u503c'
                ),
                !0)
              : !!this.checkPropertiesKey(e) ||
                (sd.log(
                  'properties \u91cc\u7684\u81ea\u5b9a\u4e49\u5c5e\u6027\u540d\u9700\u8981\u662f\u5408\u6cd5\u7684\u53d8\u91cf\u540d\uff0c\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934\uff0c\u4e14\u53ea\u5305\u542b\uff1a\u5927\u5c0f\u5199\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u4e0d\u80fd\u4ee5 $ \u5f00\u5934'
                ),
                !0)
          );
        },
        event: function (e) {
          return (
            !(!_.isString(e) || !this.regChecks.regName.test(e)) ||
            (sd.log(
              '\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff0ceventName \u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff0c\u4e14\u9700\u662f\u5408\u6cd5\u7684\u53d8\u91cf\u540d\uff0c\u5373\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934\uff0c\u4e14\u53ea\u5305\u542b\uff1a\u5927\u5c0f\u5199\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\u548c $,\u5176\u4e2d\u4ee5 $ \u5f00\u5934\u7684\u8868\u660e\u662f\u7cfb\u7edf\u7684\u4fdd\u7559\u5b57\u6bb5\uff0c\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u540d\u8bf7\u4e0d\u8981\u4ee5 $ \u5f00\u5934'
            ),
            !0)
          );
        },
        test_id: 'str',
        group_id: 'str',
        distinct_id: function (e) {
          return (
            !(!_.isString(e) || !/^.{1,255}$/.test(e)) ||
            (sd.log(
              'distinct_id\u5fc5\u987b\u662f\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u4e14\u5c0f\u4e8e255\u4f4d\u7684\u5b57\u7b26\u4e32'
            ),
            !1)
          );
        },
      }),
      (saEvent.check = function (e) {
        for (var t in e)
          if (
            Object.prototype.hasOwnProperty.call(e, t) &&
            !this.checkOption.check(t, e[t])
          )
            return !1;
        return !0;
      }),
      (saEvent.send = function (e, t) {
        var r = {
          distinct_id: store.getDistinctId(),
          lib: {
            $lib: 'js',
            $lib_method: 'code',
            $lib_version: String(sd.lib_version),
          },
          properties: {},
        };
        _.isObject(e) &&
          _.isObject(e.properties) &&
          !_.isEmptyObject(e.properties) &&
          e.properties.$lib_detail &&
          ((r.lib.$lib_detail = e.properties.$lib_detail),
          delete e.properties.$lib_detail),
          _.extend(r, sd.store.getUnionId(), e),
          _.isObject(e.properties) &&
            !_.isEmptyObject(e.properties) &&
            _.extend(r.properties, e.properties),
          (e.type && 'profile' === e.type.slice(0, 7)) ||
            ((r.properties = _.extend(
              {},
              _.info.properties(),
              store.getProps(),
              store.getSessionProps(),
              _.info.currentProps,
              r.properties
            )),
            sd.para.preset_properties.latest_referrer &&
              !_.isString(r.properties.$latest_referrer) &&
              (r.properties.$latest_referrer = '\u53d6\u503c\u5f02\u5e38'),
            sd.para.preset_properties.latest_search_keyword &&
              !_.isString(r.properties.$latest_search_keyword) &&
              (r.properties.$latest_search_keyword =
                '\u53d6\u503c\u5f02\u5e38'),
            sd.para.preset_properties.latest_traffic_source_type &&
              !_.isString(r.properties.$latest_traffic_source_type) &&
              (r.properties.$latest_traffic_source_type =
                '\u53d6\u503c\u5f02\u5e38'),
            sd.para.preset_properties.latest_landing_page &&
              !_.isString(r.properties.$latest_landing_page) &&
              (r.properties.$latest_landing_page = '\u53d6\u503c\u5f02\u5e38'),
            sd.para.preset_properties.latest_wx_ad_click_id &&
              !_.isString(r.properties._latest_wx_ad_click_id) &&
              ((r.properties._latest_wx_ad_click_id =
                '\u53d6\u503c\u5f02\u5e38'),
              (r.properties._latest_wx_ad_hash_key =
                '\u53d6\u503c\u5f02\u5e38'),
              (r.properties._latest_wx_ad_callbacks =
                '\u53d6\u503c\u5f02\u5e38'))),
          r.properties.$time && _.isDate(r.properties.$time)
            ? ((r.time = 1 * r.properties.$time), delete r.properties.$time)
            : sd.para.use_client_time && (r.time = 1 * new Date()),
          _.parseSuperProperties(r.properties),
          _.filterReservedProperties(r.properties),
          _.searchObjDate(r),
          _.searchObjString(r),
          _.searchZZAppStyle(r);
        var s = _.searchConfigData(r.properties);
        saNewUser.checkIsAddSign(r),
          saNewUser.checkIsFirstTime(r),
          sd.addReferrerHost(r),
          sd.addPropsHook(r),
          !0 === sd.para.debug_mode
            ? (sd.log(r), this.debugPath(JSON.stringify(r), t))
            : sd.sendState.getSendCall(r, s, t);
      }),
      (saEvent.debugPath = function (e, t) {
        var r = e,
          s = '';
        (s =
          -1 !== sd.para.debug_mode_url.indexOf('?')
            ? sd.para.debug_mode_url +
              '&data=' +
              encodeURIComponent(_.base64Encode(e))
            : sd.para.debug_mode_url +
              '?data=' +
              encodeURIComponent(_.base64Encode(e))),
          _.ajax({
            url: s,
            type: 'GET',
            cors: !0,
            header: { 'Dry-Run': String(sd.para.debug_mode_upload) },
            success: function (e) {
              !0 === _.isEmptyObject(e)
                ? alert('debug\u6570\u636e\u53d1\u9001\u6210\u529f' + r)
                : alert(
                    'debug\u5931\u8d25 \u9519\u8bef\u539f\u56e0' +
                      JSON.stringify(e)
                  );
            },
          });
      });
    var store = (sd.store = {
        requests: [],
        _sessionState: {},
        _state: { distinct_id: '', first_id: '', props: {} },
        getProps: function () {
          return this._state.props || {};
        },
        getSessionProps: function () {
          return this._sessionState;
        },
        getDistinctId: function () {
          return this._state._distinct_id || this._state.distinct_id;
        },
        getUnionId: function () {
          var e = {},
            t = this._state._first_id || this._state.first_id,
            r = this._state._distinct_id || this._state.distinct_id;
          return (
            t && r
              ? ((e.login_id = r), (e.anonymous_id = t))
              : (e.anonymous_id = r),
            e
          );
        },
        getFirstId: function () {
          return this._state._first_id || this._state.first_id;
        },
        toState: function (e) {
          var t = null;
          if (null != e && _.isJSONString(e))
            if (
              ((t = JSON.parse(e)), (this._state = _.extend(t)), t.distinct_id)
            ) {
              if ('object' == typeof t.props) {
                for (var r in t.props)
                  'string' == typeof t.props[r] &&
                    (t.props[r] = t.props[r].slice(
                      0,
                      sd.para.max_referrer_string_length
                    ));
                this.save();
              }
            } else
              this.set('distinct_id', _.UUID()), sd.debug.distinct_id('1', e);
          else this.set('distinct_id', _.UUID()), sd.debug.distinct_id('2', e);
        },
        initSessionState: function () {
          var e = _.cookie.get('sensorsdata2015session'),
            t = null;
          null !== e &&
            'object' == typeof (t = JSON.parse(e)) &&
            (this._sessionState = t || {});
        },
        setOnce: function (e, t) {
          e in this._state || this.set(e, t);
        },
        set: function (e, t) {
          (this._state = this._state || {}),
            'distinct_id' === e &&
              this._state.distinct_id &&
              sd.events.tempAdd('changeDistinctId', t),
            (this._state[e] = t),
            'first_id' === e
              ? delete this._state._first_id
              : 'distinct_id' === e && delete this._state._distinct_id,
            this.save();
        },
        change: function (e, t) {
          this._state['_' + e] = t;
        },
        setSessionProps: function (e) {
          var t = this._sessionState;
          _.extend(t, e), this.sessionSave(t);
        },
        setSessionPropsOnce: function (e) {
          var t = this._sessionState;
          _.coverExtend(t, e), this.sessionSave(t);
        },
        setProps: function (e, t) {
          var r = {};
          for (var s in (r = t ? e : _.extend(this._state.props || {}, e)))
            'string' == typeof r[s] &&
              (r[s] = r[s].slice(0, sd.para.max_referrer_string_length));
          this.set('props', r);
        },
        setPropsOnce: function (e) {
          var t = this._state.props || {};
          _.coverExtend(t, e), this.set('props', t);
        },
        clearAllProps: function (e) {
          if (((this._sessionState = {}), _.isArray(e) && e.length > 0))
            for (var t = 0; t < e.length; t++)
              _.isString(e[t]) &&
                -1 === e[t].indexOf('latest_') &&
                e[t] in this._state.props &&
                delete this._state.props[e[t]];
          else
            for (var t in this._state.props)
              1 !== t.indexOf('latest_') && delete this._state.props[t];
          this.sessionSave({}), this.save();
        },
        sessionSave: function (e) {
          (this._sessionState = e),
            _.cookie.set(
              'sensorsdata2015session',
              JSON.stringify(this._sessionState),
              0
            );
        },
        save: function () {
          var e = JSON.parse(JSON.stringify(this._state));
          delete e._first_id,
            delete e._distinct_id,
            _.cookie.set(
              this.getCookieName(),
              JSON.stringify(e),
              73e3,
              sd.para.cross_subdomain
            );
        },
        getCookieName: function () {
          var e = '';
          if (!1 === sd.para.cross_subdomain) {
            try {
              e = _.URL(location.href).hostname;
            } catch (e) {
              sd.log(e);
            }
            e =
              'string' == typeof e && '' !== e
                ? 'sa_jssdk_2015_' + e.replace(/\./g, '_')
                : 'sa_jssdk_2015_root';
          } else e = 'sensorsdata2015jssdkcross';
          return e;
        },
        init: function () {
          this.initSessionState();
          var e = _.UUID(),
            t = _.cookie.get(this.getCookieName());
          null === t
            ? ((sd.is_first_visitor = !0), this.set('distinct_id', e))
            : ((_.isJSONString(t) && JSON.parse(t).distinct_id) ||
                (sd.is_first_visitor = !0),
              this.toState(t)),
            saNewUser.setDeviceId(e),
            saNewUser.storeInitCheck(),
            saNewUser.checkIsFirstLatest();
        },
      }),
      saNewUser = {
        checkIsAddSign: function (e) {
          'track' === e.type &&
            (_.cookie.getNewUser()
              ? (e.properties.$is_first_day = !0)
              : (e.properties.$is_first_day = !1));
        },
        is_first_visit_time: !1,
        checkIsFirstTime: function (e) {
          'track' === e.type &&
            '$pageview' === e.event &&
            (this.is_first_visit_time
              ? ((e.properties.$is_first_time = !0),
                (this.is_first_visit_time = !1))
              : (e.properties.$is_first_time = !1));
        },
        setDeviceId: function (e) {
          var t = null,
            r = _.cookie.get('sensorsdata2015jssdkcross'),
            s = {};
          null != r &&
            _.isJSONString(r) &&
            (s = JSON.parse(r)).$device_id &&
            (t = s.$device_id),
            (t = t || e),
            !0 === sd.para.cross_subdomain
              ? store.set('$device_id', t)
              : ((s.$device_id = t),
                _.cookie.set(
                  'sensorsdata2015jssdkcross',
                  JSON.stringify(s),
                  null,
                  !0
                )),
            sd.para.is_track_device_id && (_.info.currentProps.$device_id = t);
        },
        storeInitCheck: function () {
          if (sd.is_first_visitor) {
            var e = new Date(),
              t = {
                h: 23 - e.getHours(),
                m: 59 - e.getMinutes(),
                s: 59 - e.getSeconds(),
              };
            _.cookie.set(
              _.cookie.getCookieName('new_user'),
              '1',
              3600 * t.h + 60 * t.m + t.s + 's'
            ),
              (this.is_first_visit_time = !0);
          } else
            _.cookie.getNewUser() ||
              (this.checkIsAddSign = function (e) {
                'track' === e.type && (e.properties.$is_first_day = !1);
              }),
              (this.checkIsFirstTime = function (e) {
                'track' === e.type &&
                  '$pageview' === e.event &&
                  (e.properties.$is_first_time = !1);
              });
        },
        checkIsFirstLatest: function () {
          for (
            var e = _.info.pageProp.url_domain,
              t = [
                '$utm_source',
                '$utm_medium',
                '$utm_campaign',
                '$utm_content',
                '$utm_term',
              ],
              r = store.getProps(),
              s = 0;
            s < t.length;
            s++
          )
            t[s] in r && delete r[t[s]];
          store.setProps(r, !0);
          var a = {};
          if (
            ('' === e && (e = 'url\u89e3\u6790\u5931\u8d25'),
            _.each(sd.para.preset_properties, function (t, r) {
              if (-1 === r.indexOf('latest_')) return !1;
              if (((r = r.slice(7)), t)) {
                if ('utm' !== r && 'url\u89e3\u6790\u5931\u8d25' === e)
                  'wx_ad_click_id' === r
                    ? ((a._latest_wx_ad_click_id =
                        'url\u7684domain\u89e3\u6790\u5931\u8d25'),
                      (a._latest_wx_ad_hash_key =
                        'url\u7684domain\u89e3\u6790\u5931\u8d25'),
                      (a._latest_wx_ad_callbacks =
                        'url\u7684domain\u89e3\u6790\u5931\u8d25'))
                    : (a['$latest_' + r] =
                        'url\u7684domain\u89e3\u6790\u5931\u8d25');
                else if (_.isReferralTraffic(document.referrer))
                  switch (r) {
                    case 'traffic_source_type':
                      a.$latest_traffic_source_type = _.getSourceFromReferrer();
                      break;
                    case 'referrer':
                      a.$latest_referrer = _.info.pageProp.referrer;
                      break;
                    case 'search_keyword':
                      a.$latest_search_keyword = _.getKeywordFromReferrer();
                      break;
                    case 'landing_page':
                      a.$latest_landing_page = location.href;
                      break;
                    case 'wx_ad_click_id':
                      var s = _.getWxAdIdFromUrl(location.href);
                      (a._latest_wx_ad_click_id = s.click_id),
                        (a._latest_wx_ad_hash_key = s.hash_key),
                        (a._latest_wx_ad_callbacks = s.callbacks);
                  }
              } else if ('utm' === r && sd.store._state.props)
                for (var i in sd.store._state.props)
                  (0 === i.indexOf('$latest_utm') ||
                    (0 === i.indexOf('_latest_') &&
                      i.indexOf('_latest_wx_ad_') < 0)) &&
                    delete sd.store._state.props[i];
              else if (
                sd.store._state.props &&
                '$latest_' + r in sd.store._state.props
              )
                delete sd.store._state.props['$latest_' + r];
              else if ('wx_ad_click_id' == r && sd.store._state.props) {
                _.each(
                  [
                    '_latest_wx_ad_click_id',
                    '_latest_wx_ad_hash_key',
                    '_latest_wx_ad_callbacks',
                  ],
                  function (e) {
                    e in sd.store._state.props &&
                      delete sd.store._state.props[e];
                  }
                );
              }
            }),
            sd.register(a),
            sd.para.preset_properties.latest_utm)
          ) {
            var i = _.info.campaignParamsStandard('$latest_', '_latest_'),
              n = i.$utms,
              o = i.otherUtms;
            _.isEmptyObject(n) || sd.register(n),
              _.isEmptyObject(o) || sd.register(o);
          }
        },
      };
    (sd.bridge = {
      is_verify_success: !1,
      initPara: function () {
        var e = { is_send: !0, white_list: [], is_mui: !1 };
        'object' == typeof sd.para.app_js_bridge
          ? (sd.para.app_js_bridge = _.extend({}, e, sd.para.app_js_bridge))
          : !0 === sd.para.use_app_track ||
            !0 === sd.para.app_js_bridge ||
            'only' === sd.para.use_app_track
          ? ((!1 !== sd.para.use_app_track_is_send &&
              'only' !== sd.para.use_app_track) ||
              (e.is_send = !1),
            (sd.para.app_js_bridge = _.extend({}, e)))
          : 'mui' === sd.para.use_app_track &&
            ((e.is_mui = !0), (sd.para.app_js_bridge = _.extend({}, e))),
          !1 === sd.para.app_js_bridge.is_send &&
            sd.log(
              '\u8bbe\u7f6e\u4e86 is_send:false,\u5982\u679c\u6253\u901a\u5931\u8d25\uff0c\u6570\u636e\u5c06\u88ab\u4e22\u5f03\uff01'
            );
      },
      initState: function () {
        function e(e) {
          function t(e) {
            var t = { hostname: '', project: '' };
            try {
              (t.hostname = _.URL(e).hostname),
                (t.project = _.URL(e).searchParams.get('project') || 'default');
            } catch (e) {
              sd.log(e);
            }
            return t;
          }
          var r = t(e),
            s = t(sd.para.server_url);
          if (r.hostname === s.hostname && r.project === s.project) return !0;
          if (sd.para.app_js_bridge.white_list.length > 0)
            for (var a = 0; a < sd.para.app_js_bridge.white_list.length; a++) {
              var i = t(sd.para.app_js_bridge.white_list[a]);
              if (i.hostname === r.hostname && i.project === r.project)
                return !0;
            }
          return !1;
        }
        if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui)
          if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.sensorsdataNativeTracker &&
            _.isObject(window.SensorsData_iOS_JS_Bridge) &&
            window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
          )
            e(window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) &&
              (sd.bridge.is_verify_success = !0);
          else if (
            _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
            window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url &&
            window.SensorsData_APP_New_H5_Bridge.sensorsdata_track
          ) {
            var t = window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();
            t && e(t) && (sd.bridge.is_verify_success = !0);
          }
      },
      initDefineBridgeInfo: function () {
        var e = { touch_app_bridge: !0, verify_success: !1 };
        return (
          window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers.sensorsdataNativeTracker &&
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage &&
          _.isObject(window.SensorsData_iOS_JS_Bridge) &&
          window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
            ? sd.bridge.is_verify_success
              ? (e.verify_success = 'success')
              : (e.verify_success = 'fail')
            : _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
              window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url &&
              window.SensorsData_APP_New_H5_Bridge.sensorsdata_track
            ? sd.bridge.is_verify_success
              ? (e.verify_success = 'success')
              : (e.verify_success = 'fail')
            : 'object' == typeof SensorsData_APP_JS_Bridge &&
              ((SensorsData_APP_JS_Bridge.sensorsdata_verify &&
                SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) ||
                SensorsData_APP_JS_Bridge.sensorsdata_track)
            ? SensorsData_APP_JS_Bridge.sensorsdata_verify &&
              SensorsData_APP_JS_Bridge.sensorsdata_visual_verify
              ? SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(
                  JSON.stringify({ server_url: sd.para.server_url })
                )
                ? (e.verify_success = 'success')
                : (e.verify_success = 'fail')
              : (e.verify_success = 'success')
            : (!/sensors-verify/.test(navigator.userAgent) &&
                !/sa-sdk-ios/.test(navigator.userAgent)) ||
              window.MSStream
            ? (e.touch_app_bridge = !1)
            : sd.bridge.iOS_UA_bridge()
            ? (e.verify_success = 'success')
            : (e.verify_success = 'fail'),
          e
        );
      },
      iOS_UA_bridge: function () {
        if (/sensors-verify/.test(navigator.userAgent)) {
          var e = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
          if (
            e &&
            e[0] &&
            'string' == typeof e[1] &&
            2 === e[1].split('?').length
          ) {
            e = e[1].split('?');
            var t = null,
              r = null;
            try {
              (t = _.URL(sd.para.server_url).hostname),
                (r =
                  _.URL(sd.para.server_url).searchParams.get('project') ||
                  'default');
            } catch (e) {
              sd.log(e);
            }
            return !(!t || t !== e[0] || !r || r !== e[1]);
          }
          return !1;
        }
        return !!/sa-sdk-ios/.test(navigator.userAgent);
      },
      dataSend: function (e, t, r) {
        if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui)
          if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.sensorsdataNativeTracker &&
            window.webkit.messageHandlers.sensorsdataNativeTracker
              .postMessage &&
            _.isObject(window.SensorsData_iOS_JS_Bridge) &&
            window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
          )
            sd.bridge.is_verify_success
              ? (window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(
                  JSON.stringify({
                    callType: 'app_h5_track',
                    data: _.extend({ server_url: sd.para.server_url }, e),
                  })
                ),
                'function' == typeof r && r())
              : sd.para.app_js_bridge.is_send
              ? (sd.debug.apph5({ data: e, step: '4.1', output: 'all' }),
                t.prepareServerUrl())
              : 'function' == typeof r && r();
          else if (
            _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
            window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url &&
            window.SensorsData_APP_New_H5_Bridge.sensorsdata_track
          )
            sd.bridge.is_verify_success
              ? (SensorsData_APP_New_H5_Bridge.sensorsdata_track(
                  JSON.stringify(
                    _.extend({ server_url: sd.para.server_url }, e)
                  )
                ),
                'function' == typeof r && r())
              : sd.para.app_js_bridge.is_send
              ? (sd.debug.apph5({ data: e, step: '4.2', output: 'all' }),
                t.prepareServerUrl())
              : 'function' == typeof r && r();
          else if (
            'object' == typeof SensorsData_APP_JS_Bridge &&
            (SensorsData_APP_JS_Bridge.sensorsdata_verify ||
              SensorsData_APP_JS_Bridge.sensorsdata_track)
          )
            SensorsData_APP_JS_Bridge.sensorsdata_verify
              ? SensorsData_APP_JS_Bridge.sensorsdata_verify(
                  JSON.stringify(
                    _.extend({ server_url: sd.para.server_url }, e)
                  )
                )
                ? 'function' == typeof r && r()
                : sd.para.app_js_bridge.is_send
                ? (sd.debug.apph5({ data: e, step: '3.1', output: 'all' }),
                  t.prepareServerUrl())
                : 'function' == typeof r && r()
              : (SensorsData_APP_JS_Bridge.sensorsdata_track(
                  JSON.stringify(
                    _.extend({ server_url: sd.para.server_url }, e)
                  )
                ),
                'function' == typeof r && r());
          else if (
            (!/sensors-verify/.test(navigator.userAgent) &&
              !/sa-sdk-ios/.test(navigator.userAgent)) ||
            window.MSStream
          )
            _.isObject(sd.para.app_js_bridge) &&
            !0 === sd.para.app_js_bridge.is_send
              ? (sd.debug.apph5({ data: e, step: '2', output: 'all' }),
                t.prepareServerUrl())
              : 'function' == typeof r && r();
          else {
            var s = null;
            sd.bridge.iOS_UA_bridge()
              ? ((s = document.createElement('iframe')).setAttribute(
                  'src',
                  'sensorsanalytics://trackEvent?event=' +
                    encodeURIComponent(
                      JSON.stringify(
                        _.extend({ server_url: sd.para.server_url }, e)
                      )
                    )
                ),
                document.documentElement.appendChild(s),
                s.parentNode.removeChild(s),
                (s = null),
                'function' == typeof r && r())
              : sd.para.app_js_bridge.is_send
              ? (sd.debug.apph5({ data: e, step: '3.2', output: 'all' }),
                t.prepareServerUrl())
              : 'function' == typeof r && r();
          }
        else
          _.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_mui
            ? _.isObject(window.plus) &&
              window.plus.SDAnalytics &&
              window.plus.SDAnalytics.trackH5Event
              ? (window.plus.SDAnalytics.trackH5Event(data),
                'function' == typeof r && r())
              : _.isObject(sd.para.app_js_bridge) &&
                !0 === sd.para.app_js_bridge.is_send
              ? t.prepareServerUrl()
              : 'function' == typeof r && r()
            : (sd.debug.apph5({ data: e, step: '1', output: 'code' }),
              t.prepareServerUrl());
      },
      app_js_bridge_v1: function () {
        var e = null,
          t = null;
        (window.sensorsdata_app_js_bridge_call_js = function (r) {
          !(function (r) {
            (e = r),
              _.isJSONString(e) && (e = JSON.parse(e)),
              t && (t(e), (t = null), (e = null));
          })(r);
        }),
          (sd.getAppStatus = function (r) {
            if (
              ((function () {
                if (
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !window.MSStream
                ) {
                  var e = document.createElement('iframe');
                  e.setAttribute('src', 'sensorsanalytics://getAppInfo'),
                    document.documentElement.appendChild(e),
                    e.parentNode.removeChild(e),
                    (e = null);
                }
              })(),
              'object' == typeof window.SensorsData_APP_JS_Bridge &&
                window.SensorsData_APP_JS_Bridge.sensorsdata_call_app &&
                ((e = SensorsData_APP_JS_Bridge.sensorsdata_call_app()),
                _.isJSONString(e) && (e = JSON.parse(e))),
              !r)
            )
              return e;
            null === e ? (t = r) : (r(e), (e = null));
          });
      },
      supportAppCallJs: function () {
        (window.sensorsdata_app_call_js = function (e, t) {
          e in window.sensorsdata_app_call_js.modules &&
            window.sensorsdata_app_call_js.modules[e](t);
        }),
          (window.sensorsdata_app_call_js.modules = {});
      },
    }),
      (sd.JSBridge = function (e) {
        (this.list = {}),
          (this.type = e.type),
          (this.app_call_js = _.isFunction(e.app_call_js)
            ? e.app_call_js
            : function () {}),
          this.init();
      }),
      (sd.JSBridge.prototype.init = function () {
        var e = this;
        window.sensorsdata_app_call_js.modules[this.type] ||
          (window.sensorsdata_app_call_js.modules[this.type] = function (t) {
            e.app_call_js(t);
          });
      }),
      (sd.JSBridge.prototype.jsCallApp = function (e) {
        var t = { callType: this.type, data: e };
        if (
          window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers.sensorsdataNativeTracker &&
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage
        )
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(
            JSON.stringify(t)
          );
        else {
          if (
            !_.isObject(window.SensorsData_APP_New_H5_Bridge) ||
            !window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app
          )
            return (
              sd.log(
                '\u6570\u636e\u53d1\u5f80App\u5931\u8d25\uff0cApp\u6ca1\u6709\u66b4\u9732bridge'
              ),
              !1
            );
          window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(
            JSON.stringify(t)
          );
        }
      }),
      (sd.JSBridge.prototype.hasAppBridge = function () {
        return window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers.sensorsdataNativeTracker &&
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage
          ? 'ios'
          : _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
            window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app
          ? 'android'
          : (sd.log('App\u7aefbridge\u672a\u66b4\u9732'), !1);
      }),
      (sd.JSBridge.prototype.requestToApp = function (e) {
        var t = this,
          r = _.isObject(e.data) ? e.data : {};
        _.isFunction(e.callback) || (e.callback = function () {}),
          _.isObject(e.timeout) &&
            _.isNumber(e.timeout.time) &&
            (_.isFunction(e.timeout.callback) ||
              (e.timeout.callback = function () {}),
            (e.timer = setTimeout(function () {
              e.timeout.callback(), delete t.list[s];
            }, e.timeout.time)));
        var s =
          new Date().getTime().toString(16) +
          '-' +
          String(Math.random()).replace('.', '').slice(1, 8);
        this.list[s] = e;
        var a = { callType: this.type, data: r };
        if (
          ((a.data.message_id = s),
          window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.sensorsdataNativeTracker &&
            window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage)
        )
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(
            JSON.stringify(a)
          );
        else {
          if (
            !_.isObject(window.SensorsData_APP_New_H5_Bridge) ||
            !window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app
          )
            return (
              sd.log(
                '\u6570\u636e\u53d1\u5f80App\u5931\u8d25\uff0cApp\u6ca1\u6709\u66b4\u9732bridge'
              ),
              !1
            );
          window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(
            JSON.stringify(a)
          );
        }
      }),
      (sd.JSBridge.prototype.double = function (e) {
        if (e.message_id) {
          var t = this.list[e.message_id];
          t &&
            (t.timer && clearTimeout(t.timer),
            t.callback(e),
            delete this.list[e.message_id]);
        }
      });
    var heatmap = (sd.heatmap = {
      setNotice: function (e) {
        (sd.is_heatmap_render_mode = !0),
          sd.para.heatmap ||
            (sd.errorMsg =
              '\u60a8SDK\u6ca1\u6709\u914d\u7f6e\u5f00\u542f\u70b9\u51fb\u56fe\uff0c\u53ef\u80fd\u6ca1\u6709\u6570\u636e\uff01'),
          e &&
            e[0] &&
            e[1] &&
            'http:' === e[1].slice(0, 5) &&
            'https:' === location.protocol &&
            (sd.errorMsg =
              '\u60a8\u7684\u5f53\u524d\u9875\u9762\u662fhttps\u7684\u5730\u5740\uff0c\u795e\u7b56\u5206\u6790\u73af\u5883\u4e5f\u5fc5\u987b\u662fhttps\uff01'),
          sd.para.heatmap_url ||
            (sd.para.heatmap_url =
              location.protocol +
              '//static.sensorsdata.cn/sdk/' +
              sd.lib_version +
              '/heatmap.min.js');
      },
      getDomIndex: function (e) {
        if (!e.parentNode) return -1;
        for (
          var t = 0, r = e.tagName, s = e.parentNode.children, a = 0;
          a < s.length;
          a++
        )
          if (s[a].tagName === r) {
            if (e === s[a]) return t;
            t++;
          }
        return -1;
      },
      selector: function (e) {
        var t =
          e.parentNode && 9 == e.parentNode.nodeType ? -1 : this.getDomIndex(e);
        return e.getAttribute &&
          e.getAttribute('id') &&
          (!sd.para.heatmap ||
            (sd.para.heatmap &&
              'not_use_id' !== sd.para.heatmap.element_selector))
          ? '#' + e.getAttribute('id')
          : e.tagName.toLowerCase() +
              (~t ? ':nth-of-type(' + (t + 1) + ')' : '');
      },
      getDomSelector: function (e, t) {
        if (!e || !e.parentNode || !e.parentNode.children) return !1;
        t = t && t.join ? t : [];
        var r = e.nodeName.toLowerCase();
        return e && 'body' !== r && 1 == e.nodeType
          ? (t.unshift(this.selector(e)),
            e.getAttribute &&
            e.getAttribute('id') &&
            sd.para.heatmap &&
            'not_use_id' !== sd.para.heatmap.element_selector
              ? t.join(' > ')
              : this.getDomSelector(e.parentNode, t))
          : (t.unshift('body'), t.join(' > '));
      },
      na: function () {
        var e = document.documentElement.scrollLeft || window.pageXOffset;
        return parseInt(isNaN(e) ? 0 : e, 10);
      },
      i: function () {
        var e = 0;
        try {
          (e =
            (o.documentElement && o.documentElement.scrollTop) ||
            m.pageYOffset),
            (e = isNaN(e) ? 0 : e);
        } catch (t) {
          e = 0;
        }
        return parseInt(e, 10);
      },
      getBrowserWidth: function () {
        var e = window.innerWidth || document.body.clientWidth;
        return isNaN(e) ? 0 : parseInt(e, 10);
      },
      getBrowserHeight: function () {
        var e = window.innerHeight || document.body.clientHeight;
        return isNaN(e) ? 0 : parseInt(e, 10);
      },
      getScrollWidth: function () {
        var e = parseInt(document.body.scrollWidth, 10);
        return isNaN(e) ? 0 : e;
      },
      W: function (e) {
        var t = parseInt(+e.clientX + +this.na(), 10);
        e = parseInt(+e.clientY + +this.i(), 10);
        return { x: isNaN(t) ? 0 : t, y: isNaN(e) ? 0 : e };
      },
      start: function (e, t, r, s, a) {
        var i = _.isObject(s) ? s : {},
          n = _.isFunction(a) ? a : _.isFunction(s) ? s : void 0;
        if (
          sd.para.heatmap &&
          sd.para.heatmap.collect_element &&
          !sd.para.heatmap.collect_element(t)
        )
          return !1;
        var o = this.getDomSelector(t),
          d = _.getEleInfo({ target: t });
        if (
          ((d.$element_selector = o || ''),
          sd.para.heatmap && sd.para.heatmap.custom_property)
        ) {
          var c = sd.para.heatmap.custom_property(t);
          _.isObject(c) && (d = _.extend(d, c));
        }
        (d = _.extend(d, i)),
          'a' === r && sd.para.heatmap && !0 === sd.para.heatmap.isTrackLink
            ? _.trackLink({ event: e, target: t }, '$WebClick', d)
            : sd.track('$WebClick', d, n);
      },
      hasElement: function (e) {
        var t = e._getPath();
        if (_.isArray(t) && t.length > 0)
          for (var r = 0; r < t.length; r++)
            if (t[r] && t[r].tagName && 'a' === t[r].tagName.toLowerCase())
              return t[r];
        return !1;
      },
      isStyleTag: function (e, t) {
        return (
          !(_.indexOf(['a', 'div', 'input', 'button', 'textarea'], e) > -1) &&
          (!t ||
          (sd.para.heatmap &&
            sd.para.heatmap.collect_tags &&
            sd.para.heatmap.collect_tags.div)
            ? !!(
                _.isObject(sd.para.heatmap) &&
                _.isObject(sd.para.heatmap.collect_tags) &&
                _.isObject(sd.para.heatmap.collect_tags.div) &&
                _.indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, e) > -1
              )
            : _.indexOf(
                [
                  'mark',
                  '/mark',
                  'strong',
                  'b',
                  'em',
                  'i',
                  'u',
                  'abbr',
                  'ins',
                  'del',
                  's',
                  'sup',
                ],
                e
              ) > -1)
        );
      },
      isCollectableDiv: function (e, t) {
        try {
          if (0 === e.children.length) return !0;
          for (var r = 0; r < e.children.length; r++)
            if (1 === e.children[r].nodeType) {
              var s = e.children[r].tagName.toLowerCase();
              if (!this.isStyleTag(s, t)) return !1;
              if (!this.isCollectableDiv(e.children[r], t)) return !1;
            }
          return !0;
        } catch (e) {
          sd.log(e);
        }
        return !1;
      },
      getCollectableParent: function (e, t) {
        try {
          var r = e.parentNode,
            s = r ? r.tagName.toLowerCase() : '';
          if ('body' === s) return !1;
          if (s && 'div' === s && this.isCollectableDiv(r, t)) return r;
          if (r && this.isStyleTag(s, t))
            return this.getCollectableParent(r, t);
        } catch (e) {
          sd.log(e);
        }
        return !1;
      },
      initScrollmap: function () {
        if (
          !_.isObject(sd.para.heatmap) ||
          'default' !== sd.para.heatmap.scroll_notice_map
        )
          return !1;
        var e = function () {
            return !(
              sd.para.scrollmap &&
              _.isFunction(sd.para.scrollmap.collect_url) &&
              !sd.para.scrollmap.collect_url()
            );
          },
          t = (function (e) {
            var t = {};
            return (
              (t.timeout = e.timeout || 1e3),
              (t.func = e.func),
              (t.hasInit = !1),
              (t.inter = null),
              (t.main = function (e, t) {
                this.func(e, t), (this.inter = null);
              }),
              (t.go = function (e) {
                var r = {};
                this.inter ||
                  ((r.$viewport_position =
                    (document.documentElement &&
                      document.documentElement.scrollTop) ||
                    window.pageYOffset ||
                    document.body.scrollTop ||
                    0),
                  (r.$viewport_position =
                    Math.round(r.$viewport_position) || 0),
                  (r.$viewport_height =
                    window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight ||
                    0),
                  (r.$viewport_width =
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth ||
                    0),
                  e
                    ? t.main(r, !0)
                    : (this.inter = setTimeout(function () {
                        t.main(r);
                      }, this.timeout)));
              }),
              t
            );
          })({
            timeout: 1e3,
            func: function (e, t) {
              var r =
                  (document.documentElement &&
                    document.documentElement.scrollTop) ||
                  window.pageYOffset ||
                  document.body.scrollTop ||
                  0,
                s = new Date(),
                a = s - this.current_time;
              ((a > sd.para.heatmap.scroll_delay_time &&
                r - e.$viewport_position != 0) ||
                t) &&
                ((e.$url = location.href),
                (e.$title = document.title),
                (e.$url_path = location.pathname),
                (e.event_duration = Math.min(
                  sd.para.heatmap.scroll_event_duration,
                  parseInt(a) / 1e3
                )),
                sd.track('$WebStay', e)),
                (this.current_time = s);
            },
          });
        (t.current_time = new Date()),
          _.addEvent(window, 'scroll', function () {
            if (!e()) return !1;
            t.go();
          }),
          _.addEvent(window, 'unload', function () {
            if (!e()) return !1;
            t.go('notime');
          });
      },
      initHeatmap: function () {
        var e = this;
        return (
          !(
            !_.isObject(sd.para.heatmap) ||
            'default' !== sd.para.heatmap.clickmap
          ) &&
          !(
            _.isFunction(sd.para.heatmap.collect_url) &&
            !sd.para.heatmap.collect_url()
          ) &&
          ('all' === sd.para.heatmap.collect_elements
            ? (sd.para.heatmap.collect_elements = 'all')
            : (sd.para.heatmap.collect_elements = 'interact'),
          void ('all' === sd.para.heatmap.collect_elements
            ? _.addEvent(document, 'click', function (t) {
                var r = t || window.event;
                if (!r) return !1;
                var s = r.target || r.srcElement;
                if ('object' != typeof s) return !1;
                if ('string' != typeof s.tagName) return !1;
                var a = s.tagName.toLowerCase();
                if ('body' === a || 'html' === a) return !1;
                if (!s || !s.parentNode || !s.parentNode.children) return !1;
                var i = s.parentNode.tagName.toLowerCase();
                'a' === i || 'button' === i
                  ? e.start(r, s.parentNode, i)
                  : e.start(r, s, a);
              })
            : _.addEvent(document, 'click', function (t) {
                var r = t || window.event;
                if (!r) return !1;
                var s = r.target || r.srcElement;
                if ('object' != typeof s) return !1;
                if ('string' != typeof s.tagName) return !1;
                var a = s.tagName.toLowerCase();
                if ('body' === a.toLowerCase() || 'html' === a.toLowerCase())
                  return !1;
                if (!s || !s.parentNode || !s.parentNode.children) return !1;
                var i = s.parentNode,
                  n = e.hasElement(t),
                  o = sd.para.heatmap.track_attr;
                if (
                  'a' === a ||
                  'button' === a ||
                  'input' === a ||
                  'textarea' === a ||
                  _.hasAttributes(s, o)
                )
                  e.start(r, s, a);
                else if (
                  'button' === i.tagName.toLowerCase() ||
                  'a' === i.tagName.toLowerCase() ||
                  _.hasAttributes(i, o)
                )
                  e.start(r, i, s.parentNode.tagName.toLowerCase());
                else if (
                  'area' === a &&
                  'map' === i.tagName.toLowerCase() &&
                  _.ry(i).prev().tagName &&
                  'img' === _.ry(i).prev().tagName.toLowerCase()
                )
                  e.start(
                    r,
                    _.ry(i).prev(),
                    _.ry(i).prev().tagName.toLowerCase()
                  );
                else if (n) e.start(r, n, n.tagName.toLowerCase());
                else if (
                  'div' === a &&
                  sd.para.heatmap.collect_tags.div &&
                  e.isCollectableDiv(s)
                )
                  e.start(r, s, a);
                else if (e.isStyleTag(a) && sd.para.heatmap.collect_tags.div) {
                  var d = e.getCollectableParent(s);
                  d && e.start(r, d, 'div');
                }
              })))
        );
      },
    });
    sd.init = function (e) {
      if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2)
        return !1;
      sd.setInitVar(),
        sd.readyState.setState(2),
        sd.initPara(e),
        sd.bridge.supportAppCallJs(),
        sd.detectMode(),
        sd._.isIOS() &&
          sd._.getIOSVersion() &&
          sd._.getIOSVersion() < 13 &&
          (sd.para.heatmap &&
            sd.para.heatmap.collect_tags &&
            sd.para.heatmap.collect_tags.div &&
            sd._.setCssStyle(
              'div, [data-sensors-click] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }'
            ),
          sd.para.heatmap &&
            sd.para.heatmap.track_attr &&
            sd._.setCssStyle(
              '[' +
                sd.para.heatmap.track_attr.join('], [') +
                '] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }'
            ));
    };
    var methods = [
      'getAppStatus',
      'track',
      'quick',
      'register',
      'registerPage',
      'registerOnce',
      'trackSignup',
      'setProfile',
      'setOnceProfile',
      'appendProfile',
      'incrementProfile',
      'deleteProfile',
      'unsetProfile',
      'identify',
      'login',
      'logout',
      'trackLink',
      'clearAllRegister',
    ];
    if (
      (_.each(methods, function (e) {
        var t = sd[e];
        sd[e] = function () {
          if (sd.readyState.state < 3)
            return (
              _.isArray(sd._q) || (sd._q = []), sd._q.push([e, arguments]), !1
            );
          if (sd.readyState.getState()) return t.apply(sd, arguments);
          try {
            console.error('\u8bf7\u5148\u521d\u59cb\u5316\u795e\u7b56JS SDK');
          } catch (e) {
            sd.log(e);
          }
        };
      }),
      (sd.modules.Deeplink = (function () {
        'use strict';
        /micromessenger\/([\d.]+)/i.test(navigator.userAgent || '');
        var e,
          t = function () {
            var e = {};
            return (
              void 0 !== document.hidden
                ? ((e.hidden = 'hidden'),
                  (e.visibilityChange = 'visibilitychange'))
                : void 0 !== document.msHidden
                ? ((e.hidden = 'msHidden'),
                  (e.visibilityChange = 'msvisibilitychange'))
                : void 0 !== document.webkitHidden &&
                  ((e.hidden = 'webkitHidden'),
                  (e.visibilityChange = 'webkitvisibilitychange')),
              e
            );
          };
        function r() {
          return void 0 !== e && document[e];
        }
        e = t().hidden;
        var s = { android: /Android/i, iOS: /iPhone|iPad|iPod/i },
          a = (function () {
            for (var e in s) if (navigator.userAgent.match(s[e])) return e;
            return '';
          })(),
          i = function (e) {
            return (
              null != e &&
              '[object Object]' == Object.prototype.toString.call(e)
            );
          },
          n = {
            key: null,
            timer: null,
            sd: null,
            data: null,
            timeout: 2500,
            apiURL:
              '{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}',
            init: function () {
              if (this.sd)
                return this.log('deeplink\u5df2\u7ecf\u521d\u59cb\u5316'), !1;
              if (
                (i(sensorsDataAnalytic201505) &&
                  (this.sd = sensorsDataAnalytic201505),
                this.log('init()'),
                null === this.sd)
              )
                return (
                  this.log('\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165'),
                  !1
                );
              var e = {};
              if (
                (arguments.length > 0 &&
                  (1 === arguments.length && i(arguments[0])
                    ? (e = arguments[0])
                    : arguments.length >= 2 &&
                      i(arguments[1]) &&
                      (e = arguments[1])),
                !s.hasOwnProperty(a))
              )
                return (
                  this.log(
                    '\u4e0d\u652f\u6301\u5f53\u524d\u7cfb\u7edf\uff0c\u76ee\u524d\u53ea\u652f\u6301Android\u548ciOS'
                  ),
                  !1
                );
              if (
                (i(e) &&
                  this.sd._.isNumber(e.timeout) &&
                  e.timeout >= 2500 &&
                  (this.timeout = e.timeout),
                !this.sd.para.server_url)
              )
                return (
                  this.log(
                    '\u795e\u7b56JS SDK\u914d\u7f6e\u9879server_url\u672a\u6b63\u786e\u914d\u7f6e'
                  ),
                  !1
                );
              var t,
                r,
                o =
                  ((t = this.sd),
                  {
                    origin: (r = t._.URL(t.para.server_url)).origin,
                    project: r.searchParams.get('project') || 'default',
                  });
              this.apiURL = this.apiURL
                .replace('{origin}', o.origin)
                .replace('{project}', o.project);
              var d = this.sd._.URL(window.location.href).searchParams.get(
                'deeplink'
              );
              if (!d)
                return (
                  this.log(
                    '\u5f53\u524d\u9875\u9762\u7f3a\u5c11deeplink\u53c2\u6570'
                  ),
                  !1
                );
              d = window.decodeURIComponent(d);
              var c = d.match(/\/sd\/(\w+)\/(\w+)$/);
              if (!c)
                return (
                  this.log(
                    '\u5f53\u524d\u9875\u9762\u7684deeplink\u53c2\u6570\u65e0\u6548'
                  ),
                  !1
                );
              (this.key = c[2]),
                (this.apiURL = this.apiURL.replace(
                  '{key}',
                  window.encodeURIComponent(c[2])
                )),
                this.sd._.ajax({
                  url: this.apiURL,
                  type: 'GET',
                  cors: !0,
                  credentials: !1,
                  success: function (e) {
                    if (e.errorMsg)
                      return n.log('API\u62a5\u9519\uff1a' + e.errorMsg), !1;
                    (n.data = e),
                      n.log(
                        'API\u67e5\u8be2\u6210\u529f\uff0c\u6570\u636e\uff1a' +
                          JSON.stringify(e, null, '  ')
                      ),
                      this.data.app_key &&
                        (this.data.android_info &&
                          this.data.android_info.url_schemes &&
                          (this.data.android_info.url_schemes +=
                            '://sensorsdata/sd/' +
                            this.data.app_key +
                            '/' +
                            this.key),
                        this.data.ios_info &&
                          this.data.ios_info.url_schemes &&
                          (this.data.ios_info.url_schemes +=
                            '://sensorsdata/sd/' +
                            this.data.app_key +
                            '/' +
                            this.key));
                  }.bind(this),
                  error: function (e) {
                    n.log('API\u67e5\u8be2\u51fa\u9519');
                  },
                }),
                this.addListeners();
            },
            openDeepLink: function () {
              if ((this.log('openDeeplink()'), !this.data))
                return this.log('\u6ca1\u6709Deep link\u6570\u636e!'), !1;
              if ('iOS' === a) {
                this.log('\u5f53\u524d\u7cfb\u7edf\u662fiOS');
                var t =
                  this.sd &&
                  this.sd._ &&
                  this.sd._.getIOSVersion() >= 9 &&
                  this.data.ios_info.ios_wake_url
                    ? this.data.ios_info.ios_wake_url
                    : this.data.ios_info.url_schemes;
                this.log('\u5524\u8d77APP\u7684\u5730\u5740\uff1a' + t),
                  (s = this),
                  (i = t),
                  (n = this.data.ios_info.download_url),
                  s.log('\u5c1d\u8bd5\u5524\u8d77 iOS app:' + i),
                  (window.location.href = i),
                  (s.timer = setTimeout(function () {
                    if (r())
                      return (
                        s.log(
                          'The page is hidden, stop navigating to download page'
                        ),
                        !1
                      );
                    s.log(
                      'App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740'
                    ),
                      (window.location.href = n);
                  }, s.timeout)),
                  s.log('new timer:' + s.timer);
              } else
                this.log('\u5f53\u524d\u7cfb\u7edf\u662f android'),
                  (function (t, s, a) {
                    t.log('\u5c1d\u8bd5\u5524\u8d77 android app');
                    var i = s;
                    t.log('\u5524\u8d77APP\u7684\u5730\u5740\uff1a' + i),
                      (window.location = i),
                      (t.timer = setTimeout(function () {
                        var s = r();
                        if ((t.log('hide:' + e + ':' + document[e]), s))
                          return (
                            t.log(
                              'The page is hidden, stop navigating to download page'
                            ),
                            !1
                          );
                        t.log(
                          'App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740'
                        ),
                          (window.location = a);
                      }, t.timeout));
                  })(
                    this,
                    this.data.android_info.url_schemes,
                    this.data.android_info.download_url
                  );
              var s, i, n;
            },
            log: function (e) {
              this.sd && this.sd.log(e);
            },
            addListeners: function () {
              var e = t().visibilityChange;
              e &&
                document.addEventListener(
                  e,
                  function () {
                    clearTimeout(this.timer),
                      this.log('visibilitychange, clear timeout:' + this.timer);
                  }.bind(this),
                  !1
                ),
                window.addEventListener(
                  'pagehide',
                  function () {
                    this.log('page hide, clear timeout:' + this.timer),
                      clearTimeout(this.timer);
                  }.bind(this),
                  !1
                );
            },
          };
        return (
          i(window.SensorsDataWebJSSDKPlugin)
            ? ((window.SensorsDataWebJSSDKPlugin.Deeplink =
                window.SensorsDataWebJSSDKPlugin.Deeplink || n),
              (window.SensorsDataWebJSSDKPlugin.deeplink =
                window.SensorsDataWebJSSDKPlugin.deeplink || n))
            : (window.SensorsDataWebJSSDKPlugin = { Deeplink: n, deeplink: n }),
          n
        );
      })()),
      (sd.modules.Fingerprint = (function () {
        'use strict';
        var e = function (e, t) {
            (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
              (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
            var r = [0, 0, 0, 0];
            return (
              (r[3] += e[3] + t[3]),
              (r[2] += r[3] >>> 16),
              (r[3] &= 65535),
              (r[2] += e[2] + t[2]),
              (r[1] += r[2] >>> 16),
              (r[2] &= 65535),
              (r[1] += e[1] + t[1]),
              (r[0] += r[1] >>> 16),
              (r[1] &= 65535),
              (r[0] += e[0] + t[0]),
              (r[0] &= 65535),
              [(r[0] << 16) | r[1], (r[2] << 16) | r[3]]
            );
          },
          t = function (e, t) {
            (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
              (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
            var r = [0, 0, 0, 0];
            return (
              (r[3] += e[3] * t[3]),
              (r[2] += r[3] >>> 16),
              (r[3] &= 65535),
              (r[2] += e[2] * t[3]),
              (r[1] += r[2] >>> 16),
              (r[2] &= 65535),
              (r[2] += e[3] * t[2]),
              (r[1] += r[2] >>> 16),
              (r[2] &= 65535),
              (r[1] += e[1] * t[3]),
              (r[0] += r[1] >>> 16),
              (r[1] &= 65535),
              (r[1] += e[2] * t[2]),
              (r[0] += r[1] >>> 16),
              (r[1] &= 65535),
              (r[1] += e[3] * t[1]),
              (r[0] += r[1] >>> 16),
              (r[1] &= 65535),
              (r[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
              (r[0] &= 65535),
              [(r[0] << 16) | r[1], (r[2] << 16) | r[3]]
            );
          },
          r = function (e, t) {
            return 32 === (t %= 64)
              ? [e[1], e[0]]
              : t < 32
              ? [
                  (e[0] << t) | (e[1] >>> (32 - t)),
                  (e[1] << t) | (e[0] >>> (32 - t)),
                ]
              : ((t -= 32),
                [
                  (e[1] << t) | (e[0] >>> (32 - t)),
                  (e[0] << t) | (e[1] >>> (32 - t)),
                ]);
          },
          s = function (e, t) {
            return 0 === (t %= 64)
              ? e
              : t < 32
              ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
              : [e[1] << (t - 32), 0];
          },
          a = function (e, t) {
            return [e[0] ^ t[0], e[1] ^ t[1]];
          },
          i = function (e) {
            return (
              (e = a(e, [0, e[0] >>> 1])),
              (e = t(e, [4283543511, 3981806797])),
              (e = a(e, [0, e[0] >>> 1])),
              (e = t(e, [3301882366, 444984403])),
              (e = a(e, [0, e[0] >>> 1]))
            );
          },
          n = function (e, t) {
            if (
              Array.prototype.forEach &&
              e.forEach === Array.prototype.forEach
            )
              e.forEach(t);
            else if (e.length === +e.length)
              for (var r = 0, s = e.length; r < s; r++) t(e[r], r, e);
            else for (var a in e) e.hasOwnProperty(a) && t(e[a], a, e);
          },
          o = function (e, t) {
            var r = [];
            return null == e
              ? r
              : Array.prototype.map && e.map === Array.prototype.map
              ? e.map(t)
              : (n(e, function (e, s, a) {
                  r.push(t(e, s, a));
                }),
                r);
          },
          d = function () {
            var e = document.createElement('canvas');
            return !(!e.getContext || !e.getContext('2d'));
          },
          c = function (e) {
            if (e) {
              var t = e.getExtension('WEBGL_lose_context');
              null != t && t.loseContext();
            }
          },
          u = function () {
            if (!d()) return !1;
            var e = l(),
              t = !!window.WebGLRenderingContext && !!e;
            return c(e), t;
          },
          l = function () {
            var e = document.createElement('canvas'),
              t = null;
            try {
              t = e.getContext('webgl') || e.getContext('experimental-webgl');
            } catch (e) {}
            return t || (t = null), t;
          },
          p = {
            get: function () {
              if (d()) {
                var e = [
                  { key: 'pixelDepth', data: this.getPixelDepth() },
                  { key: 'userAgent', data: this.getUA() },
                  { key: 'vendor', data: this.getVendor() },
                  { key: 'language', data: this.getLanguage() },
                  { key: 'colorDepth', data: this.getColorDepth() },
                  { key: 'pixelRatio', data: this.getPixelRatio() },
                  {
                    key: 'hardwareConcurrency',
                    data: this.getHardwareConcurrency(),
                  },
                  { key: 'screenResolution', data: this.getScreenResolution() },
                  { key: 'timezoneOffset', data: this.getTimezoneOffset() },
                  { key: 'timezone', data: this.getTimezone() },
                  { key: 'sessionStorage', data: this.getSessionStorage() },
                  { key: 'localStorage', data: this.getLocalStorage() },
                  { key: 'indexedDb', data: this.getIndexedDb() },
                  { key: 'addBehavior', data: this.getAddBehavior() },
                  { key: 'openDatabase', data: this.getOpenDatabase() },
                  { key: 'cpuClass', data: this.getCpuClass() },
                  { key: 'platform', data: this.getPlatform() },
                  { key: 'doNotTrack', data: this.getDoNotTrack() },
                  { key: 'plugins', data: this.getPlugins() },
                  { key: 'canvas', data: this.getCanvas() },
                  { key: 'webgl', data: this.getWebgl() },
                  {
                    key: 'webglVendorAndRenderer',
                    data: this.getWebglVendorAndRenderer(),
                  },
                  { key: 'hasLiedLanguages', data: this.getHasLiedLanguages() },
                  {
                    key: 'hasLiedResolution',
                    data: this.getHasLiedResolution(),
                  },
                  { key: 'hasLiedOs', data: this.getHasLiedOs() },
                  { key: 'hasLiedBrowser', data: this.getHasLiedBrowser() },
                  { key: 'touchSupport', data: this.getTouchSupport() },
                ];
                return o(e, function (e, t, r) {
                  return e.key + ':' + e.data;
                });
              }
            },
            getPixelRatio: function () {
              return window.devicePixelRatio || 'not available';
            },
            getTimezoneOffset: function () {
              return new Date().getTimezoneOffset();
            },
            getTimezone: function () {
              return (
                (window.Intl &&
                  window.Intl.DateTimeFormat &&
                  new window.Intl.DateTimeFormat().resolvedOptions()
                    .timeZone) ||
                'not available'
              );
            },
            getSessionStorage: function () {
              try {
                return !!window.sessionStorage;
              } catch (e) {
                return 'error';
              }
            },
            getLocalStorage: function () {
              try {
                return !!window.localStorage;
              } catch (e) {
                return 'error';
              }
            },
            getIndexedDb: function () {
              if (
                ('msWriteProfilerMark' in window) +
                  ('msLaunchUri' in navigator) +
                  ('msSaveBlob' in navigator) >=
                2
              )
                return 'excluded';
              try {
                return !!window.indexedDB;
              } catch (e) {
                return 'error';
              }
            },
            getAddBehavior: function () {
              return !!window.HTMLElement.prototype.addBehavior;
            },
            getOpenDatabase: function () {
              return !!window.openDatabase;
            },
            getPlugins: function () {
              return 'Microsoft Internet Explorer' === navigator.appName ||
                ('Netscape' === navigator.appName &&
                  /Trident/.test(navigator.userAgent))
                ? 'excluded'
                : this.getRegularPlugins();
            },
            getRegularPlugins: function () {
              if (null == navigator.plugins) return 'not available';
              for (var e = [], t = 0, r = navigator.plugins.length; t < r; t++)
                navigator.plugins[t] && e.push(navigator.plugins[t]);
              return o(e, function (e) {
                var t = o(e, function (e) {
                  return [e.type, e.suffixes];
                });
                return [e.name, e.description, t];
              }).join('_');
            },
            getWebgl: function () {
              return u()
                ? (function () {
                    var e,
                      t = function (t) {
                        return (
                          e.clearColor(0, 0, 0, 1),
                          e.enable(e.DEPTH_TEST),
                          e.depthFunc(e.LEQUAL),
                          e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                          '[' + t[0] + ', ' + t[1] + ']'
                        );
                      };
                    if (!(e = l())) return null;
                    var r = [],
                      s = e.createBuffer();
                    e.bindBuffer(e.ARRAY_BUFFER, s);
                    var a = new Float32Array([
                      -0.2,
                      -0.9,
                      0,
                      0.4,
                      -0.26,
                      0,
                      0,
                      0.732134444,
                      0,
                    ]);
                    e.bufferData(e.ARRAY_BUFFER, a, e.STATIC_DRAW),
                      (s.itemSize = 3),
                      (s.numItems = 3);
                    var i = e.createProgram(),
                      o = e.createShader(e.VERTEX_SHADER);
                    e.shaderSource(
                      o,
                      'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
                    ),
                      e.compileShader(o);
                    var d = e.createShader(e.FRAGMENT_SHADER);
                    e.shaderSource(
                      d,
                      'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
                    ),
                      e.compileShader(d),
                      e.attachShader(i, o),
                      e.attachShader(i, d),
                      e.linkProgram(i),
                      e.useProgram(i),
                      (i.vertexPosAttrib = e.getAttribLocation(
                        i,
                        'attrVertex'
                      )),
                      (i.offsetUniform = e.getUniformLocation(
                        i,
                        'uniformOffset'
                      )),
                      e.enableVertexAttribArray(i.vertexPosArray),
                      e.vertexAttribPointer(
                        i.vertexPosAttrib,
                        s.itemSize,
                        e.FLOAT,
                        !1,
                        0,
                        0
                      ),
                      e.uniform2f(i.offsetUniform, 1, 1),
                      e.drawArrays(e.TRIANGLE_STRIP, 0, s.numItems);
                    try {
                      r.push(e.canvas.toDataURL());
                    } catch (e) {}
                    r.push(
                      'extensions:' +
                        (e.getSupportedExtensions() || []).join(';')
                    ),
                      r.push(
                        'webgl aliased line width range:' +
                          t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))
                      ),
                      r.push(
                        'webgl aliased point size range:' +
                          t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))
                      ),
                      r.push(
                        'webgl alpha bits:' + e.getParameter(e.ALPHA_BITS)
                      ),
                      r.push(
                        'webgl antialiasing:' +
                          (e.getContextAttributes().antialias ? 'yes' : 'no')
                      ),
                      r.push('webgl blue bits:' + e.getParameter(e.BLUE_BITS)),
                      r.push(
                        'webgl depth bits:' + e.getParameter(e.DEPTH_BITS)
                      ),
                      r.push(
                        'webgl green bits:' + e.getParameter(e.GREEN_BITS)
                      ),
                      r.push(
                        'webgl max anisotropy:' +
                          (function (e) {
                            var t =
                              e.getExtension(
                                'EXT_texture_filter_anisotropic'
                              ) ||
                              e.getExtension(
                                'WEBKIT_EXT_texture_filter_anisotropic'
                              ) ||
                              e.getExtension(
                                'MOZ_EXT_texture_filter_anisotropic'
                              );
                            if (t) {
                              var r = e.getParameter(
                                t.MAX_TEXTURE_MAX_ANISOTROPY_EXT
                              );
                              return 0 === r && (r = 2), r;
                            }
                            return null;
                          })(e)
                      ),
                      r.push(
                        'webgl max combined texture image units:' +
                          e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
                      ),
                      r.push(
                        'webgl max cube map texture size:' +
                          e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)
                      ),
                      r.push(
                        'webgl max fragment uniform vectors:' +
                          e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)
                      ),
                      r.push(
                        'webgl max render buffer size:' +
                          e.getParameter(e.MAX_RENDERBUFFER_SIZE)
                      ),
                      r.push(
                        'webgl max texture image units:' +
                          e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)
                      ),
                      r.push(
                        'webgl max texture size:' +
                          e.getParameter(e.MAX_TEXTURE_SIZE)
                      ),
                      r.push(
                        'webgl max varying vectors:' +
                          e.getParameter(e.MAX_VARYING_VECTORS)
                      ),
                      r.push(
                        'webgl max vertex attribs:' +
                          e.getParameter(e.MAX_VERTEX_ATTRIBS)
                      ),
                      r.push(
                        'webgl max vertex texture image units:' +
                          e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
                      ),
                      r.push(
                        'webgl max vertex uniform vectors:' +
                          e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)
                      ),
                      r.push(
                        'webgl max viewport dims:' +
                          t(e.getParameter(e.MAX_VIEWPORT_DIMS))
                      ),
                      r.push('webgl red bits:' + e.getParameter(e.RED_BITS)),
                      r.push('webgl renderer:' + e.getParameter(e.RENDERER)),
                      r.push(
                        'webgl shading language version:' +
                          e.getParameter(e.SHADING_LANGUAGE_VERSION)
                      ),
                      r.push(
                        'webgl stencil bits:' + e.getParameter(e.STENCIL_BITS)
                      ),
                      r.push('webgl vendor:' + e.getParameter(e.VENDOR)),
                      r.push('webgl version:' + e.getParameter(e.VERSION));
                    try {
                      var u = e.getExtension('WEBGL_debug_renderer_info');
                      u &&
                        (r.push(
                          'webgl unmasked vendor:' +
                            e.getParameter(u.UNMASKED_VENDOR_WEBGL)
                        ),
                        r.push(
                          'webgl unmasked renderer:' +
                            e.getParameter(u.UNMASKED_RENDERER_WEBGL)
                        ));
                    } catch (e) {}
                    return e.getShaderPrecisionFormat
                      ? (n(['FLOAT', 'INT'], function (t) {
                          n(['VERTEX', 'FRAGMENT'], function (s) {
                            n(['HIGH', 'MEDIUM', 'LOW'], function (a) {
                              n(
                                ['precision', 'rangeMin', 'rangeMax'],
                                function (i) {
                                  var n = e.getShaderPrecisionFormat(
                                    e[s + '_SHADER'],
                                    e[a + '_' + t]
                                  )[i];
                                  'precision' !== i && (i = 'precision ' + i);
                                  var o = [
                                    'webgl ',
                                    s.toLowerCase(),
                                    ' shader ',
                                    a.toLowerCase(),
                                    ' ',
                                    t.toLowerCase(),
                                    ' ',
                                    i,
                                    ':',
                                    n,
                                  ].join('');
                                  r.push(o);
                                }
                              );
                            });
                          });
                        }),
                        c(e),
                        r.join('_'))
                      : (c(e), r);
                  })()
                : 'not available';
            },
            getWebglVendorAndRenderer: function () {
              return u()
                ? (function () {
                    try {
                      var e = l(),
                        t = e.getExtension('WEBGL_debug_renderer_info'),
                        r =
                          e.getParameter(t.UNMASKED_VENDOR_WEBGL) +
                          '~' +
                          e.getParameter(t.UNMASKED_RENDERER_WEBGL);
                      return c(e), r;
                    } catch (e) {
                      return null;
                    }
                  })()
                : 'not available';
            },
            getHasLiedLanguages: function () {
              if (void 0 !== navigator.languages)
                try {
                  if (
                    navigator.languages[0].substr(0, 2) !==
                    navigator.language.substr(0, 2)
                  )
                    return !0;
                } catch (e) {
                  return !0;
                }
              return !1;
            },
            getHasLiedResolution: function () {
              return (
                window.screen.width < window.screen.availWidth ||
                window.screen.height < window.screen.availHeight
              );
            },
            getHasLiedOs: function () {
              var e,
                t = navigator.userAgent.toLowerCase(),
                r = navigator.oscpu,
                s = navigator.platform.toLowerCase();
              if (
                ((e =
                  t.indexOf('windows phone') >= 0
                    ? 'Windows Phone'
                    : t.indexOf('windows') >= 0 ||
                      t.indexOf('win16') >= 0 ||
                      t.indexOf('win32') >= 0 ||
                      t.indexOf('win64') >= 0 ||
                      t.indexOf('win95') >= 0 ||
                      t.indexOf('win98') >= 0 ||
                      t.indexOf('winnt') >= 0 ||
                      t.indexOf('wow64') >= 0
                    ? 'Windows'
                    : t.indexOf('android') >= 0
                    ? 'Android'
                    : t.indexOf('linux') >= 0 ||
                      t.indexOf('cros') >= 0 ||
                      t.indexOf('x11') >= 0
                    ? 'Linux'
                    : t.indexOf('iphone') >= 0 ||
                      t.indexOf('ipad') >= 0 ||
                      t.indexOf('ipod') >= 0 ||
                      t.indexOf('crios') >= 0 ||
                      t.indexOf('fxios') >= 0
                    ? 'iOS'
                    : t.indexOf('macintosh') >= 0 ||
                      t.indexOf('mac_powerpc)') >= 0
                    ? 'Mac'
                    : 'Other'),
                ('ontouchstart' in window ||
                  navigator.maxTouchPoints > 0 ||
                  navigator.msMaxTouchPoints > 0) &&
                  'Windows' !== e &&
                  'Windows Phone' !== e &&
                  'Android' !== e &&
                  'iOS' !== e &&
                  'Other' !== e &&
                  -1 === t.indexOf('cros'))
              )
                return !0;
              if (void 0 !== r) {
                if (
                  (r = r.toLowerCase()).indexOf('win') >= 0 &&
                  'Windows' !== e &&
                  'Windows Phone' !== e
                )
                  return !0;
                if (r.indexOf('linux') >= 0 && 'Linux' !== e && 'Android' !== e)
                  return !0;
                if (r.indexOf('mac') >= 0 && 'Mac' !== e && 'iOS' !== e)
                  return !0;
                if (
                  (-1 === r.indexOf('win') &&
                    -1 === r.indexOf('linux') &&
                    -1 === r.indexOf('mac')) !=
                  ('Other' === e)
                )
                  return !0;
              }
              return (
                (s.indexOf('win') >= 0 &&
                  'Windows' !== e &&
                  'Windows Phone' !== e) ||
                ((s.indexOf('linux') >= 0 ||
                  s.indexOf('android') >= 0 ||
                  s.indexOf('pike') >= 0) &&
                  'Linux' !== e &&
                  'Android' !== e) ||
                ((s.indexOf('mac') >= 0 ||
                  s.indexOf('ipad') >= 0 ||
                  s.indexOf('ipod') >= 0 ||
                  s.indexOf('iphone') >= 0) &&
                  'Mac' !== e &&
                  'iOS' !== e) ||
                (!(s.indexOf('arm') >= 0 && 'Windows Phone' === e) &&
                  !(s.indexOf('pike') >= 0 && t.indexOf('opera mini') >= 0) &&
                  ((s.indexOf('win') < 0 &&
                    s.indexOf('linux') < 0 &&
                    s.indexOf('mac') < 0 &&
                    s.indexOf('iphone') < 0 &&
                    s.indexOf('ipad') < 0 &&
                    s.indexOf('ipod') < 0) !==
                    ('Other' === e) ||
                    (void 0 === navigator.plugins &&
                      'Windows' !== e &&
                      'Windows Phone' !== e)))
              );
            },
            getHasLiedBrowser: function () {
              var e,
                t = navigator.userAgent.toLowerCase(),
                r = navigator.productSub;
              if (t.indexOf('edge/') >= 0 || t.indexOf('iemobile/') >= 0)
                return !1;
              if (t.indexOf('opera mini') >= 0) return !1;
              if (
                ('Chrome' ===
                  (e =
                    t.indexOf('firefox/') >= 0
                      ? 'Firefox'
                      : t.indexOf('opera/') >= 0 || t.indexOf(' opr/') >= 0
                      ? 'Opera'
                      : t.indexOf('chrome/') >= 0
                      ? 'Chrome'
                      : t.indexOf('safari/') >= 0
                      ? t.indexOf('android 1.') >= 0 ||
                        t.indexOf('android 2.') >= 0 ||
                        t.indexOf('android 3.') >= 0 ||
                        t.indexOf('android 4.') >= 0
                        ? 'AOSP'
                        : 'Safari'
                      : t.indexOf('trident/') >= 0
                      ? 'Internet Explorer'
                      : 'Other') ||
                  'Safari' === e ||
                  'Opera' === e) &&
                '20030107' !== r
              )
                return !0;
              var s,
                a = eval.toString().length;
              if (
                37 === a &&
                'Safari' !== e &&
                'Firefox' !== e &&
                'Other' !== e
              )
                return !0;
              if (39 === a && 'Internet Explorer' !== e && 'Other' !== e)
                return !0;
              if (
                33 === a &&
                'Chrome' !== e &&
                'AOSP' !== e &&
                'Opera' !== e &&
                'Other' !== e
              )
                return !0;
              try {
                throw 'a';
              } catch (e) {
                try {
                  e.toSource(), (s = !0);
                } catch (e) {
                  s = !1;
                }
              }
              return s && 'Firefox' !== e && 'Other' !== e;
            },
            getColorDepth: function () {
              return window.screen.colorDepth || 'not available';
            },
            getCpuClass: function () {
              return navigator.cpuClass || 'not available';
            },
            getDoNotTrack: function () {
              return navigator.doNotTrack
                ? navigator.doNotTrack
                : navigator.msDoNotTrack
                ? navigator.msDoNotTrack
                : window.doNotTrack
                ? window.doNotTrack
                : 'not available';
            },
            getHardwareConcurrency: function () {
              return navigator.hardwareConcurrency
                ? navigator.hardwareConcurrency
                : 'not available';
            },
            getPlatform: function () {
              return navigator.platform ? navigator.platform : 'not available';
            },
            getScreenResolution: function () {
              var e = [window.screen.width, window.screen.height];
              return e.sort().reverse(), e.join('_');
            },
            getPixelDepth: function () {
              return window.screen.pixelDepth || 'not available';
            },
            getTouchSupport: function () {
              var e,
                t = 0;
              void 0 !== navigator.maxTouchPoints
                ? (t = navigator.maxTouchPoints)
                : void 0 !== navigator.msMaxTouchPoints &&
                  (t = navigator.msMaxTouchPoints);
              try {
                document.createEvent('TouchEvent'), (e = !0);
              } catch (t) {
                e = !1;
              }
              return [t, e, 'ontouchstart' in window].join('_');
            },
            getVendor: function () {
              return window.navigator.vendor;
            },
            getCanvas: function () {
              return d() ? this.getCanvasFp() : '';
            },
            getCanvasFp: function () {
              var e = [],
                t = document.createElement('canvas');
              (t.width = 2e3), (t.height = 200), (t.style.display = 'inline');
              var r = t.getContext('2d');
              return (
                r.rect(0, 0, 10, 10),
                r.rect(2, 2, 6, 6),
                e.push(
                  'canvas winding:' +
                    (!1 === r.isPointInPath(5, 5, 'evenodd') ? 'yes' : 'no')
                ),
                (r.textBaseline = 'alphabetic'),
                (r.fillStyle = '#f60'),
                r.fillRect(125, 1, 62, 20),
                (r.fillStyle = '#069'),
                (r.font = '11pt no-real-font-123'),
                r.fillText('Cwm fjordbank glyphs vext quiz, 😃', 2, 15),
                (r.fillStyle = 'rgba(102, 204, 0, 0.2)'),
                (r.font = '18pt Arial'),
                r.fillText('Cwm fjordbank glyphs vext quiz, 😃', 4, 45),
                (r.globalCompositeOperation = 'multiply'),
                (r.fillStyle = 'rgb(255,0,255)'),
                r.beginPath(),
                r.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                r.closePath(),
                r.fill(),
                (r.fillStyle = 'rgb(0,255,255)'),
                r.beginPath(),
                r.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                r.closePath(),
                r.fill(),
                (r.fillStyle = 'rgb(255,255,0)'),
                r.beginPath(),
                r.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                r.closePath(),
                r.fill(),
                (r.fillStyle = 'rgb(255,0,255)'),
                r.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                r.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                r.fill('evenodd'),
                t.toDataURL && e.push('canvas fp:' + t.toDataURL()),
                e.join('_')
              );
            },
            getUA: function () {
              return navigator.userAgent;
            },
            getLanguage: function () {
              return (
                navigator.language ||
                navigator.userLanguage ||
                navigator.browserLanguage ||
                navigator.systemLanguage ||
                ''
              );
            },
          },
          _ = { sd: null };
        return (
          (_.init = function (n, o) {
            return this.sd
              ? (this.sd.log(
                  'fingerprint\u63d2\u4ef6\u5df2\u7ecf\u521d\u59cb\u5316'
                ),
                !1)
              : ((this.sd = n),
                this.sd.log('init()'),
                !1 === d()
                  ? (this.sd.log(
                      '\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301Canvas, fingerprint\u63d2\u4ef6\u505c\u6b62\u6267\u884c'
                    ),
                    !1)
                  : void this.sd.quick('isReady', function () {
                      var n =
                        'sasdkfp-' +
                        (function (n, o) {
                          o = o || 0;
                          for (
                            var d = (n = n || '').length % 16,
                              c = n.length - d,
                              u = [0, o],
                              l = [0, o],
                              p = [0, 0],
                              _ = [0, 0],
                              f = [2277735313, 289559509],
                              g = [1291169091, 658871167],
                              h = 0;
                            h < c;
                            h += 16
                          )
                            (p = [
                              (255 & n.charCodeAt(h + 4)) |
                                ((255 & n.charCodeAt(h + 5)) << 8) |
                                ((255 & n.charCodeAt(h + 6)) << 16) |
                                ((255 & n.charCodeAt(h + 7)) << 24),
                              (255 & n.charCodeAt(h)) |
                                ((255 & n.charCodeAt(h + 1)) << 8) |
                                ((255 & n.charCodeAt(h + 2)) << 16) |
                                ((255 & n.charCodeAt(h + 3)) << 24),
                            ]),
                              (_ = [
                                (255 & n.charCodeAt(h + 12)) |
                                  ((255 & n.charCodeAt(h + 13)) << 8) |
                                  ((255 & n.charCodeAt(h + 14)) << 16) |
                                  ((255 & n.charCodeAt(h + 15)) << 24),
                                (255 & n.charCodeAt(h + 8)) |
                                  ((255 & n.charCodeAt(h + 9)) << 8) |
                                  ((255 & n.charCodeAt(h + 10)) << 16) |
                                  ((255 & n.charCodeAt(h + 11)) << 24),
                              ]),
                              (p = t(p, f)),
                              (p = r(p, 31)),
                              (p = t(p, g)),
                              (u = a(u, p)),
                              (u = r(u, 27)),
                              (u = e(u, l)),
                              (u = e(t(u, [0, 5]), [0, 1390208809])),
                              (_ = t(_, g)),
                              (_ = r(_, 33)),
                              (_ = t(_, f)),
                              (l = a(l, _)),
                              (l = r(l, 31)),
                              (l = e(l, u)),
                              (l = e(t(l, [0, 5]), [0, 944331445]));
                          switch (((p = [0, 0]), (_ = [0, 0]), d)) {
                            case 15:
                              _ = a(_, s([0, n.charCodeAt(h + 14)], 48));
                            case 14:
                              _ = a(_, s([0, n.charCodeAt(h + 13)], 40));
                            case 13:
                              _ = a(_, s([0, n.charCodeAt(h + 12)], 32));
                            case 12:
                              _ = a(_, s([0, n.charCodeAt(h + 11)], 24));
                            case 11:
                              _ = a(_, s([0, n.charCodeAt(h + 10)], 16));
                            case 10:
                              _ = a(_, s([0, n.charCodeAt(h + 9)], 8));
                            case 9:
                              (_ = a(_, [0, n.charCodeAt(h + 8)])),
                                (_ = t(_, g)),
                                (_ = r(_, 33)),
                                (_ = t(_, f)),
                                (l = a(l, _));
                            case 8:
                              p = a(p, s([0, n.charCodeAt(h + 7)], 56));
                            case 7:
                              p = a(p, s([0, n.charCodeAt(h + 6)], 48));
                            case 6:
                              p = a(p, s([0, n.charCodeAt(h + 5)], 40));
                            case 5:
                              p = a(p, s([0, n.charCodeAt(h + 4)], 32));
                            case 4:
                              p = a(p, s([0, n.charCodeAt(h + 3)], 24));
                            case 3:
                              p = a(p, s([0, n.charCodeAt(h + 2)], 16));
                            case 2:
                              p = a(p, s([0, n.charCodeAt(h + 1)], 8));
                            case 1:
                              (p = a(p, [0, n.charCodeAt(h)])),
                                (p = t(p, f)),
                                (p = r(p, 31)),
                                (p = t(p, g)),
                                (u = a(u, p));
                          }
                          return (
                            (u = a(u, [0, n.length])),
                            (l = a(l, [0, n.length])),
                            (u = e(u, l)),
                            (l = e(l, u)),
                            (u = i(u)),
                            (l = i(l)),
                            (u = e(u, l)),
                            (l = e(l, u)),
                            ('00000000' + (u[0] >>> 0).toString(16)).slice(-8) +
                              ('00000000' + (u[1] >>> 0).toString(16)).slice(
                                -8
                              ) +
                              ('00000000' + (l[0] >>> 0).toString(16)).slice(
                                -8
                              ) +
                              ('00000000' + (l[1] >>> 0).toString(16)).slice(-8)
                          );
                        })(p.get().join(''), 31);
                      _.sd.log('fingerprint \u5df2\u7ecf\u751f\u6210:', n);
                      var o = _.sd.quick('getAnonymousID');
                      o === n ||
                        o.match(/^sasdkfp-\w+/) ||
                        (_.sd.log(
                          'anonymous_id \u548c\u751f\u6210\u7684 fingerprint \u4e0d\u4e00\u81f4\uff0c\u8c03\u7528 identify(). \u65e7ID\uff1a' +
                            o
                        ),
                        _.sd.identify(n, !0),
                        _.sd.store.getFirstId() &&
                          _.sd.saEvent.send(
                            {
                              original_id: n,
                              distinct_id: _.sd.store.getDistinctId(),
                              type: 'track_signup',
                              event: '$SignUp',
                              properties: {},
                            },
                            null
                          ));
                    }));
          }),
          'object' != typeof window.SensorsDataWebJSSDKPlugin
            ? (window.SensorsDataWebJSSDKPlugin = { Fingerprint: _ })
            : (window.SensorsDataWebJSSDKPlugin.Fingerprint =
                window.SensorsDataWebJSSDKPlugin.Fingerprint || _),
          _
        );
      })()),
      (sd.modules.SiteLinker = (function () {
        'use strict';
        var e = {
          getPart: function (e) {
            var t = this.option.length;
            if (t)
              for (var r = 0; r < t; r++)
                if (e.indexOf(this.option[r].part_url) > -1) return !0;
            return !1;
          },
          getPartHash: function (e) {
            var t = this.option.length;
            if (t)
              for (var r = 0; r < t; r++)
                if (e.indexOf(this.option[r].part_url) > -1)
                  return this.option[r].after_hash;
            return !1;
          },
          getCurrenId: function () {
            var e = this.store.getDistinctId() || '',
              t = this.store.getFirstId() || '';
            return (
              this._.urlSafeBase64 && this._.urlSafeBase64.encode
                ? (e = e ? this._.urlSafeBase64.encode(_.base64Encode(e)) : '')
                : this._.rot13obfs && (e = e ? this._.rot13obfs(e) : ''),
              encodeURIComponent(t ? 'f' + e : 'd' + e)
            );
          },
          rewireteUrl: function (e, t) {
            var r = /([^?#]+)(\?[^#]*)?(#.*)?/.exec(e),
              s = '';
            if (r) {
              var a,
                i = r[1] || '',
                n = r[2] || '',
                o = r[3] || '';
              if (this.getPartHash(e))
                (a = o.indexOf('_sasdk')),
                  (s =
                    o.indexOf('?') > -1
                      ? a > -1
                        ? i +
                          n +
                          '#' +
                          o.substring(1, a) +
                          '_sasdk=' +
                          this.getCurrenId()
                        : i +
                          n +
                          '#' +
                          o.substring(1) +
                          '&_sasdk=' +
                          this.getCurrenId()
                      : i +
                        n +
                        '#' +
                        o.substring(1) +
                        '?_sasdk=' +
                        this.getCurrenId());
              else
                (a = n.indexOf('_sasdk')),
                  (s = /^\?(\w)+/.test(n)
                    ? a > -1
                      ? i +
                        '?' +
                        n.substring(1, a) +
                        '_sasdk=' +
                        this.getCurrenId() +
                        o
                      : i +
                        '?' +
                        n.substring(1) +
                        '&_sasdk=' +
                        this.getCurrenId() +
                        o
                    : i +
                      '?' +
                      n.substring(1) +
                      '_sasdk=' +
                      this.getCurrenId() +
                      o);
              return t && (t.href = s), s;
            }
          },
          getUrlId: function () {
            var e = location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);
            if (this._.isArray(e) && e[1]) {
              var t = decodeURIComponent(e[1]);
              return (
                !t ||
                  ('f' !== t.substring(0, 1) && 'd' !== t.substring(0, 1)) ||
                  (this._.urlSafeBase64 &&
                  this._.urlSafeBase64.isUrlSafeBase64 &&
                  this._.urlSafeBase64.isUrlSafeBase64(t)
                    ? (t =
                        t.substring(0, 1) +
                        _.base64Decode(
                          this._.urlSafeBase64.decode(t.substring(1))
                        ))
                    : this._.rot13defs &&
                      (t =
                        t.substring(0, 1) + this._.rot13defs(t.substring(1)))),
                t
              );
            }
            return '';
          },
          setRefferId: function () {
            var e = this.store.getDistinctId(),
              t = this.getUrlId();
            if ('' === t) return !1;
            var r = 'a' === t.substring(0, 1) || 'd' === t.substring(0, 1);
            if ((t = t.substring(1)) === e) return !1;
            t &&
              r &&
              this.store.getFirstId() &&
              (this.sd.identify(t, !0),
              this.sd.saEvent.send(
                {
                  original_id: t,
                  distinct_id: e,
                  type: 'track_signup',
                  event: '$SignUp',
                  properties: {},
                },
                null
              )),
              t && r && !this.store.getFirstId() && this.sd.identify(t, !0),
              !t || r || this.store.getFirstId() || this.sd.login(t);
          },
          addListen: function () {
            var e = this;
            e._.addEvent(document, 'mousedown', function (t) {
              var r,
                s,
                a = t.target,
                i = a.tagName.toLowerCase(),
                n = a.parentNode,
                o = n ? n.tagName.toLowerCase() : '';
              if (('a' === i && a.href) || ('a' === o && n.href)) {
                'a' === i && a.href
                  ? ((r = a.href), (s = a))
                  : ((r = n.href), (s = n));
                var d = e._.URL(r).protocol;
                ('http:' !== d && 'https:' !== d) ||
                  (e.getPart(r) && e.rewireteUrl(r, s));
              }
            });
          },
          init: function (e, t) {
            (this.sd = e),
              (this._ = e._),
              (this.store = e.store),
              (this.para = e.para),
              this._.isObject(t) &&
              this._.isArray(t.linker) &&
              t.linker.length > 0
                ? (this.setRefferId(),
                  this.addListen(),
                  (this.option = t.linker),
                  (this.option = (function (t) {
                    for (var r = t.length, s = [], a = 0; a < r; a++)
                      /[A-Za-z0-9]+\./.test(t[a].part_url) &&
                      '[object Boolean]' ==
                        Object.prototype.toString.call(t[a].after_hash)
                        ? s.push(t[a])
                        : e.log(
                            'linker \u914d\u7f6e\u7684\u7b2c ' +
                              (a + 1) +
                              ' \u9879\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff01'
                          );
                    return s;
                  })(this.option)))
                : e.log(
                    '\u8bf7\u914d\u7f6e\u6253\u901a\u57df\u540d\u53c2\u6570\uff01'
                  );
          },
        };
        return (
          _.isObject(window.SensorsDataWebJSSDKPlugin)
            ? (window.SensorsDataWebJSSDKPlugin.SiteLinker =
                window.SensorsDataWebJSSDKPlugin.SiteLinker || e)
            : (window.SensorsDataWebJSSDKPlugin = { SiteLinker: e }),
          e
        );
      })()),
      'string' != typeof window.sensorsDataAnalytic201505)
    )
      return void 0 === window.sensorsDataAnalytic201505
        ? ((window.sensorsDataAnalytic201505 = sd), sd)
        : window.sensorsDataAnalytic201505;
    sd.setPreConfig(window[sensorsDataAnalytic201505]),
      (window[sensorsDataAnalytic201505] = sd),
      (window.sensorsDataAnalytic201505 = sd),
      sd.init();
  } catch (e) {
    if ('object' == typeof console && console.log)
      try {
        console.log(e);
      } catch (e) {
        sd.log(e);
      }
  }
  var T,
    ENC,
    DEC,
    ArrayProto,
    FuncProto,
    ObjProto,
    slice,
    toString,
    hasOwnProperty,
    nativeForEach,
    nativeIsArray,
    breaker,
    each;
});
