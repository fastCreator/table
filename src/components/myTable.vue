<template>
   <div class="mytable">
          <table-header :data="data.header"></table-header>
   </div>
</template>

<script>
import tableHeader from './tableHeader'

export default {
  name: 'my-table',
  components:{
    tableHeader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['data']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
