<template>
  <div class="task">
    <h1 style="margin-top: 20px">所有代办事项</h1>
    <!-- 这边进行一个未完成和已完成的划分 -->
    <todolist :originalTodos="todoList"></todolist>
    <div class="footer">
      <el-footer height="80px">
        <Footer></Footer>
      </el-footer>
    </div>
  </div>
</template>

<script>
import todolist from "@/components/Todolist";
import Footer from "@/components/Footer";
export default {
  name: "all_Items",
  components: { todolist,Footer },
  data() {
    return {
      todoList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    refresh() {
      this.init()
      window.location.reload()
    },
    init() {
      this.$get('/user/items').then(res => {
        this.todoList = res.data.items
      }).catch(e => {
        this.$message.error(e)
      })
    }
  }
};
</script>

<style scoped>
.task {
  margin-left: 23px;
}
.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 85vw;
}
</style>
