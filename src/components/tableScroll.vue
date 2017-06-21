<template>
    <div class="table-scroll" @mousemove="sliderShow()" :style="{height:viewHeight+'px',top:scrollTop+'px'}" >
   <div class="slider" :style="{top:top+'px',height:sliderHeight+'px',opacity: opacity}" @mousedown="mousedown">

   </div>
   </div>
</template>

<script>
export default {
  name: 'table-scroll',
  data () {
    return {
      down:0,
      top:0,
      opacity:0,
      timer:null
    }
  },
  props:['scrollTop','scrollHeight','rowHeight','row'],
  computed:{
      len(){
        return this.scrollHeight/this.rowHeight -this.row;
      },
      viewHeight(){
        return this.row*this.rowHeight+this.row-1;
      },
      moveLen(){
        return this.viewHeight - this.sliderHeight;
      },
      sliderHeight(){
        return Math.max(20,(this.viewHeight*this.viewHeight)/this.scrollHeight);
      },
      oneRowHeight(){
        return this.moveLen/this.len;
      }
  },
  watch:{
    top(n){
      this.$emit('scrollEvent',Math.round(n/this.oneRowHeight));
    }
  },
  mounted(){
    var that =this;
    document.addEventListener('mouseup',this.up);
    document.addEventListener('mousemove',this.mousemove);
    this.$parent.$el.addEventListener('mousewheel',this.scroll);
  },
  beforeDestroy(e){
    document.removeEventListener('mouseup',this.up);
    document.removeEventListener('mousemove',this.mousemove);
    this.$parent.$el.addEventListener('mousewheel',this.scroll);
  },
  methods:{
    sliderShow(){
      if(this.timer){
        clearTimeout(this.timer);
      }
      this.opacity =1;
      var that =this;
      this.timer =setTimeout(function(){
          that.opacity =0;
      },1000);
    },
    scroll(e){
        this.sliderShow();
        let y,len;
        if(e.deltaY>0){
            y=this.oneRowHeight;
        }else{
            y=-this.oneRowHeight;
        }
        len=this.top+y
        if(len>=0&&len<=this.moveLen){
             this.top += y;
        }
        // e.preventDefault();
        // e.stopPropagation();
    },
    up(){
      if(this.down){
        this.down=0;
      }
    },
    mousedown(e){
      this.down=e.clientY;
    },
    mousemove(e){
      if(this.down){
        let y = e.clientY-this.down,move=this.top+y;
        if(move>=0&&move<=this.moveLen){
            this.top = move;
        }
        if(move<0)  this.top = 0;
        if(move>this.moveLen) this.top = this.moveLen;
        this.down = e.clientY;
      }
    }
  }
}

</script>

<style scoped>
.table-scroll{
  height:100%;
  width: 10px;
  position: absolute;
  right: 0;
  top:0;
}
.table-scroll .slider{
    position: absolute;
    right: 0;
    background: rgba(79,79,79,0.8);
    width: 10px;
    border-radius: 10px;
}
.table-scroll .slider{
  transition: opacity 1s;
  -moz-transition: opacity 1s; /* Firefox 4 */
  -webkit-transition: opacity 1s; /* Safari 和 Chrome */
  -o-transition: opacity 1s; /* Opera */
}
</style>
