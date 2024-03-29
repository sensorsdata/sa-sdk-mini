var sd = {};

sd.modules = {};

var _ = (sd._ = {});

// 压缩后的json库，照抄的github上的库
if (typeof JSON !== 'object') {
  JSON = {};
}
(function () {
  'use strict';
  var rx_one = /^[\],:{}\s]*$/,
    rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    rx_four = /(?:^|:|,)(?:\s*\[)+/g,
    rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  function f(n) {
    return n < 10 ? '0' + n : n;
  }
  function this_value() {
    return this.valueOf();
  }
  if (typeof Date.prototype.toJSON !== 'function') {
    Date.prototype.toJSON = function () {
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
    };
    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }
  var gap, indent, meta, rep;
  function quote(string) {
    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string)
      ? '"' +
          string.replace(rx_escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
              ? c
              : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + string + '"';
  }
  function str(key, holder) {
    var i,
      k,
      v,
      length,
      mind = gap,
      partial,
      value = holder[key];
    if (
      value &&
      typeof value === 'object' &&
      typeof value.toJSON === 'function'
    ) {
      value = value.toJSON(key);
    }
    if (typeof rep === 'function') {
      value = rep.call(holder, key, value);
    }
    switch (typeof value) {
      case 'string':
        return quote(value);
      case 'number':
        return isFinite(value) ? String(value) : 'null';
      case 'boolean':
      case 'null':
        return String(value);
      case 'object':
        if (!value) {
          return 'null';
        }
        gap += indent;
        partial = [];
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }
          v =
            partial.length === 0
              ? '[]'
              : gap
              ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
              : '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }
        if (rep && typeof rep === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === 'string') {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }
        v =
          partial.length === 0
            ? '{}'
            : gap
            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
            : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
  }
  if (typeof JSON.stringify !== 'function') {
    meta = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    };
    JSON.stringify = function (value, replacer, space) {
      var i;
      gap = '';
      indent = '';
      if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
          indent += ' ';
        }
      } else if (typeof space === 'string') {
        indent = space;
      }
      rep = replacer;
      if (
        replacer &&
        typeof replacer !== 'function' &&
        (typeof replacer !== 'object' || typeof replacer.length !== 'number')
      ) {
        throw new Error('JSON.stringify');
      }
      return str('', { '': value });
    };
  }
  if (typeof JSON.parse !== 'function') {
    JSON.parse = function (text, reviver) {
      var j;
      function walk(holder, key) {
        var k,
          v,
          value = holder[key];
        if (value && typeof value === 'object') {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }
      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        rx_one.test(
          text.replace(rx_two, '@').replace(rx_three, ']').replace(rx_four, '')
        )
      ) {
        j = eval('(' + text + ')');
        return typeof reviver === 'function' ? walk({ '': j }, '') : j;
      }
      throw new SyntaxError('JSON.parse');
    };
  }
})();

/*
一系列的通用的方法
*/

(function () {
  var ArrayProto = Array.prototype;
  var FuncProto = Function.prototype;
  var ObjProto = Object.prototype;
  var slice = ArrayProto.slice;
  var toString = ObjProto.toString;
  var hasOwnProperty = ObjProto.hasOwnProperty;
  var nativeBind = FuncProto.bind;
  var nativeForEach = ArrayProto.forEach;
  var nativeIndexOf = ArrayProto.indexOf;
  var nativeIsArray = Array.isArray;
  var breaker = {};

  var each = (_.each = function (obj, iterator, context) {
    if (obj == null) {
      return false;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
          return false;
        }
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) {
            return false;
          }
        }
      }
    }
  });

  // 普通的extend，不能到二级
  _.extend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };
  // 允许二级的extend
  _.extend2Lev = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
            _.extend(obj[prop], source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };
  // 如果已经有的属性不覆盖,如果没有的属性加进来
  _.coverExtend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        if (source[prop] !== void 0 && obj[prop] === void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  _.isArray =
    nativeIsArray ||
    function (obj) {
      return toString.call(obj) === '[object Array]';
    };

  _.isFunction = function (f) {
    if (!f) {
      return false;
    }
    try {
      return /^\s*\bfunction\b/.test(f);
    } catch (x) {
      return false;
    }
  };

  _.isArguments = function (obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  _.toArray = function (iterable) {
    if (!iterable) {
      return [];
    }
    if (iterable.toArray) {
      return iterable.toArray();
    }
    if (_.isArray(iterable)) {
      return slice.call(iterable);
    }
    if (_.isArguments(iterable)) {
      return slice.call(iterable);
    }
    return _.values(iterable);
  };

  _.values = function (obj) {
    var results = [];
    if (obj == null) {
      return results;
    }
    each(obj, function (value) {
      results[results.length] = value;
    });
    return results;
  };

  _.indexOf = function (arr, target) {
    var indexof = arr.indexOf;
    if (indexof) {
      return indexof.call(arr, target);
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (target === arr[i]) {
          return i;
        }
      }
      return -1;
    }
  };

  _.hasAttribute = function (ele, attr) {
    if (ele.hasAttribute) {
      return ele.hasAttribute(attr);
    } else {
      return !!(ele.attributes[attr] && ele.attributes[attr].specified);
    }
  };

  _.filter = function (arr, fn, self) {
    var hasOwn = Object.prototype.hasOwnProperty;
    if (arr.filter) {
      return arr.filter(fn);
    }
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      if (!hasOwn.call(arr, i)) {
        continue;
      }
      var val = arr[i];
      if (fn.call(self, val, i, arr)) {
        ret.push(val);
      }
    }
    return ret;
  };

  _.inherit = function (subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
  };

  _.trim = function (str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };

  _.isObject = function (obj) {
    if (obj == null) {
      return false;
    } else {
      return toString.call(obj) == '[object Object]';
    }
  };

  _.isEmptyObject = function (obj) {
    if (_.isObject(obj)) {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  _.isUndefined = function (obj) {
    return obj === void 0;
  };

  _.isString = function (obj) {
    return toString.call(obj) == '[object String]';
  };

  _.isDate = function (obj) {
    return toString.call(obj) == '[object Date]';
  };

  _.isBoolean = function (obj) {
    return toString.call(obj) == '[object Boolean]';
  };

  _.isNumber = function (obj) {
    return (
      toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj))
    );
  };

  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  };

  _.isJSONString = function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  _.safeJSONParse = function (str) {
    var val = null;
    try {
      val = JSON.parse(str);
    } catch (e) {
      return false;
    }
    return val;
  };
  // gbk等编码decode会异常
  _.decodeURIComponent = function (val) {
    var result = val;
    try {
      result = decodeURIComponent(val);
    } catch (e) {
      result = val;
    }
    return result;
  };

  _.encodeDates = function (obj) {
    _.each(obj, function (v, k) {
      if (_.isDate(v)) {
        obj[k] = _.formatDate(v);
      } else if (_.isObject(v)) {
        obj[k] = _.encodeDates(v); // recurse
      }
    });
    return obj;
  };

  _.mediaQueriesSupported = function () {
    return (
      typeof window.matchMedia != 'undefined' ||
      typeof window.msMatchMedia != 'undefined'
    );
  };

  // Returns current screen orientation type
  // Possible values: ['未取到值', 'landscape', 'portrait']
  // Defaults to '未取到值'.
  // Tested on
  // * IE 6 => '未取到值'
  // * Opera 15 on macOS
  // * Firefox 68 on macOS
  // * Safari 12.1 on macOS
  // * Chrome 75 on macOS
  // * Safari on iPhone X
  // * Chrome on Google Pixel 2
  _.getScreenOrientation = function () {
    // Screen Orientation API
    var screenOrientationAPI =
      screen.msOrientation ||
      screen.mozOrientation ||
      (screen.orientation || {}).type;
    var screenOrientation = '未取到值';
    if (screenOrientationAPI) {
      screenOrientation =
        screenOrientationAPI.indexOf('landscape') > -1
          ? 'landscape'
          : 'portrait';
    } else if (_.mediaQueriesSupported()) {
      // matchMedia
      var matchMediaFunc = window.matchMedia || window.msMatchMedia;
      if (matchMediaFunc('(orientation: landscape)').matches) {
        screenOrientation = 'landscape';
      } else if (matchMediaFunc('(orientation: portrait)').matches) {
        screenOrientation = 'portrait';
      }
    }
    return screenOrientation;
  };

  _.now =
    Date.now ||
    function () {
      return new Date().getTime();
    };

  _.throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  _.hashCode = function (str) {
    if (typeof str !== 'string') {
      return 0;
    }
    var hash = 0;
    var char = null;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  _.formatDate = function (d) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    return (
      d.getFullYear() +
      '-' +
      pad(d.getMonth() + 1) +
      '-' +
      pad(d.getDate()) +
      ' ' +
      pad(d.getHours()) +
      ':' +
      pad(d.getMinutes()) +
      ':' +
      pad(d.getSeconds()) +
      '.' +
      pad(d.getMilliseconds())
    );
  };

  // 把日期格式全部转化成日期字符串
  _.searchObjDate = function (o) {
    if (_.isObject(o)) {
      _.each(o, function (a, b) {
        if (_.isObject(a)) {
          _.searchObjDate(o[b]);
        } else {
          if (_.isDate(a)) {
            o[b] = _.formatDate(a);
          }
        }
      });
    }
  };

  _.searchZZAppStyle = function (data) {
    if (typeof data.properties.$project !== 'undefined') {
      data.project = data.properties.$project;
      delete data.properties.$project;
    }
    if (typeof data.properties.$token !== 'undefined') {
      data.token = data.properties.$token;
      delete data.properties.$token;
    }
  };

  _.formatJsonString = function (obj) {
    try {
      return JSON.stringify(obj, null, '  ');
    } catch (e) {
      return JSON.stringify(obj);
    }
  };

  // 把字符串格式数据限制字符串长度
  _.formatString = function (str) {
    if (str.length > sd.para.max_string_length) {
      sd.log('字符串长度超过限制，已经做截取--' + str);
      return str.slice(0, sd.para.max_string_length);
    } else {
      return str;
    }
  };

  // 把字符串格式数据限制字符串长度
  _.searchObjString = function (o) {
    if (_.isObject(o)) {
      _.each(o, function (a, b) {
        if (_.isObject(a)) {
          _.searchObjString(o[b]);
        } else {
          if (_.isString(a)) {
            o[b] = _.formatString(a);
          }
        }
      });
    }
  };

  /**
   * 执行属性中的函数，并且过滤掉不符合条件的属性
   *
   * @param {Object} obj - Properties.
   *
   */
  _.parseSuperProperties = function (obj) {
    if (_.isObject(obj)) {
      _.each(obj, function (value, key) {
        if (_.isFunction(value)) {
          try {
            obj[key] = value();
            if (_.isFunction(obj[key])) {
              sd.log('您的属性- ' + key + ' 格式不满足要求，我们已经将其删除');
              delete obj[key];
            }
          } catch (e) {
            delete obj[key];
            sd.log('您的属性- ' + key + ' 抛出了异常，我们已经将其删除');
          }
        }
      });
      _.strip_sa_properties(obj);
    }
  };

  /**
   * @description 过滤掉事件的属性名为保留字段的属性
   * @param {object} obj 属性对象
   */
  _.filterReservedProperties = function (obj) {
    var reservedFields = [
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
      'users'
    ];
    if (!_.isObject(obj)) {
      return;
    }
    _.each(reservedFields, function (key, index) {
      if (!(key in obj)) {
        return;
      }
      if (index < 3) {
        delete obj[key];
        sd.log('您的属性- ' + key + '是保留字段，我们已经将其删除');
      } else {
        sd.log('您的属性- ' + key + '是保留字段，请避免其作为属性名');
      }
    });
  };

  // 去除$option的配置数据
  _.searchConfigData = function (data) {
    if (typeof data === 'object' && data.$option) {
      var data_config = data.$option;
      delete data.$option;
      return data_config;
    } else {
      return {};
    }
  };

  // 数组去重复
  _.unique = function (ar) {
    var temp,
      n = [],
      o = {};
    for (var i = 0; i < ar.length; i++) {
      temp = ar[i];
      if (!(temp in o)) {
        o[temp] = true;
        n.push(temp);
      }
    }
    return n;
  };

  // 只能是sensors满足的数据格式
  _.strip_sa_properties = function (p) {
    if (!_.isObject(p)) {
      return p;
    }
    _.each(p, function (v, k) {
      // 如果是数组，把值自动转换成string
      if (_.isArray(v)) {
        var temp = [];
        _.each(v, function (arrv) {
          if (_.isString(arrv)) {
            temp.push(arrv);
          } else {
            sd.log('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
          }
        });
        if (temp.length !== 0) {
          p[k] = temp;
        } else {
          delete p[k];
          sd.log('已经删除空的数组');
        }
      }
      // 只能是字符串，数字，日期,布尔，数组
      if (
        !(
          _.isString(v) ||
          _.isNumber(v) ||
          _.isDate(v) ||
          _.isBoolean(v) ||
          _.isArray(v) ||
          _.isFunction(v) ||
          k === '$option'
        )
      ) {
        sd.log('您的数据-', k, v, '-格式不满足要求，我们已经将其删除');
        delete p[k];
      }
    });
    return p;
  };

  // 去掉undefined和null
  _.strip_empty_properties = function (p) {
    var ret = {};
    _.each(p, function (v, k) {
      if (v != null) {
        ret[k] = v;
      }
    });
    return ret;
  };

  _.utf8Encode = function (string) {
    string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    var utftext = '',
      start,
      end;
    var stringl = 0,
      n;

    start = end = 0;
    stringl = string.length;

    for (n = 0; n < stringl; n++) {
      var c1 = string.charCodeAt(n);
      var enc = null;

      if (c1 < 128) {
        end++;
      } else if (c1 > 127 && c1 < 2048) {
        enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
      } else {
        enc = String.fromCharCode(
          (c1 >> 12) | 224,
          ((c1 >> 6) & 63) | 128,
          (c1 & 63) | 128
        );
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.substring(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
    }

    if (end > start) {
      utftext += string.substring(start, string.length);
    }

    return utftext;
  };

  /**
   * Create a base-64 encoded ASCII string from a UTF-8 string.
   */
  _.base64Encode = function (data) {
    if (typeof btoa === 'function') {
      return btoa(
        encodeURIComponent(data).replace(
          /%([0-9A-F]{2})/g,
          function (match, p1) {
            return String.fromCharCode('0x' + p1);
          }
        )
      );
    }
    data = String(data);
    var b64 =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      i = 0,
      ac = 0,
      enc = '',
      tmp_arr = [];
    if (!data) {
      return data;
    }
    data = _.utf8Encode(data);
    do {
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);

      bits = (o1 << 16) | (o2 << 8) | o3;

      h1 = (bits >> 18) & 0x3f;
      h2 = (bits >> 12) & 0x3f;
      h3 = (bits >> 6) & 0x3f;
      h4 = bits & 0x3f;
      tmp_arr[ac++] =
        b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
      case 1:
        enc = enc.slice(0, -2) + '==';
        break;
      case 2:
        enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
  };

  _.UUID = (function () {
    var T = function () {
      var d = 1 * new Date(),
        i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function () {
      return Math.random().toString(16).replace('.', '');
    };
    var UA = function (n) {
      var ua = navigator.userAgent,
        i,
        ch,
        buffer = [],
        ret = 0;

      function xor(result, byte_array) {
        var j,
          tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= buffer[j] << (j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xff);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };

    return function () {
      // 有些浏览器取个屏幕宽度都异常...
      var se = String(screen.height * screen.width);
      if (se && /\d{5,}/.test(se)) {
        se = se.toString(16);
      } else {
        se = String(Math.random() * 31242)
          .replace('.', '')
          .slice(0, 8);
      }
      var val = T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
      if (val) {
        return val;
      } else {
        return (
          String(Math.random()) +
          String(Math.random()) +
          String(Math.random())
        ).slice(2, 15);
      }
    };
  })();

  _.getQueryParam = function (url, param) {
    param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    url = _.decodeURIComponent(url);
    var regexS = '[\\?&]' + param + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);
    if (
      results === null ||
      (results && typeof results[1] !== 'string' && results[1].length)
    ) {
      return '';
    } else {
      return _.decodeURIComponent(results[1]);
    }
  };

  _.urlParse = function (para) {
    var URLParser = function (a) {
      this._fields = {
        Username: 4,
        Password: 5,
        Port: 7,
        Protocol: 2,
        Host: 6,
        Path: 8,
        URL: 0,
        QueryString: 9,
        Fragment: 10
      };
      this._values = {};
      this._regex = null;
      this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

      if (typeof a != 'undefined') {
        this._parse(a);
      }
    };
    URLParser.prototype.setUrl = function (a) {
      this._parse(a);
    };
    URLParser.prototype._initValues = function () {
      for (var a in this._fields) {
        this._values[a] = '';
      }
    };
    URLParser.prototype.addQueryString = function (queryObj) {
      if (typeof queryObj !== 'object') {
        return false;
      }
      var query = this._values.QueryString || '';
      for (var i in queryObj) {
        if (new RegExp(i + '[^&]+').test(query)) {
          query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
        } else {
          if (query.slice(-1) === '&') {
            query = query + i + '=' + queryObj[i];
          } else {
            if (query === '') {
              query = i + '=' + queryObj[i];
            } else {
              query = query + '&' + i + '=' + queryObj[i];
            }
          }
        }
      }
      this._values.QueryString = query;
    };
    URLParser.prototype.getUrl = function () {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      url += this._values.Fragment ? '#' + this._values.Fragment : '';
      return url;
    };

    URLParser.prototype.getUrl = function () {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      return url;
    };
    URLParser.prototype._parse = function (a) {
      this._initValues();
      var b = this._regex.exec(a);
      if (!b) {
        throw 'DPURLParser::_parse -> Invalid URL';
      }
      for (var c in this._fields) {
        if (typeof b[this._fields[c]] != 'undefined') {
          this._values[c] = b[this._fields[c]];
        }
      }
      this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
      this._values['Origin'] =
        this._values['Protocol'] + '://' + this._values['Hostname'];
    };
    return new URLParser(para);
  };

  /* ulr预置
_.referringDomain = function(referrer) {
  var split = referrer.split('/');
  if (split.length >= 3) {
    return split[2];
  }
  return '';
};

_.getDomainByHost = function(url) {
  if (typeof url === 'string' && url.split('.').length >= 2) {
    var temp = url.match(/[^\.]+\.[^.]+$/);
    if (temp && temp[0]) {
      return temp[0];
    } else {
      return '';
    }
  } else {
    return '';
  }
}
*/

  /* _.draggable = function(elementToDrag, event) {
  function getScrollOffsets() {
    var w = document;
    if (w.pageXOffset != null) {
      return {
        x: w.pageXOffset,
        y: w.pageYOffset
      };
    } else {
      return {
        x: w.documentElement.scrollLeft,
        y: w.documentElement.scrollTop
      };
    }
  }

  var scroll = getScrollOffsets();
  var startX = event.clientX + scroll.x;
  var startY = event.clientY + scroll.y;
  var origX = elementToDrag.offsetLeft;
  var origY = elementToDrag.offsetTop;
  var deltaX = startX - origX;
  var deltaY = startY - origY;
  if (document.addEventListener) {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  } else if (document.attachEvent) {
    document.attachEvent("onmousemove", moveHandler);
    document.attachEvent("onmouseup", upHandler);
  }
  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;
  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;

  elementToDrag.style.bottom = 'auto';

  function moveHandler(e) {
    e = e || window.event;
    var scroll = getScrollOffsets();
    elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
    elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
  function upHandler(e) {
    if (!e) e = window.event;
    if (document.removeEventListener) {
      document.removeEventListener("mouseup", upHandler);
      document.removeEventListener("mousemove", moveHandler);
    } else if (document.detachEvent) {
      document.detachEvent("onmouseup", upHandler);
      document.detachEvent("onmousemove", moveHandler);
    }
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
} */

  // 是否有标准的浏览器环境,如果不是发送$errorEnviroment:{$errorReson:'没有window'}
  /* _.hasStandardBrowserEnviroment = function() {
  if (!window) {
    return 'window';
  }
  if (!document) {
    return 'document';
  }
  if (!navigator) {
    return 'navigator';
  }
  if (!screen) {
    return 'screen';
  }

}; */

  /* _.bindReady = function(fn,win) {
  win = win || window;
  var done = false,
  top = true,
  doc = win.document,
  root = doc.documentElement,
  modern = doc.addEventListener,
  add = modern ? 'addEventListener' : 'attachEvent',
  rem = modern ? 'removeEventListener' : 'detachEvent',
  pre = modern ? '' : 'on',
  init = function(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  },
  poll = function() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  };

  if (doc.readyState == 'complete') fn.call(win, 'lazy');
  else {
    if (!modern && root.doScroll) {
      try { top = !win.frameElement; } catch(e) { }
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }

}; */

  _.addEvent = function () {
    function fixEvent(event) {
      if (event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        event._getPath = fixEvent._getPath;
      }
      return event;
    }
    fixEvent._getPath = function () {
      var ev = this;
      var polyfill = function () {
        try {
          var element = ev.target;
          var pathArr = [element];
          if (element === null || element.parentElement === null) {
            return [];
          }
          while (element.parentElement !== null) {
            element = element.parentElement;
            pathArr.unshift(element);
          }
          return pathArr;
        } catch (err) {
          return [];
        }
      };
      return (
        this.path || (this.composedPath && this.composedPath()) || polyfill()
      );
    };
    fixEvent.preventDefault = function () {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function () {
      this.cancelBubble = true;
    };

    var register_event = function (element, type, handler) {
      var useCapture =
        _.isObject(sd.para.heatmap) && sd.para.heatmap.useCapture
          ? true
          : false;
      if (
        _.isObject(sd.para.heatmap) &&
        typeof sd.para.heatmap.useCapture === 'undefined' &&
        type === 'click'
      ) {
        useCapture = true;
      }
      if (element && element.addEventListener) {
        element.addEventListener(
          type,
          function (e) {
            e._getPath = fixEvent._getPath;
            handler.call(this, e);
          },
          useCapture
        );
      } else {
        var ontype = 'on' + type;
        var old_handler = element[ontype];
        element[ontype] = makeHandler(element, handler, old_handler);
      }
    };
    function makeHandler(element, new_handler, old_handlers) {
      var handler = function (event) {
        event = event || fixEvent(window.event);
        if (!event) {
          return undefined;
        }
        event.target = event.srcElement;

        var ret = true;
        var old_result, new_result;
        if (typeof old_handlers === 'function') {
          old_result = old_handlers(event);
        }
        new_result = new_handler.call(element, event);
        if (false === old_result || false === new_result) {
          ret = false;
        }
        return ret;
      };
      return handler;
    }

    register_event.apply(null, arguments);
  };

  _.addHashEvent = function (callback) {
    var hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
    _.addEvent(window, hashEvent, callback);
  };

  _.addSinglePageEvent = function (callback) {
    var current_url = location.href;
    var historyPushState = window.history.pushState;
    var historyReplaceState = window.history.replaceState;

    //调用方法导致的url切换
    window.history.pushState = function () {
      historyPushState.apply(window.history, arguments);
      callback(current_url);
      current_url = location.href;
    };
    window.history.replaceState = function () {
      historyReplaceState.apply(window.history, arguments);
      callback(current_url);
      current_url = location.href;
    };

    // 前进后退导致的url切换
    var singlePageEvent = historyPushState ? 'popstate' : 'hashchange';
    _.addEvent(window, singlePageEvent, function () {
      callback(current_url);
      current_url = location.href;
    });
  };

  _.cookie = {
    get: function (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return _.decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    set: function (name, value, days, cross_subdomain, is_secure) {
      cross_subdomain =
        typeof cross_subdomain === 'undefined'
          ? sd.para.cross_subdomain
          : cross_subdomain;
      var cdomain = '',
        expires = '',
        secure = '';
      days = days == null ? 73000 : days;

      if (cross_subdomain) {
        var domain = _.getCurrentDomain(location.href);
        if (domain === 'url解析失败') {
          domain = '';
        }
        cdomain = domain ? '; domain=' + domain : '';
      }

      // 0 session
      // -1 马上过期
      //
      if (days !== 0) {
        var date = new Date();
        // 默认是天，可以是秒
        if (String(days).slice(-1) === 's') {
          date.setTime(
            date.getTime() + Number(String(days).slice(0, -1)) * 1000
          );
        } else {
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        }

        expires = '; expires=' + date.toGMTString();
      }

      if (is_secure) {
        secure = '; secure';
      }

      document.cookie =
        name +
        '=' +
        encodeURIComponent(value) +
        expires +
        '; path=/' +
        cdomain +
        secure;
    },

    remove: function (name, cross_subdomain) {
      cross_subdomain =
        typeof cross_subdomain === 'undefined'
          ? sd.para.cross_subdomain
          : cross_subdomain;
      _.cookie.set(name, '', -1, cross_subdomain);
    },

    getCookieName: function (name_prefix, url) {
      var sub = '';
      url = url || location.href;
      if (sd.para.cross_subdomain === false) {
        try {
          sub = _.URL(url).hostname;
        } catch (e) {
          sd.log(e);
        }
        if (typeof sub === 'string' && sub !== '') {
          sub = 'sajssdk_2015_' + name_prefix + '_' + sub.replace(/\./g, '_');
        } else {
          sub = 'sajssdk_2015_root_' + name_prefix;
        }
      } else {
        sub = 'sajssdk_2015_cross_' + name_prefix;
      }
      return sub;
    },
    // 针对新用户的兼容性判断,兼容子域名
    getNewUser: function () {
      var prefix = 'new_user';
      if (
        this.get('sensorsdata_is_new_user') !== null ||
        this.get(this.getCookieName(prefix)) !== null
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  _.getElementContent = function (target, tagName) {
    var textContent = '';
    var element_content = '';
    if (target.textContent) {
      textContent = _.trim(target.textContent);
    } else if (target.innerText) {
      textContent = _.trim(target.innerText);
    }
    if (textContent) {
      textContent = textContent
        .replace(/[\r\n]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .substring(0, 255);
    }
    element_content = textContent || '';

    // 针对inut默认只采集button和submit非名感的词汇。可以自定义（银联提）
    if (tagName === 'input' || tagName === 'INPUT') {
      if (target.type === 'button' || target.type === 'submit') {
        element_content = target.value || '';
      } else if (
        sd.para.heatmap &&
        typeof sd.para.heatmap.collect_input === 'function' &&
        sd.para.heatmap.collect_input(target)
      ) {
        element_content = target.value || '';
      }
    }
    return element_content;
  };
  // 获取元素的一些信息
  _.getEleInfo = function (obj) {
    if (!obj.target) {
      return false;
    }

    var target = obj.target;
    var tagName = target.tagName.toLowerCase();

    var props = {};

    props.$element_type = tagName;
    props.$element_name = target.getAttribute('name');
    props.$element_id = target.getAttribute('id');
    props.$element_class_name =
      typeof target.className === 'string' ? target.className : null;
    props.$element_target_url = target.getAttribute('href');
    props.$element_content = _.getElementContent(target, tagName);

    props = _.strip_empty_properties(props);

    props.$url = location.href;
    props.$url_path = location.pathname;
    props.$title = document.title;
    props.$viewport_width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      0;

    return props;
  };

  // _.localStorage
  _.localStorage = {
    get: function (name) {
      return window.localStorage.getItem(name);
    },

    parse: function (name) {
      var storedValue;
      try {
        storedValue = JSON.parse(_.localStorage.get(name)) || null;
      } catch (err) {
        sd.log(err);
      }
      return storedValue;
    },

    set: function (name, value) {
      window.localStorage.setItem(name, value);
    },

    remove: function (name) {
      window.localStorage.removeItem(name);
    },

    isSupport: function () {
      var supported = true;
      try {
        var key = '__sensorsdatasupport__';
        var val = 'testIsSupportStorage';
        _.localStorage.set(key, val);
        if (_.localStorage.get(key) !== val) {
          supported = false;
        }
        _.localStorage.remove(key);
      } catch (err) {
        supported = false;
      }
      return supported;
    }
  };

  _.sessionStorage = {
    isSupport: function () {
      var supported = true;

      var key = '__sensorsdatasupport__';
      var val = 'testIsSupportStorage';
      try {
        if (sessionStorage && sessionStorage.setItem) {
          sessionStorage.setItem(key, val);
          sessionStorage.removeItem(key, val);
          supported = true;
        } else {
          supported = false;
        }
      } catch (e) {
        supported = false;
      }
      return supported;
    }
  };

  // 检测是否支持跨域的ajax发送
  _.isSupportCors = function () {
    if (typeof window.XMLHttpRequest === 'undefined') {
      return false;
    }
    //Detect browser support for CORS
    if ('withCredentials' in new XMLHttpRequest()) {
      /* supports cross-domain requests */
      return true;
    } else if (typeof XDomainRequest !== 'undefined') {
      //Use IE-specific "CORS" code with XDR
      return true;
    } else {
      //Time to retreat with a fallback or polyfill
      return false;
    }
  };

  _.xhr = function (cors) {
    if (cors) {
      if (
        typeof window.XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest()
      ) {
        return new XMLHttpRequest();
      } else if (typeof XDomainRequest !== 'undefined') {
        return new XDomainRequest();
      } else {
        return null;
      }
    } else {
      if (typeof window.XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
      }
      if (window.ActiveXObject) {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (d) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (d) {
            sd.log(d);
          }
        }
      }
    }
  };

  _.ajax = function (para) {
    para.timeout = para.timeout || 20000;

    para.credentials =
      typeof para.credentials === 'undefined' ? true : para.credentials;
    function getJSON(data) {
      if (!data) {
        return '';
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }

    var g = _.xhr(para.cors);

    if (!g) {
      return false;
    }

    if (!para.type) {
      para.type = para.data ? 'POST' : 'GET';
    }
    para = _.extend(
      {
        success: function () {},
        error: function () {}
      },
      para
    );

    try {
      if (typeof g === 'object' && 'timeout' in g) {
        g.timeout = para.timeout;
      } else {
        setTimeout(function () {
          g.abort();
        }, para.timeout + 500);
      }
    } catch (e) {
      try {
        setTimeout(function () {
          g.abort();
        }, para.timeout + 500);
      } catch (e2) {
        sd.log(e2);
      }
    }

    g.onreadystatechange = function () {
      try {
        if (g.readyState == 4) {
          if ((g.status >= 200 && g.status < 300) || g.status == 304) {
            para.success(getJSON(g.responseText));
          } else {
            para.error(getJSON(g.responseText), g.status);
          }
          g.onreadystatechange = null;
          g.onload = null;
        }
      } catch (e) {
        g.onreadystatechange = null;
        g.onload = null;
      }
    };

    g.open(para.type, para.url, true);

    try {
      if (para.credentials) {
        g.withCredentials = true;
      }
      if (_.isObject(para.header)) {
        for (var i in para.header) {
          g.setRequestHeader(i, para.header[i]);
        }
      }

      if (para.data) {
        if (!para.cors) {
          g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        if (para.contentType === 'application/json') {
          g.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        } else {
          g.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
          );
        }
      }
    } catch (e) {
      sd.log(e);
    }

    g.send(para.data || null);
  };

  _.loadScript = function (para) {
    para = _.extend(
      {
        success: function () {},
        error: function () {},
        appendCall: function (g) {
          document.getElementsByTagName('head')[0].appendChild(g);
        }
      },
      para
    );

    var g = null;
    if (para.type === 'css') {
      g = document.createElement('link');
      g.rel = 'stylesheet';
      g.href = para.url;
    }
    if (para.type === 'js') {
      g = document.createElement('script');
      g.async = 'async';
      g.setAttribute('charset', 'UTF-8');
      g.src = para.url;
      g.type = 'text/javascript';
    }
    g.onload = g.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function () {
      para.error();
      g.onerror = null;
    };
    // if iframe
    para.appendCall(g);
  };

  _.getHostname = function (url, defaultValue) {
    if (!defaultValue || typeof defaultValue !== 'string') {
      defaultValue = 'hostname解析异常';
    }
    var hostname = null;
    try {
      hostname = _.URL(url).hostname;
    } catch (e) {
      sd.log(e);
    }
    return hostname || defaultValue;
  };

  _.getQueryParamsFromUrl = function (url) {
    var result = {};
    var arr = url.split('?');
    var queryString = arr[1] || '';
    if (queryString) {
      result = _.getURLSearchParams('?' + queryString);
    }
    return result;
  };

  /**
   * 查询得到URL参数
   * @param {string} queryString - 以问号开头的 query string
   * @return {Object} 一个含有参数列表的key/value对象
   *
   * @example
   * var url = _.getURLSearchParams('?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.project; // => testproject
   */
  _.getURLSearchParams = function (queryString) {
    queryString = queryString || '';
    var decodeParam = function (str) {
      return decodeURIComponent(str);
    };
    var args = {}; // Start with an empty object
    var query = queryString.substring(1); // Get query string, minus '?'
    var pairs = query.split('&'); // Split at ampersands
    for (var i = 0; i < pairs.length; i++) {
      // For each fragment
      var pos = pairs[i].indexOf('='); // Look for "name=value"
      if (pos === -1) continue; // If not found, skip it
      var name = pairs[i].substring(0, pos); // Extract the name
      var value = pairs[i].substring(pos + 1); // Extract the value
      name = decodeParam(name); // Decode the name
      value = decodeParam(value); // Decode the value
      args[name] = value; // Store as a property
    }
    return args; // Return the parsed arguments
  };

  /**
   * 解析URL
   * @param {string} url
   * @return {Object} 一个 URL 对象或者普通JS对象
   *
   * @example
   * var url = _.URL('http://www.domain.com:8080/path/index.html?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.hostname; // => www.domain.com
   * url.searchParams.get('project'); // => testproject
   */
  _.URL = function (url) {
    var result = {};
    var basicProps = [
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
      'username'
    ];
    // Some browsers allow objects to be created via URL constructor, but instances do not have the expected url properties.
    // See https://www.caniuse.com/#feat=url
    var isURLAPIWorking = function () {
      var url;
      try {
        url = new URL('http://modernizr.com/');
        return url.href === 'http://modernizr.com/';
      } catch (e) {
        return false;
      }
    };
    if (typeof window.URL === 'function' && isURLAPIWorking()) {
      result = new URL(url);
      if (!result.searchParams) {
        result.searchParams = (function () {
          var params = _.getURLSearchParams(result.search);
          return {
            get: function (searchParam) {
              return params[searchParam];
            }
          };
        })();
      }
    } else {
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(url) === false) {
        throw 'Invalid URL';
      }
      var link = document.createElement('a');
      link.href = url;
      for (var i = basicProps.length - 1; i >= 0; i--) {
        var prop = basicProps[i];
        result[prop] = link[prop];
      }
      if (
        result.hostname &&
        typeof result.pathname === 'string' &&
        result.pathname.indexOf('/') !== 0
      ) {
        result.pathname = '/' + result.pathname;
      }
      result.searchParams = (function () {
        var params = _.getURLSearchParams(result.search);
        return {
          get: function (searchParam) {
            return params[searchParam];
          }
        };
      })();
    }
    return result;
  };

  _.getCurrentDomain = function (url) {
    var sdDomain = sd.para.current_domain;
    switch (typeof sdDomain) {
      case 'function':
        var resultDomain = sdDomain();
        if (resultDomain === '' || _.trim(resultDomain) === '') {
          return 'url解析失败';
        } else if (resultDomain.indexOf('.') !== -1) {
          return resultDomain;
        } else {
          return 'url解析失败';
        }
      case 'string':
        if (sdDomain === '' || _.trim(sdDomain) === '') {
          return 'url解析失败';
        } else if (sdDomain.indexOf('.') !== -1) {
          return sdDomain;
        } else {
          return 'url解析失败';
        }
      default:
        var cookieTopLevelDomain = _.getCookieTopLevelDomain();
        if (url === '') {
          return 'url解析失败';
        } else if (cookieTopLevelDomain === '') {
          return 'url解析失败';
        } else {
          return cookieTopLevelDomain;
        }
    }
  };

  _.getCookieTopLevelDomain = function (hostname) {
    hostname = hostname || window.location.hostname;
    /*
  if (hostname === 'localhost') {
    return hostname;
  }
  */
    var splitResult = hostname.split('.');
    if (
      _.isArray(splitResult) &&
      splitResult.length >= 2 &&
      !/^(\d+\.)+\d+$/.test(hostname)
    ) {
      var domainStr = '.' + splitResult.splice(splitResult.length - 1, 1);
      while (splitResult.length > 0) {
        domainStr =
          '.' + splitResult.splice(splitResult.length - 1, 1) + domainStr;
        document.cookie =
          'sensorsdata_domain_test=true; path=/; domain=' + domainStr;
        if (document.cookie.indexOf('sensorsdata_domain_test=true') !== -1) {
          var now = new Date();
          now.setTime(now.getTime() - 1000);
          document.cookie =
            'sensorsdata_domain_test=true; expires=' +
            now.toGMTString() +
            '; path=/; domain=' +
            domainStr;
          return domainStr;
        }
      }
    }
    return '';
  };

  _.isReferralTraffic = function (refererstring) {
    refererstring = refererstring || document.referrer;
    if (refererstring === '') {
      return true;
    }

    return (
      _.getCookieTopLevelDomain(_.getHostname(refererstring)) !==
      _.getCookieTopLevelDomain()
    );
  };

  _.ry = function (dom) {
    return new _.ry.init(dom);
  };
  _.ry.init = function (dom) {
    this.ele = dom;
  };
  _.ry.init.prototype = {
    addClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') === -1) {
        this.ele.className =
          this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
      }
      return this;
    },
    removeClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        this.ele.className = classes
          .replace(' ' + para + ' ', ' ')
          .slice(1, -1);
      }
      return this;
    },
    hasClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        return true;
      } else {
        return false;
      }
    },
    attr: function (key, value) {
      if (typeof key === 'string' && _.isUndefined(value)) {
        return this.ele.getAttribute(key);
      }
      if (typeof key === 'string') {
        value = String(value);
        this.ele.setAttribute(key, value);
      }
      return this;
    },
    offset: function () {
      var rect = this.ele.getBoundingClientRect();
      if (rect.width || rect.height) {
        var doc = this.ele.ownerDocument;
        var docElem = doc.documentElement;

        return {
          top: rect.top + window.pageYOffset - docElem.clientTop,
          left: rect.left + window.pageXOffset - docElem.clientLeft
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    getSize: function () {
      if (!window.getComputedStyle) {
        return { width: this.ele.offsetWidth, height: this.ele.offsetHeight };
      }
      try {
        var bounds = this.ele.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height };
      } catch (e) {
        return { width: 0, height: 0 };
      }
    },
    getStyle: function (value) {
      if (this.ele.currentStyle) {
        return this.ele.currentStyle[value];
      } else {
        return this.ele.ownerDocument.defaultView
          .getComputedStyle(this.ele, null)
          .getPropertyValue(value);
      }
    },
    wrap: function (elementTagName) {
      var ele = document.createElement(elementTagName);
      this.ele.parentNode.insertBefore(ele, this.ele);
      ele.appendChild(this.ele);
      return _.ry(ele);
    },
    getCssStyle: function (prop) {
      var result = this.ele.style.getPropertyValue(prop);
      if (result) {
        return result;
      }
      var rules = null;
      if (typeof window.getMatchedCSSRules === 'function') {
        rules = getMatchedCSSRules(this.ele);
      }
      if (!rules || !_.isArray(rules)) {
        return null;
      }
      for (var i = rules.length - 1; i >= 0; i--) {
        var r = rules[i];
        result = r.style.getPropertyValue(prop);
        if (result) {
          return result;
        }
      }
    },
    sibling: function (cur, dir) {
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    },
    next: function () {
      return this.sibling(this.ele, 'nextSibling');
    },
    prev: function (elem) {
      return this.sibling(this.ele, 'previousSibling');
    },
    siblings: function (elem) {
      return this.siblings((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function (elem) {
      return this.siblings(this.ele.firstChild);
    },
    parent: function () {
      var parent = this.ele.parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      return _.ry(parent);
    }
  };

  _.strToUnicode = function (str) {
    if (typeof str !== 'string') {
      sd.log('转换unicode错误', str);
      return str;
    }
    var nstr = '';
    for (var i = 0; i < str.length; i++) {
      nstr += '\\' + str.charCodeAt(i).toString(16);
    }
    return nstr;
  };

  /* _.querySelectorAll = function(val){

  if(typeof val !== 'string'){
    sd.log('选择器错误',val);
    return [];
  }
  // 替换纯数字的id
  var sp = val.split(' ');
  if(sp.length === 1){
    if(/^#\d+/.test(sp[0])){
      val = '#' + _.strToUnicode(sp[0].slice(1));
    }
  }else{
    if(/^#\d+/.test(sp[0])){
      sp[0] = '#' + _.strToUnicode(sp[0].slice(1));
      val = sp.join(' ');
    }
  }

  try{
     return document.querySelectorAll(val);
  }catch(e){
    sd.log('错误',val);
    return [];
  }
}; */

  _.getReferrer = function (referrer) {
    var referrer = referrer || document.referrer;
    if (typeof referrer !== 'string') {
      return '取值异常_referrer异常_' + String(referrer);
    }
    if (referrer.indexOf('https://www.baidu.com/') === 0) {
      referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, sd.para.max_referrer_string_length);
    return typeof referrer === 'string' ? referrer : '';
  };

  _.getKeywordFromReferrer = function (referrerUrl) {
    referrerUrl = referrerUrl || document.referrer;
    var search_keyword = sd.para.source_type.keyword;
    if (document && typeof referrerUrl === 'string') {
      if (referrerUrl.indexOf('http') === 0) {
        var searchEngine = _.getReferSearchEngine(referrerUrl);
        var query = _.getQueryParamsFromUrl(referrerUrl);
        if (_.isEmptyObject(query)) {
          return '未取到值';
        }
        var temp = null;
        for (var i in search_keyword) {
          if (searchEngine === i) {
            if (typeof query === 'object') {
              temp = search_keyword[i];
              if (_.isArray(temp)) {
                for (var i = 0; i < temp.length; i++) {
                  var _value = query[temp[i]];
                  if (_value) {
                    return _value;
                  }
                }
              } else if (query[temp]) {
                return query[temp];
              }
            }
          }
        }
        return '未取到值';
      } else {
        if (referrerUrl === '') {
          return '未取到值_直接打开';
        } else {
          return '未取到值_非http的url';
        }
      }
    } else {
      return '取值异常_referrer异常_' + String(referrerUrl);
    }
  };

  _.getReferSearchEngine = function (referrerUrl) {
    var hostname = _.getHostname(referrerUrl);
    if (!hostname || hostname === 'hostname解析异常') {
      return '';
    }
    var search_keyword = sd.para.source_type.keyword;
    var searchEngineUrls = {
      baidu: [/^.*\.baidu\.com$/],
      bing: [/^.*\.bing\.com$/],
      google: [
        /^www\.google\.com$/,
        /^www\.google\.com\.[a-z]{2}$/,
        /^www\.google\.[a-z]{2}$/
      ],
      sm: [/^m\.sm\.cn$/],
      so: [/^.+\.so\.com$/],
      sogou: [/^.*\.sogou\.com$/],
      yahoo: [/^.*\.yahoo\.com$/]
    };
    for (var prop in searchEngineUrls) {
      var urls = searchEngineUrls[prop];
      for (var i = 0, len = urls.length; i < len; i++) {
        if (urls[i].test(hostname)) {
          return prop;
        }
      }
    }
    return '未知搜索引擎';
  };

  _.getSourceFromReferrer = function () {
    function getMatchStrFromArr(arr, str) {
      for (var i = 0; i < arr.length; i++) {
        if (str.split('?')[0].indexOf(arr[i]) !== -1) {
          return true;
        }
      }
    }

    var utm_reg = '(' + sd.para.source_type.utm.join('|') + ')\\=[^&]+';
    var search_engine = sd.para.source_type.search;
    var social_engine = sd.para.source_type.social;

    var referrer = document.referrer || '';
    var url = _.info.pageProp.url;
    if (url) {
      var utm_match = url.match(new RegExp(utm_reg));
      if (utm_match && utm_match[0]) {
        return '付费广告流量';
      } else if (getMatchStrFromArr(search_engine, referrer)) {
        return '自然搜索流量';
      } else if (getMatchStrFromArr(social_engine, referrer)) {
        return '社交网站流量';
      } else if (referrer === '') {
        return '直接流量';
      } else {
        return '引荐流量';
      }
    } else {
      return '获取url异常';
    }
  };

  _.info = {
    initPage: function () {
      var referrer = _.getReferrer();
      var url = location.href;
      var url_domain = _.getCurrentDomain(url);
      if (!url_domain) {
        // TODO
        //_.jssdkDebug('url_domain异常_'+ url + '_' + url_domain);
        sd.debug.jssdkDebug('url_domain异常_' + url + '_' + url_domain);
      }

      this.pageProp = {
        referrer: referrer,
        referrer_host: referrer ? _.getHostname(referrer) : '',
        url: url,
        url_host: _.getHostname(url, 'url_host取值异常'),
        url_domain: url_domain
      };
    },
    //当前页面的一些属性，在store初始化是生成
    pageProp: {},

    campaignParams: function () {
      var campaign_keywords = sd.source_channel_standard.split(' '),
        kw = '',
        params = {};
      if (
        _.isArray(sd.para.source_channel) &&
        sd.para.source_channel.length > 0
      ) {
        campaign_keywords = campaign_keywords.concat(sd.para.source_channel);
        campaign_keywords = _.unique(campaign_keywords);
      }
      _.each(campaign_keywords, function (kwkey) {
        kw = _.getQueryParam(location.href, kwkey);
        if (kw.length) {
          params[kwkey] = kw;
        }
      });

      return params;
    },
    campaignParamsStandard: function (prefix, prefix_add) {
      prefix = prefix || '';
      prefix_add = prefix_add || '';
      var utms = _.info.campaignParams();
      var $utms = {},
        otherUtms = {};
      for (var i in utms) {
        if (
          (' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1
        ) {
          $utms[prefix + i] = utms[i];
        } else {
          otherUtms[prefix_add + i] = utms[i];
        }
      }
      return {
        $utms: $utms,
        otherUtms: otherUtms
      };
    },
    // 预置属性
    properties: function () {
      return {
        $screen_height: Number(screen.height) || 0,
        $screen_width: Number(screen.width) || 0,
        // 我说两遍写的重复，佳捷说就写两遍
        $lib: 'js',
        $lib_version: String(sd.lib_version)
      };
    },
    // 保存临时的一些变量，只针对当前页面有效
    currentProps: {},
    register: function (obj) {
      _.extend(_.info.currentProps, obj);
    }
  };

  // 发送队列
  _.autoExeQueue = function () {
    var queue = {
      // 简单队列
      items: [],
      enqueue: function (val) {
        this.items.push(val);
        this.start();
      },
      dequeue: function () {
        return this.items.shift();
      },
      getCurrentItem: function () {
        return this.items[0];
      },
      // 自动循环执行队列
      isRun: false,
      start: function () {
        if (this.items.length > 0 && !this.isRun) {
          this.isRun = true;
          this.getCurrentItem().start();
        }
      },
      close: function () {
        this.dequeue();
        this.isRun = false;
        this.start();
      }
    };
    return queue;
  };

  _.trackLink = function (obj, event_name, event_prop) {
    obj = obj || {};
    var link = null;
    if (obj.ele) {
      link = obj.ele;
    }
    if (obj.event) {
      if (obj.target) {
        link = obj.target;
      } else {
        link = obj.event.target;
      }
    }

    event_prop = event_prop || {};
    if (!link || typeof link !== 'object') {
      return false;
    }
    // 如果是非当前页面会跳转的链接，直接track
    if (
      !link.href ||
      /^javascript/.test(link.href) ||
      link.target ||
      link.download ||
      link.onclick
    ) {
      sd.track(event_name, event_prop);
      return false;
    }
    function linkFunc(e) {
      e.stopPropagation();
      e.preventDefault(); // 阻止默认跳转
      var hasCalled = false;
      function track_a_click() {
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href; //把 A 链接的点击跳转,改成 location 的方式跳转
        }
      }
      setTimeout(track_a_click, 1000); //如果没有回调成功，设置超时回调
      sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
    }
    if (obj.event) {
      linkFunc(obj.event);
    }
    if (obj.ele) {
      _.addEvent(obj.ele, 'click', function (e) {
        linkFunc(e);
      });
    }
  };

  _.eventEmitter = function () {
    this._events = [];
    this.pendingEvents = [];
  };

  _.eventEmitter.prototype = {
    emit: function (type) {
      var args = [].slice.call(arguments, 1);

      _.each(this._events, function (val) {
        if (val.type !== type) {
          return;
        }
        val.callback.apply(val.context, args);
      });
    },
    on: function (event, callback, context) {
      if (typeof callback !== 'function') {
        return;
      }
      this._events.push({
        type: event,
        callback: callback,
        context: context || this
      });
    },
    tempAdd: function (event, data) {
      if (!data || !event) {
        return;
      }

      this.pendingEvents.push({
        type: event,
        data: data
      });
      this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
    },
    isReady: function () {
      var that = this;
      this.tempAdd = this.emit;

      if (this.pendingEvents.length === 0) {
        return;
      }
      _.each(this.pendingEvents, function (val) {
        that.emit(val.type, val.data);
      });

      this.pendingEvents = [];
    }
  };
})();

/*
sd的各个方法，包含sdk的一些基本功能
*/

sd.para_default = {
  preset_properties: {
    latest_utm: true,
    latest_traffic_source_type: true,
    latest_search_keyword: true,
    latest_referrer: true,
    latest_referrer_host: false,
    latest_landing_page: false,
    url: false,
    title: false
  },
  img_use_crossorigin: false,
  //scrollmap:{delay:6000}

  name: 'sa',
  // referrer字符串截取
  max_referrer_string_length: 200,
  //通用字符串截取，超过7000的字符串会导致url超长发不出去，所以限制长度
  max_string_length: 500,
  //    send_error_event: true,
  cross_subdomain: true,
  show_log: true,
  is_debug: false,
  debug_mode: false,
  debug_mode_upload: false,

  // todo 前端session时长
  session_time: 0,

  use_client_time: false,
  //来源参数名字
  source_channel: [],

  send_type: 'image',

  // 七鱼过滤id
  vtrack_ignore: {},

  auto_init: true,

  is_track_single_page: false,

  is_single_page: false,

  batch_send: false,

  // 如果要设置，设置数组
  source_type: {},
  callback_timeout: 200,
  datasend_timeout: 3000,
  queue_timeout: 300,
  is_track_device_id: false,
  ignore_oom: true,
  app_js_bridge: false
};

sd.addReferrerHost = function (data) {
  var defaultHost = '取值异常';
  if (_.isObject(data.properties)) {
    if (data.properties.$first_referrer) {
      data.properties.$first_referrer_host = _.getHostname(
        data.properties.$first_referrer,
        defaultHost
      );
    }
    if (data.type === 'track' || data.type === 'track_signup') {
      if ('$referrer' in data.properties) {
        data.properties.$referrer_host =
          data.properties.$referrer === ''
            ? ''
            : _.getHostname(data.properties.$referrer, defaultHost);
      }
      if (
        sd.para.preset_properties.latest_referrer &&
        sd.para.preset_properties.latest_referrer_host
      ) {
        data.properties.$latest_referrer_host =
          data.properties.$latest_referrer === ''
            ? ''
            : _.getHostname(data.properties.$latest_referrer, defaultHost);
      }
    }
  }
};

sd.addPropsHook = function (data) {
  if (
    sd.para.preset_properties &&
    sd.para.preset_properties.url &&
    (data.type === 'track' || data.type === 'track_signup') &&
    typeof data.properties.$url === 'undefined'
  ) {
    data.properties.$url = window.location.href;
  }
  if (
    sd.para.preset_properties &&
    sd.para.preset_properties.title &&
    (data.type === 'track' || data.type === 'track_signup') &&
    typeof data.properties.$title === 'undefined'
  ) {
    data.properties.$title = document.title;
  }
};

sd.initPara = function (para) {
  // 默认配置
  sd.para = para || sd.para || {};
  var latestObj = {};
  if (_.isObject(sd.para.is_track_latest)) {
    for (var latestProp in sd.para.is_track_latest) {
      latestObj['latest_' + latestProp] = sd.para.is_track_latest[latestProp];
    }
  }
  // 预置属性
  sd.para.preset_properties = _.extend(
    {},
    sd.para_default.preset_properties,
    latestObj,
    sd.para.preset_properties || {}
  );

  // 合并配置
  var i;
  for (i in sd.para_default) {
    if (sd.para[i] === void 0) {
      sd.para[i] = sd.para_default[i];
    }
  }
  // 修复没有配置协议的问题，自动取当前页面的协议
  if (
    typeof sd.para.server_url === 'string' &&
    sd.para.server_url.slice(0, 3) === '://'
  ) {
    sd.para.server_url = location.protocol.slice(-1) + sd.para.server_url;
  }
  if (
    typeof sd.para.web_url === 'string' &&
    sd.para.web_url.slice(0, 3) === '://'
  ) {
    sd.para.web_url = location.protocol.slice(-1) + sd.para.web_url;
  }

  if (
    sd.para.send_type !== 'image' &&
    sd.para.send_type !== 'ajax' &&
    sd.para.send_type !== 'beacon'
  ) {
    sd.para.send_type = 'image';
  }
  // 初始化打通参数
  sd.bridge.initPara();
  sd.bridge.initState();

  var batch_send_default = {
    datasend_timeout: 6000,
    send_interval: 6000,
    one_send_max_length: 6
  };

  if (
    _.localStorage.isSupport() &&
    _.isSupportCors() &&
    typeof localStorage === 'object'
  ) {
    if (sd.para.batch_send === true) {
      sd.para.batch_send = _.extend({}, batch_send_default);
      sd.para.use_client_time = true;
    } else if (typeof sd.para.batch_send === 'object') {
      sd.para.use_client_time = true;
      sd.para.batch_send = _.extend({}, batch_send_default, sd.para.batch_send);
    }
  } else {
    sd.para.batch_send = false;
  }

  var utm_type = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];
  var search_type = [
    'www.baidu.',
    'm.baidu.',
    'm.sm.cn',
    'so.com',
    'sogou.com',
    'youdao.com',
    'google.',
    'yahoo.com/',
    'bing.com/',
    'ask.com/'
  ];
  var social_type = [
    'weibo.com',
    'renren.com',
    'kaixin001.com',
    'douban.com',
    'qzone.qq.com',
    'zhihu.com',
    'tieba.baidu.com',
    'weixin.qq.com'
  ];
  var search_keyword = {
    baidu: ['wd', 'word', 'kw', 'keyword'],
    google: 'q',
    bing: 'q',
    yahoo: 'p',
    sogou: ['query', 'keyword'],
    so: 'q',
    sm: 'q'
  };

  if (typeof sd.para.source_type === 'object') {
    sd.para.source_type.utm = _.isArray(sd.para.source_type.utm)
      ? sd.para.source_type.utm.concat(utm_type)
      : utm_type;
    sd.para.source_type.search = _.isArray(sd.para.source_type.search)
      ? sd.para.source_type.search.concat(search_type)
      : search_type;
    sd.para.source_type.social = _.isArray(sd.para.source_type.social)
      ? sd.para.source_type.social.concat(social_type)
      : social_type;
    sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword)
      ? _.extend(search_keyword, sd.para.source_type.keyword)
      : search_keyword;
  }

  if (_.isObject(sd.para.heatmap)) {
    sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
    sd.para.heatmap.scroll_notice_map =
      sd.para.heatmap.scroll_notice_map || 'default';
    sd.para.heatmap.scroll_delay_time =
      sd.para.heatmap.scroll_delay_time || 4000;
    sd.para.heatmap.scroll_event_duration =
      sd.para.heatmap.scroll_event_duration || 18000; // The max value of $event_duration property for $WebStay event, in seconds (5 Hours).
    sd.para.heatmap.renderRefreshTime =
      sd.para.heatmap.renderRefreshTime || 1000;
    sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1000;
  }
  // 优化配置
  if (typeof sd.para.server_url === 'object' && sd.para.server_url.length) {
    for (i = 0; i < sd.para.server_url.length; i++) {
      if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
        sd.para.server_url[i] = sd.para.server_url[i]
          .replace(/\/sa$/, '/sa.gif')
          .replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
      }
    }
  } else if (!/sa\.gif[^\/]*$/.test(sd.para.server_url)) {
    sd.para.server_url = sd.para.server_url
      .replace(/\/sa$/, '/sa.gif')
      .replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
  }
  if (typeof sd.para.server_url === 'string') {
    sd.para.debug_mode_url =
      sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');
  }
  // 是否需要非cache，等于每次请求文件
  if (sd.para.noCache === true) {
    sd.para.noCache = '?' + new Date().getTime();
  } else {
    sd.para.noCache = '';
  }

  if (sd.para.callback_timeout > sd.para.datasend_timeout) {
    sd.para.datasend_timeout = sd.para.callback_timeout;
  }
  if (sd.para.callback_timeout > sd.para.queue_timeout) {
    sd.para.queue_timeout = sd.para.callback_timeout;
  }
  if (sd.para.queue_timeout > sd.para.datasend_timeout) {
    sd.para.datasend_timeout = sd.para.queue_timeout;
  }
};

// sa 当前状态管理
sd.readyState = {
  state: 0,
  historyState: [],
  stateType: {
    1: '1-init未开始',
    2: '2-init开始',
    3: '3-store完成'
  },
  getState: function () {
    return this.historyState.join('\n');
  },
  setState: function (n) {
    if (String(n) in this.stateType) {
      this.state = n;
    }
    this.historyState.push(this.stateType[n]);
  }
};

sd.setPreConfig = function (sa) {
  sd.para = sa.para;
  sd._q = sa._q;
};

sd.setInitVar = function () {
  sd._t = sd._t || 1 * new Date();
  sd.lib_version = '1.15.6';
  sd.is_first_visitor = false;
  // 标准广告系列来源
  sd.source_channel_standard =
    'utm_source utm_medium utm_campaign utm_content utm_term';
};

sd.log = function () {
  if (
    (_.sessionStorage.isSupport() &&
      sessionStorage.getItem('sensorsdata_jssdk_debug') === 'true') ||
    sd.para.show_log
  ) {
    if (
      sd.para.show_log === true ||
      sd.para.show_log === 'string' ||
      sd.para.show_log === false
    ) {
      arguments[0] = _.formatJsonString(arguments[0]);
    }

    if (typeof console === 'object' && console.log) {
      try {
        return console.log.apply(console, arguments);
      } catch (e) {
        console.log(arguments[0]);
      }
    }
  }
};

/**
 * 设置 sessionStorage 开启本地控制台日志输出
 */
sd.enableLocalLog = function () {
  if (_.sessionStorage.isSupport()) {
    try {
      sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
    } catch (e) {
      sd.log('enableLocalLog error: ' + e.message);
      // handle the exception here.
    }
  }
};

/**
 * 删除 sessionStorage 关闭本地控制台日志输出
 */
sd.disableLocalLog = function () {
  if (_.sessionStorage.isSupport()) {
    sessionStorage.removeItem('sensorsdata_jssdk_debug');
  }
};

sd.debug = {
  distinct_id: function () {
    /*
    var relation = {
      'e-0': '未知错误',
      'e-1': 'toState()传值的数据中缺少distinct_id，SDK自动分配distinct_id',
      'e-2': 'toState()传值的数据不是一个有效的JSON字符串，SDK自动分配distinct_id'
    };
    var debug_info = relation['e-' + key] || relation['e-0'];
    if (sd.para.is_debug === true || sd.para.is_debug.distinct_id === true) {
      sd.log(debug_info);
      this._sendDebug('distinct_id-' + key + '-' + JSON.stringify(data));
    }
    */
  },
  jssdkDebug: function () {
    /*
    if (sd.para.is_debug === true) {
      if(_.isString(recevie_prop)){
        this._sendDebug(recevie_prop);
      }else{
        var cookie = store.getCookieName();
        var match = document.cookie.match(new RegExp(cookie + '[^;]+'));
        if(match && match[0] ){
          cookie = match[0];
        }else{
          cookie = '';
        }
        recevie_prop._jssdk_debug_info = '(' + cookie + ')' + navigator.userAgent;
        this._sendDebug(JSON.stringify(recevie_prop));
      }
    }
    */
  },
  _sendDebug: function (debugString) {
    sd.track('_sensorsdata2019_debug', {
      _jssdk_debug_info: debugString
    });
  },
  apph5: function (obj) {
    var name = 'app_h5打通失败-';
    var relation = {
      1: name + 'use_app_track为false',
      2: name + 'Android或者iOS，没有暴露相应方法',
      3.1: name + 'Android校验server_url失败',
      3.2: name + 'iOS校验server_url失败',
      4.1: name + 'H5 校验 iOS server_url 失败',
      4.2: name + 'H5 校验 Android server_url 失败'
    };
    var output = obj.output;
    var step = obj.step;
    var data = obj.data || '';
    // 控制台输出
    if (output === 'all' || output === 'console') {
      sd.log(relation[step]);
    }
    // 代码输出
    if (
      (output === 'all' || output === 'code') &&
      _.isObject(sd.para.is_debug) &&
      sd.para.is_debug.apph5
    ) {
      if (!data.type || data.type.slice(0, 7) !== 'profile') {
        data.properties._jssdk_debug_info = 'apph5-' + String(step);
      }
    }
  },
  defineMode: function (type) {
    var debugList = {
      1: {
        title: '当前页面无法进行可视化全埋点',
        message:
          'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url:
          'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
      },
      2: {
        title: '当前页面无法进行可视化全埋点',
        message:
          'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url:
          'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
      },
      3: {
        title: '当前页面无法进行可视化全埋点',
        message:
          'Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url:
          'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html'
      },
      4: {
        title: '当前页面无法进行可视化全埋点',
        message:
          'Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url:
          'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
      }
    };
    if (type && debugList[type]) {
      return debugList[type];
    } else {
      return false;
    }
  }
};

var commonWays = {
  setOnlineState: function (state) {
    if (
      state === true &&
      _.isObject(sd.para.jsapp) &&
      typeof sd.para.jsapp.getData === 'function'
    ) {
      sd.para.jsapp.isOnline = true;
      var arr = sd.para.jsapp.getData();
      if (_.isArray(arr) && arr.length > 0) {
        _.each(arr, function (str) {
          if (_.isJSONString(str)) {
            sd.sendState.pushSend(JSON.parse(str));
          }
        });
      }
    } else {
      sd.para.jsapp.isOnline = false;
    }
  },
  autoTrackIsUsed: false,
  isReady: function (callback) {
    callback();
  },
  // 获取谷歌标准参数
  getUtm: function () {
    return _.info.campaignParams();
  },
  // 获取当前页面停留时间
  getStayTime: function () {
    return (new Date() - sd._t) / 1000;
  },
  setProfileLocal: function (obj) {
    if (!_.localStorage.isSupport()) {
      sd.setProfile(obj);
      return false;
    }
    if (!_.isObject(obj) || _.isEmptyObject(obj)) {
      return false;
    }
    var saveData = _.localStorage.parse('sensorsdata_2015_jssdk_profile');
    var isNeedSend = false;
    if (_.isObject(saveData) && !_.isEmptyObject(saveData)) {
      for (var i in obj) {
        if ((i in saveData && saveData[i] !== obj[i]) || !(i in saveData)) {
          saveData[i] = obj[i];
          isNeedSend = true;
        }
      }
      if (isNeedSend) {
        _.localStorage.set(
          'sensorsdata_2015_jssdk_profile',
          JSON.stringify(saveData)
        );
        sd.setProfile(obj);
      }
    } else {
      _.localStorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(obj));
      sd.setProfile(obj);
    }
  },
  //set init referrer
  setInitReferrer: function () {
    var _referrer = _.getReferrer();
    sd.setOnceProfile({
      _init_referrer: _referrer,
      _init_referrer_host: _.info.pageProp.referrer_host
    });
  },
  // set init sessionRegister cookie
  setSessionReferrer: function () {
    var _referrer = _.getReferrer();
    store.setSessionPropsOnce({
      _session_referrer: _referrer,
      _session_referrer_host: _.info.pageProp.referrer_host
    });
  },
  // set default referrr and pageurl
  setDefaultAttr: function () {
    _.info.register({
      _current_url: location.href,
      _referrer: _.getReferrer(),
      _referring_host: _.info.pageProp.referrer_host
    });
  },
  trackHeatMap: function (target, props, callback) {
    if (typeof target === 'object' && target.tagName) {
      var tagName = target.tagName.toLowerCase();
      var parent_ele = target.parentNode.tagName.toLowerCase();
      if (
        tagName !== 'button' &&
        tagName !== 'a' &&
        parent_ele !== 'a' &&
        parent_ele !== 'button' &&
        tagName !== 'input' &&
        tagName !== 'textarea' &&
        !_.hasAttribute(target, 'data-sensors-click')
      ) {
        heatmap.start(null, target, tagName, props, callback);
      }
    }
  },
  trackAllHeatMap: function (target, props, callback) {
    if (typeof target === 'object' && target.tagName) {
      var tagName = target.tagName.toLowerCase();
      heatmap.start(null, target, tagName, props, callback);
    }
  },
  autoTrackSinglePage: function (para, callback) {
    if (this.autoTrackIsUsed) {
      var url = _.info.pageProp.url;
    } else {
      var url = _.info.pageProp.referrer;
    }
    para = _.isObject(para) ? para : {};

    para = _.isObject(para) ? para : {};

    function getUtm() {
      var utms = _.info.campaignParams();
      var $utms = {};
      for (var i in utms) {
        if (
          (' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1
        ) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      }
      return $utms;
    }

    if (sd.is_first_visitor && !para.not_set_profile) {
      sd.setOnceProfile(
        _.extend(
          {
            // 暂时隐藏，等extractor都部署上去 $first_landing_page: _.info.pageProp.url.slice(0, sd.para.max_referrer_string_length),
            $first_visit_time: new Date(),
            $first_referrer: _.getReferrer(),
            $first_browser_language: navigator.language || '取值异常',
            $first_browser_charset:
              typeof document.charset === 'string'
                ? document.charset.toUpperCase()
                : '取值异常',
            $first_traffic_source_type: _.getSourceFromReferrer(),
            $first_search_keyword: _.getKeywordFromReferrer()
          },
          getUtm()
        )
      );
      sd.is_first_visitor = false;
    }
    if (para.not_set_profile) {
      delete para.not_set_profile;
    }

    function closure(p, c) {
      sd.track(
        '$pageview',
        _.extend(
          {
            $referrer: url,
            $url: location.href,
            $url_path: location.pathname,
            $title: document.title
          },
          p,
          getUtm()
        ),
        c
      );
      url = location.href;
    }
    closure(para, callback);
    this.autoTrackSinglePage = closure;
  },
  autoTrackWithoutProfile: function (para, callback) {
    para = _.isObject(para) ? para : {};
    this.autoTrack(_.extend(para, { not_set_profile: true }), callback);
  },
  autoTrack: function (para, callback) {
    para = _.isObject(para) ? para : {};

    var utms = _.info.campaignParams();
    var $utms = {};
    for (var i in utms) {
      if (
        (' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1
      ) {
        $utms['$' + i] = utms[i];
      } else {
        $utms[i] = utms[i];
      }
    }
    // setOnceProfile 如果是新用户，且允许设置profile
    if (sd.is_first_visitor && !para.not_set_profile) {
      sd.setOnceProfile(
        _.extend(
          {
            // 暂时隐藏，等extractor都部署上去 $first_landing_page: _.info.pageProp.url.slice(0, sd.para.max_referrer_string_length),
            $first_visit_time: new Date(),
            $first_referrer: _.getReferrer(),
            $first_browser_language: navigator.language || '取值异常',
            $first_browser_charset:
              typeof document.charset === 'string'
                ? document.charset.toUpperCase()
                : '取值异常',
            $first_traffic_source_type: _.getSourceFromReferrer(),
            $first_search_keyword: _.getKeywordFromReferrer()
          },
          $utms
        )
      );
      sd.is_first_visitor = false;
    }
    if (para.not_set_profile) {
      delete para.not_set_profile;
    }

    // 解决单页面的referrer问题
    var current_page_url = location.href;

    if (sd.para.is_single_page) {
      _.addHashEvent(function () {
        var referrer = _.getReferrer(current_page_url);
        sd.track(
          '$pageview',
          _.extend(
            {
              $referrer: referrer,
              $url: location.href,
              $url_path: location.pathname,
              $title: document.title
            },
            $utms,
            para
          ),
          callback
        );
        current_page_url = location.href;
      });
    }
    sd.track(
      '$pageview',
      _.extend(
        {
          $referrer: _.getReferrer(),
          $url: location.href,
          $url_path: location.pathname,
          $title: document.title
        },
        $utms,
        para
      ),
      callback
    );
    this.autoTrackIsUsed = true;
  },
  getAnonymousID: function () {
    if (_.isEmptyObject(sd.store._state)) {
      return '请先初始化SDK';
    } else {
      // 优先使用临时属性
      return (
        sd.store._state._first_id ||
        sd.store._state.first_id ||
        sd.store._state._distinct_id ||
        sd.store._state.distinct_id
      );
    }
  },
  setPlugin: function (para) {
    if (!_.isObject(para)) {
      return false;
    }
    //      sd.pluginTempFunction = sd.pluginTempFunction || {};
    _.each(para, function (v, k) {
      if (_.isFunction(v)) {
        //          sd.pluginTempFunction[k] = v;
        if (
          _.isObject(window.SensorsDataWebJSSDKPlugin) &&
          window.SensorsDataWebJSSDKPlugin[k]
        ) {
          v(window.SensorsDataWebJSSDKPlugin[k]);
          //            delete sd.pluginTempFunction[k];
        } else {
          sd.log(k + '没有获取到,请查阅文档，调整' + k + '的引入顺序！');
        }
      }
    });
  },
  useModulePlugin: function () {
    sd.use.apply(sd, arguments);
  },
  useAppPlugin: function () {
    this.setPlugin.apply(this, arguments);
  }
  /*,
    pluginIsReady: function(para){
      // sdk先加载，popup后加载调用 quick('pluginIsReady',{name:popup,self:this})
      if(!sd.pluginTempFunction || !_.isObject(para) || !_.isFunction(para.name)){
        return false;
      }
      if(sd.pluginTempFunction[para.name]){
        sd.pluginTempFunction[para.name](para.self);
        delete sd.pluginTempFunction[para.name];        
      }
    }*/
};

// 一些常见的方法
sd.quick = function () {
  var arg = Array.prototype.slice.call(arguments);
  var arg0 = arg[0];
  var arg1 = arg.slice(1);
  if (typeof arg0 === 'string' && commonWays[arg0]) {
    return commonWays[arg0].apply(commonWays, arg1);
  } else if (typeof arg0 === 'function') {
    arg0.apply(sd, arg1);
  } else {
    sd.log('quick方法中没有这个功能' + arg[0]);
  }
};

// 调用 modules 插件的 init 方法
sd.use = function (name, option) {
  if (
    _.isObject(sd.modules) &&
    _.isObject(sd.modules[name]) &&
    _.isFunction(sd.modules[name].init)
  ) {
    option = option || {};
    sd.modules[name].init(sd, option);
  }
};

/*
 * @param {string} event
 * @param {string} properties
 * */
sd.track = function (e, p, c) {
  if (saEvent.check({ event: e, properties: p })) {
    saEvent.send(
      {
        type: 'track',
        event: e,
        properties: p
      },
      c
    );
  }
};

sd.trackLink = function (link, event_name, event_prop) {
  if (typeof link === 'object' && link.tagName) {
    _.trackLink({ ele: link }, event_name, event_prop);
  } else if (typeof link === 'object' && link.target && link.event) {
    _.trackLink(link, event_name, event_prop);
  }
};
// 跟踪链接
sd.trackLinks = function (link, event_name, event_prop) {
  var ele = link;
  event_prop = event_prop || {};
  if (!link || typeof link !== 'object') {
    return false;
  }
  if (!link.href || /^javascript/.test(link.href) || link.target) {
    return false;
  }
  _.addEvent(link, 'click', function (e) {
    e.preventDefault(); // 阻止默认跳转
    var hasCalled = false;
    setTimeout(track_a_click, 1000); //如果没有回调成功，设置超时回调
    function track_a_click() {
      if (!hasCalled) {
        hasCalled = true;
        location.href = link.href; //把 A 链接的点击跳转,改成 location 的方式跳转
      }
    }
    sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
  });
};

/*
 * @param {object} properties
 * */
sd.setProfile = function (p, c) {
  if (saEvent.check({ propertiesMust: p })) {
    saEvent.send(
      {
        type: 'profile_set',
        properties: p
      },
      c
    );
  }
};

sd.setOnceProfile = function (p, c) {
  if (saEvent.check({ propertiesMust: p })) {
    saEvent.send(
      {
        type: 'profile_set_once',
        properties: p
      },
      c
    );
  }
};

/*
 * @param {object} properties
 * */
sd.appendProfile = function (p, c) {
  if (saEvent.check({ propertiesMust: p })) {
    _.each(p, function (value, key) {
      if (_.isString(value)) {
        p[key] = [value];
      } else if (_.isArray(value)) {
        p[key] = value;
      } else {
        delete p[key];
        sd.log('appendProfile属性的值必须是字符串或者数组');
      }
    });
    if (!_.isEmptyObject(p)) {
      saEvent.send(
        {
          type: 'profile_append',
          properties: p
        },
        c
      );
    }
  }
};
/*
 * @param {object} properties
 * */
sd.incrementProfile = function (p, c) {
  var str = p;
  if (_.isString(p)) {
    p = {};
    p[str] = 1;
  }
  function isChecked(p) {
    for (var i in p) {
      if (!/-*\d+/.test(String(p[i]))) {
        return false;
      }
    }
    return true;
  }

  if (saEvent.check({ propertiesMust: p })) {
    if (isChecked(p)) {
      saEvent.send(
        {
          type: 'profile_increment',
          properties: p
        },
        c
      );
    } else {
      sd.log('profile_increment的值只能是数字');
    }
  }
};

sd.deleteProfile = function (c) {
  saEvent.send(
    {
      type: 'profile_delete'
    },
    c
  );
  store.set('distinct_id', _.UUID());
  store.set('first_id', '');
};
/*
 * @param {object} properties
 * */
sd.unsetProfile = function (p, c) {
  var str = p;
  var temp = {};
  if (_.isString(p)) {
    p = [];
    p.push(str);
  }
  if (_.isArray(p)) {
    _.each(p, function (v) {
      if (_.isString(v)) {
        temp[v] = true;
      } else {
        sd.log('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
      }
    });
    saEvent.send(
      {
        type: 'profile_unset',
        properties: temp
      },
      c
    );
  } else {
    sd.log('profile_unset的参数是数组');
  }
};
/*
 * @param {string} distinct_id
 * */
sd.identify = function (id, isSave) {
  if (typeof id === 'number') {
    id = String(id);
  }
  var firstId = store.getFirstId();
  if (typeof id === 'undefined') {
    var uuid = _.UUID();
    if (firstId) {
      store.set('first_id', uuid);
    } else {
      store.set('distinct_id', uuid);
    }
  } else if (saEvent.check({ distinct_id: id })) {
    if (isSave === true) {
      if (firstId) {
        store.set('first_id', id);
      } else {
        store.set('distinct_id', id);
      }
    } else {
      if (firstId) {
        store.change('first_id', id);
      } else {
        store.change('distinct_id', id);
      }
    }
  } else {
    sd.log('identify的参数必须是字符串');
  }
};
/*
 * 这个接口是一个较为复杂的功能，请在使用前先阅读相关说明:http://www.sensorsdata.cn/manual/track_signup.html，并在必要时联系我们的技术支持人员。
 * @param {string} distinct_id
 * @param {string} event
 * @param {object} properties
 * */
sd.trackSignup = function (id, e, p, c) {
  if (saEvent.check({ distinct_id: id, event: e, properties: p })) {
    var original_id = store.getFirstId() || store.getDistinctId();
    store.set('distinct_id', id);
    saEvent.send(
      {
        original_id: original_id,
        distinct_id: id,
        type: 'track_signup',
        event: e,
        properties: p
      },
      c
    );
  }
};

/*
 * @param {string} testid
 * @param {string} groupid
 * */
sd.trackAbtest = function (t, g) {
  /*
     if (saEvent.check({test_id: t, group_id: g})) {
     saEvent.send({
     type: 'track_abtest',
     properties: {
     test_id: t,
     group_id: g
     }
     });
     }*/
};

/**
 * Register a set of properties, which are included with all events.
 *
 * @param {Object} obj - An object of properties to be registered.
 *
 */
sd.registerPage = function (obj) {
  if (saEvent.check({ properties: obj })) {
    _.extend(_.info.currentProps, obj);
  } else {
    sd.log('register输入的参数有误');
  }
};

sd.clearAllRegister = function (arr) {
  store.clearAllProps(arr);
};

sd.register = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setProps(props);
  } else {
    sd.log('register输入的参数有误');
  }
};

sd.registerOnce = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setPropsOnce(props);
  } else {
    sd.log('registerOnce输入的参数有误');
  }
};

sd.registerSession = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setSessionProps(props);
  } else {
    sd.log('registerSession输入的参数有误');
  }
};

sd.registerSessionOnce = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setSessionPropsOnce(props);
  } else {
    sd.log('registerSessionOnce输入的参数有误');
  }
};

sd.login = function (id, callback) {
  if (typeof id === 'number') {
    id = String(id);
  }
  if (saEvent.check({ distinct_id: id })) {
    var firstId = store.getFirstId();
    var distinctId = store.getDistinctId();
    if (id !== distinctId) {
      if (!firstId) {
        store.set('first_id', distinctId);
      }
      sd.trackSignup(id, '$SignUp', {}, callback);
    } else {
      callback && callback();
    }
  } else {
    sd.log('login的参数必须是字符串');
    callback && callback();
  }
};

sd.logout = function (isChangeId) {
  var firstId = store.getFirstId();
  if (firstId) {
    store.set('first_id', '');
    if (isChangeId === true) {
      var uuid = _.UUID();
      store.set('distinct_id', uuid);
    } else {
      store.set('distinct_id', firstId);
    }
  } else {
    sd.log('没有first_id，logout失败');
  }
};

sd.getPresetProperties = function () {
  function getUtm() {
    var utms = _.info.campaignParams();
    var $utms = {};
    for (var i in utms) {
      if (
        (' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1
      ) {
        $utms['$' + i] = utms[i];
      } else {
        $utms[i] = utms[i];
      }
    }
    return $utms;
  }

  var obj = {
    $referrer: _.info.pageProp.referrer || '',
    $referrer_host: _.info.pageProp.referrer
      ? _.getHostname(_.info.pageProp.referrer)
      : '',
    $url: location.href,
    $url_path: location.pathname,
    $title: document.title || '',
    _distinct_id: store.getDistinctId()
  };
  var result = _.extend(
    {},
    _.info.properties(),
    sd.store.getProps(),
    getUtm(),
    obj
  );
  if (
    sd.para.preset_properties.latest_referrer &&
    sd.para.preset_properties.latest_referrer_host
  ) {
    result.$latest_referrer_host =
      result.$latest_referrer === ''
        ? ''
        : _.getHostname(result.$latest_referrer);
  }
  return result;
};
/*
  sd.noticePluginIsReady = function(){
    if(_.isObject(window.SensorsDataWebJSSDKPlugin)){
      _.each(window.SensorsDataWebJSSDKPlugin, function(v,k){
        if((_.isObject(v) || _.isFunction(v)) && _.isFunction(v['setWebSDKReady'])){
          v['setWebSDKReady']();
        }  
      });
    }
  };
*/

sd.detectMode = function () {
  var heatmapMode = {
    searchKeywordMatch: location.search.match(/sa-request-id=([^&#]+)/),
    isSeachHasKeyword: function () {
      var match = this.searchKeywordMatch;
      return match && match[0] && match[1];
    },
    hasKeywordHandle: function () {
      var match = this.searchKeywordMatch;
      var type = location.search.match(/sa-request-type=([^&#]+)/);
      var web_url = location.search.match(/sa-request-url=([^&#]+)/);
      heatmap.setNotice(web_url);
      if (_.sessionStorage.isSupport()) {
        if (web_url && web_url[0] && web_url[1]) {
          sessionStorage.setItem(
            'sensors_heatmap_url',
            decodeURIComponent(web_url[1])
          );
        }
        sessionStorage.setItem('sensors_heatmap_id', match[1]);
        if (type && type[0] && type[1]) {
          if (type[1] === '1' || type[1] === '2' || type[1] === '3') {
            type = type[1];
            sessionStorage.setItem('sensors_heatmap_type', type);
          } else {
            type = null;
          }
        } else {
          if (sessionStorage.getItem('sensors_heatmap_type') !== null) {
            type = sessionStorage.getItem('sensors_heatmap_type');
          } else {
            type = null;
          }
        }
      }
      this.isReady(match[1], type);
    },
    isReady: function (data, type, url) {
      if (sd.para.heatmap_url) {
        _.loadScript({
          success: function () {
            setTimeout(function () {
              if (typeof sa_jssdk_heatmap_render !== 'undefined') {
                sa_jssdk_heatmap_render(sd, data, type, url);
                if (
                  typeof console === 'object' &&
                  typeof console.log === 'function'
                ) {
                  if (
                    !(
                      sd.heatmap_version &&
                      sd.heatmap_version === sd.lib_version
                    )
                  ) {
                    console.log(
                      'heatmap.js与sensorsdata.js版本号不一致，可能存在风险!'
                    );
                  }
                }
              }
            }, 0);
          },
          error: function () {},
          type: 'js',
          url: sd.para.heatmap_url
        });
      } else {
        sd.log('没有指定heatmap_url的路径');
      }
    },
    isStoregeHasKeyword: function () {
      return (
        _.sessionStorage.isSupport() &&
        typeof sessionStorage.getItem('sensors_heatmap_id') === 'string'
      );
    },
    storageHasKeywordHandle: function () {
      heatmap.setNotice();
      heatmapMode.isReady(
        sessionStorage.getItem('sensors_heatmap_id'),
        sessionStorage.getItem('sensors_heatmap_type'),
        location.href
      );
    }
  };

  var vtrackMode = {
    isVtrackMode: false,
    loadVtrack: function () {
      _.loadScript({
        success: function () {},
        error: function () {},
        type: 'js',
        url:
          location.protocol +
          '//static.sensorsdata.cn/sdk/' +
          sd.lib_version +
          '/vtrack.min.js'
      });
    },
    messageListener: function (event) {
      if (event.data.source !== 'sa-fe') {
        return false;
      }
      if (event.data.type === 'v-track-mode') {
        if (event.data.data && event.data.data.isVtrack) {
          vtrackMode.isVtrackMode = true;
          vtrackMode.loadVtrack();
        }
        window.removeEventListener(
          'message',
          vtrackMode.messageListener,
          false
        );
      }
    },
    removeMessageHandle: function () {
      if (window.removeEventListener) {
        window.removeEventListener(
          'message',
          vtrackMode.messageListener,
          false
        );
      }
    },
    verifyVtrackMode: function () {
      if (window.addEventListener) {
        window.addEventListener('message', vtrackMode.messageListener, false);
      }
      if (window.parent && window.parent.postMessage) {
        window.parent.postMessage(
          {
            source: 'sa-web-sdk',
            type: 'v-is-vtrack',
            data: {}
          },
          '*'
        );
      }
    }
  };

  var defineMode = function (isLoaded) {
    var bridgeObj = sd.bridge.initDefineBridgeInfo();
    function getAndPostDebugInfo() {
      var arr = [];
      if (!bridgeObj.touch_app_bridge) {
        //App 没有开启打通
        arr.push(sd.debug.defineMode('1'));
      }
      if (!_.isObject(sd.para.app_js_bridge)) {
        //H5 没有开启打通
        arr.push(sd.debug.defineMode('2'));
        bridgeObj.verify_success = false;
      }
      if (
        !(_.isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default')
      ) {
        //H5 没有开启全埋点
        arr.push(sd.debug.defineMode('3'));
      }
      if (bridgeObj.verify_success === 'fail') {
        //校验失败
        arr.push(sd.debug.defineMode('4'));
      }
      var data = {
        callType: 'app_alert',
        data: arr
      };

      if (
        SensorsData_App_Visual_Bridge &&
        SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info
      ) {
        SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(
          JSON.stringify(data)
        );
      } else if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.sensorsdataNativeTracker &&
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage
      ) {
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(
          JSON.stringify(data)
        );
      }
    }

    if (
      _.isObject(window.SensorsData_App_Visual_Bridge) &&
      window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode &&
      (window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode ===
        true ||
        window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode())
    ) {
      if (
        _.isObject(sd.para.heatmap) &&
        sd.para.heatmap.clickmap == 'default'
      ) {
        if (
          _.isObject(sd.para.app_js_bridge) &&
          bridgeObj.verify_success === 'success'
        ) {
          if (!isLoaded) {
            var protocol = location.protocol;
            var protocolArr = ['http:', 'https:'];
            protocol =
              _.indexOf(protocolArr, protocol) > -1 ? protocol : 'https:';
            _.loadScript({
              success: function () {
                setTimeout(function () {
                  if (typeof sa_jssdk_app_define_mode !== 'undefined') {
                    sa_jssdk_app_define_mode(sd, isLoaded);
                  }
                }, 0);
              },
              error: function () {},
              type: 'js',
              url:
                protocol +
                '//static.sensorsdata.cn/sdk/' +
                sd.lib_version +
                '/vapph5define.min.js'
            });
          } else {
            sa_jssdk_app_define_mode(sd, isLoaded);
          }
        } else {
          //打通失败弹框debug信息传给App
          getAndPostDebugInfo();
        }
      } else {
        //未开启全埋点弹框
        getAndPostDebugInfo();
      }
    }
  };

  function trackMode() {
    window.sensorsdata_app_call_js = function (type) {
      if (type && type == 'visualized') {
        if (typeof sa_jssdk_app_define_mode !== 'undefined') {
          defineMode(true);
        } else {
          defineMode(false);
        }
      }
    };

    defineMode(false);

    sd.bridge.app_js_bridge_v1();
    // 初始化referrer等页面属性 1.6
    _.info.initPage();

    if (sd.para.is_track_single_page) {
      _.addSinglePageEvent(function (last_url) {
        var sendData = function (extraData) {
          extraData = extraData || {};
          if (last_url !== location.href) {
            _.info.pageProp.referrer = last_url;
            sd.quick(
              'autoTrack',
              _.extend({ $url: location.href, $referrer: last_url }, extraData)
            );
          }
        };
        if (typeof sd.para.is_track_single_page === 'boolean') {
          sendData();
        } else if (typeof sd.para.is_track_single_page === 'function') {
          var returnValue = sd.para.is_track_single_page();
          if (_.isObject(returnValue)) {
            sendData(returnValue);
          } else if (returnValue === true) {
            sendData();
          }
        }
      });
    }
    // 支持localstorage且开启了batch_send
    if (sd.para.batch_send) {
      sd.batchSend.batchInterval();
    }
    // 初始化distinct_id
    sd.store.init();

    sd.readyState.setState(3);
    //    sd.noticePluginIsReady();
    // 发送数据
    if (sd._q && _.isArray(sd._q) && sd._q.length > 0) {
      _.each(sd._q, function (content) {
        sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
      });
    }

    //进入热力图采集模式
    if (_.isObject(sd.para.heatmap)) {
      heatmap.initHeatmap();
      heatmap.initScrollmap();
    }
  }

  // 通过检查参数，判断是否是点击图模式
  if (heatmapMode.isSeachHasKeyword()) {
    heatmapMode.hasKeywordHandle();
    // 通过检查iframe
  } else if (window.parent !== self) {
    vtrackMode.verifyVtrackMode();
    // 如果1秒后没有收到有效的回复说是vtrack模式，就进入新的判断
    setTimeout(function () {
      if (vtrackMode.isVtrackMode) {
        return false;
      }
      //删除监听
      vtrackMode.removeMessageHandle();
      //判断是否处于点击图的storage模式
      if (heatmapMode.isStoregeHasKeyword()) {
        heatmapMode.storageHasKeywordHandle();
      } else {
        trackMode();
      }
    }, 1000);
  } else {
    trackMode();
  }
};

/*
数据处理和发送的流程
数据批量发送
*/

function BatchSend() {
  //正在发送中的数据，如果后续还有，就不发送
  this.sendingData = 0;
}

BatchSend.prototype = {
  add: function (data) {
    if (_.isObject(data)) {
      this.writeStore(data);
      if (data.type === 'track_signup' || data.event === '$pageview') {
        this.sendStrategy();
      }
    }
  },
  remove: function (keys) {
    var me = this;
    if (this.sendingData > 0) {
      --this.sendingData;
    }
    if (_.isArray(keys) && keys.length > 0) {
      _.each(keys, function (key) {
        _.localStorage.remove(key);
      });
    }
  },
  send: function (data) {
    var me = this;
    var server_url = _.isArray(sd.para.server_url)
      ? sd.para.server_url[0]
      : sd.para.server_url;
    _.ajax({
      url: server_url,
      type: 'POST',
      data:
        'data_list=' +
        encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))),
      credentials: false,
      timeout: sd.para.batch_send.datasend_timeout,
      cors: true,
      success: function () {
        me.remove(data.keys);
      },
      error: function () {
        if (me.sendingData > 0) {
          --me.sendingData;
        }
      }
    });
  },
  sendPrepare: function (data) {
    var arr = data.vals;
    //优化最大发送数据量
    var maxLen = sd.para.batch_send.one_send_max_length;
    var arrLen = arr.length;
    if (arrLen > 0) {
      if (arrLen <= maxLen) {
        this.send({
          keys: data.keys,
          vals: arr
        });
      } else {
        for (var i = 0; i * maxLen < arrLen; i++) {
          this.send({
            keys: data.keys.splice(0, maxLen),
            vals: arr.splice(0, maxLen)
          });
        }
      }
    }
  },
  sendStrategy: function () {
    //定时发送和次数发送，都存在页面打开没及时发送的问题，所以优化如果是profile和pageview则触发发送
    //次数发送存在不满足次数，永远发送不了的问题，所以选择定时发送
    var data = this.readStore();
    if (data.keys.length > 0 && this.sendingData === 0) {
      this.sendingData = Math.ceil(
        data.vals.length / sd.para.batch_send.one_send_max_length
      );
      this.sendPrepare(data);
    }
  },
  batchInterval: function () {
    var me = this;
    setInterval(function () {
      me.sendStrategy();
    }, sd.para.batch_send.send_interval);
  },
  readStore: function () {
    var keys = [];
    var vals = [];
    var obj = {};
    var val = null;
    var now = new Date().getTime();
    var len = localStorage.length;
    for (var i = 0; i < len; i++) {
      var key = localStorage.key(i);
      if (key.indexOf('sawebjssdk-') === 0 && /^sawebjssdk\-\d+$/.test(key)) {
        val = localStorage.getItem(key);
        if (val) {
          val = _.safeJSONParse(val);
          if (val && _.isObject(val)) {
            val._flush_time = now;
            keys.push(key);
            vals.push(val);
          } else {
            localStorage.removeItem(key);
            sd.log('localStorage-数据parse异常' + val);
          }
        } else {
          localStorage.removeItem(key);
          sd.log('localStorage-数据取值异常' + val);
        }
      }
    }
    return {
      keys: keys,
      vals: vals
    };
  },
  writeStore: function (data) {
    var uuid =
      String(Math.random()).slice(2, 5) +
      String(Math.random()).slice(2, 5) +
      String(new Date().getTime()).slice(3);
    localStorage.setItem('sawebjssdk-' + uuid, JSON.stringify(data));
  }
};

sd.batchSend = new BatchSend();

// 各种发送方式
var dataSend = {};

dataSend.getSendUrl = function (url, data) {
  var base64Data = _.base64Encode(data);
  var crc = 'crc=' + _.hashCode(base64Data);
  if (url.indexOf('?') !== -1) {
    return (
      url +
      '&data=' +
      encodeURIComponent(base64Data) +
      '&ext=' +
      encodeURIComponent(crc)
    );
  } else {
    return (
      url +
      '?data=' +
      encodeURIComponent(base64Data) +
      '&ext=' +
      encodeURIComponent(crc)
    );
  }
};

dataSend.getSendData = function (data) {
  var base64Data = _.base64Encode(data);
  var crc = 'crc=' + _.hashCode(base64Data);
  return (
    'data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc)
  );
};

dataSend.getInstance = function (data) {
  var sendType = this.getSendType(data);
  var obj = new this[sendType](data);
  // 代理模式，重置原方法，统一设置超时
  var start = obj.start;
  obj.start = function () {
    if (
      _.isObject(sd.para.is_debug) &&
      sd.para.is_debug.storage &&
      sd.store.requests
    ) {
      sd.store.requests.push({
        name: this.server_url,
        initiatorType: this.img ? 'img' : 'xmlhttprequest', // todo: beacon
        entryType: 'resource',
        requestData: this.data
      });
    }
    var me = this;
    start.apply(this, arguments);
    setTimeout(function () {
      me.isEnd(true);
    }, sd.para.callback_timeout);
  };
  obj.end = function () {
    this.callback && this.callback();
    var self = this;
    setTimeout(function () {
      self.lastClear && self.lastClear();
    }, sd.para.datasend_timeout - sd.para.callback_timeout);
  };
  obj.isEnd = function (isDelay) {
    if (!this.received) {
      this.received = true;
      this.end();
      var self = this;
      if (isDelay) {
        if (sd.para.queue_timeout - sd.para.callback_timeout <= 0) {
          self.close();
        } else {
          setTimeout(function () {
            self.close();
          }, sd.para.queue_timeout - sd.para.callback_timeout);
        }
      } else {
        self.close();
      }
    }
  };

  return obj;
};

dataSend.getSendType = function (data) {
  var supportedSendTypes = ['image', 'ajax', 'beacon'];
  var sendType = supportedSendTypes[0];

  if (
    data.config &&
    _.indexOf(supportedSendTypes, data.config.send_type) > -1
  ) {
    sendType = data.config.send_type;
  } else {
    sendType = sd.para.send_type;
  }

  if (sendType === 'beacon' && typeof navigator.sendBeacon !== 'function') {
    sendType = 'image';
  }

  if (sendType === 'ajax' && _.isSupportCors() === false) {
    sendType = 'image';
  }

  return sendType;
};

dataSend.image = function (para) {
  this.callback = para.callback;
  this.img = document.createElement('img');
  this.img.width = 1;
  this.img.height = 1;
  // 如果后端没有配置 access-allow-origin 会导致请求错误
  if (sd.para.img_use_crossorigin) {
    this.img.crossOrigin = 'anonymous';
  }
  this.data = para.data;
  this.server_url = dataSend.getSendUrl(para.server_url, para.data);
};
dataSend.image.prototype.start = function () {
  var me = this;
  if (sd.para.ignore_oom) {
    this.img.onload = function () {
      this.onload = null;
      this.onerror = null;
      this.onabort = null;
      me.isEnd();
    };
    this.img.onerror = function () {
      this.onload = null;
      this.onerror = null;
      this.onabort = null;
      me.isEnd();
    };
    this.img.onabort = function () {
      this.onload = null;
      this.onerror = null;
      this.onabort = null;
      me.isEnd();
    };
  }
  this.img.src = this.server_url;
};

dataSend.image.prototype.lastClear = function () {
  this.img.src = '';
};

dataSend.ajax = function (para) {
  this.callback = para.callback;
  this.server_url = para.server_url;
  this.data = dataSend.getSendData(para.data);
};
dataSend.ajax.prototype.start = function () {
  var me = this;
  _.ajax({
    url: this.server_url,
    type: 'POST',
    data: this.data,
    credentials: false,
    timeout: sd.para.datasend_timeout,
    cors: true,
    success: function () {
      me.isEnd();
    },
    error: function () {
      me.isEnd();
    }
  });
};

dataSend.beacon = function (para) {
  this.callback = para.callback;
  this.server_url = para.server_url;
  this.data = dataSend.getSendData(para.data);
};

dataSend.beacon.prototype.start = function () {
  var me = this;
  if (
    typeof navigator === 'object' &&
    typeof navigator.sendBeacon === 'function'
  ) {
    navigator.sendBeacon(this.server_url, this.data);
  }
  setTimeout(function () {
    me.isEnd();
  }, 40);
};

// 数据发送流程控制

var sendState = {};
sd.sendState = sendState;
sd.events = new _.eventEmitter();
// 发送队列
sendState.queue = _.autoExeQueue();

sendState.requestData = null;

sendState.getSendCall = function (data, config, callback) {
  // 点击图渲染模式不发数据
  if (sd.is_heatmap_render_mode) {
    return false;
  }

  if (sd.readyState.state < 3) {
    sd.log('初始化没有完成');
    return false;
  }

  data._track_id = Number(
    String(Math.random()).slice(2, 5) +
      String(Math.random()).slice(2, 4) +
      String(new Date().getTime()).slice(-4)
  );
  if (sd.para.use_client_time) {
    data._flush_time = new Date().getTime();
  }

  var originData = data;

  data = JSON.stringify(data);
  //sd.log(originData);

  this.requestData = {
    data: originData,
    config: config,
    callback: callback
  };

  sd.events.tempAdd('send', originData);

  if (
    !sd.para.app_js_bridge &&
    sd.para.batch_send &&
    localStorage.length < 200
  ) {
    sd.log(originData);
    sd.batchSend.add(this.requestData.data);
    return false;
  }

  sd.bridge.dataSend(originData, this, callback);

  sd.log(originData);
};

sendState.prepareServerUrl = function () {
  if (
    typeof this.requestData.config === 'object' &&
    this.requestData.config.server_url
  ) {
    this.sendCall(
      this.requestData.config.server_url,
      this.requestData.callback
    );
  } else if (_.isArray(sd.para.server_url)) {
    for (var i = 0; i < sd.para.server_url.length; i++) {
      this.sendCall(sd.para.server_url[i]);
    }
  } else {
    this.sendCall(sd.para.server_url, this.requestData.callback);
  }
};

sendState.sendCall = function (server_url, callback) {
  var data = {
    server_url: server_url,
    data: JSON.stringify(this.requestData.data),
    callback: callback,
    config: this.requestData.config
  };
  if (
    _.isObject(sd.para.jsapp) &&
    !sd.para.jsapp.isOnline &&
    typeof sd.para.jsapp.setData === 'function'
  ) {
    delete data.callback;
    data = JSON.stringify(data);
    sd.para.jsapp.setData(data);
  } else {
    this.pushSend(data);
  }
};

sendState.pushSend = function (data) {
  var instance = dataSend.getInstance(data);
  var me = this;
  instance.close = function () {
    me.queue.close();
  };
  this.queue.enqueue(instance);
};

var saEvent = {};
sd.saEvent = saEvent;

saEvent.checkOption = {
  // event和property里的key要是一个合法的变量名，由大小写字母、数字、下划线和$组成，并且首字符不能是数字。
  regChecks: {
    regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
  },
  checkPropertiesKey: function (obj) {
    var me = this,
      flag = true;
    _.each(obj, function (content, key) {
      if (!me.regChecks.regName.test(key)) {
        flag = false;
      }
    });
    return flag;
  },
  check: function (a, b) {
    if (typeof this[a] === 'string') {
      return this[this[a]](b);
    } else {
      return this[a](b);
    }
  },
  str: function (s) {
    if (!_.isString(s)) {
      sd.log('请检查参数格式,必须是字符串');
      //return false;
      return true;
    } else {
      return true;
    }
  },
  properties: function (p) {
    _.strip_sa_properties(p);
    if (p) {
      if (_.isObject(p)) {
        if (this.checkPropertiesKey(p)) {
          return true;
        } else {
          sd.log(
            'properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头'
          );
          //return false;
          return true;
        }
      } else {
        sd.log('properties可以没有，但有的话必须是对象');
        return true;
        //return false;
      }
    } else {
      return true;
    }
  },
  propertiesMust: function (p) {
    _.strip_sa_properties(p);
    if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
      sd.log('properties必须是对象且有值');
      return true;
      //return false;
    } else {
      if (this.checkPropertiesKey(p)) {
        return true;
      } else {
        sd.log(
          'properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头'
        );
        return true;
        //return false;
      }
    }
  },
  // event要检查name
  event: function (s) {
    if (!_.isString(s) || !this['regChecks']['regName'].test(s)) {
      sd.log(
        '请检查参数格式，eventName 必须是字符串，且需是合法的变量名，即不能以数字开头，且只包含：大小写字母、数字、下划线和 $,其中以 $ 开头的表明是系统的保留字段，自定义事件名请不要以 $ 开头'
      );
      //return false;
      return true;
    } else {
      return true;
    }
  },
  test_id: 'str',
  group_id: 'str',
  distinct_id: function (id) {
    if (_.isString(id) && /^.{1,255}$/.test(id)) {
      return true;
    } else {
      sd.log('distinct_id必须是不能为空，且小于255位的字符串');
      return false;
    }
  }
};

saEvent.check = function (p) {
  var flag = true;
  for (var i in p) {
    if (!this.checkOption.check(i, p[i])) {
      return false;
    }
  }
  return flag;
};

saEvent.send = function (p, callback) {
  var data = {
    distinct_id: store.getDistinctId(),
    lib: {
      $lib: 'js',
      $lib_method: 'code',
      $lib_version: String(sd.lib_version)
    },
    properties: {}
  };

  if (
    _.isObject(p) &&
    _.isObject(p.properties) &&
    !_.isEmptyObject(p.properties) &&
    p.properties.$lib_detail
  ) {
    data.lib.$lib_detail = p.properties.$lib_detail;
    delete p.properties.$lib_detail;
  }
  //debugger;
  _.extend(data, sd.store.getUnionId(), p);

  // 合并properties里的属性
  if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
    _.extend(data.properties, p.properties);
  }
  /*
  // 合并lib里的属性
  if (_.isObject(callback)) {
    _.extend(data.lib, callback);
  }
  */

  // profile时不传公用属性
  if (!p.type || p.type.slice(0, 7) !== 'profile') {
    // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性

    data.properties = _.extend(
      {},
      _.info.properties(),
      store.getProps(),
      store.getSessionProps(),
      _.info.currentProps,
      data.properties
    );
    if (
      sd.para.preset_properties.latest_referrer &&
      !_.isString(data.properties.$latest_referrer)
    ) {
      data.properties.$latest_referrer = '取值异常';
      // TODO
      // Do NOT send data here, it will cause too much recursion.
      //_.jssdkDebug(data.properties,store.getProps());
      //sd.debug.jssdkDebug(data.properties, store.getProps());
    }
    if (
      sd.para.preset_properties.latest_search_keyword &&
      !_.isString(data.properties.$latest_search_keyword)
    ) {
      data.properties.$latest_search_keyword = '取值异常';
    }
    if (
      sd.para.preset_properties.latest_traffic_source_type &&
      !_.isString(data.properties.$latest_traffic_source_type)
    ) {
      data.properties.$latest_traffic_source_type = '取值异常';
    }
    if (
      sd.para.preset_properties.latest_landing_page &&
      !_.isString(data.properties.$latest_landing_page)
    ) {
      data.properties.$latest_landing_page = '取值异常';
    }
  }

  // 如果$time是传入的就用，否则使用服务端时间
  if (data.properties.$time && _.isDate(data.properties.$time)) {
    data.time = data.properties.$time * 1;
    delete data.properties.$time;
  } else {
    if (sd.para.use_client_time) {
      data.time = new Date() * 1;
    }
  }
  // Parse super properties that added by registerPage()
  _.parseSuperProperties(data.properties);

  _.filterReservedProperties(data.properties);
  _.searchObjDate(data);
  _.searchObjString(data);
  // 兼容灼洲app端做的$project和$token而加的代码
  _.searchZZAppStyle(data);

  //去掉data里的$option
  var data_config = _.searchConfigData(data.properties);

  //判断是否要给数据增加新用户属性
  saNewUser.checkIsAddSign(data);
  saNewUser.checkIsFirstTime(data);

  sd.addReferrerHost(data);
  sd.addPropsHook(data);

  if (sd.para.debug_mode === true) {
    sd.log(data);
    this.debugPath(JSON.stringify(data), callback);
  } else {
    sd.sendState.getSendCall(data, data_config, callback);
  }
};

// 发送debug数据请求
saEvent.debugPath = function (data, callback) {
  var _data = data; //存数据
  var url = '';
  if (sd.para.debug_mode_url.indexOf('?') !== -1) {
    url =
      sd.para.debug_mode_url +
      '&data=' +
      encodeURIComponent(_.base64Encode(data));
  } else {
    url =
      sd.para.debug_mode_url +
      '?data=' +
      encodeURIComponent(_.base64Encode(data));
  }

  _.ajax({
    url: url,
    type: 'GET',
    cors: true,
    header: { 'Dry-Run': String(sd.para.debug_mode_upload) },
    success: function (data) {
      // debug 模式下 提示框
      _.isEmptyObject(data) === true
        ? alert('debug数据发送成功' + _data)
        : alert('debug失败 错误原因' + JSON.stringify(data));
    }
  });
};

/*
cookie的数据存储
初始化cookie里的distinct_id
*/

var store = (sd.store = {
  requests: [],
  _sessionState: {},
  _state: {
    distinct_id: '',
    first_id: '',
    props: {}
  },
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
    var obj = {};
    var firstId = this._state._first_id || this._state.first_id,
      distinct_id = this._state._distinct_id || this._state.distinct_id;
    if (firstId && distinct_id) {
      obj.login_id = distinct_id;
      obj.anonymous_id = firstId;
    } else {
      obj.anonymous_id = distinct_id;
    }
    return obj;
  },
  getFirstId: function () {
    return this._state._first_id || this._state.first_id;
  },
  toState: function (ds) {
    var state = null;
    if (ds != null && _.isJSONString(ds)) {
      state = JSON.parse(ds);
      this._state = _.extend(state);
      if (state.distinct_id) {
        if (typeof state.props === 'object') {
          for (var key in state.props) {
            if (typeof state.props[key] === 'string') {
              state.props[key] = state.props[key].slice(
                0,
                sd.para.max_referrer_string_length
              );
            }
          }
          this.save();
        }
      } else {
        this.set('distinct_id', _.UUID());
        sd.debug.distinct_id('1', ds);
      }
    } else {
      this.set('distinct_id', _.UUID());
      sd.debug.distinct_id('2', ds);
    }
  },
  initSessionState: function () {
    var ds = _.cookie.get('sensorsdata2015session');
    var state = null;
    if (ds !== null && typeof (state = JSON.parse(ds)) === 'object') {
      this._sessionState = state || {};
    }
  },

  setOnce: function (a, b) {
    if (!(a in this._state)) {
      this.set(a, b);
    }
  },
  set: function (name, value) {
    this._state = this._state || {};
    if (name === 'distinct_id' && this._state.distinct_id) {
      sd.events.tempAdd('changeDistinctId', value);
    }
    this._state[name] = value;
    // 如果set('first_id') 或者 set('distinct_id')，删除对应的临时属性
    if (name === 'first_id') {
      delete this._state._first_id;
    } else if (name === 'distinct_id') {
      delete this._state._distinct_id;
    }
    this.save();
  },
  // 针对当前页面修改
  change: function (name, value) {
    // 为临时属性名增加前缀 _ (下划线)
    this._state['_' + name] = value;
  },
  setSessionProps: function (newp) {
    var props = this._sessionState;
    _.extend(props, newp);
    this.sessionSave(props);
  },
  setSessionPropsOnce: function (newp) {
    var props = this._sessionState;
    _.coverExtend(props, newp);
    this.sessionSave(props);
  },
  setProps: function (newp, isCover) {
    var props = {};
    if (!isCover) {
      props = _.extend(this._state.props || {}, newp);
    } else {
      props = newp;
    }
    for (var key in props) {
      if (typeof props[key] === 'string') {
        props[key] = props[key].slice(0, sd.para.max_referrer_string_length);
      }
    }
    this.set('props', props);
  },
  setPropsOnce: function (newp) {
    var props = this._state.props || {};
    _.coverExtend(props, newp);
    this.set('props', props);
  },
  clearAllProps: function (arr) {
    this._sessionState = {};
    if (_.isArray(arr) && arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (
          _.isString(arr[i]) &&
          arr[i].indexOf('latest_') === -1 &&
          arr[i] in this._state.props
        ) {
          delete this._state.props[arr[i]];
        }
      }
    } else {
      for (var i in this._state.props) {
        if (i.indexOf('latest_') !== 1) {
          delete this._state.props[i];
        }
      }
    }
    this.sessionSave({});
    this.save();
  },
  sessionSave: function (props) {
    this._sessionState = props;
    _.cookie.set(
      'sensorsdata2015session',
      JSON.stringify(this._sessionState),
      0
    );
  },
  save: function () {
    // 深拷贝避免修改原对象
    var copyState = JSON.parse(JSON.stringify(this._state));
    // 删除临时属性避免写入cookie
    delete copyState._first_id;
    delete copyState._distinct_id;
    _.cookie.set(
      this.getCookieName(),
      JSON.stringify(copyState),
      73000,
      sd.para.cross_subdomain
    );
  },
  getCookieName: function () {
    var sub = '';
    if (sd.para.cross_subdomain === false) {
      try {
        sub = _.URL(location.href).hostname;
      } catch (e) {
        sd.log(e);
      }
      if (typeof sub === 'string' && sub !== '') {
        sub = 'sa_jssdk_2015_' + sub.replace(/\./g, '_');
      } else {
        sub = 'sa_jssdk_2015_root';
      }
    } else {
      sub = 'sensorsdata2015jssdkcross';
    }
    return sub;
  },
  init: function () {
    this.initSessionState();
    var uuid = _.UUID();
    var cross = _.cookie.get(this.getCookieName());
    if (cross === null) {
      // null肯定是首次，非null，看是否有distinct_id
      sd.is_first_visitor = true;

      this.set('distinct_id', uuid);
    } else {
      if (!_.isJSONString(cross) || !JSON.parse(cross).distinct_id) {
        sd.is_first_visitor = true;
      }

      this.toState(cross);
    }

    // 如果没有跨域的cookie，且没有当前域cookie，那当前域的cookie和跨域cookie一致
    saNewUser.setDeviceId(uuid);

    //判断新用户
    saNewUser.storeInitCheck();
    saNewUser.checkIsFirstLatest();
  }
});

// 检查是否是新用户（第一次种cookie，且在8个小时内的）
var saNewUser = {
  checkIsAddSign: function (data) {
    if (data.type === 'track') {
      if (_.cookie.getNewUser()) {
        data.properties.$is_first_day = true;
      } else {
        data.properties.$is_first_day = false;
      }
    }
  },
  is_first_visit_time: false,
  checkIsFirstTime: function (data) {
    if (data.type === 'track' && data.event === '$pageview') {
      if (this.is_first_visit_time) {
        data.properties.$is_first_time = true;
        this.is_first_visit_time = false;
      } else {
        data.properties.$is_first_time = false;
      }
    }
  },
  setDeviceId: function (uuid) {
    // deviceid必须跨子域
    var device_id = null;
    var ds = _.cookie.get('sensorsdata2015jssdkcross');
    var state = {};
    if (ds != null && _.isJSONString(ds)) {
      state = JSON.parse(ds);
      if (state.$device_id) {
        device_id = state.$device_id;
      }
    }

    device_id = device_id || uuid;

    if (sd.para.cross_subdomain === true) {
      store.set('$device_id', device_id);
    } else {
      state.$device_id = device_id;
      _.cookie.set(
        'sensorsdata2015jssdkcross',
        JSON.stringify(state),
        null,
        true
      );
    }

    if (sd.para.is_track_device_id) {
      _.info.currentProps.$device_id = device_id;
    }
  },
  storeInitCheck: function () {
    // 如果是新用户，种cookie
    if (sd.is_first_visitor) {
      var date = new Date();
      var obj = {
        h: 23 - date.getHours(),
        m: 59 - date.getMinutes(),
        s: 59 - date.getSeconds()
      };
      _.cookie.set(
        _.cookie.getCookieName('new_user'),
        '1',
        obj.h * 3600 + obj.m * 60 + obj.s + 's'
      );
      // 如果是is_first_visit_time，且第一次，那就发数据
      this.is_first_visit_time = true;
    } else {
      // 如果没有这个cookie，肯定不是首日
      if (!_.cookie.getNewUser()) {
        this.checkIsAddSign = function (data) {
          if (data.type === 'track') {
            data.properties.$is_first_day = false;
          }
        };
      }
      // 如果不是第一次打开的用户，肯定不是首次访问
      this.checkIsFirstTime = function (data) {
        if (data.type === 'track' && data.event === '$pageview') {
          data.properties.$is_first_time = false;
        }
      };
    }
  },
  //检查是否是latest
  checkIsFirstLatest: function () {
    var url_domain = _.info.pageProp.url_domain;

    //去除详叔的坑，utm_source相关
    var latest_utms = [
      '$utm_source',
      '$utm_medium',
      '$utm_campaign',
      '$utm_content',
      '$utm_term'
    ];
    var props = store.getProps();
    for (var i = 0; i < latest_utms.length; i++) {
      if (latest_utms[i] in props) {
        delete props[latest_utms[i]];
      }
    }
    store.setProps(props, true);

    // 判断最近一次，如果前向地址跟自己域名一致，且cookie中取不到值，认为有异常
    // 最近一次站外前向地址，如果域名不一致，就register为latest

    var latestObj = {};

    if (url_domain === '') {
      url_domain = 'url解析失败';
    }

    // 遍历 preset_properties 配置参数
    _.each(sd.para.preset_properties, function (value, key) {
      // 忽略不以 latest_ 开头的配置项
      if (key.indexOf('latest_') === -1) {
        return false;
      }
      // 得到 latest_ 后面的字符串
      // 例如 utm, traffic_source_type, search_keyword, referrer, referrer_host, landing_page
      key = key.slice(7);
      // 配置值为 true
      if (value) {
        if (key !== 'utm' && url_domain === 'url解析失败') {
          latestObj['$latest_' + key] = 'url的domain解析失败';
        } else if (_.isReferralTraffic(document.referrer)) {
          switch (key) {
            case 'traffic_source_type':
              latestObj[
                '$latest_traffic_source_type'
              ] = _.getSourceFromReferrer();
              break;
            case 'referrer':
              latestObj['$latest_referrer'] = _.info.pageProp.referrer;
              break;
            case 'search_keyword':
              latestObj['$latest_search_keyword'] = _.getKeywordFromReferrer();
              break;
            case 'landing_page':
              latestObj['$latest_landing_page'] = location.href;
              break;
          }
        }
      } else {
        // 如果当前配置是 latest_utm，遍历store._state.props 删除非 $latest_utm 和 _latest_ 开头的属性
        if (key === 'utm' && sd.store._state.props) {
          for (var key1 in sd.store._state.props) {
            if (
              key1.indexOf('$latest_utm') === 0 ||
              key1.indexOf('_latest_') === 0
            ) {
              delete sd.store._state.props[key1];
            }
          }
          // 如果是非 latest_utm 配置项，从 store._state.props 中删掉此属性
        } else if (
          sd.store._state.props &&
          '$latest_' + key in sd.store._state.props
        ) {
          delete sd.store._state.props['$latest_' + key];
        }
      }
    });

    sd.register(latestObj);

    // utm
    if (sd.para.preset_properties.latest_utm) {
      var allUtms = _.info.campaignParamsStandard('$latest_', '_latest_');
      var $utms = allUtms.$utms;
      var otherUtms = allUtms.otherUtms;
      if (!_.isEmptyObject($utms)) {
        sd.register($utms);
      }
      if (!_.isEmptyObject(otherUtms)) {
        sd.register(otherUtms);
      }
    }
  }
};

sd.bridge = {
  //H5 校验 server_url（project host）是否通过
  is_verify_success: false,
  initPara: function () {
    var app_js_bridge_default = {
      //is_send:打通失败数据是否由 H5 发送
      is_send: true,
      white_list: [],
      is_mui: false
    };
    if (typeof sd.para.app_js_bridge === 'object') {
      sd.para.app_js_bridge = _.extend(
        {},
        app_js_bridge_default,
        sd.para.app_js_bridge
      );
    } else if (
      sd.para.use_app_track === true ||
      sd.para.app_js_bridge === true ||
      sd.para.use_app_track === 'only'
    ) {
      if (
        sd.para.use_app_track_is_send === false ||
        sd.para.use_app_track === 'only'
      ) {
        app_js_bridge_default.is_send = false;
      }
      sd.para.app_js_bridge = _.extend({}, app_js_bridge_default);
    } else if (sd.para.use_app_track === 'mui') {
      app_js_bridge_default.is_mui = true;
      sd.para.app_js_bridge = _.extend({}, app_js_bridge_default);
    }
    if (sd.para.app_js_bridge.is_send === false) {
      sd.log('设置了 is_send:false,如果打通失败，数据将被丢弃！');
    }
  },
  //初始化是否打通
  initState: function () {
    function checkProjectAndHost(appUrl) {
      function getHostNameAndProject(url) {
        var obj = {
          hostname: '',
          project: ''
        };
        try {
          obj.hostname = _.URL(url).hostname;
          obj.project = _.URL(url).searchParams.get('project') || 'default';
        } catch (e) {
          sd.log(e);
        }
        return obj;
      }
      var appObj = getHostNameAndProject(appUrl);
      var H5Obj = getHostNameAndProject(sd.para.server_url);
      if (
        appObj.hostname === H5Obj.hostname &&
        appObj.project === H5Obj.project
      ) {
        return true;
      } else {
        if (sd.para.app_js_bridge.white_list.length > 0) {
          for (var i = 0; i < sd.para.app_js_bridge.white_list.length; i++) {
            var urlobj = getHostNameAndProject(
              sd.para.app_js_bridge.white_list[i]
            );
            if (
              urlobj.hostname === appObj.hostname &&
              urlobj.project === appObj.project
            ) {
              return true;
            }
          }
        }
      }
      return false;
    }

    if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.sensorsdataNativeTracker &&
        _.isObject(window.SensorsData_iOS_JS_Bridge) &&
        window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
      ) {
        if (
          checkProjectAndHost(
            window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
          )
        ) {
          sd.bridge.is_verify_success = true;
        }
      } else if (
        _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
        window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url &&
        window.SensorsData_APP_New_H5_Bridge.sensorsdata_track
      ) {
        var app_server_url = window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();
        if (app_server_url) {
          if (checkProjectAndHost(app_server_url)) {
            sd.bridge.is_verify_success = true;
          }
        }
      }
    }
  },
  initDefineBridgeInfo: function () {
    var resultObj = {
      touch_app_bridge: true,
      verify_success: false
    };

    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.sensorsdataNativeTracker &&
      window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage &&
      _.isObject(window.SensorsData_iOS_JS_Bridge) &&
      window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
    ) {
      if (sd.bridge.is_verify_success) {
        resultObj.verify_success = 'success';
      } else {
        resultObj.verify_success = 'fail';
      }
    } else if (
      _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
      window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url &&
      window.SensorsData_APP_New_H5_Bridge.sensorsdata_track
    ) {
      if (sd.bridge.is_verify_success) {
        resultObj.verify_success = 'success';
      } else {
        resultObj.verify_success = 'fail';
      }
    } else if (
      typeof SensorsData_APP_JS_Bridge === 'object' &&
      ((SensorsData_APP_JS_Bridge.sensorsdata_verify &&
        SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) ||
        SensorsData_APP_JS_Bridge.sensorsdata_track)
    ) {
      if (
        SensorsData_APP_JS_Bridge.sensorsdata_verify &&
        SensorsData_APP_JS_Bridge.sensorsdata_visual_verify
      ) {
        if (
          SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(
            JSON.stringify({ server_url: sd.para.server_url })
          )
        ) {
          resultObj.verify_success = 'success';
        } else {
          resultObj.verify_success = 'fail';
        }
      } else {
        resultObj.verify_success = 'success';
      }
    } else if (
      (/sensors-verify/.test(navigator.userAgent) ||
        /sa-sdk-ios/.test(navigator.userAgent)) &&
      !window.MSStream
    ) {
      if (sd.bridge.iOS_UA_bridge()) {
        resultObj.verify_success = 'success';
      } else {
        resultObj.verify_success = 'fail';
      }
    } else {
      resultObj.touch_app_bridge = false;
    }

    return resultObj;
  },
  iOS_UA_bridge: function () {
    if (/sensors-verify/.test(navigator.userAgent)) {
      var match = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
      if (
        match &&
        match[0] &&
        typeof match[1] === 'string' &&
        match[1].split('?').length === 2
      ) {
        match = match[1].split('?');
        var hostname = null;
        var project = null;
        try {
          hostname = _.URL(sd.para.server_url).hostname;
          project =
            _.URL(sd.para.server_url).searchParams.get('project') || 'default';
        } catch (e) {
          sd.log(e);
        }
        if (
          hostname &&
          hostname === match[0] &&
          project &&
          project === match[1]
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (/sa-sdk-ios/.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  },
  dataSend: function (originData, that, callback) {
    // 打通app传数据给app
    if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
      //如果有新版，优先用新版
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.sensorsdataNativeTracker &&
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage &&
        _.isObject(window.SensorsData_iOS_JS_Bridge) &&
        window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url
      ) {
        if (sd.bridge.is_verify_success) {
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(
            JSON.stringify({
              callType: 'app_h5_track',
              data: _.extend({ server_url: sd.para.server_url }, originData)
            })
          );
          typeof callback === 'function' && callback();
        } else {
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: originData,
              step: '4.1',
              output: 'all'
            });
            that.prepareServerUrl();
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else if (
        _.isObject(window.SensorsData_APP_New_H5_Bridge) &&
        window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url &&
        window.SensorsData_APP_New_H5_Bridge.sensorsdata_track
      ) {
        if (sd.bridge.is_verify_success) {
          SensorsData_APP_New_H5_Bridge.sensorsdata_track(
            JSON.stringify(
              _.extend({ server_url: sd.para.server_url }, originData)
            )
          );
          typeof callback === 'function' && callback();
        } else {
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: originData,
              step: '4.2',
              output: 'all'
            });
            that.prepareServerUrl();
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else if (
        typeof SensorsData_APP_JS_Bridge === 'object' &&
        (SensorsData_APP_JS_Bridge.sensorsdata_verify ||
          SensorsData_APP_JS_Bridge.sensorsdata_track)
      ) {
        // 如果有新版方式，优先用新版
        if (SensorsData_APP_JS_Bridge.sensorsdata_verify) {
          // 如果校验通过则结束，不通过则降级改成h5继续发送
          if (
            !SensorsData_APP_JS_Bridge.sensorsdata_verify(
              JSON.stringify(
                _.extend({ server_url: sd.para.server_url }, originData)
              )
            )
          ) {
            if (sd.para.app_js_bridge.is_send) {
              sd.debug.apph5({
                data: originData,
                step: '3.1',
                output: 'all'
              });
              that.prepareServerUrl();
            } else {
              typeof callback === 'function' && callback();
            }
          } else {
            typeof callback === 'function' && callback();
          }
        } else {
          SensorsData_APP_JS_Bridge.sensorsdata_track(
            JSON.stringify(
              _.extend({ server_url: sd.para.server_url }, originData)
            )
          );
          typeof callback === 'function' && callback();
        }
      } else if (
        (/sensors-verify/.test(navigator.userAgent) ||
          /sa-sdk-ios/.test(navigator.userAgent)) &&
        !window.MSStream
      ) {
        var iframe = null;
        if (sd.bridge.iOS_UA_bridge()) {
          iframe = document.createElement('iframe');
          iframe.setAttribute(
            'src',
            'sensorsanalytics://trackEvent?event=' +
              encodeURIComponent(
                JSON.stringify(
                  _.extend(
                    {
                      server_url: sd.para.server_url
                    },
                    originData
                  )
                )
              )
          );
          document.documentElement.appendChild(iframe);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
          typeof callback === 'function' && callback();
        } else {
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: originData,
              step: '3.2',
              output: 'all'
            });
            that.prepareServerUrl();
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else {
        if (
          _.isObject(sd.para.app_js_bridge) &&
          sd.para.app_js_bridge.is_send === true
        ) {
          sd.debug.apph5({
            data: originData,
            step: '2',
            output: 'all'
          });
          that.prepareServerUrl();
        } else {
          typeof callback === 'function' && callback();
        }
      }
    } else if (
      _.isObject(sd.para.app_js_bridge) &&
      sd.para.app_js_bridge.is_mui
    ) {
      if (
        _.isObject(window.plus) &&
        window.plus.SDAnalytics &&
        window.plus.SDAnalytics.trackH5Event
      ) {
        window.plus.SDAnalytics.trackH5Event(data);
        typeof callback === 'function' && callback();
      } else {
        if (
          _.isObject(sd.para.app_js_bridge) &&
          sd.para.app_js_bridge.is_send === true
        ) {
          that.prepareServerUrl();
        } else {
          typeof callback === 'function' && callback();
        }
      }
    } else {
      sd.debug.apph5({
        data: originData,
        step: '1',
        output: 'code'
      });
      that.prepareServerUrl();
    }
  },
  app_js_bridge_v1: function () {
    var app_info = null;
    var todo = null;
    function setAppInfo(data) {
      app_info = data;
      if (_.isJSONString(app_info)) {
        app_info = JSON.parse(app_info);
      }
      if (todo) {
        todo(app_info);
        todo = null;
        app_info = null;
      }
    }
    //android
    function getAndroid() {
      if (
        typeof window.SensorsData_APP_JS_Bridge === 'object' &&
        window.SensorsData_APP_JS_Bridge.sensorsdata_call_app
      ) {
        app_info = SensorsData_APP_JS_Bridge.sensorsdata_call_app();
        if (_.isJSONString(app_info)) {
          app_info = JSON.parse(app_info);
        }
      }
    }
    //ios
    window.sensorsdata_app_js_bridge_call_js = function (data) {
      setAppInfo(data);
    };
    // 通知iOS
    function calliOS() {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'sensorsanalytics://getAppInfo');
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
      }
    }
    sd.getAppStatus = function (func) {
      calliOS();
      //先获取能直接取到的安卓，ios是异步的不需要操作
      getAndroid();
      // 不传参数，直接返回数据
      if (!func) {
        return app_info;
        app_info = null;
      } else {
        //如果传参数，保存参数。如果有数据直接执行，没数据时保存
        if (app_info === null) {
          todo = func;
        } else {
          func(app_info);
          app_info = null;
        }
      }
    };
  }
};

/*
点击图和触达图数据采集的功能
*/

var heatmap = (sd.heatmap = {
  // 设置错误提示
  setNotice: function (web_url) {
    sd.is_heatmap_render_mode = true;

    if (!sd.para.heatmap) {
      sd.errorMsg = '您SDK没有配置开启点击图，可能没有数据！';
    }
    if (web_url && web_url[0] && web_url[1]) {
      if (
        web_url[1].slice(0, 5) === 'http:' &&
        location.protocol === 'https:'
      ) {
        sd.errorMsg = '您的当前页面是https的地址，神策分析环境也必须是https！';
      }
    }
    if (!sd.para.heatmap_url) {
      sd.para.heatmap_url =
        location.protocol +
        '//static.sensorsdata.cn/sdk/' +
        sd.lib_version +
        '/heatmap.min.js';
    }
  },
  getDomIndex: function (el) {
    if (!el.parentNode) return -1;
    var i = 0;
    var nodeName = el.tagName;
    var list = el.parentNode.children;
    for (var n = 0; n < list.length; n++) {
      if (list[n].tagName === nodeName) {
        if (el === list[n]) {
          return i;
        } else {
          i++;
        }
      }
    }
    return -1;
  },
  selector: function (el) {
    var i =
      el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
    if (
      el.getAttribute &&
      el.getAttribute('id') &&
      (!sd.para.heatmap ||
        (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id'))
    ) {
      return '#' + el.getAttribute('id');
    } else {
      return (
        el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '')
      );
    }
  },
  getDomSelector: function (el, arr) {
    if (!el || !el.parentNode || !el.parentNode.children) {
      return false;
    }
    arr = arr && arr.join ? arr : [];
    var name = el.nodeName.toLowerCase();
    if (!el || name === 'body' || 1 != el.nodeType) {
      arr.unshift('body');
      return arr.join(' > ');
    }
    arr.unshift(this.selector(el));
    if (
      el.getAttribute &&
      el.getAttribute('id') &&
      sd.para.heatmap &&
      sd.para.heatmap.element_selector !== 'not_use_id'
    )
      return arr.join(' > ');
    return this.getDomSelector(el.parentNode, arr);
  },
  na: function () {
    var a = document.documentElement.scrollLeft || window.pageXOffset;
    return parseInt(isNaN(a) ? 0 : a, 10);
  },
  i: function () {
    var a = 0;
    try {
      (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset),
        (a = isNaN(a) ? 0 : a);
    } catch (b) {
      a = 0;
    }
    return parseInt(a, 10);
  },
  getBrowserWidth: function () {
    var a = window.innerWidth || document.body.clientWidth;
    return isNaN(a) ? 0 : parseInt(a, 10);
  },
  getBrowserHeight: function () {
    var a = window.innerHeight || document.body.clientHeight;
    return isNaN(a) ? 0 : parseInt(a, 10);
  },
  getScrollWidth: function () {
    var a = parseInt(document.body.scrollWidth, 10);
    return isNaN(a) ? 0 : a;
  },
  W: function (a) {
    var b = parseInt(+a.clientX + +this.na(), 10);
    var a = parseInt(+a.clientY + +this.i(), 10);
    return {
      x: isNaN(b) ? 0 : b,
      y: isNaN(a) ? 0 : a
    };
  },
  start: function (ev, target, tagName, customProps, callback) {
    var userCustomProps = _.isObject(customProps) ? customProps : {};
    var userCallback = _.isFunction(callback)
      ? callback
      : _.isFunction(customProps)
      ? customProps
      : undefined;
    if (
      sd.para.heatmap &&
      sd.para.heatmap.collect_element &&
      !sd.para.heatmap.collect_element(target)
    ) {
      return false;
    }

    var selector = this.getDomSelector(target);
    var prop = _.getEleInfo({ target: target });

    prop.$element_selector = selector ? selector : '';
    if (sd.para.heatmap && sd.para.heatmap.custom_property) {
      var customP = sd.para.heatmap.custom_property(target);
      if (_.isObject(customP)) {
        prop = _.extend(prop, customP);
      }
    }
    prop = _.extend(prop, userCustomProps);
    if (
      tagName === 'a' &&
      sd.para.heatmap &&
      sd.para.heatmap.isTrackLink === true
    ) {
      _.trackLink({ event: ev, target: target }, '$WebClick', prop);
    } else {
      sd.track('$WebClick', prop, userCallback);
    }
  },
  hasElement: function (e) {
    var path = e._getPath();
    if (_.isArray(path) && path.length > 0) {
      for (var i = 0; i < path.length; i++) {
        if (
          path[i] &&
          path[i].tagName &&
          path[i].tagName.toLowerCase() === 'a'
        ) {
          return path[i];
        }
      }
    }
    return false;
  },

  initScrollmap: function () {
    if (
      !_.isObject(sd.para.heatmap) ||
      sd.para.heatmap.scroll_notice_map !== 'default'
    ) {
      return false;
    }

    /*
    if (sd.para.scrollmap && _.isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url()) {
      return false;
    }
    */
    var checkPage = function () {
      if (
        sd.para.scrollmap &&
        _.isFunction(sd.para.scrollmap.collect_url) &&
        !sd.para.scrollmap.collect_url()
      ) {
        return false;
      }
      return true;
    };

    var interDelay = function (param) {
      var interDelay = {};
      interDelay.timeout = param.timeout || 1000;
      interDelay.func = param.func;
      interDelay.hasInit = false;
      interDelay.inter = null;
      interDelay.main = function (para, isClose) {
        this.func(para, isClose);
        this.inter = null;
      };
      interDelay.go = function (isNoDelay) {
        var me = this;
        var para = {};
        if (!this.inter) {
          para.$viewport_position =
            (document.documentElement && document.documentElement.scrollTop) ||
            window.pageYOffset ||
            document.body.scrollTop ||
            0;
          para.$viewport_position = Math.round(para.$viewport_position) || 0;
          para.$viewport_height =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            0;
          para.$viewport_width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            0;
          //para.$screen_orientation = _.getScreenOrientation();
          //para.$device_pixel_ratio = (isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio);
          if (isNoDelay) {
            interDelay.main(para, true);
          } else {
            this.inter = setTimeout(function () {
              interDelay.main(para);
            }, this.timeout);
          }
        }
      };
      return interDelay;
    };

    var delayTime = interDelay({
      timeout: 1000,
      func: function (para, isClose) {
        var offsetTop =
          (document.documentElement && document.documentElement.scrollTop) ||
          window.pageYOffset ||
          document.body.scrollTop ||
          0;
        var current_time = new Date();
        var delay_time = current_time - this.current_time;
        if (
          (delay_time > sd.para.heatmap.scroll_delay_time &&
            offsetTop - para.$viewport_position !== 0) ||
          isClose
        ) {
          para.$url = location.href;
          para.$title = document.title;
          para.$url_path = location.pathname;
          para.event_duration = Math.min(
            sd.para.heatmap.scroll_event_duration,
            parseInt(delay_time) / 1000
          );
          sd.track('$WebStay', para);
        }
        this.current_time = current_time;
      }
    });

    delayTime.current_time = new Date();

    _.addEvent(window, 'scroll', function () {
      if (!checkPage()) {
        return false;
      }
      delayTime.go();
    });

    _.addEvent(window, 'unload', function () {
      if (!checkPage()) {
        return false;
      }
      delayTime.go('notime');
    });
  },
  initHeatmap: function () {
    var that = this;
    if (
      !_.isObject(sd.para.heatmap) ||
      sd.para.heatmap.clickmap !== 'default'
    ) {
      return false;
    }

    // 验证url，function成功就行，非function认为都是全部
    if (
      _.isFunction(sd.para.heatmap.collect_url) &&
      !sd.para.heatmap.collect_url()
    ) {
      return false;
    }

    if (sd.para.heatmap.collect_elements === 'all') {
      sd.para.heatmap.collect_elements = 'all';
    } else {
      sd.para.heatmap.collect_elements = 'interact';
    }

    if (sd.para.heatmap.collect_elements === 'all') {
      _.addEvent(document, 'click', function (e) {
        var ev = e || window.event;
        if (!ev) {
          return false;
        }
        var target = ev.target || ev.srcElement;
        if (typeof target !== 'object') {
          return false;
        }
        if (typeof target.tagName !== 'string') {
          return false;
        }
        var tagName = target.tagName.toLowerCase();
        if (tagName === 'body' || tagName === 'html') {
          return false;
        }
        if (!target || !target.parentNode || !target.parentNode.children) {
          return false;
        }
        var parent_ele = target.parentNode.tagName.toLowerCase();
        if (parent_ele === 'a' || parent_ele === 'button') {
          that.start(ev, target.parentNode, parent_ele);
        } else {
          that.start(ev, target, tagName);
        }
      });
    } else {
      _.addEvent(document, 'click', function (e) {
        var ev = e || window.event;
        if (!ev) {
          return false;
        }
        var target = ev.target || ev.srcElement;
        if (typeof target !== 'object') {
          return false;
        }
        if (typeof target.tagName !== 'string') {
          return false;
        }
        var tagName = target.tagName.toLowerCase();
        if (
          tagName.toLowerCase() === 'body' ||
          tagName.toLowerCase() === 'html'
        ) {
          return false;
        }
        if (!target || !target.parentNode || !target.parentNode.children) {
          return false;
        }

        var parent_ele = target.parentNode;

        if (
          tagName === 'a' ||
          tagName === 'button' ||
          tagName === 'input' ||
          tagName === 'textarea' ||
          _.hasAttribute(target, 'data-sensors-click')
        ) {
          that.start(ev, target, tagName);
        } else if (
          parent_ele.tagName.toLowerCase() === 'button' ||
          parent_ele.tagName.toLowerCase() === 'a'
        ) {
          that.start(ev, parent_ele, target.parentNode.tagName.toLowerCase());
        } else if (
          tagName === 'area' &&
          parent_ele.tagName.toLowerCase() === 'map' &&
          _.ry(parent_ele).prev().tagName &&
          _.ry(parent_ele).prev().tagName.toLowerCase() === 'img'
        ) {
          that.start(
            ev,
            _.ry(parent_ele).prev(),
            _.ry(parent_ele).prev().tagName.toLowerCase()
          );
        } else {
          var hasA = that.hasElement(e);
          if (hasA) {
            that.start(ev, hasA, hasA.tagName.toLowerCase());
          }
        }
      });
    }
  }
});

sd.init = function (para) {
  // 标志已经init过
  if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2) {
    return false;
  }
  sd.setInitVar();
  sd.readyState.setState(2);
  sd.initPara(para);

  sd.detectMode();
};

var methods = [
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
  'clearAllRegister'
];

_.each(methods, function (method) {
  var oldFunc = sd[method];
  sd[method] = function () {
    if (!sd.readyState.getState()) {
      try {
        console.error('请先初始化神策JS SDK');
      } catch (e) {
        sd.log(e);
      }
      return;
    }
    return oldFunc.apply(sd, arguments);
  };
});

// Do not remove the following line!
//__PLUGINS__

if (typeof window['sensorsDataAnalytic201505'] === 'string') {
  //异步或者同步
  sd.setPreConfig(window[sensorsDataAnalytic201505]);
  window[sensorsDataAnalytic201505] = sd;
  window['sensorsDataAnalytic201505'] = sd;
  sd.init();
} else if (typeof window['sensorsDataAnalytic201505'] === 'undefined') {
  window['sensorsDataAnalytic201505'] = sd;
} else {
  sd = window['sensorsDataAnalytic201505'];
}

export default sd;
