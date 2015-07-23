"use strict";

module.exports = function(ctx) {

  class ClassWithContext {
    static func() {
      this.counter ++;
      return 'ok';
    }
  }

  ClassWithContext.counter = 0;

  return ClassWithContext;

};
