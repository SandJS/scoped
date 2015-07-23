"use strict";

const Controller = require('sand-http').Controller;

class Index extends Controller {

  static *index() {

    this.classes.ClassWithContext.func()
    this.classes.ClassWithoutContext.func()

    global.ctx = this;

    this.status(200).append('content-type', 'application/json').send('ok');
  }

}

module.exports = Index;