//* a -> a
const identity = value => value
//* (a -> a) -> a -> Boolean
const isIdentity = (f) => (value) =>
  f(value) === value;

//* (a -> b -> c) -> (b -> a -> c)
const flip = (f) =>
  (x) => (y) =>
    f(y)(x)
//* (a, b -> c) -> (a -> b -> c)
const curry2 = (f) =>
  (x) => (y) =>
    f(x, y);
//* (a -> b -> c) -> (a, b -> c)
const unCurry2 = (f) =>
  (x, y) =>
    f(x)(y);

//* (a -> b) -> [a] -> [b]
const map = (f) => (mappable) =>
  mappable.map(f);
//* (a -> a -> a) -> a -> [a] -> a
const fold = (f) => (monoid) => (foldable) =>
  foldable.reduce(unCurry2(f), monoid);
//* String -> [a] -> String
const join = (string) => (joinable) =>
  joinable.join(string);

//* (b -> c) -> (a -> b) -> (a -> c)
const compose2 = (f) => (g) =>
  (value) =>
    f(g(value));
//* (a -> b) -> (b -> c) -> (a -> c)
const pipe2 = flip(compose2); 
//* [(Any -> Any)] -> (Any -> Any)
const compose = fold(compose2)(identity)
//* [(Any -> Any)] -> (Any -> Any)
const pipe = fold(pipe2)(identity)

//* (a -> Boolean) -> (a -> b) -> (a -> b) -> (a -> b)
const branch = (test) => (ifTrue) => (ifFalse) =>
  (value) =>
    test(value)
      ? ifTrue(value)
      : ifFalse(value);

//* String -> String
const toUpperCase = (string) =>
  string.toUpperCase();
//* String -> String
const toLowerCase = (string) =>
  string.toLowerCase();
//* String -> Boolean
const isUpperCase = isIdentity(toUpperCase);
//* String -> Boolean
const isLowerCase = isIdentity(toLowerCase);
//* String -> [String]

const split = (splitString) => (string) =>
  string.split(splitString);
//* String -> [String]
const emptySplit = split('');

//* String -> String -> String
const prepend = (prefix) => (string) =>
  `${prefix}${string}`;
//* String -> String -> String
const append = flip(prepend);

//* String -> String
const prependIfUpper = 
  branch(isUpperCase)
    (pipe2(toLowerCase)(prepend('-')))
    (identity);
//* String -> String
const camelCaseToHyphenCase = 
  pipe([
    emptySplit,
    map(prependIfUpper),
    join(''),
  ]);

module.exports = {
  identity,
  isIdentity,

  flip,
  curry2,
  unCurry2,
  compose2,
  pipe2,
  compose,
  pipe,

  map,
  fold,

  branch,

  toUpperCase,
  toLowerCase,
  isUpperCase,
  isLowerCase,
  
  split,
  emptySplit,
  
  prepend,
  append,
  
  camelCaseToHyphenCase,
};
