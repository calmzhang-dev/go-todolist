<script>
import * as echarts from "echarts";
import { mapGetters } from "vuex";

export default {
  name: "DiscountedConsumption",
  data() {
    return {
      myChart: null,
      options: [],
      value: "",
      option:{
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        // data: [],
      },
      yAxis: {
        type: "value",
        show: true,
      },
      /*    series中的第一个折线，表示自己的任务折线，
   直接根据step量和天数规划出
       */
      series: [
        {
          data: [100, 98, 70, 50, 40, 30, 0],
          type: "line",
          smooth: false,
        },
        {
          data: [100, 98, 70, 50, 40, 30, 0],
          type: "line",
          smooth: false,
        },
      ],
    },
    };
  },
  computed: {
    ...mapGetters("todolist", ["getFinishedTodos", "getStepsTodos"]),
  },
  methods: {
    getAdjustTodoArray() {
      for (let i = 0; i < this.getStepsTodos.length; i++) {
        const value = this.getStepsTodos[i].id;
        const label = this.getStepsTodos[i].todoThing.title;
        const obj = { value: value, label: label };
        this.options.push(obj);
      }
    },
    // 输入时间戳，输出格式化后的日期，例如 "10月16日"
    timestampToMonthDay(timestamp) {
      const date = new Date(timestamp);
      const month = date.getMonth() + 1; // 月份从 0 到 11，所以需要加 1
      const day = date.getDate();
      return `${month}月${day}日`;
    },
    // 输入两个时间戳，计算两个事件戳自己的差异
    getDaysDifference(timestamp1, timestamp2) {
      // 将时间戳转化为日期对象
      const date1 = new Date(timestamp1);
      const date2 = new Date(timestamp2);
      // 计算毫秒差异
      const timeDifference = date2 - date1;
      // 将毫秒差异转化为天数
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    },
    // 不改了，有毛病，有BUG.
    plotXAxis(difference) {
      for (let i = 1; i <= difference; i++) {
        this.option.xAxis.data.push(i+"")
      }
    },
  },
  watch: {
    value: {
      handler(newValue) {
        //newValue是todos的id
        this.getStepsTodos.forEach((item) => {
          if (newValue == item.id) {
            const deadlineTimestamp = item.todoThing.deadline; // 你的时间戳
            const startTimestamp = item.todoThing.startTime; // 你的时间戳
            // 将时间戳转化为日期时间"XX年XX月XX日"
            const formattedDate = this.timestampToMonthDay(deadlineTimestamp);
            // 差异
            const difference = this.getDaysDifference(
              startTimestamp,
              deadlineTimestamp
            );
            this.plotXAxis(difference)
          }
        });
      },
    },
  },
  mounted() {
    this.getAdjustTodoArray();
    // 使用 ECharts 初始化图表
    // this.myChart = echarts.init(this.$el);
    this.myChart = echarts.init(this.$el.querySelector("#echarts-chart"));
    // 配置选项
/*     const option = {
      xAxis: {
        type: "category",
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [],
      },
      yAxis: {
        type: "value",
        show: true,
      },
      /*    series中的第一个折线，表示自己的任务折线，
   直接根据step量和天数规划出
       */
/*       series: [
        {
          data: [100, 98, 70, 50, 40, 30, 0],
          type: "line",
          smooth: false,
        },
        {
          data: [100, 98, 70, 50, 40, 30, 0],
          type: "line",
          smooth: false,
        },
      ],
    }; */ 
    // 设置图表选项
    this.myChart.setOption(this.option);
    // 为确保图表在窗口大小变化时自适应，请添加以下代码：
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },

  beforeDestroy() {
    // 在组件销毁前销毁图表实例
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
};
</script>

<template>
  <div>
    <div class="selector">
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div id="echarts-chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<style scoped>
</style>