<script>
import { mapState, mapMutations } from "vuex";
mapState;
export default {
  name: "DrawFooter",
  props: ["todoObj"],
  data() {
    return {
      inputvalue: "",
    };
  },
  methods: {
    ...mapMutations({ ADDSTEPS: "todolist/ADDSTEPS" }), //需要更改，向step中进行添加
    add() {
      if (!this.inputvalue.trim()) {
        alert("输入不能为空");
      } else {
        // todoObj，设计一个轻的todoObj，里面放置一些操作的数据
        const lightTodoObj = {
          id: this.todoObj.id,
          todoThing: {
            stepTitle: this.inputvalue,
            stepIsFinished: false,
            stepFinishedTime:null
          },
        };
        this.ADDSTEPS(lightTodoObj);
        this.inputvalue=null
      }
    },
  },
};
</script>

<template>
  <div class="inputBox">
    <el-input
      ref="inputValue"
      placeholder="步骤拆分"
      v-model="inputvalue"
      maxlength="13"
      show-word-limit
      @change="add(todoObj)"
    >
    </el-input>
  </div>
</template>

<style scoped>
.inputBox {
  margin: 10px 15px;
}
.inputBox input {
  width: 75%;
  height: 45px;
  font-size: 20px;
  border: 1px solid;
  border-radius: 10px;
  padding: 0px 30px;
  margin-top: 20px;
}
</style>