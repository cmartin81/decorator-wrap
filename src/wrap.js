export function wrap(wrapperMethod) {
  return (target, key, descriptor) => {

    if ( typeof(target) === 'function' ){
      let newTarget = function (...arg) {
        var self = this;
        return function() {
          var methodCallback = function(){return new target(arg)};
          return wrapperMethod.call(self, methodCallback, arg, target.name, 'class')
        }()
      };
      return newTarget;
    } else {
      let orgMethod = descriptor.value;
      descriptor.value = function (...arg) {
        var self = this;
        return function() {
          var methodCallback = function() { return orgMethod.apply(self, arg) };
          return wrapperMethod.call(self, methodCallback, arg, key, 'function')
        }()
      };
      return descriptor;
    }
  }
}
