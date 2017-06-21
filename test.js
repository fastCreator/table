var a = [
  {
    a: 'a1',
    b: 'b1',
    c: 'c1'
  },
  {
    a: 'a1',
    b: 'b2',
    c: 'c1'
  },
  {
    a: 'a1',
    b: 'b2',
    c: 'c1'
  }
];

var list = ['a', 'b', 'c'];
function getData(data, list) {
  var b = [];
  for (let i = 0; i < data.length; i++) {
    let arr = [], nowi = data[i], prei = data[i - 1];
    for (let j = 0; j < list.length; j++) {
      let nowkey = list[j], prekey = list[j - 1];
      //1，判断上一个item 前面的list[key]是否相等
      //2，相等才判断自己key，上面item来判断,是否显示，row个数
      //和上一个相等，则删除，下面有几个相等,则添加row个数
      let count = prevEq(data, i, list, j);
      if (!parantEq(nowi, prei, list, j)) {
        arr.push({ label: nowi[nowkey], props: nowkey, row: count });
      }
    }
    b.push(arr);
  }
  return b;
}

//上一个行的list前面值是否相等
function parantEq(nowi, prei, list, index) {
  if (!prei) return false;
  for (var i = 0; i <= index; i++) {
    let key = list[i]
    if (nowi[key] !== prei[key]) return false;
  }
  return true;
}


//当上一个行相等时，判断行相等的个数
function prevEq(data, i, list, j) {
  //下面相等个数(必须list之上全部相等)
  let row = 1;
  // while (true) {
  //   let nexti = data[++index];
  //   if(!nexti){}
  // if (nexti && nowv === nexti[nowkey]) {
  //   row++;
  // } else {
  //   return row;
  // }
  //}
  let nowi = data[i];

  for (i = i + 1; i < data.length; i++) {
    for (; j >= 0; j--) {
      let key = list[j];
      if (nowi[key] !== data[i][key]) {
        return row;
      }
    }
    row++;
  }
  return row;
}
