<template>
  <div class="container">
    <el-button type="primary" @click="showAddDialog" style="margin-bottom: 30px">新增</el-button>
    <el-table :data="classData" style="width: 100%">
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增-->
    <el-dialog title="新增分类" :visible.sync="addDialogVisible" @closed="close">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="newClassForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog title="编辑分类" :visible.sync="addDialogVisible2" @closed="close">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="newClassForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEditOk">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "classManagement",
  data() {
    return {
      classData: [],
      addDialogVisible: false,
      addDialogVisible2: false,
      newClassForm: {
        name: "",
      }
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$get('/user/collctions').then(res => {
        this.classData = res.data.collections || []
      }).catch(e => {
        this.$message.error(e)
      })
    },
    showAddDialog() {
      this.addDialogVisible = true;
    },
    valid() {
      if (!this.newClassForm.name) {
        this.$message.warning('分类名称为空')
        return true
      } else {
        return false
      }
    },
    // 新增
    handleAdd() {
      // 校验
      if (this.valid()) {
        return ''
      }
      // 组装数据
      let params = {
        name: this.newClassForm.name,
      }
      // 新增请求
      this.$post('/collection/create', params).then(res => {
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
        name: this.newClassForm.name,
      }
      this.$post('/collection/create', params).then(res => {
        this.$message.success('添加成功!')
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
      this.newClassForm.name = "";
      // this.newClassForm.icon = "";
    },
    // 编辑
    handleEdit(row) {
      this.addDialogVisible2 = true
      this.newClassForm.name = row.name
      this.newClassForm.collection_id = row.id
    },
    // 删除分类
    handleDelete(row) {
      this.$get('/collection/delete', {
        collection_id: row.id
      }).then(() => {
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

      this.newClassForm = {
        name: ""
      }
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
