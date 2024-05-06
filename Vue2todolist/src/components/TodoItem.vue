<template>
  <!-- v-show="judgeFinishState" -->
  <div class="todoItem">
    <label>
      <span>{{ todoCopy.item_name }}</span>
    </label>

    <div class="operatingButton">
      <div class="circleIcon">
        <el-button type="warning" :icon="todoCopy.important ? 'el-icon-star-on' : 'el-icon-star-off'" circle
                   ref="buttonIco" @click="changeWeight()" style="    margin-left: 0;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;"></el-button>
      </div>
      <el-drawer title="编辑" :visible.sync="drawer" @open="drawerOpen" @close="drawerClose">
        <!-- 这里面可以进行其他功能的嵌套，非常不错 -->
        <DrawTodo ref="DrawTodo" @ok="drawerClose" :todoObj="todoObj"/>
      </el-drawer>
      <el-button type="success" :plain="todoObj.done == 0" @click="successButton">{{ todoObj.done == 0 ? '未完成' : '已完成' }}</el-button>
      <el-button type="primary" @click="drawer = true">编辑</el-button>
      <el-popconfirm
          title="确定删除吗？"
          @confirm="todoDeleted"
      >
        <el-button slot="reference" type="danger">删除</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import DrawTodo from "./DrawTodo.vue";

export default {
  name: "todoItem",
  components: {
    DrawTodo
  },
  props: ["todoObj"],
  data() {
    return {
      drawer: false,
      todoCopy: this.todoObj
    };
  },
  methods: {
    drawerOpen() {
      this.$nextTick(() => {
        this.$refs.DrawTodo.init()
      })
    },
    drawerClose() {
      this.drawer = false
      this.$nextTick(() => {
        this.$refs.DrawTodo.resetForm('ruleForm')
      })
      this.$emit('refresh')
    },
    todoDeleted() {
      this.$delete('/item', {
        item_id: this.todoObj.id
      }).then(() => {
        this.$message.success('删除成功!')
        this.$emit('refresh')
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    changeWeight() {
      let params = {
        ...this.todoObj
      }
      params.item_id = params.id
      params.important = params.important ? 0 : 1
      const datetime = new Date(params.deadline);
      params.deadline = datetime.getTime() / 1000;
      this.$put('/item', params).then(() => {
        this.$emit('refresh')
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    successButton() {
      let params = {
        item_id: this.todoObj.id
      }

      const url = this.todoObj.done == 1 ? '/item/setundone' : '/item/setdone'

      this.$post(url, params).then(() => {
        this.$message.success('已完成事项: '+ this.todoObj.item_name)
        this.$emit('refresh')
      }).catch((e) => {
        this.$message.error(e)
      })
    }
  },
};
</script>

<style scoped>
.todoItem {
  position: relative;
  width: 95%;
  height: 50px;
  line-height: 50px;
  background-color: #FFFFFF;
  margin: 10px 20px;
  padding: 0px 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.todoItem label {
  display: flex;
  align-items: center;
}

.todoItem .checkBox {
  float: left;
  margin-right: 15px;
  width: 25px;
  height: 20px;
}

.operatingButton {
  float: left;
  position: absolute;
  top: -2px;
  right: 7px;
  margin-left: 15px;
  display: flex;
  align-items: center;
}

.alterBox {
  /* position: absolute;
  top: 0px; */
  float: left;
  font-size: 20px;
  height: 40px;
  line-height: 45px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

/* ----------Element-UI-------------------- */
.el-button {
  padding: 12px 15px;
  margin-left: 15px;
}

.circleIcon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 0px 0px;
}

.circleIcon /deep/ .el-icon-star-on,
.circleIcon /deep/ .el-icon-star-off {
  font-size: 20px;
}
</style>

<style>
.el-popover {
  height: 70px;
}
</style>
