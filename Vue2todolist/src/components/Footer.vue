<template>
  <div class="inputBox">
    <input placeholder="请输入内容,按Enter进行任务的添加" v-model="input" ref="inputValue" @keyup.enter="add"/>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
// import { nanoid } from "nanoid";
export default {
  name: "Container-Footer",
  props: ["type"], //todayTask,importantTask,task
  data() {
    return {
      input: "",
      typeObj: {
        'importantTask': {
          important: 1
        },
        'todayTask': {
          myDay: 1
        },
        'project': {
          project_id: '',
          node: '1'
        }
      }
    };
  },
  methods: {
    // ...mapMutations({ ADD: "todolist/ADD" }),
    add() {
      if (!this.$refs.inputValue.value.trim()) {
        alert("输入不能为空");
      } else {
        // 获取当前时间的毫秒级Unix时间戳
        const unixTimestampMillis = Date.now();

        // 将毫秒级Unix时间戳转换为秒级Unix时间戳（去除毫秒部分）
        const unixTimestampSeconds = Math.floor(unixTimestampMillis / 1000);

        console.log(unixTimestampMillis); // 毫秒级Unix时间戳
        console.log(unixTimestampSeconds); // 秒级Unix时间戳

        let obj = {
          item_name: this.$refs.inputValue.value,
          deadline: unixTimestampSeconds,
          ...this.typeObj[this.type]
        }
        if (this.type === 'project') {
          obj.project_id = this.$route.query.projectId || null
        }
        // 添加接口
        this.$post('/item', obj).then(res => {
          this.$message.success('添加成功!')
          this.$emit('ok')
        }).catch(err => {
          this.$message.error(err)
        }).finally(() => {
          this.$nextTick(function () {
            this.$refs.inputValue.value = "";
          });
        })

        // const todoObj = {
        //   id: nanoid(),
        //   todoThing: {
        //     title: this.$refs.inputValue.value,
        //     steps: [],//数组对象，有每一个对象有两个参数：stepIsFinished,stepTitle
        //     startTime: Date.now(),
        //     deadline: null
        //   },
        //   isFinished: false,
        //   isTodayTask: false,
        //   isImportance: false,
        //   isEdit: false,
        // };
        // if (this.type != undefined) {
        //   if (this.type == "todayTask") {
        //     todoObj.isTodayTask = true;
        //   } else if (this.type == "importantTask") {
        //     todoObj.isImportance = true;
        //   }
        // }

        // this.ADD(todoObj);
        // this.$nextTick(function () {
        //   this.$refs.inputValue.value = "";
        // });
      }
    },
  },
};
</script>

<style scoped>
.inputBox {
  width: 100%;
  position: relative;
  display: inline-block;
}

.inputBox i {
  position: absolute;
  top: 64%;
  right: 50px;
  transform: translateY(-50%);
  font-size: 35px;
  color: #fff;
  cursor: pointer;
}

.el-picker {
  position: absolute;
  top: -100%;
  right: 50px;
  transform: translateY(-50%);
  font-size: 35px;
  color: #fff;
  cursor: pointer;
}

.inputBox {
  margin-top: 10px;
}

.inputBox input {
  width: 95%;
  height: 45px;
  font-size: 20px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0px 30px;
  margin-top: 20px;
  color: #fff;
  background-color: #29292996;
  box-shadow: 0px 2px 4px rgba(41, 41, 41, 0.5);
}

/* 设置占位符文本的颜色为灰色 */
input::placeholder {
  color: #fff;
}

.inputBox button {
  height: 47px;
  width: 50px;
  border: 1px solid;
  border-left: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

input,
button {
  float: left;
}
</style>
