<template>
  <div class="ImportantAffairs">
    <h3 style="margin-top: 20px">重要的事情</h3>
    <todolist :originalTodos="todoList" @refresh="refresh"></todolist>
    <div class="footer">
      <el-footer height="80px">
        <Footer type="importantTask"></Footer>
      </el-footer>
    </div>
  </div>
</template>

<script>
import Todolist from "@/components/Todolist";
import Footer from '@/components/Footer.vue'
import {mapState} from "vuex";

export default {
  name: 'ImportantAffairs',
  components: {Todolist, Footer},
  computed: {
    ...mapState("todolist", ["todos"]),
    getTodayTodos() {
      return this.todos.filter((item) => {
        return item.important == 1
      })
    }
  },
  data() {
    return {
      todoList: []
    }
  },
  created() {
    // 查看所有代办事项
    this.$get('/user/important').then(res => {
      this.todoList = res.data.items
    }).catch(e => {
      this.$message.error(e)
    })
    // 查看所有代办事项
    // this.$get('/user/myitems').then(res => {
    //
    // }).catch(e => {
    //   this.$message.error(e)
    // })
    // 查看所有代办事项
    // this.$get('/user/nodes').then(res => {
    //
    // }).catch(e => {
    //   this.$message.error(e)
    // })
  },
  methods: {
    refresh() {
      window.location.reload()
    },
  }
}
</script>

<style>
.ImportantAffairs {
  margin-left: 23px;
}

.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 85vw;
}
</style>
