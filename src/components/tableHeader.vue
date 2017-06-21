<template>
   <div class="table-header">
          <table :width="allWidth" ref="table">
            <colgroup>
                <col v-for="it in list" :width="it.width" :height="rowHeight"></col>
            </colgroup>
            <tr v-for="(item ,dep) in header">
              <th v-for="i in item"  :align="i.align" :height="rowHeight"  :colspan="i.col" :rowspan="header.length-dep-Object.keys(i.deep).length">{{i.label}}</th>
            </tr>
          </table>
          <table class="fiexed" v-if="hasFixed" width="0" :height="(height&&height+'px')">
            <colgroup>
                <col v-for="it in list" :width="it.fixed?it.width:0"></col>
            </colgroup>
            <tr v-for="(item ,dep) in header" :style="">
              <th v-for="i in item" :class="[i.sortable,{hidden:!i.fixed},{sort:i.sortable}]" @click="headClick(i)" :align="i.align" :colspan="i.col" :rowspan="header.length-dep-Object.keys(i.deep).length">{{i.label}}</th>
            </tr>
          </table>
   </div>
</template>

<script>
export default {
  name: 'table-header',
  data () {
    return {
       height:null,
    }
  },
  mounted(){
    this.height =this.$refs.table.offsetHeight;
  },
  props:['header','hasFixed','list','rowHeight'],
  computed:{
    allWidth(){
      return this.list.reduce(function(num,item){
          return  item.width -0 +num;
      },0)
    }
  },
  methods:{
    headClick(item){
        var arr =['normal','down','up'];
        if(item.sortable){
           //Vue.set()
           item.sortable=arr[(arr.indexOf(item.sortable)+1)%3];
        }
    }
  }
}


</script>

<style scoped>
.normal:after{
  content:"\E610";
}
.up:after{
  content:"\E607";
}
.down:after{
  content:"\E604";
}
.sort{
  font-family: element-icons!important;
}
</style>
