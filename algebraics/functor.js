'use strict';

function Functor(value) {
  this.map = (f) => new Functor(f(value));
};

module.exports = Functor;

