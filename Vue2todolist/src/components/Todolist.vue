<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="getUnfinishedCount" name="1" v-show="!getUnfinishedTodo.length == 0">
        <todoItem
          v-for="todoObj in getUnfinishedTodo"
          :key="todoObj.id"
          :todoObj="todoObj"
          @refresh="$emit('refresh')"
        ></todoItem>
      </el-collapse-item>

      <el-collapse-item :title="getFinishedCount" name="2" v-show="!getFinishedTodo.length == 0">
        <todoItem
          v-for="todoObj in getFinishedTodo"
          :key="todoObj.id"
          :todoObj="todoObj"
          @refresh="$emit('refresh')"
        ></todoItem>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import todoItem from "@/components/TodoItem";

export default {
  name: "todo_list",
  components: { todoItem },
  props:["originalTodos"],
  data() {
    return {
      activeNames: ["1"],
    };
  },
  created() {
    console.log(this.originalTodos)
  },
  computed: {
    getUnfinishedCount(){
        const number = this.getUnfinishedTodo.length
        return "未完成  " +number
    },
    getFinishedCount(){
        const number = this.getFinishedTodo.length
        return "已完成  " +number
    },
    // 这两个方法就是负责展示已完成和未完成任务的，其他的不要管
    // 数据从传入的props中获取，不直接从vuex中进行获取
    getUnfinishedTodo() {
      return this.$props.originalTodos.filter(
        (item) => item.done == 0
      );
    },
    getFinishedTodo() {
      return this.$props.originalTodos.filter(
        (item) => item.done == 1
      );
    },
  },
};
</script>

<style scoped>
.task {
  margin-left: 23px;
}
.el-collapse {
  margin-top: 25px;
}
.el-collapse-item {
  width: 95%;
  margin-left: 20px;
}
.el-collapse /deep/.el-collapse-item__header {
  padding-left: 20px;
  font-size: 17px;
}

.el-collapse /deep/ .el-collapse-item__wrap{
  max-height: 270px ;
  overflow: auto;
}
</style>
