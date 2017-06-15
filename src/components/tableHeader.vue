<template>
   <div class="table-header">
          <table border="1">
            <tr v-for="(item ,dep) in header">
              <th v-for="i in item" :colspan="i.width" :rowspan="header.length-dep-Object.keys(i.deep).length">{{i.label}}</th>
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
  props:['data'],
  computed:{
    header(){
      console.log(getHeader({child:this.data,deep:{}}));
      return getHeader({child:this.data,deep:{},width:0});
    }
  },
  methods:{

  }
}

function getHeader(data,arr=[],i=0){
    console.log(data);
    if(!arr[i]){arr[i]=[];}
    data.child.forEach(function(item){
        arr[i].push(item);
        item.parent= data;
        item.deep={};
        item.width =0;
        addPDep(item,i);
        if(item.child){
          getHeader(item,arr,++i);
        }else{
          addPWidth(item);
        }
    });
    return arr;

    function addPDep(item,i){
        if(item.parent){
          item.parent.deep[i]=true;
          addPDep(item.parent,i)
        }
    }

    function addPWidth(item){
        if(item.parent){
          item.parent.width++;
          addPWidth(item.parent);
        }
    }
}


</script>

<style scoped>

</style>
