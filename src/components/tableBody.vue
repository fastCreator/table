<template>
  <div class="table-body">
    <table :width="allWidth">
      <colgroup>
        <col v-for="it in list" :width="it.width"></col>
      </colgroup>
      <!--<tr v-for="item in data">
                <td v-for="it in list" :align="it.align" :title="item[it.prop]" :height="rowHeight">{{item[it.prop]}} </td>
              </tr>-->
      <tr v-for="item in t">
        <td v-for="it in item" :align="it.props.align" :title="it.label" :height="rowHeight" :rowspan="it.row">{{it.label}} </td>
      </tr>
    </table>

    <table :width="0" class="fiexed" v-if="hasFixed" :style="{top:top+'px'}">
      <colgroup>
        <col v-for="it in list" :width="it.fixed?it.width:0"></col>
      </colgroup>
      <tr v-for="item in t">
        <td v-for="it in item" :align="it.props.align" :title="it.label" :height="rowHeight" :rowspan="it.row">{{it.label}} </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'table-body',
    data() {
      return {
        //t: []
      }
    },
    props: ['data', 'list', 'hasFixed', 'rowHeight', 'top'],
    created() {
      //this.t =getData(this.data,this.list);
    },
    beforeUpdate(){
      //this.t =getData(this.data,this.list);
    },
    computed: {
      t(){
        return getData(this.data,this.list);
      },
      table() {
      },
      allWidth() {
        return this.list.reduce(function(num, item) {
          return item.width - 0 + num;
        }, 0)
      }
    },
    methods: {
    }
  }
  function getHeader(data, arr = [], i = 0) {
    if (!arr[i]) {
      arr[i] = [];
    }
    data.child.forEach(function(item) {
      arr[i].push(item);
      item.parent = data;
      item.deep = {};
      item.width = 0;
      addPDep(item, i);
      if (item.child) {
        getHeader(item, arr, ++i);
      } else {
        addPWidth(item);
      }
    });
    return arr;
    function addPDep(item, i) {
      if (item.parent) {
        item.parent.deep[i] = true;
        addPDep(item.parent, i)
      }
    }
    function addPWidth(item) {
      if (item.parent) {
        item.parent.width++;
        addPWidth(item.parent);
      }
    }
  }
  function getData(data, list) {
    var b = [];
    for (let i = 0; i < data.length; i++) {
      let arr = [],
        nowi = data[i],
        prei = data[i - 1];
      for (let j = 0; j < list.length; j++) {
        let nowkey = list[j].prop,prekey = list[j - 1];
        //1，判断上一个item 前面的list[key]是否相等
        //2，相等才判断自己key，上面item来判断,是否显示，row个数
        //和上一个相等，则删除，下面有几个相等,则添加row个数
        let count = prevEq(data, i, list, j);
        if (!parantEq(nowi, prei, list, j)) {
          arr.push({
            label: nowi[nowkey],
            props: list[j],
            row: count
          });
        }
      }
      b.push(arr);
    }
    return b;
    //上一个行的list前面值是否相等
    function parantEq(nowi, prei, list, index) {
      if (!prei) return false;
      for (var i = 0; i <= index; i++) {
        let key = list[i].prop;
        if (nowi[key] !== prei[key]) return false;
      }
      return true;
    }
    //当上一个行相等时，判断行相等的个数
    function prevEq(data, i, list, j) {
      //下面相等个数(必须list之上全部相等)
      let k = j;
      let row = 1;
      let nowi = data[i];
      for (i = i + 1; i < data.length; i++) {
        for (j=k; j >= 0; j--) {
          let key = list[j].prop;
          if (nowi[key] !== data[i][key]) {
            return row;
          }
        }
        row++;
      }
      return row;
    }
  }
</script>

<style scoped>
  .table-body {}
</style>
