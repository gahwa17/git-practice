// fib: 0 1 1 2 3 5 8 13 21 34 55

// recursive
function fib_r(n) {
  if (n == 0) return 0;
  else if (n == 1) return 1;
  return fib_r(n - 1) + fib_r(n - 2);
}
console.log(fib_r(0));
console.log(fib_r(1));
console.log(fib_r(5));
console.log(fib_r(10));

// iterative
function fib_i(n) {
  if (n == 1) return 1;

  let n_1 = 0;
  let n_2 = 1;
  let ans = 0;

  for (let i = n; i > 1; i--) {
    ans = n_1 + n_2;
    n_1 = n_2;
    n_2 = ans;
  }

  return ans;
}

console.log(fib_i(0));
console.log(fib_i(1));
console.log(fib_i(5));
console.log(fib_i(10));
