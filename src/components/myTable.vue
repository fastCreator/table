<template>
    <div  class="mytable"  :style="{width:(this.width+'px'),height:this.height+'px'}">
      <div class="wrap">
              <table-header ref="header" :hasFixed="hasFixed" :header="header[0]" :list="header[1]" :rowHeight="rowHeight"></table-header>
              <table-body  ref="body" :top="headerHeight" :data="body" :list="header[1]" :hasFixed="hasFixed" :rowHeight="rowHeight"></table-body>
      </div>
      <table-scroll v-if="scrollShow" @scrollEvent="scrollEvent" :scrollTop="headerHeight" :scrollHeight="scrollHeight" :rowHeight="rowHeight+1" :row="row"></table-scroll>
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
      dataStart:0,
      bodyEl:null
    }
  },
  props:{
    data:{},
    width:{},
    height:{
      default:300,
      type: Number
    },
    rowHeight:{
      default:30,
      type: Number
    },
    defaultCellWidth:{
      default:100,
      type: Number
    }
  },
  computed:{
    dataCopy(){
      return ObjectClone(this.data)
    },
    header(){
        var arr = setFixed(this.dataCopy.header);
        this.hasFixed = arr[1]
        return getHeader(this.defaultCellWidth,{child:arr[0],deep:{},width:0});
    },
    headerHeight(){
        return this.header[0].length*this.rowHeight+this.header[0].length-1;
    },
    bodyHeight(){
        return this.height - this.headerHeight;
    },
    row(){
        return Math.floor(this.bodyHeight/this.rowHeight);
    },
    body(){
      return JSON.parse(JSON.stringify(this.dataCopy.body.slice(this.dataStart,this.dataStart+this.row)));
    },
    scrollHeight(){
      return this.dataCopy.body.length*this.rowHeight+this.dataCopy.body.length-1
    },
    scrollShow(){
      return this.bodyHeight<this.scrollHeight;
    }
  },
  methods:{
    scrollEvent(index){
      this.dataStart = index;
    }
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

function getHeader(defaultCellWidth,data,head=[],i=0,list=[]){
    if(!head[i]){head[i]=[];}
    data.child.forEach(function(item){
        head[i].push(item);
        item.parent= data;
        item.deep={};
        item.col =0;
        addPDep(item,i);
        if(item.child){
          getHeader(defaultCellWidth,item,head,i+1,list);
        }else{
          addPCol(item);
          if(!item.width){
              item.width=defaultCellWidth
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
    .mytable{
      overflow:hidden;
      position:relative;
    }
    .mytable .wrap{
      height:100%;
      overflow-x:auto;
      overflow-y:hidden;
    }
   .mytable td,.mytable th{
     box-sizing: border-box;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     padding:0 18px;
   }
   .mytable table{
     table-layout: fixed;
     border-collapse:collapse;
     border:1px solid #ccc;
   }
   .mytable table,.mytable table td,.mytable table th{
     border:1px solid #ccc;
     background:#fff;
   }
   .mytable .fiexed{
     box-shadow: 1px 0px 10px #ccc;
   }
.mytable .fiexed{
  position:absolute;
  top:0;
  left:0;
}
.mytable .hidden{
  display:none;
}
</style>
