<template>
  <div id="main1"></div>
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
    console.log(this.data.map((item) => item.username));
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    // let colors = [
    //   "#5470c6",
    //   "#91cc75",
    //   "#fac858",
    //   "#ee6666",
    //   "#73c0de",
    //   "#3ba272",
    // ];
    this.myChart = echarts.init(document.getElementById("main1"));
    let option = {
      grid: {
        top: '20%',
        bottom: '12%'
      },
      legend: {
        show: true,
        // Try 'horizontal'
        // orient: 'vertical',
        orient: "horizontal",
        left: "50%",
        top: "top",
      },
      title: {
        text: "用户句子学习计划完成情况",
        textStyle: {
          fontSize:16
        }
      },
      tooltip: {},
      xAxis: {
        name: "用户名",
        type: "category",
        data: this.data.map((item) => item.username),
        axisLabel: {
          interval: 0, //代表显示所有x轴标签显示
          rotate:-20,//文字倾斜
          padding: [0, 0, 0, -10] 
        },
        offset:6//文字上下偏移
      },
      yAxis: {
        name: "句子数",
      },
      series: [
        {
          name: "计划完成数",
          type: "bar",
          data: this.data.map((item) => item.plan),
          itemStyle: {
            color: "#5470c6",
          },
        },
        {
          name: "实际完成数",
          type: "bar",
          data: this.data.map((item) => item.complete),
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
            data: this.data.map((item) => item.username),
          },
          series: [
            {
              data: this.data.map((item) => item.plan),
            },
            {
            data: this.data.map((item) => item.complete),
            },
          ],
        });
      },
    },
  },
};
</script>

<style>
#main1 {
  width: 100%;
  height: 400px;
}
</style>