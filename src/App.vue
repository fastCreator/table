<template>
  <div id="app">
    <img src="./assets/logo.png" @click="desf">
    <div style="width:500px;border: 1px solid red;height:300px;">
      <my-table v-if="des" :data="assign()" rowHeight="30"></my-table> 
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
export default {
  name: 'app',
  data(){
    return {
      des:true,
      data:Object.freeze(data)
    }
  },
  created(){
    console.log(this);
  },
  computed:{
    // data(){
    //   return data
    // }
  },
  methods:{
    desf(){
      console.log(this);
      this.des=!this.des;
    },
    assign(){
       return JSON.parse(JSON.stringify(data)); 
    }
  },
  components: {
    myTable
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
