"use strict";

class ClassWithoutContext {
  static func() {
    this.counter ++;
    return 'ok';
  }
}

ClassWithoutContext.counter = 0;

module.exports = ClassWithoutContext;