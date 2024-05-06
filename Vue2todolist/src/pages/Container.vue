<template>
  <!-- <el-container>
    <el-aside width="15vw">
      <Navigation />
    </el-aside>
    <div class="main">
        <router-view></router-view>
    </div>
  </el-container> -->

  <el-container>
    <el-aside width="15.4vw">
      <Navigation />
    </el-aside>
    <el-container>
      <el-header style="display: flex; justify-content: flex-end; align-items: center;">

        <el-button
            @click="aiClick"
            type="primary" icon="el-icon-search"
            style="margin-right: 20px;"
            :loading="loading"
        >我的一天Ai</el-button>

        <el-button
            @click="aiClick2"
            type="primary" icon="el-icon-search"
            style="margin-right: 50px;"
            :loading="loading"
        >重要事项Ai</el-button>

        <el-dropdown>
          <el-avatar :size="size" :src="avatarSrc" style="margin-right: 50px;">
          </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="primary" @click="updatePassword">修改密码</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="primary" @click="updateInfo" style="margin-top: 10px;">修改信息</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="danger" @click="lyout" style="margin-top: 10px;">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div style="margin-right: 50px;">{{ name }}</div>

      </el-header>
      <div class="main">
        <router-view></router-view>
      </div>
    </el-container>


    <el-dialog title="修改信息" :visible.sync="addDialogVisible" @close="handleClose">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="用户名" prop="username" required>
          <el-input v-model="newClassForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar" required>
          <el-input v-model="newClassForm.avatar" placeholder="请输入头像链接"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="bio" required>
          <el-input v-model="newClassForm.bio" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link" required>
          <el-input v-model="newClassForm.link" placeholder="请输入链接"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleupdateAdd">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="addDialogVisible2" @close="handleClose">
      <el-form :model="newClassForm" label-width="80px">
        <el-form-item label="旧密码" prop="password">
          <el-input v-model="newClassForm.prepwd" placeholder="请输入新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="confirmPassword">
          <el-input v-model="newClassForm.newpwd" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handlePassword">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="ai" :visible.sync="addDialogVisible3" @close="handleClose">
      <vue-markdown :source="renderedMarkdown" :breaks="true" :typographer="true" :linkify="true" :highlight="false"></vue-markdown>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
import { nanoid } from "nanoid";
import Footer from "../components/Footer.vue";
import Navigation from "../components/Navigation.vue";
import VueMarkdown from 'vue-markdown';

export default {
  name: "Container-View",
  components: {
    Navigation,
    Footer,
    VueMarkdown
  },
  data() {
    return {
      loading: false,
      name: localStorage.getItem("userinfos") || "--",
      password: this.$store.state.password,
      id: nanoid(),
      size: 'large',
      avatarSrc: require('../assets/logo.png'),
      addDialogVisible: false,
      addDialogVisible2: false,
      addDialogVisible3: false,
      newClassForm: {},
      renderedMarkdown: ''
    };
  },
  computed: {
    computedId() {
      return nanoid();
    },
  },
  created() {
    // this.getUserInfo()
  },
  methods: {
    showMenu() {
      this.$refs.menu.$refs.popper.style.display = 'block';
    },
    hideMenu() {
      this.$refs.menu.$refs.popper.style.display = 'none';
    },
    getUserInfo() {
      return this.$get('/user/info').then(res => {
       this.newClassForm = Object.assign({}, this.newClassForm, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改信息
    updateInfo() {
      this.getUserInfo().then(() => {
        this.addDialogVisible = true
      })
    },
    // 修改密码
    updatePassword() {
      this.addDialogVisible2 = true
    },
    lyout() {
      localStorage.removeItem("userinfos");
      localStorage.removeItem("todo_token");
      localStorage.removeItem("userinfosObj");
      window.location.reload();
    },
    // 关闭弹窗事件
    handleClose() {
      this.addDialogVisible = false
      this.addDialogVisible2 = false
      this.addDialogVisible3 = false
      this.loading = false

      this.newClassForm = {}
    },
    handlePassword() {
      if (!this.newClassForm.prepwd || !this.newClassForm.newpwd) {
        this.$message.error('密码不能为空');
        return;
      }
      // if (this.newClassForm.prepwd !== this.newClassForm.newpwd) {
      //   this.$message.error('两次输入的密码不一致');
      //   return;
      // }
      this.$post('/user/updatepwd', this.newClassForm).then(() => {
        this.$message.success('修改密码成功, 请重新登录!')
        this.lyout()
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.handleClose()
      })
      // 发送请求的逻辑
    },
    handleupdateAdd() {
      this.$post('/user/info', this.newClassForm).then(() => {
        this.$message.success('修改信息成功!')
        setTimeout(() => {
          this.lyout()
        }, 500)
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.handleClose()
      })
    },
    aiClick() {
      this.loading = true
      this.$get('/user/myday/ai').then(res => {
        this.addDialogVisible3 = true
        this.renderedMarkdown = res.data.msg
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.loading = false
      })
    },
    aiClick2() {
      this.loading = true
      this.$get('/user/important/ai').then(res => {
        this.addDialogVisible3 = true
        this.renderedMarkdown = res.data.msg
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.loading = false
      })
    }
  },
};
</script>

<style scoped>
>>>.el-dropdown {
  display: flex !important;
}

.main {
  height: calc(100vh - 60px);
  width: 84vw;
  background-color: #E9EEF3;
  position: relative;
  overflow: hidden;
}

.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 85vw;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #9faec0 !important;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<style>
.el-header {
  position: relative;
}

.el-popover {
  bottom: -200px;
  right: 80px;
}
.main[data-v-dfae9be6] {
  overflow-y: auto;
}
</style>
