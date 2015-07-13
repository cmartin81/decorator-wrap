//export function wrap(wrapperMethod) {
'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var log = function log(methodCallback, methodArgs, methodName, type) {
  console.log('Starting  ', type, methodName);
  console.log(methodArgs);
  //methodArgs[0] = 1000;
  var result = methodCallback();
  console.log('Ended: ', methodName);
  return result;
};

var Testing = (function () {
  function Testing() {
    var startNumber = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    _classCallCheck(this, _Testing);

    this.a = 123;
    console.log('this is a test');
  }

  _createDecoratedClass(Testing, [{
    key: 'add',
    decorators: [wrap(log)],
    value: function add(number) {
      this.a += number;
      return 'added number ' + number;
    }
  }]);

  var _Testing = Testing;
  Testing = wrap(log)(Testing) || Testing;
  return Testing;
})();

//class Testing{constructor(startNumber = 1){this.a = 1;console.log('this is a test');}add(number){this.a += number;}}

var testing = new Testing(3);
console.log(testing.add(10));
console.log(testing.a);