
//export function wrap(wrapperMethod) {
function wrap(wrapperMethod) {
  return (target, key, descriptor) => {

    //console.log('target');
    //console.log(target);
    //console.log(key);
    //console.log(descriptor.value);


    if ( typeof(target) === 'function' ){
      return target;
    } else {
      //var newFunction = wrapperMethod(descriptor.value, arguments, key);
      var orgMethod = descriptor.value;
      //descriptor.value = newFunction;
      var self2 = this;

      descriptor.value = function (...arg) {
         var self = this;
        return function() {
        //console.log('------key', key)
        //console.log('------orgMethod', orgMethod)
        //console.log('------arg', arg)
        //
        //console.log()

        //this.a = 12345;
        var m = function(){orgMethod.apply(self, arg)}

        wrapperMethod.call(self, m, arg, key)
        //orgMethod.apply(self, arg)

        }()

      }
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
  }
}

var log = (methodCallback, methodArgs, methodName) => {
  console.log('Starting: ', methodName);
  console.log(methodArgs);
  //var result = methodCallback.apply(this, methodArgs);
  methodCallback()
  console.log('Ended: ', methodName)
  //return result;
return null;
}

//@wrap(log)
class Testing{
  constructor(startNumber = 1){
    this.a = 1;
    console.log('this is a test');
  }
  @wrap(log)
  add(number){
    this.a += number;
  }
}
//class Testing{constructor(startNumber = 1){this.a = 1;console.log('this is a test');}add(number){this.a += number;}}


var testing = new Testing(3);
testing.add(10);
console.log(testing.a);
