require("babel/register")({
  optional: ["es7.decorators"]
});


var assert = require("assert");
var wrap = require('../dist').wrap;
var _ = require('lodash');

let testClass = null;

describe('Wrap', function() {
  it('should wrap a class', function (done) {
    let log = (callback, args, name, type) => {
      console.log('Starting  ', type, name);
      var result = callback();
      console.log('Ended: ', name);
      done()
      return result;
    };

    @wrap(log)
    class SuperNiceClass {
      constructor(){
        //some business here....
        console.log('hello from class');
        //some business here....
      }
      bar(a,b) {
        //some business here....
        console.log('hello from bar method');
        //some business here....
      }
    }

    new SuperNiceClass();
  });

  it('should wrap a method inside a class', function (done) {
    let log = (callback, args, name, type) => {
      console.log('Starting  ', type, name);
      var result = callback();
      console.log('Ended: ', name);
      done()
      return result;
    };

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
  });



});