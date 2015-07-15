[![Build Status](https://travis-ci.org/cmartin81/decorator-wrap.svg)](https://travis-ci.org/cmartin81/decorator-wrap)

# decorator-wrap
A ES6 decorator for wrapping classes or methods with you own custom code. You can also edit the parameters!

With it you can easily make:
* logger functions
* edit the input parameters to a method
* edit the output from a method
* do something extra with the result (ie write to file)
* skip calling the method

Please see tests for more examples

Should also work in frontend code if you use babel with es7.decorators enabled.

## Install
    $ npm install --save decorator-wrap
 
## Usage
### Make a function that have 4 parameters:

    | parameters | description                                                                 |
    |------------|-----------------------------------------------------------------------------| 
    | callback   | The actual method/class. REMEBER TO INVOKE THIS METHOD AND RETURN THE VALUE |
    | args       | The arguments passed into the method/class                                  |
    | name       | The method name of the method/class that is invoked                         |
    | type       | The object type where the decorator is placed (class or function)           |

### Here is an example:

    // ES2016 style
    import {wrap} from 'decorator-wrap'

    // CommonJS style
    let wrap = require('decorator-wrap').wrap;
    
    var log = (callback, args, name, type) => {
      console.log('Starting  ', type, name);
      var result = callback();
      console.log('Ended: ', name);
      return result;
    };

    @wrap(log)
    class SuperNiceClass {
        constructor(){
            //some business here.... 
            console.log('hello from class');
            //some business here.... 
        }
        @wrap(log)
        bar(a,b) {
            //some business here.... 
            console.log('hello from bar method');
            //some business here.... 
        }
    }
    
    new SuperNiceClass().bar(1,2);
    
### Result
    Starting class SuperNiceClass
    hello from class
    Ended: SuperNiceClass
    Starting function bar
    hello from bar method
    Ended: bar


## For more examples see test/wrap.test.js 

## Plugins
You can easily make plugins to this module by simply doing this
    export function log(target, key, descriptor) {
      return wrap(log)(target, key, descriptor);  //see the method in the example above
    }

## Available plugins
[decorator-promise](https://www.npmjs.com/package/decorator-promise)

## Note
You need to run babel with the option 'es7.decorators' enabled.

## License
MIT © Christian Martin
