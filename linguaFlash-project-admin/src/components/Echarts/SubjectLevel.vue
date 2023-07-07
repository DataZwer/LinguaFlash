<template>
  <div id="main4"></div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";

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
      BarChart,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
    ]);
  },
  mounted() {
    // console.log(this.data.map((item) => item.username));
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    // let colors = [
    //   "#5470c6",
    //   "#91cc75",
    //   "#fac858",
    //   "#ee6666",
    //   "#73c0de",
    //   "#3ba272",
    // ];
    this.myChart = echarts.init(document.getElementById("main4"));
    let option = {
      legend: {
        show: true,
        // Try 'horizontal'
        // orient: 'vertical',
        orient: "horizontal",
        left: "50%",
        top: "top",
      },
      title: {
        text: "主题课程评分和价格情况",
        textStyle: {
          fontSize:16
        }
      },
      tooltip: {},
      xAxis: {
        name: "课程名",
        type: "category",
        data: this.data.map((item) => item.name),
        axisLabel: {
          interval: 0, //代表显示所有x轴标签显示
        },
      },
      yAxis: {
        name: "分值/价格",
      },
      series: [
        {
          name: "评分",
          type: "bar",
          data: this.data.map((item) => item.level),
          itemStyle: {
            color: "#5470c6",
          },
        },
        {
          name: "价格",
          type: "bar",
          data: this.data.map((item) => item.price),
          itemStyle: {
            color: "#91cc75",
          },
        },
      ],
    };
    this.myChart.setOption(option);
  },
  watch: {
    data: {
      handler() {
        this.myChart.setOption({
          xAxis: {
            data: this.data.map((item) => item.name),
          },
          series: [
            {
              data: this.data.map((item) => item.level),
            },
            {
            data: this.data.map((item) => item.price),
            },
          ],
        });
      },
    },
  },
};
</script>

<style>
#main4 {
  width: 800px;
  height: 400px;
}
</style>