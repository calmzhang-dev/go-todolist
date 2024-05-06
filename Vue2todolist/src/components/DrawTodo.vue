<template>
  <div class="form-group">
    <el-divider content-position="center">事项详情</el-divider>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="事项名称" prop="item_name">
        <el-input v-model="ruleForm.item_name"></el-input>
      </el-form-item>
      <el-form-item label="事项描述" prop="description">
        <el-input v-model="ruleForm.description" type="textarea"></el-input>
      </el-form-item>
<!--      <el-form-item label="所属项目" prop="project_id">-->
<!--        <el-select v-model="ruleForm.project_id" placeholder="请选择项目">-->
<!--          <el-option label="项目1" value="111111"></el-option>-->
<!--          <el-option label="项目2" value="222222"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="所属分类" prop="collection_id">-->
<!--        <el-select v-model="ruleForm.collection_id" placeholder="请选择分类">-->
<!--          <el-option label="分类1" value="111111"></el-option>-->
<!--          <el-option label="分类2" value="222222"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
                v-model="ruleForm.deadline"
                type="datetime"
                style="width: 100%;"
                placeholder="选择日期和时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="重要" prop="important">
        <el-switch v-model="ruleForm.important" :inactive-value="0" :active-value="1"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="center" style="margin-top: 30px;">添加到分类</el-divider>

    <el-select v-model="bottomForm.class" placeholder="请选择分类" @change="classListChange">
      <el-option :label="item.name" :value="item.id" v-for="item in classDataList" :key="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    todoObj: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      ruleForm: {
        item_name: "",
        description: "",
        project_id: "",
        collection_id: "",
        date: "",
        important: 0
      },
      bottomForm: {},
      classDataList: [],
      rules: {
        item_name: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        // description: [
        //   {required: true, message: '请输入描述', trigger: 'blur'}
        // ],
        // project_id: [
        //   {required: true, message: '请选择项目', trigger: 'change'}
        // ],
        // collection_id: [
        //   {required: true, message: '请选择分类', trigger: 'change'}
        // ],
        // date: [
        //   {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        // ],
      }
    };
  },
  methods: {
    init() {
      this.ruleForm = Object.assign({}, this.ruleForm, this.todoObj)
      this.initClassList()
    },
    initClassList() {
      this.$get('/user/collctions').then(res => {
        this.classDataList = [
          {
            id: '',
            name: '无分类'
          },
          ...res.data.collections,
        ] || []
      }).catch(e => {
        this.$message.error(e)
      })
    },
    // 切换分类
    classListChange(val) {
      this.$get('/collection/additem', {
        collection_id: val,
        item_id: this.ruleForm.id
      }).then(res => {
        this.$message.success('添加分类成功!')
      }).catch(err => {
        this.$message.error(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            ...this.ruleForm
          }
          params.item_id = params.id

          const datetime = new Date(params.deadline);
          params.deadline = datetime.getTime() / 1000;

          console.log('提交转换时间---', params.deadline)

          this.$put('/item', params).then(() => {
            this.$message.success('保存成功!')
            this.$emit('ok')
          }).catch(e => {
            this.$message.error(e)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.target {
  margin-left: 10px;
  font-size: 26px;
  vertical-align: baseline;
}

.target input {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.steps {
  margin-left: 20px;
  width: 400px;
  overflow: hidden;
}

.steps div {
  position: relative;
}

.steps input {
  margin-right: 5px;
}

.steps span {
  padding: 3px;
}

.steps .el-button.is-circle {
  position: absolute;
  right: 3px;
  top: 11px;
  padding: 6px;
}

/* ------------------------ */
.demonstration {
  margin: 0px 15px;
}

.form-group {
  padding: 40px 20px;
}

.el-drawer__header {
  align-items: center;
  color: #72767b;
  display: flex;
   margin-bottom: 0px !important;
  padding: 20px 20px 0;
}
</style>
