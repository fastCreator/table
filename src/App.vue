<template>
  <div id="app">
    <img src="./assets/logo.png">
    <my-table :data="data"></my-table>
  </div>
</template>

<script>
import myTable from './components/myTable'
import data from './data'
export default {
  name: 'app',
  data(){
    return {
      data:data
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
</style>
