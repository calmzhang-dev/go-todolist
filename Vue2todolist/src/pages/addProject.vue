<template>
  <div class="container">
    <el-button type="primary" @click="showAddDialog" style="margin-bottom: 30px">新增</el-button>
    <el-table :data="pagedData" style="width: 100%">

      <el-table-column prop="name" label="项目名称"></el-table-column>
      <el-table-column prop="description" label="项目描述"></el-table-column>
      <el-table-column prop="end_time" label="项目时间"></el-table-column>
      <el-table-column prop="" label="项目来源">
        <template slot-scope="scope">
          <el-tag v-if="userinfosObj.id === scope.row.admin_id">创建</el-tag>
          <el-tag v-else type="success">加入</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="500">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleDoSth(scope.row)">进入</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="warning" size="small" @click="handleout(scope.row)">退出</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          <el-button v-if="userinfosObj.id === scope.row.admin_id" type="primary" size="small" @click="handleAddTodo(scope.row)">添加代办</el-button>
          <el-button type="success" size="small" @click="handleDetails(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    ></el-pagination>

    <!--新增-->
    <el-dialog title="新增项目" :visible.sync="addDialogVisible" @closed="close">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="newClassForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="newClassForm.description" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item prop="date">
          <el-date-picker
              v-model="newClassForm.deadline"
              type="datetime"
              style="width: 100%;"
              placeholder="选择日期和时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog title="编辑项目" :visible.sync="addDialogVisible2" @closed="close">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="newClassForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="newClassForm.description" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item prop="date">
          <el-date-picker
              v-model="newClassForm.deadline"
              type="datetime"
              style="width: 100%;"
              placeholder="选择日期和时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEditOk">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsValid" @closed="close">

      <el-descriptions title="项目信息">
        <el-descriptions-item label="项目名称" >{{ loadsh.get(this.detailsObj, 'projects.name', '--') }}</el-descriptions-item>
        <el-descriptions-item label="项目描述" >{{ loadsh.get(this.detailsObj, 'projects.description', '--') }}</el-descriptions-item>
        <el-descriptions-item label="截止时间" >{{ loadsh.get(this.detailsObj, 'projects.end_time', '--') }}</el-descriptions-item>
        <el-descriptions-item label="密码" >{{ loadsh.get(this.detailsObj, 'projects.password', '--') }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名称" >{{ loadsh.get(this.detailsObj, 'users[0].username', '--') }}</el-descriptions-item>
<!--        <el-descriptions-item label="用户密码" >{{ loadsh.get(this.detailsObj, 'users[0].password', '&#45;&#45;') }}</el-descriptions-item>-->
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>

<!--    <todoDiolog ref="todoDiolog"></todoDiolog>-->

    <el-dialog title="添加代办事项到项目" :visible.sync="addDialogVisible3" @closed="close">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="代办事项" prop="project_id">
          <el-select v-model="newClassForm.nodeid" placeholder="请选择代办事项">
            <el-option :label="item.item_name" :value="item.id" v-for="item in todoList"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleAddToDoOk">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import todoDiolog from "@/components/todoDiolog";

export default {
  name: "classManagement",
  components: {
    todoDiolog
  },
  data() {
    return {
      classData: [],
      pagedData: [],
      addDialogVisible: false,
      addDialogVisible2: false,
      addDialogVisible3: false,
      detailsValid: false,
      detailsObj: {},
      newClassForm: {
        name: "",
        description: '',
        deadline: '',
      },
      loadsh: _,
      todoList: [],
      row3: {},
      userinfosObj: {},
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
    };
  },
  created() {
    this.init()
  },
  methods: {
    // 切换每页显示条数
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 切换每页显示条数时重置当前页数
      this.updatePagedData();
    },
    // 切换当前页数
    handleCurrentChange(page) {
      this.currentPage = page;
      this.updatePagedData();
    },
    // 更新当前页数据
    updatePagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedData = this.classData.slice(start, end);
    },
    init() {
      this.userinfosObj = JSON.parse(localStorage.getItem('userinfosObj'))

      this.$get('/project/my').then(res => {
        this.classData = res.data.projects || []
        this.total = this.classData.length; // 设置总条数
        this.updatePagedData()
      }).catch(e => {
        this.$message.error(e)
      })
      this.$get('/user/myday').then(res => {
        this.todoList = res.data.Items
      }).catch(e => {
        this.$message.error(e)
      })
    },
    showAddDialog() {
      this.addDialogVisible = true;
    },
    valid() {
      if (!this.newClassForm.name) {
        this.$message.warning('项目名称为空!')
        return true
      }
      if (!this.newClassForm.description) {
        this.$message.warning('项目描述为空!')
        return true
      }

      if (!this.newClassForm.deadline) {
        this.$message.warning('请选择时间!')
        return true
      }

      return false
    },
    // 新增
    handleAdd() {
      // 校验
      if (this.valid()) {
        return ''
      }
      // 组装数据
      let params = {
        ...this.newClassForm,
      }

      const datetime = new Date(this.newClassForm.deadline);
      params.endtime = datetime.getTime() / 1000;
      delete params.deadline

      // 新增请求
      this.$post('/project', params).then(() => {
        this.$message.success('添加成功!')
        this.init()
      }).catch(e => {
        this.$message.error(e)
      })

      this.close()
    },
    // 编辑
    handleEditOk() {
      // 校验
      if (this.valid()) {
        return ''
      }
      // 组装数据
      let params = {
        ...this.newClassForm
      }
      this.$put(`/project/${this.newClassForm.id}`, params).then(() => {
        this.$message.success('修改成功!')
        this.init()
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.handleClose()
      })
    },
    // 关闭
    close() {
      this.addDialogVisible = false;
      this.newClassForm = {
        name: "",
        description: '',
        deadline: '',
      }
      this.detailsObj = {}
      this.init()
    },
    // 编辑
    handleEdit(row) {
      this.addDialogVisible2 = true
      this.newClassForm =  Object.assign({}, this.newClassForm, row)
      this.newClassForm.deadline = row.end_time
      console.log(this.newClassForm)
    },
    // 删除分类
    handleDelete(row) {
      this.$delete('/project/'+row.id).then(() => {
        this.$message.success('删除成功!')
        this.init()
      }).catch(e => {
        this.$message.error(e)
      })
    },
    // 关闭弹窗事件
    handleClose() {
      this.addDialogVisible = false
      this.addDialogVisible2 = false
      this.addDialogVisible3 = false
      this.detailsValid = false
      this.row3 = {}

      this.newClassForm = {
        name: ""
      }
    },
    // 退出
    handleout(row) {
      this.$get('/project/quit', {
        project_id: row.id
      }).then(res => {
        this.$message.success('退出项目成功!')
        this.init()
      }).catch(e => {
        this.$message.error(e)
      })
    },
    handleDetails(row) {
      this.detailsValid = true

      this.$get('/project/info', {
        project_id: row.id
      }).then(res => {
        this.detailsObj = res.data
      }).catch(e => {
        this.$message.error(e)
      })
    },
    // 加入
    // handlein() {
    //   this.$post().then(res => {
    //     this.$message.success('加入项目成功!')
    //   }).catch(e => {
    //     this.$message.error(e)
    //   })
    // },
    handleDoSth(row) {
      // this.$refs.todoDiolog.openDialog(row.id)
      this.$router.push({
        path: '/todoDiolog',
        query: {
          projectid: row.id
        }
      })
    },
    handleAddTodo(row) {
      this.row3 = row
      this.addDialogVisible3 = true
    },
    handleAddToDoOk() {
      this.$post(`/project/${this.row3.id}/node/${this.newClassForm.nodeid}`).then(() => {
        this.$message.success('添加成功!')
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.init()
        this.handleClose()
      })
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.dialog-footer {
  text-align: center;
}
</style>
