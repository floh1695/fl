const { Functor, } = require('./algebraics');

(() => {
  const addValue = 1;
  const add = x => x + addValue;

  const multiplyValue = 2;
  const multiply = x => x * multiplyValue;

  const initial = 1;
  const result = multiply(add(initial));

  const functor = new Functor(initial);
  const functorResult = functor
    .map(x => x + 1)
    .map(x => x * 2)
    .peek();

  const testPassed = result === functorResult;

  console.log(testPassed);
})();

console.log('Hello world');
