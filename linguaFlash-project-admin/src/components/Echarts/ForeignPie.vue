<template>
  <div id="main2"></div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
// import { BarChart } from "echarts/charts";
import { PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";


// echarts.use([PieChart]);
echarts.use([LegendComponent]);
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

export default {
  data() {
    return {
      myChart: null,
    };
  },
  props: ["data"],
  created() {
    // 注册必须的组件
    echarts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      PieChart,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
    ]);
  },
  mounted() {
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    // let colors = [
    //   "#5470c6",
    //   "#91cc75",
    //   "#fac858",
    //   "#ee6666",
    //   "#73c0de",
    //   "#3ba272",
    // ];
    this.myChart = echarts.init(document.getElementById("main2"));
    let option = {
      legend: {
        show: true,
        // Try 'horizontal'
        // orient: 'vertical',
        orient: "vertical",
        x: "82%",
        y: "10%",
      },
    //   title: {
    //     text: "用户句子学习计划完成情况",
    //     textStyle: {
    //       fontSize:16
    //     }
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     name: "用户名",
    //     type: "category",
    //     data: this.data.map((item) => item.username),
    //     axisLabel: {
    //       interval: 0, //代表显示所有x轴标签显示
    //     },
    //   },
    //   yAxis: {
    //     name: "句子数",
    //   },
    //   series: [
    //     {
    //       name: "计划完成数",
    //       type: "bar",
    //       data: this.data.map((item) => item.plan),
    //       itemStyle: {
    //         color: "#5470c6",
    //       },
    //       stack: "x",
    //     },
    //     {
    //       name: "实际完成数",
    //       type: "bar",
    //       data: this.data.map((item) => item.complete),
    //       itemStyle: {
    //         color: "#91cc75",
    //       },
    //       stack: "x",
    //     },
    //   ],
      title: {
        text: "用户选择外语课程偏好",
        textStyle: {
          fontSize:16
        }
      },
      series: [
      {
        type: 'pie',
        data: this.data,
        radius: '65%',
        center: ['45%', '58%'],
      }
    ]
    };
    this.myChart.setOption(option);
  },
  watch: {
    data: {
      handler() {
        this.myChart.setOption({
          series: [
            {
              data: this.data
            }
          ]
        });
      },
    },
  },
};
</script>

<style>
#main2 {
  width: 100%;
  height: 400px;
}
</style>