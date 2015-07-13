'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.wrap = wrap;

function wrap(wrapperMethod) {
  return function (target, key, descriptor) {

    if (typeof target === 'function') {
      var newTarget = function newTarget() {
        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        var self = this;
        return (function () {
          var methodCallback = function methodCallback() {
            return new target(arg);
          };
          return wrapperMethod.call(self, methodCallback, arg, target.name, 'class');
        })();
      };
      return newTarget;
    } else {
      var _ret = (function () {
        var orgMethod = descriptor.value;
        descriptor.value = function () {
          for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            arg[_key2] = arguments[_key2];
          }

          var self = this;
          return (function () {
            var methodCallback = function methodCallback() {
              return orgMethod.apply(self, arg);
            };
            return wrapperMethod.call(self, methodCallback, arg, key, 'function');
          })();
        };
        return {
          v: descriptor
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  };
}