export default {

  header: [
    { label: '日期', prop: 'date',  width: '120', align: 'right', sortable: 'normal', fixed: 'left'},//normal,up,down
    {
      label: '配送信息',
      child: [
        { label: '姓名', prop: 'name' },
        {
          label: '地址', child: [
            { label: '省份', prop: 'province' },
            { label: '市区', prop: 'city' },
            { label: '地址', prop: 'address', width: '320' },
            { label: '邮编', prop: 'zip' }
          ]
        },
      ]
    },
    { label: '复制日期', prop: 'date', fixed: 'left' }
  ],
  body: [{
    date: '12016-05-01',
    name: '1王小虎1',
    province: '1上海1',
    city: '1普陀区1',
    address: '1上海市普陀区金沙江路 1518 弄1',
    zip: 12003331
  },
  {
    date: '2016-05-01',
    name: '王小虎1',
    province: '上海2',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-01',
    name: '王小虎1',
    province: '上海3',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-0n',
    name: '王小虎n',
    province: '上海n',
    city: '普陀区n',
    address: 'n上海市普陀区金沙江路 1518 弄n',
    zip: '200333n'
  }
  ]
}
