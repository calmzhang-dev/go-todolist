<template>
  <div class="myDay">
    <h1 style="margin-top: 20px">分类查询</h1>

    <el-tabs v-model="activeClass" @tab-click="handleChange">
      <el-tab-pane :label="item.name+''" :name="index+''" v-for="(item, index) in classDataList" :key="index"></el-tab-pane>
    </el-tabs>

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
import _ from 'loadsh'

export default {
  name: 'ClassPage',
  components: {Todolist, Footer},
  data() {
    return {
      todoList: [],
      activeClass: '0',
      classDataList: []
    }
  },
  watch: {
    activeClass(val) {
      this.init(this.classDataList[val].id)
    }
  },
  created() {
    this.initClassList().then(() => {
      this.init(_.get(this.classDataList, `[${this.activeClass}].id`, ''))
    })
  },
  methods: {
    handleChange(tab) {
    },
    refresh() {
      window.location.reload()
    },
    initClassList() {
     return this.$get('/user/collctions').then(res => {
        this.classDataList = res.data.collections || []
      })
    },
    init(activeClass) {
      this.$get('/collection/loaditems', {
        collection_id: activeClass
      }).then(res => {
        this.todoList = res.data.items
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
