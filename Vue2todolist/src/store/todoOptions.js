
import { nanoid } from "nanoid";
import { watch } from "vue";
export default {
    namespaced: true,
    state: {
        // 增、删、改、查
        todos: JSON.parse(localStorage.getItem("todos")) || []
    },

    // 当state中的需要加工可以使用getters并不对数据进行修改
    getters: {
        getFinishedTodos(state) {
            return state.todos.filter((item) => item.isFinished)
        },
        getStepsTodos(state) {
            return state.todos.filter((item) => item.todoThing.steps.length != 0 && item.todoThing.deadline != null)
        }
    },

    actions: {
        add(context, value) {
            context.commit("ADD", value)
        }
    },
    mutations: {
        // 这个改一下，不在这里封装大量的逻辑
        ADD: function (state, value) {
            state.todos.push(value)
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        ADDSTEPS: function (state, value) {
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    item.todoThing.steps.push(value.todoThing)
                    return
                }
            })
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        EDIT: function (state, value) {
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    item.isEdit = true;
                    return
                }
            });
        },
        // 修改内容
        ALTER: function (state, value) {
            state.todos.forEach(item => {
                if (value.id == item.id) {
                    item.isEdit = value.isEdit;
                    item.todoThing.title = value.todoThing.title;
                    return
                }
            });
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        DELETE: function (state, value) {
            const todoArray = state.todos
            for (var i = 0; i < todoArray.length; i++) {
                if (todoArray[i].id == value.id) {
                    todoArray.splice(i, 1)
                }
            }
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        DELETEDSTEPS: function (state, value) {
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    item.todoThing.steps = value.todoThing.steps
                    return
                }
            });
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        // 这里进行本地finishedTask的存储，把方法转移过来；
        ALTERCHECKBOX: function (state, value) {
            // 点击事件有毛病，不看了，周一再看》》》》
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    item.isFinished = !(item.isFinished)
                    return
                }
            });
            window.localStorage.setItem('todos', JSON.stringify(state.todos))

            // 这里进行完成完成任务情况的本地存储；

            //不从本地从获取，从程序进行添加，要求：待分配任务必须是已完成任务并且不能和四个区域中的任务重复
            const finishedThing = [{ id: "1", name: "待分组任务" }];
            const arr1 = JSON.parse(localStorage.getItem("oneArea")) || [{ id: "1", name: "重要紧急" }]
            const arr2 = JSON.parse(localStorage.getItem("twoArea")) || [{ id: "1", name: "重要不紧急" }]
            const arr3 = JSON.parse(localStorage.getItem("threeArea")) || [{ id: "1", name: "紧急不重要" }]
            const arr4 = JSON.parse(localStorage.getItem("fourArea")) || [{ id: "1", name: "不紧急不重要" }]
            const newArr = [].concat(arr1, arr2, ...arr3, ...arr4)//后面两个带不带...都一样
            // console.log("组合后的newArr", newArr);
            // 使用splice进行数组的删除,要注意前一次删除对后续for循环的影响。
            // 解决方法：从大到小进行循环，而不是从小到大进行循环
            for (let i = newArr.length - 1; i >= 0; i--) {
                if (newArr[i].id == '1') {
                    console.log("splice执行一次");
                    newArr.splice(i, 1);
                }
            }
            // console.log("剔除完后的newArr", newArr);

            /* 
            进行四个区域中id与已完成任务中id的对比
            保证待分配任务中与四个区域的任务不出现重复的现象。
            */
            const finishedTask = state.todos.filter((item) => item.isFinished)
            console.log("用于四任务对比的数据", finishedTask);
            let flag = true;
            for (let i = 0; i < finishedTask.length; i++) {
                for (let k = 0; k < newArr.length; k++) {
                    if (finishedTask[i].id == newArr[k].id) {
                        console.log(finishedTask[i].id,newArr[k].id);
                        flag = false;
                        break;
                    }
                }
                console.log("flag",flag);
                if (flag) {
                    console.log(finishedTask[i].todoThing.title);
                    const id = finishedTask[i].id;
                    const title = finishedTask[i].todoThing.title;
                    const taskObj = { id: id, name: title };
                    finishedThing.push(taskObj);
                }
                flag = true
            }
            // console.log("同四个区域对比后留下来的不重复数据", finishedThing);
            localStorage.setItem("finishedTask", JSON.stringify(finishedThing));

            /* 四个区域中的数据,只有已完成的任务，才在四个区域中进行显示，如果之前是已完成，
            // 并且添加到了某一个区域，但是由于用户的操作，变成了未完成，要进行删除的操作 */
            // const finishedTask = state.todos.filter((item) => item.isFinished)

            //这里对四个象限中的数据进行更改
            // const newFinishedThing = finishedThing;
            const newArr1 = arr1;
            const newArr2 = arr2;
            const newArr3 = arr3;
            const newArr4 = arr4;

            // 对oneArea进行删除操作,id相同的留下来，不同的就删除；
            for (let i = arr1.length - 1; i >= 0; i--) {
                if (arr1[i].id == "1") {
                    continue;
                }
                let flag = true
                for (let index = 0; index < finishedTask.length; index++) {
                    if (arr1[i].id == finishedTask[index].id) {
                        flag = false
                        break;
                    }
                }
                if (flag) {
                    if (newArr1[i].id != '1') {
                        newArr1.splice(i, 1);
                    }
                }
            }
            localStorage.setItem("oneArea", JSON.stringify(newArr1))

            //对区域2进行处理
            for (let i = arr2.length - 1; i >= 0; i--) {
                if (arr2[i].id == "1") {
                    continue;
                }
                let flag = true
                for (let index = 0; index < finishedTask.length; index++) {
                    if (arr2[i].id == finishedTask[index].id) {
                        flag = false
                        break;
                    }
                }
                if (flag) {
                    if (newArr2[i].id != '1') {
                        newArr2.splice(i, 1);
                    }
                }
            }
            localStorage.setItem("twoArea", JSON.stringify(newArr2))

            //对区域3进行处理
            for (let i = arr3.length - 1; i >= 0; i--) {
                if (arr3[i].id == "1") {
                    continue;
                }
                let flag = true
                for (let index = 0; index < finishedTask.length; index++) {
                    if (arr3[i].id == finishedTask[index].id) {
                        flag = false
                        break;
                    }
                }
                if (flag) {
                    if (newArr3[i].id != '1') {
                        newArr3.splice(i, 1);
                    }
                }
            }
            localStorage.setItem("threeArea", JSON.stringify(newArr3))

            //对区域2进行处理
            for (let i = arr4.length - 1; i >= 0; i--) {
                if (arr4[i].id == "1") {
                    continue;
                }
                let flag = true
                for (let index = 0; index < finishedTask.length; index++) {
                    if (arr4[i].id == finishedTask[index].id) {
                        flag = false
                        break;
                    }
                }
                if (flag) {
                    if (newArr4[i].id != '1') {
                        newArr4.splice(i, 1);
                    }
                }
            }
            localStorage.setItem("fourArea", JSON.stringify(newArr4))
        },
        ALTERCHESTEPSCKBOX: function (state, value) {
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    // 组件内加工好，这边直接进行更换：
                    item.todoThing.steps = value.todoThing.steps
                    return
                }
            });
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        CHANGEWEIGHT: function (state, value) {
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    item.isImportance = !(item.isImportance)
                    return
                }
            });
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        SETDEADLINE: function (state, value) {
            state.todos.forEach(item => {
                if (item.id == value.id) {
                    item.todoThing.deadline = value.todoThing.deadline
                    return
                }
            })
            window.localStorage.setItem('todos', JSON.stringify(state.todos))
        },




    },

}
