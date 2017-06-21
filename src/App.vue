<template>
  <div id="app">
    <img src="./assets/logo.png" @click="desf">
    <div @click="change">改值</div>
    <div style="width:500px;border: 1px solid red;height:300px;margin: auto;">
      <my-table v-if="des" :data="data" :rowHeight="30" height="400"></my-table>
    </div>

  </div>
</template>

<script>
function deepCopy(source) {
    var result={};
    for (var key in source) {
          result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
      }
      return result;
}
import myTable from './components/myTable'
import data from './data'

for(var i=0;i<1000;i++){
  data.body.push({
    date: '2016-05-01'+(i%4==2?'0':'1'),
    name: i+'王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  });
}
export default {
  name: 'app',
  data(){
    return {
      des:true,
      data:data
    }
  },
  created(){
  },
  computed:{
  },
  methods:{
    change(){
      //this.data.header =this.data.header.slice(1,2)
      //this.data.header.splice(2,1);
      //this.data.header[1].child.splice(1,1);
      this.data.header.push({ label: '再来一桶', prop: 'date',width: '120'});
    },
    desf(){
      this.des=!this.des;
    },
    // data(){
    //     return data;
    // },
    assign(){
      //return this.data;
      //  console.time('t');
      //  console.timeline('l');
      //  console.time('assign');
       let res=ObjectClone(data);
      //  console.timeEnd('assign');
      //  console.time('assign2');
      //  let res1=JSON.parse(JSON.stringify(data));
      //  console.timeEnd('assign2');
      //  console.timeEnd('t');
      //  console.timelineEnd('l')
       return data;
    }
  },
  components: {
    myTable
  }
}

function ObjectClone(obj) {
  var copy = (obj instanceof Array) ? [] : {};
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) continue;
    copy[attr] = (typeof obj[attr] == "object")?ObjectClone(obj[attr]):obj[attr];
  }
  return copy;
};

</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  margin:0;
  padding:0;
}
</style>
