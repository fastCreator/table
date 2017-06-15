<template>
    <div  class="mytable"  :style="{width:this.width||'100%',height:this.height||'100%'}">
      <div class="mytable" :style="{width:this.width||'100%',height:this.height||'100%'}">
              <table-header :header="header[0]" :list="header[1]" :rowHeight="rowHeight"></table-header>
              <table-body v-if="row" :data="body" :list="header[1]" :hasFixed="hasFixed" :rowHeight="rowHeight"></table-body> 
      </div> 
      <table-scroll :start="scrollStart" :height="scrollHeight"></table-scroll>
   </div>
</template>

<script>
import tableHeader from './tableHeader'
import tableBody from './tableBody'
import tableScroll from './tableScroll'
export default {
  name: 'my-table',
  components:{
    tableHeader,
    tableBody,
    tableScroll
  },
  data () {
    return {
      hasFixed: false,
      row:0,
      bodyHeight:0,
      scrollStart:0,
      scrollHeight:0
      }
  },
  props:{
    data:{},
    width:{},
    height:{}, 
    rowHeight:{
      default:30
    }  
  },
  computed:{ 
    header(){ 
        var arr = setFixed(this.data.header); 
        this.hasFixed = arr[1]
        return getHeader({child:arr[0],deep:{},width:0});
    },
    body(){
      var start =0;
      return this.data.body.slice(start,this.row);
    }
  },
  mounted(){
    this.bodyHeight = this.$el.offsetHeight - this.$children[0].$el.offsetHeight; 
    this.scrollStart = this.$children[0].$el.offsetHeight;
    this.scrollHeight = this.bodyHeight/(this.data.body.length*this.rowHeight)*this.bodyHeight; 
    this.row =  Math.round(this.bodyHeight/this.rowHeight); 
  }
}

function setFixed(data){ 
   var left=[],right=[],hasFixed=false;
   data.forEach(function(item,i){
        if(item.fixed||item.fixed==='left'){
            data.splice(i,1);
            left.push(item);
        }
        if(item.fixed==='right'){
            data.splice(i,1);
            right.push(item);
        }
   });
   if(left.length||right.length){
     hasFixed=true;
   }
   return [[].concat(left,data,right),hasFixed];
}

function getHeader(data,head=[],i=0,list=[]){ 
    if(!head[i]){head[i]=[];}
    data.child.forEach(function(item){
        head[i].push(item);
        item.parent= data;
        item.deep={};
        item.col =0;
        addPDep(item,i);
        if(item.child){
          getHeader(item,head,i+1,list);
        }else{
          addPCol(item); 
          if(!item.width){
              item.width='80'
          }  
          list.push(item);
        }
    });
    return [head,list];

    function addPDep(item,i){
        if(item.parent){
          item.parent.deep[i]=true;
          addPDep(item.parent,i)
        }
    }

    function addPCol(item){
        if(item.parent){
          item.parent.col++;
          addPCol(item.parent);
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mytable{
      overflow-x:auto;
      overflow-y:hidden;
      position:relative;
    }
   .mytable td,.mytable th{
     box-sizing: border-box;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
   .mytable table{
     table-layout: fixed;
   } 

</style>
