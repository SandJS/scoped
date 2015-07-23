"use strict";

const request = require('request');
const scoped = require('..');
const _ = require('lodash');

describe('scoped', function() {

  before(function(done) {
    let app = require('./example/with-sand/app');
    app.on('start', done);
  });

  it('should have classes attached', function() {
    let ctx = {};
    let aliases = sand.scoped.config.aliases;
    let classes = scoped.scoped(__dirname + '/example/with-sand/classes', ctx, aliases);

    classes.ClassWithoutContext.should.be.ok;
    classes.ClassWithContext.should.be.ok;
    classes.objects.Test.should.be.ok;
  });

  describe('with sand', function() {

    before(function(done) {
      request('http://127.0.0.1:9999/Index/index', {json: true}, function(err, resp, body) {
        request('http://127.0.0.1:9999/Index/index', {json: true}, function(err, resp, body) {
          done();
        });
      });
    })

    it('should have an object of classes attached to the context at the property config.scopeName', function() {
      _.isUndefined(ctx[sand.scoped.config.scopeName]).should.not.be.ok;
    });


    it('should have classes attached', function() {
      let classes = ctx[sand.scoped.config.scopeName];
      classes.ClassWithContext.should.be.ok;
      classes.ClassWithoutContext.should.be.ok;
      classes.objects.Test.should.be.ok;
    });

    it('non scoped classes should have global state', function() {
      let classes = ctx[sand.scoped.config.scopeName];
      classes.ClassWithoutContext.counter.should.be.eql(2);
    });

    it('scoped classes should have non global state that lasts only for the context', function() {
      let classes = ctx[sand.scoped.config.scopeName];
      classes.ClassWithContext.counter.should.be.eql(1);
    });

    it('should have aliased classes attached to the context', function() {
      ctx.cwoc.should.be.ok;
      ctx.cwc.should.be.ok;
      ctx.oTest.should.be.ok;
    });

    it('aliased classes should be equal to the full class reference', function() {
      let classes = ctx[sand.scoped.config.scopeName];
      ctx.cwoc.should.be.eql(classes.ClassWithoutContext);
      ctx.cwc.should.be.eql(classes.ClassWithContext);
      ctx.oTest.should.be.eql(classes.objects.Test);
    });

  });

});