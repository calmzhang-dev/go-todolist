<template>
  <div>
    <div>
      <span class="el-icon-back" @click="$router.push('/addProject')"></span>
    </div>
    <el-empty v-if="todoList.length <= 0" description="无待办项"></el-empty>
    <todolist v-else :originalTodos="todoList" @refresh="refresh"></todolist>
  </div>
</template>

<script>
import Todolist from "@/components/Todolist";
import Footer from '@/components/Footer.vue'

export default {
  name: 'todoDiolog',
  components: {Todolist, Footer},
  data() {
    return {
      dialogVisible: false,
      todoList: []
    }
  },
  created() {
    const projectid = this.$route.query.projectid
    this.init(projectid)
  },
  methods: {
    openDialog(projectid) {
      this.dialogVisible = true;
      this.init(projectid)
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('close')
    },
    refresh() {
      window.location.reload()
    },
    init(projectid) {
      this.$get(`/project/${projectid}/nodes`).then(res => {
        this.todoList = res.data.nodes
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
.el-icon-back {
  font-size: 40px;
  margin-top: 20px;
  margin-left: 40px;
  cursor: pointer;
}
</style>
