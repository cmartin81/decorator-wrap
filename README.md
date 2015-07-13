# decorator-wrap
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
Make a function that have 4 parameters:
paremeter | description
--- | --- 
callback | The actual method/class. ** remeber to invoke it and return the value **
args | The arguments passed into the method/class
name | The method name of the method/class that is invoked
type| The object type where the decorator is placed (class or function)

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
            //some business here.... 
        }
        @wrap(log)
        bar(a,b) {
            //some business here.... 
        }
    }
    

## Note
You need to run babel with the option 'es7.decorators' enabled.