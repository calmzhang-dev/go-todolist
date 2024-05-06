//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import todoOptions from "@/store/todoOptions";

//应用Vuex插件
Vue.use(Vuex)

// 使用modules进行分别的暴露;
export default new Vuex.Store({
    modules: {
        todolist: todoOptions,
    }
})