function sum_ary(ary) {
  let total = ary.reduce((sum, cur) => {
    return sum + cur;
  });
  return total;
}
console.log(sum_ary([1, 5, 3, 2]));

function sum_n(n) {
  return (n * (n + 1)) / 2;
}
console.log(sum_n(5));
