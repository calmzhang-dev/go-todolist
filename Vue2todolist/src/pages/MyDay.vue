<template>
  <div class="myDay">
    <h1 style="margin-top: 20px">我的一天</h1>
    <todolist :originalTodos="todoList" @refresh="refresh"></todolist>
    <div class="footer">
      <el-footer height="80px">
        <Footer type="todayTask" @ok="init"></Footer>
      </el-footer>
    </div>
  </div>
</template>

<script>
import Todolist from "@/components/Todolist";
import Footer from '@/components/Footer.vue'
import {mapState} from "vuex";

export default {
  name: 'MyDay',
  components: {Todolist, Footer},
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
      window.location.reload()
    },
    init() {
      this.$get('/user/myday').then(res => {
        this.todoList = res.data.Items
        this.$forceUpdate()
      }).catch(e => {
        this.$message.error(e)
      })
    }
  }
}
</script>

<style>
.myDay {
  margin-left: 23px;
}

.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 85vw;
}
</style>
