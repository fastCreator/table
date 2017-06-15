<template>
   <div class="table-header">
          <table border="1">
            <tr v-for="(item ,dep) in header">
              <th v-for="i in item" :colspan=" 1" :rowspan=" 1">{{i.label}}</th>
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
      console.log(getHeader({child:this.data}));
      return [];
       //return getHeader({child:this.data});
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
        if(!item.deep){item.deep=[];};
        if(item.child){
          getHeader(item,arr,++i);
        }
    });
    return arr;
}


</script>

<style scoped>

</style>
