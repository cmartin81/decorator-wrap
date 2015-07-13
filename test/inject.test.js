var assert = require("assert");
var inject = require('../dist').inject;
var _ = require('lodash');

describe('Inject', function() {
    it('should add inject property on class', function () {
      var TestClass = function() {
        this.foo = 'bar'
      };
      _

      var InjectedClass = inject(['abc'])(TestClass);
      var instance = new InjectedClass();
      assert.equal(true, _.has(instance, 'abc'));
      assert.equal('abc', InjectedClass.$inject[0]);
  });
});