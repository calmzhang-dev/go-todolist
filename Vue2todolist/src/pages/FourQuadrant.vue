<script>
//导入draggable组件
import draggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  //注册draggable组件
  components: {
    draggable,
  },
  data() {
    return {
      //定义要被拖拽对象的数组
      finishedTask: JSON.parse(localStorage.getItem("finishedTask")) || [
        { id: "1", name: "待分组任务" },
      ],
      arr1: JSON.parse(localStorage.getItem("oneArea")) || [
        { id: "1", name: "重要紧急" },
      ],
      arr2: JSON.parse(localStorage.getItem("twoArea")) || [
        { id: "1", name: "重要不紧急" },
      ],
      arr3: JSON.parse(localStorage.getItem("threeArea")) || [
        { id: "1", name: "紧急不重要" },
      ],
      arr4: JSON.parse(localStorage.getItem("fourArea")) || [
        { id: "1", name: "不重要不紧急" },
      ],
      displayObj:{
        fontSize: '25px',
        fontWeight:'500'
      },
      displayNormal:{

      }
    };
  },
  methods: {
    //move回调方法
    onMove(e, originalEvent) {
      //不允许停靠
      // if (e.relatedContext.element.id == 1) return false;
      //不允许拖拽
      if (e.draggedContext.element.id == 1) return false;
      return true;
    },
    open() {
      this.$notify({
        title: "提醒",
        message: "只有已完成的任务才可以进行复盘归类",
        offset: 100,
      });
    },
  },

  computed: {
    ...mapState("todolist", ["todos"]),
  },
  watch: {
    finishedTask: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("finishedTask", JSON.stringify(newValue));
      },
    },
    arr1: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("oneArea", JSON.stringify(newValue));
      },
    },
    arr2: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("twoArea", JSON.stringify(newValue));
      },
    },
    arr3: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("threeArea", JSON.stringify(newValue));
      },
    },
    arr4: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("fourArea", JSON.stringify(newValue));
      },
    },
  },
};
</script>

<template>
  <div>
    <!--使用draggable组件-->
    <div class="main">
      <div class="header">
        <h1 style="font-weight: 600">
          创造新大陆的,从来都不是滚滚的波涛,而是它底下的泥沙.
        </h1>
        <el-button plain @click="open"> 提示 </el-button>
      </div>
      <div class="task">
        <draggable
          v-model="finishedTask"
          group="itxst"
          ghostClass="ghost"
          chosenClass="chosen"
          filter=".forbid"
          animation="300"
          :move="onMove"
        >
          <transition-group>
            <div
              :class="item.id == '1' ? 'item forbid' : 'item'"
              :style="item.id == '1' ? displayObj : displayNormal" 
              v-for="item in finishedTask"
              :key="item.id"
            >
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="subarea">
        <div class="col">
          <draggable
            v-model="arr1"
            group="itxst"
            ghostClass="ghost"
            chosenClass="chosen"
            filter=".forbid"
            animation="300"
            :move="onMove"
          >
            <transition-group>
              <div
                :class="item.id == 1 ? 'item forbid' : 'item'"
                :style="item.id == 1 ? displayObj : displayNormal" 
                v-for="item in arr1"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </transition-group>
          </draggable>
        </div>

        <div class="col">
          <draggable
            v-model="arr2"
            group="itxst"
            ghostClass="ghost"
            chosenClass="chosen"
            filter=".forbid"
            animation="300"
            :move="onMove"
          >
            <transition-group>
              <div
                :class="item.id == 1 ? 'item forbid' : 'item'"
                :style="item.id == 1 ? displayObj : displayNormal" 
                v-for="item in arr2"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="col">
          <draggable
            v-model="arr3"
            group="itxst"
            ghostClass="ghost"
            chosenClass="chosen"
            filter=".forbid"
            animation="300"
            :move="onMove"
          >
            <transition-group>
              <div
                :class="item.id == 1 ? 'item forbid' : 'item'"
                :style="item.id == 1 ? displayObj : displayNormal" 
                v-for="item in arr3"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="col">
          <draggable
            v-model="arr4"
            group="itxst"
            ghostClass="ghost"
            chosenClass="chosen"
            filter=".forbid"
            animation="300"
            :move="onMove"
          >
            <transition-group>
              <div
                :class="item.id == 1 ? 'item forbid' : 'item'"
                :style="item.id == 1 ? displayObj : displayNormal" 
                v-for="item in arr4"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
}
.header button {
  position: absolute;
  top: -3px;
  right: 57px;
}
.main {
  margin: 10px;
}

.col,
.task {
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
  overflow: auto;
}
.task {
  margin-top: 15px;
  width: 20vw;
  height: 86.9vh;
  overflow: auto;
}
.subarea {
  margin: 10px;
  float: left;
  width: 60vw;
  height: 90vh;
  overflow: hidden;
}
.subarea .col {
  width: 28vw;
  height: 41.5vh;
  float: left;
  margin: 5px;
}

.drag {
  background-color: blue !important;
  border: solid 3px red;
}
.chosen {
  background-color: #000 !important;
  color: #fff;
}
.ghost {
  background-color: red !important;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  text-align: left;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}
.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
</style>