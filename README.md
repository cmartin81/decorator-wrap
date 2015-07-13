# decorator-surround
A angular decorator for angular dependency injection.

## Install
    $ npm install --save decorator-surround
 
## Usage
    // ES2016 style
    import {surround} from 'decorator-surround'

    // CommonJS style
    let surround = require('decorator-surround').surround;

    @surround( function(methodCallback, methodArgs, methodName) {
        console.log(arguments)
        var result = callback(methodArgs)
        console.log(blabla);
        return(result);
    })
    
    class FooBarController {
        constructor(){
            ....
            ....
            ....
        }
        
        bar() {
            this.$base64.encode('babba');
        }
    }
    

## Note
You need to run babel with the option 'es7.decorators' enabled.