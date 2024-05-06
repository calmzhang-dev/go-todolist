<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#9faec0" text-color="#fff"
        router>
        <el-menu-item index="/myday">
          <i class="el-icon-menu"></i>
          <span slot="title">我的一天</span>
        </el-menu-item>
        <el-menu-item index="/importantAffairs">
          <i class="el-icon-document"></i>
          <span slot="title">要事第一</span>
        </el-menu-item>
        <el-menu-item index="/done">
          <i class="el-icon-setting"></i>
          <span slot="title">已完成&nbsp;</span>
        </el-menu-item>
        <el-menu-item index="/ClassPage">
          <i class="el-icon-setting"></i>
          <span slot="title">分类查看</span>
        </el-menu-item>
        <el-menu-item index="/classManagement">
          <i class="el-icon-setting"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/addProject">
          <i class="el-icon-setting"></i>
          <span slot="title">我的项目</span>
        </el-menu-item>
        <el-menu-item index="/allProject">
          <i class="el-icon-setting"></i>
          <span slot="title">所有项目</span>
        </el-menu-item>
<!--        <el-submenu index="1">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-location"></i>-->
<!--            <span>项目分类</span>-->
<!--          </template>-->
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="/project?projectId=111111">项目1</el-menu-item>-->
<!--            <el-menu-item index="/project?projectId=222222">项目2</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--        </el-submenu>-->

        <el-menu-item index="/allItems">
          <i class="el-icon-setting"></i>
          <span slot="title">查看所有代办事项&nbsp;</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Navigation-Bar",
};
</script>

<style scoped>
.el-col-12 {
  width: 100%;
}

.el-menu-item {
  height: 80px;
  line-height: 80px;
}

/* 报错但是有效果，哈哈哈 对于element-UI中的一级嵌套，
我们不需要使用deep,可以直接通过.className的方式进行样式的修改，
但是对于二级嵌套的元素，我们需要使用/deep/或>>>深选择器来进行样式
的修改 */
.el-submenu /deep/ .el-submenu__title {
  height: 80px;
  line-height: 80px;
}
</style>

<style>
.el-aside {
  background-color: #545C64 !important;
}

.el-menu {
  border-right: 0;
}
</style>
