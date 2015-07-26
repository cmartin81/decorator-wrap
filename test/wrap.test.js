
var assert = require("assert");
var wrap = require('../dist/index.min.js').wrap;

describe('Wrap', function() {
  it('should wrap a class', function (done) {
    var log = (callback, args, name, type) => {
      console.log('Starting  ', type, name);
      var result = callback();
      console.log('Ended: ', name);
      done();
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
    var log = (callback, args, name, type) => {
      console.log('Starting  ', type, name);
      var result = callback();
      console.log('Ended: ', name);
      done();
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
      }
    }
    new SuperNiceClass().bar(1,2);
  });

  it('should change input arguments inside a method', function () {
    var add5ToInput = (callback, args, name, type) => {
      args[0] += 5;
      var result = callback();
      return result;
    };

    class SuperNiceClass {
      constructor(){
        this.result = 0;
      }
      @wrap(add5ToInput)
      add(a) {
        this.result += a;
      }
    }
    let instance = new SuperNiceClass();
    instance.add(10);
    assert.equal(instance.result, 15);
  });

  it('should change output from a output', function () {
    var prefixOutputWith = (prefixString) => {
        return (callback, args, name, type) => {
        var result = callback();
        return prefixString + result;
      };
    };

    class SuperNiceClass {
      @wrap(prefixOutputWith('Hello '))
      message() {
        return "world";
      }
    }
    let instance = new SuperNiceClass();
    assert.equal(instance.message(), 'Hello world');
  });

  it('should skip calling a method ', function () {
    var skipMethodIf = (condition) => {
      return (callback, args, name, type) => {
        if (condition){
          return;
        } else {
          return callback();
        }
      };
    };

    class SuperNiceClass {
      @wrap(skipMethodIf(true))
      methodShouldBeSkipped() {
        assert(false);
      }

      @wrap(skipMethodIf(false))
      methodShouldRun() {
        assert(true);
      }

    }
    let instance = new SuperNiceClass();
    instance.methodShouldBeSkipped();
    instance.methodShouldRun()
  });

});