'use strict';

const Peekable = require('./peekable');

function Functor(value) {
  Peekable.call(this, value);

  this.map = (f) => new Functor(f(value));
};

module.exports = Functor;

