# decorator-surround
A ES6 decorator for wrapping classes or methods with you own custom code. You can also edit the parameters!

With it you can easily make:
* logger functions
* edit the input to a method
* edit the output to a method
* do something extra with the result (ie write to file)

Should also work in frontend code if you use babel with es7.decorators enabled.


## Install
    $ npm install --save decorator-wrap
 
## Usage
    // ES2016 style
    import {wrap} from 'decorator-wrap'

    // CommonJS style
    let wrap = require('decorator-wrap').wrap;
    
    var log = (methodCallback, methodArgs, methodName, type) => {
      console.log('Starting  ', type, methodName);
      var result = methodCallback();
      console.log('Ended: ', methodName);
      return result;
    };

    @wrap(log)
    class SuperNiceClass {
        constructor(){
            //some business here.... 
            //some business here.... 
        }
        @wrap(log)
        bar(a,b) {
            //some business here.... 
        }
    }
    

## Note
You need to run babel with the option 'es7.decorators' enabled.