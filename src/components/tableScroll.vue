<template>
   <div class="table-scroll" :style="{top:start+'px',height:height+'px'}" @mousedown="mousedown" @mousemove="mousemove">
      
   </div>
</template>

<script>
export default {
  name: 'table-scroll',
  data () {
    return {
      down:false
    }
  },
  created(){
     
  },
  props:['start','height'],
  computed:{ 

  },
  mounted(){
    var that =this;
    document.addEventListener('mouseup',this.up);
  },
  beforeDestroy(){
    document.removeEventListener('mouseup',this.up);
  },
  methods:{
    up(){
      this.down=false; 
    },
    mousedown(){ 
      this.down=true;
    }, 
    mousemove(){
      
    }
  }
}  

</script>

<style scoped> 
   
.table-scroll{
  position: absolute;
    right: 0;
    background: rgba(169,169,169,0.8);
    width: 10px;
    border-radius: 10px;
}
</style>
