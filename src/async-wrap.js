// The async version, allows you to make your inner methods async as well
export default function wrap(wrapperMethod) {
  return (target, key, descriptor) => {

    if ( typeof(target) === 'function' ){
      let newTarget = async function (...arg) {
        var self = this;
        return async function() {
          var methodCallback = async function(){return new target(arg)};
          return await wrapperMethod.call(self, methodCallback, arg, target.name, 'class')
        }()
      };
      return newTarget;
    } else {
      let orgMethod = descriptor.value;
      descriptor.value = async function (...arg) {
        var self = this;
        return async function() {
          var methodCallback = async function() { return await orgMethod.apply(self, arg) };
          return await wrapperMethod.call(self, methodCallback, arg, key, 'function')
        }()
      };
      return descriptor;
    }
  }
}
