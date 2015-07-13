//export function wrap(wrapperMethod) {
function wrap(wrapperMethod) {
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

var log = (methodCallback, methodArgs, methodName, type) => {
  console.log('Starting  ', type, methodName);
  var result = methodCallback();
  console.log('Ended: ', methodName);
  return result;
};


@wrap(log)
class Testing{
  constructor(startNumber = 1){
    this.a = startNumber;
  }
  @wrap(log)
  add(number){
    this.a += number;
  }
}

var testing = new Testing(3);
console.log(testing.add(10));
console.log(testing.a);
