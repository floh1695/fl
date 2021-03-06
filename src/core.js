//* Number -> Number
const negative = (number) =>
  number * (-1);

//* (a -> b -> c) -> (b -> a -> c)
const flip = (f) => 
  (x) => (y) =>
    f(y)(x);

//* (a -> b -> c) -> (b -> c)
const pass = (f) => f(undefined);

//* (b -> c) -> (a -> b) -> (a -> c)
const compose = (f) => (g) => 
  (x) =>
    f(g(x));

//* (a -> b) -> (b -> c) -> (a -> c)
const pipe = flip(compose);

//* Int -> Int -> [a] -> [a]
//* Origin: Array.prototype.slice
const slice = (start) => (finish) => (list) =>
  list.slice(start, finish);

//* Int -> [a] -> [a]
const sliceFrom = compose(pass)(flip)(slice);
  //:                  compose (pass) (flip) (slice)
  //:                  pass (flip (slice))
  //:                  flip (slice) (undefined)
  //: start =>         flip (slice) (undefined) (start)
  //: start =>         slice (start) (undefined)
  //: start => list => slice (start) (undefined) (list)

//* Int -> [a] -> [a]
const sliceTo = (finish) => 
  slice(0)(finish);

//* [a] -> a
const head = (list) =>
  list[0];

//* [a] -> [a]
const tail = sliceFrom(1);

//* Boolean -> a -> a -> a
const condition = (test) => (ifTrue) => (ifFalse) =>
  test
    ? ifTrue
    : ifFalse;

//* () -> a
const wake = (f) => f()

//* [a] -> Int
//* Origin: Array.prototype.length
const length = (list) =>
  list.length;

//* [a] -> Boolean
const empty = (list) =>
  length(list) !== 0;

//* (a -> b -> b) -> b -> [a] -> b
const foldr = (f) => (accumulator) => (list) => {
  const next = () =>
    foldr(f) 
      (f(head(list))
        (accumulator)) 
      (tail(list))
  const finish = () => accumulator;
 
  const lazyResult = 
    condition(empty(list))
      (next)
      (finish);

  return wake(lazyResult)
};

//* [a] -> [a] -> [a]
const concat = (left) => (right) =>
  left.concat(right);

//* (a -> b) -> [a] -> [b]
const map = (f) => (list) =>
  foldr (compose(flip(concat))(f))
    //:                         compose (flip (concat)) (f) 
    //: (x) =>                  compose (flip (concat)) (f) (x) 
    //: (x) =>                  flip (concat) (f (x)) 
    //: (x) => (accumulator) => flip (concat) (f (x)) (accumulator) 
    //: (x) => (accumulator) => concat (accumulator) (f (x)) 
    ([])
    (list);

module.exports = {
  negative,
  flip,
  pass,
  slice,
  sliceFrom,
  sliceTo,
  head,
  tail,
  condition,
  foldr,
  map,
};
