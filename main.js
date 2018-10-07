var tree = new Array();
var table = new Array();

function node(inp_name, inp_fr, left, right){
	this.name = inp_name;
	this.fr = inp_fr;
  this.left = left;
  this.right = right;
}

function CalcFreq(str){
  var alph = new Array();
  for(i = 0; i < str.length; ++i)
    alph[str.charAt(i)] = 0;
  for(i = 0; i < str.length; ++i)
    ++alph[str.charAt(i)];
  return alph;
}

function build_tree(str){
  let freq = CalcFreq(str);
  tree = new Array();
  let id = 0;
  for (var key in freq){
    freq[key].id = id++;
    tree.push(new node(key, freq[key], -1, -1));
  };

  let n = tree.length;
  let l = n - 1;
  let r = n;
  for (i = 0; i < n - 1; ++i){
    let firstMin;
    let secondMin;
    if (l >= 0 && (r == tree.length || tree[l].fr < tree[r].fr))
      firstMin = l--;
    else
      firstMin = r++;
    if (l >= 0 && (r == tree.length || tree[l].fr < tree[r].fr))
      secondMin = l--;
    else
      secondMin = r++;
    tree.push(new node(tree[firstMin].name + tree[secondMin].name, tree[firstMin].fr + tree[secondMin].fr, firstMin, secondMin));
  }
}

function build_table(v, cur){
  if (tree[v].left == -1 && tree[v].right == -1)
    table[tree[v].name] = cur;
  else {
    build_table(tree[v].left, cur + '0');
    build_table(tree[v].right, cur + '1');
  }
}

function code(str){
  let res = "";
  for (i = 0; i < str.length; ++i)
    res += table[str[i]];
  return res;
}

function decode(str){
  let res = "";
  let root = tree.length - 1;
  let v = root;
  for (i = 0; i < str.length; ++i)
    if (str[i] == '0'){
      if (tree[v].left == -1){
        res += tree[v].name;
        v = tree[root].left;
      } else {
        v = tree[v].left;
      }
    } else {
      if (tree[v].right == -1){
        res += tree[v].name;
        v = tree[root].right;
      } else {
        v = tree[v].right;
      } 
    }
  return res + tree[v].name;
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Enter text for build tree: ', (answer) => {
  build_tree(answer);
  console.log("Your tree: ");
  console.log(tree);
  build_table(tree.length - 1, '');
  console.log(table);  
  rl.question('Enter string for encode: ', (answer) => {
    console.log(code(answer));
    rl.question('Enter string for decode: ', (answer) => {
      console.log(decode(answer));
      rl.close();
    }); 
  });
});

