function CalcFreq(str){
  var alph = new Array();
  for(i = 0; i < str.length; ++i)
    alph[str.charAt(i)] = 0;
  for(i = 0; i < str.length; ++i)
    ++alph[str.charAt(i)];
  return alph;
}

function CalcEntropy(freq){
  let n = freq.Length;
  let res = 0;
  freq.forEach(function(item, i, arr) {
    alert(item + " " + i + " " + arr );
  })
}

function logn(val, n) {
  return Math.log(val) / Math.log(n);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter question:\n', (answer) => {
  let freq = CalcFreq(answer);
  let result = 0;
  let size = 0;
  for (var key in freq){
    freq[key] /= parseFloat(answer.length);
    size++;
  }
  for (var key in freq) {
    result -= freq[key] * logn(freq[key], size);
  }
  console.log(result);
  console.log(size);
  rl.close();
});
