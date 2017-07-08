<template>
<div id="main" style="width: 800px;height:600px;"></div>
</template>

<script>
import ajax from 'src/ajax/ajax.js'
import mapData from 'src/china.js'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入地图
require('echarts');
export default {
  data () {
    return {
      data: [],
      formData: {
        '北京':{},
        '天津':{},
        '上海':{},
        '重庆':{},
        '河北':{},
        '河南':{},
        '云南':{},
        '辽宁':{},
        '黑龙江':{},
        '湖南':{},
        '安徽':{},
        '山东':{},
        '新疆':{},
        '江苏':{},
        '浙江':{},
        '江西':{},
        '湖北':{},
        '广西':{},
        '甘肃':{},
        '山西':{},
        '内蒙古':{},
        '陕西':{},
        '吉林':{},
        '福建':{},
        '贵州':{},
        '广东':{},
        '青海':{},
        '西藏':{},
        '四川':{},
        '宁夏':{},
        '海南':{},
        '台湾':{},
        '香港':{},
        '澳门':{}
      }
    }
  },
  watch: {
   
  },
  methods:{
     loadMap(data,formData) {
      let sum = null;
      for(let province in formData) {
        for(let city in formData[province]) {
          if(formData[province][city]["sum"]) {
            sum = sum + formData[province][city]["sum"];
          }
        }
      }

      let provinceConut = {};
      for(let province in formData) {
        let count = null;
        for(let city in formData[province]) {
          count = count + formData[province][city]["sum"];
        }
        provinceConut[province] = count / 1;
      }

      function turnData(name) {
        let msg = "";
        let provinceName = "";
        if(formData[name]) {
          for(var province in formData) {
            if (province === name) {
              for (var city in formData[province]) {
               let num = formData[province][city]["sum"];
               msg = "<p>" + msg + "\n" + city + "：" + num + "\n" + "</p>";
              }
            }
          }
          return  name + "：" + provinceConut[name] + msg;
        }
        else
        {
          return "暂无数据";
        }
      }

      // 基于准备好的dom，初始化echarts实例
      // $.get('../../../static/map_data/china.json', function (chinaJson) {debugger
        var chinaJson = mapData;
        echarts.registerMap('china', chinaJson);
        var myChart = echarts.init(document.getElementById('main'));
          // 绘制图表
        myChart.setOption({
              title: {
                  text: '人数统计',
                  subtext: '总人数',
                  left: 'center'
              },
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data:['age']
              },
              visualMap: {
                  min: 0,
                  max: sum,
                  left: 'left',
                  top: 'bottom',
                  text: ['柱比例',''],           // 文本，默认为数值文本
                  calculable: true
              },
              toolbox: {
                  show: true,
                  orient: 'vertical',
                  left: 'right',
                  top: 'center',
                  feature: {
                      dataView: {readOnly: false},
                      restore: {},
                      saveAsImage: {}
                  }
              },
              series: [
                  {
                      name: "age",
                      type: 'map',
                      mapType: 'china',
                      roam: true,
                      label: {
                          normal: {
                              show: true
                          },
                          emphasis: {
                              show: true
                          }
                      },
                      selectedMode: "single",
                      tooltip: {
                        formatter: function (params, ticket, callback) {
                            $.get('detail?name=' + params.name, function (content) {
                                // callback(ticket, toHTML(content));
                               
                            });
                            let displayData = turnData(params.name);
                            return displayData;//悬浮窗内容
                        }
                      },
                       data:[
                          {name: '北京',value: provinceConut['北京'] / 1},
                          {name: '天津',value: provinceConut['天津'] / 1 },
                          {name: '上海',value: provinceConut['上海'] / 1 },
                          {name: '重庆',value: provinceConut['重庆'] / 1 },
                          {name: '河北',value: provinceConut['河北'] / 1 },
                          {name: '河南',value: provinceConut['河南'] / 1 },
                          {name: '云南',value: provinceConut['云南'] / 1 },
                          {name: '辽宁',value: provinceConut['辽宁'] / 1 },
                          {name: '黑龙江',value: provinceConut['黑龙江'] / 1 },
                          {name: '湖南',value: provinceConut['湖南'] / 1 },
                          {name: '安徽',value: provinceConut['安徽'] / 1 },
                          {name: '山东',value: provinceConut['山东'] / 1 },
                          {name: '新疆',value: provinceConut['新疆'] / 1 },
                          {name: '江苏',value: provinceConut['江苏'] / 1 },
                          {name: '浙江',value: provinceConut['浙江'] / 1 },
                          {name: '江西',value: provinceConut['江西'] / 1 },
                          {name: '湖北',value: provinceConut['湖北'] / 1 },
                          {name: '广西',value: provinceConut['广西'] / 1 },
                          {name: '甘肃',value: provinceConut['甘肃'] / 1 },
                          {name: '山西',value: provinceConut['山西'] / 1 },
                          {name: '内蒙古',value: provinceConut['内蒙古'] / 1 },
                          {name: '陕西',value: provinceConut['陕西'] / 1 },
                          {name: '吉林',value: provinceConut['吉林'] / 1 },
                          {name: '福建',value: provinceConut['福建'] / 1 },
                          {name: '贵州',value: provinceConut['贵州'] / 1 },
                          {name: '广东',value: provinceConut['广东'] / 1 },
                          {name: '青海',value: provinceConut['青海'] / 1 },
                          {name: '西藏',value: provinceConut['西藏'] / 1 },
                          {name: '四川',value: provinceConut['四川'] / 1 },
                          {name: '宁夏',value: provinceConut['宁夏'] / 1 },
                          {name: '海南',value: provinceConut['海南'] / 1 },
                          {name: '台湾',value: provinceConut['台湾'] / 1 },
                          {name: '香港',value: provinceConut['香港'] / 1 },
                          {name: '澳门',value: provinceConut['澳门'] / 1 }
                      ]
                  }
              ]
          });
      // });
    },

    getData() {
      ajax.producerCount().done((data)=>{
              this.data = data.data;
              for (let pAndc in data.data) {
                let pAndcs = pAndc.split(",");
                if (pAndcs[0].substr(pAndcs[0].length-1,pAndcs[0].length) === "省" || pAndcs[0].substr(pAndcs[0].length-1,pAndcs[0].length) === "市") {
                  pAndcs[0] = pAndcs[0].substr(0,pAndcs[0].length-1);
                }
                var provinceBuf = {};
                let cityBuf = {};
                let ageBuf = {};
                let sumBuf = null;
                for (let sum in data.data[pAndc].age) {
                  sumBuf = data.data[pAndc].age[sum] + sumBuf;
                }
                ageBuf["sum"] = sumBuf;
                cityBuf[pAndcs[1]] = ageBuf;
                provinceBuf[pAndcs[0]] = cityBuf;
                for (let province in this.formData) {
                  if(provinceBuf[province]){
                    this.formData[province] = provinceBuf[province];
                  }
                }
              };
              this.loadMap(this.data,this.formData);
          });
      }

  },

  beforeCreate(){},

  created(){},

  mounted(){
    this.getData();
  },

  beforeDestroy() {},
}
</script>

<style scoped>

</style>
