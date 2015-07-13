
//export function wrap(wrapperMethod) {
'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function wrap(wrapperMethod) {
  var _this = this;

  return function (target, key, descriptor) {

    //console.log('target');
    //console.log(target);
    //console.log(key);
    //console.log(descriptor.value);

    if (typeof target === 'function') {
      return target;
    } else {
      //var newFunction = wrapperMethod(descriptor.value, arguments, key);
      var orgMethod = descriptor.value;
      //descriptor.value = newFunction;
      var self2 = _this;

      descriptor.value = function () {
        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        var self = this;
        return (function () {
          //console.log('------key', key)
          //console.log('------orgMethod', orgMethod)
          //console.log('------arg', arg)
          //
          //console.log()

          //this.a = 12345;
          var m = function m() {
            orgMethod.apply(self, arg);
          };

          wrapperMethod.call(self, m, arg, key);
        })();
      };
      return descriptor;
    }

    //class tempClass extends target {
    //  constructor(...injectedValues) {
    //    super();
    //    for (var i = 0; i < modules.length; i++) {
    //      this[modules[i]] = injectedValues[i];
    //    }
    //  }
    //}
    //tempClass.$inject = modules;
    //return descriptor;
  };
}

var log = function log(methodCallback, methodArgs, methodName) {
  console.log('Starting: ', methodName);
  console.log(methodArgs);
  //var result = methodCallback.apply(this, methodArgs);
  methodCallback();
  console.log('Ended: ', methodName);
  //return result;
  return null;
};

//@wrap(log)

var Testing = (function () {
  function Testing() {
    var startNumber = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    _classCallCheck(this, Testing);

    this.a = 1;
    console.log('this is a test');
  }

  _createDecoratedClass(Testing, [{
    key: 'add',
    decorators: [wrap(log)],
    value: function add(number) {
      this.a += number;
    }
  }]);

  return Testing;
})();

//class Testing{constructor(startNumber = 1){this.a = 1;console.log('this is a test');}add(number){this.a += number;}}

var testing = new Testing(3);
testing.add(10);
console.log(testing.a);
//orgMethod.apply(self, arg)