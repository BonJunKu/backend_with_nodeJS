function Hello() {
  console.log('hello!');
}

function calculate(x, y) {
  console.log('calculating...');
  const result = x + y;
  console.log('result : ', result);
  Hello();
  return result;
}

calculate(1, 2);
