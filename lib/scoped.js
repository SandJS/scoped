"use strict";

const SandGrain = require('sand-grain');
const _ = require('lodash');

class Scoped extends SandGrain {

  constructor() {
    super();
    this.name = this.configName = 'scoped';
    this.defaultConfig = require('./default');
    this.version = require('../package').version;
  }

  bindToContext(ctx) {
    ctx[this.config.scopeName] = scoped(this.config.classesDir, ctx, this.config.aliases);
  }

}

module.exports = Scoped;
module.exports.scoped = scoped;

function scoped(classesDir, ctx, aliases) {

  const classes = require('require-all')({
    dirname: classesDir,
    filter: /([A-Z]\w+)\.js$/,
  });

  let loaded = recurse(classes);
  //recurseAliases(aliases, ctx, loaded);
  recurseAliases2(aliases, ctx, loaded);
  return loaded;

  function recurse(classes) {
    return _.mapValues(classes, function(cls) {
      if (!cls.name) {
        if ('object' === typeof cls) {
          return recurse(cls);
        } else {
          cls = cls(ctx);
        }
      }
      return cls;
    });
  }

  function recurseAliases2(aliases, target, source) {
    _.each(aliases, function(path, alias) {
      let segs = path.split('.');
      let currSeg = source;
      _.each(segs, function(seg) {
        currSeg = currSeg[seg];
      });
      target[alias] = currSeg;
    });
  }

  function recurseAliases(aliases, target, source) {

    return _.mapValues(aliases, function(alias, name) {
      if ('object' === typeof aliases[name]) {
        recurseAliases(aliases[name], target, source[name]);
      } else {
        target[aliases[name]] = source[name];
      }

    });

  }
};