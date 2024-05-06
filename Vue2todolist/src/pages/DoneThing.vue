 <template>
  <div class="doneThing">
    <h1 style="margin-top: 20px">已完成</h1>
    <todolist :originalTodos="todoList"></todolist>
  </div>
</template>

<script>
import todolist from "@/components/Todolist";
import { mapState } from "vuex";
export default {
  name: "DoneThing",
  components: { todolist },
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
      // window.location.reload()
    },
    init() {
      this.$get('/user/items').then(res => {
        this.todoList = res.data.items.filter(item => item.done === 1)
      }).catch(e => {
        this.$message.error(e)
      })
    }
  }
};
</script>


<style scoped>
.doneThing {
  margin-left: 23px;
}
</style>
