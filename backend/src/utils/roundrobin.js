// source: Scott Sauyet https://stackoverflow.com/questions/77501958/round-robin-algorithm-behaving-strangely-in-javascript

const rotate = (n, xs) => [
  ...xs.slice(xs.length - (n % xs.length)), 
  ...xs.slice(0, xs.length - (n % xs.length))
];

const fold = xs =>
  xs.slice(0, Math.ceil(xs.length / 2)).map((x, i) => [x, xs[xs.length - i - 1]]);

const BYE = Symbol('BYE');

const roundRobin = (teams) => {

  const all = teams.length % 2 === 0 ? teams : [...teams, BYE];
  const rest = all.slice(0, -1);
  
  return rest
    .map((_, i) => rotate(i + 1, fold([...rotate(i, rest), all.at(-1)])))
    .map(round => round.filter(([a, b]) => a !== BYE && b !== BYE))
    .map((round, i) => i % 2 === 0 ? round : round.map(([a, b]) => [b, a]));
};

module.exports = roundRobin;