<template> 
   <div class="table-body"> 
          <table border="1" width="100%">
            <colgroup>
              <col v-for="it in list" :width="it.width" ></col>
            </colgroup>
            <tr v-for="item in data">
              <td v-for="it in list" :title="item[it.prop]" :height="rowHeight">{{item[it.prop]}} </td>
            </tr>
          </table>
   </div>
</template>

<script>
export default {
  name: 'table-body',
  data () {
    return {
    }
  },
  created(){ 
  },
  props:['data','list','hasFixed','rowHeight'],
  computed:{
    table(){
       console.log(this.data);
    },
    allWidth(){
      return this.list.reduce(function(num,item){
          return  item.width -0 +num;
      },0)
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
.table-body{  
}
</style>
