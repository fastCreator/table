<template>
   <div class="table-header">
          <table border="1" :width="allWidth">
            <colgroup>
                <col v-for="it in list" :width="it.width"></col>
            </colgroup>
            <tr v-for="(item ,dep) in header">
              <th v-for="i in item"  :height="rowHeight"  :colspan="i.col" :rowspan="header.length-dep-Object.keys(i.deep).length">{{i.label}}</th>
            </tr>
          </table> 
   </div>
</template>

<script>
export default {
  name: 'table-header',
  data () {
    return {
    }
  },
  props:['header','hasFixed','list','rowHeight'],
  computed:{ 
    allWidth(){
      return this.list.reduce(function(num,item){
          return  item.width -0 +num;
      },0)
    }
  }
}


</script>

<style scoped>

</style>
