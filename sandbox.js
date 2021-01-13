let times = ['00:12', '00:9', '01:00', '06:00', '12:00', '03:00', '12:00'];
let sorted = [...times]
sorted.sort(function (a, b) {
  return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
});

console.log(times);
console.log(sorted);