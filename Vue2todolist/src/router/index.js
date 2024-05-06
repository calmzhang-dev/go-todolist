import VueRouter from 'vue-router';
// 依次引入在路由中进行配置的组件；
import Container from '../pages/Container.vue'
import Login from '@/pages/Login';
import Sign from '@/pages/Sign';
import done from '@/pages/DoneThing.vue'
import allItems from '@/pages/all_Items.vue'
import myDay from '@/pages/MyDay.vue'
import importantAffairs from '@/pages/ImportantAffairs.vue'
import FourQuadrant from '@/pages/FourQuadrant.vue'
import DiscountedConsumption from '@/pages/DiscountedConsumption.vue'
import classManagement from '@/pages/classManagement.vue'
import ClassPage from '@/pages/ClassPage.vue'
import addProject from '@/pages/addProject.vue'
import allProject from '@/pages/allProject.vue'
import todoDiolog from "@/components/todoDiolog";


// vue路由在进行路径拼接的时候，会默认多出来一个/,
// 我们可以在路由配置中通过设置path:'/'来展示默认的页面
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            // 我们在路由中提供空路径能够帮助我们进行默认路由的配置
            path: '/',
            component: Container,
            children: [
                {
                    path: '', // 默认的子路由路径为空字符串
                    redirect: 'myDay' // 重定向到 myDay 组件
                },
                {
                    path: '/myDay',
                    name: "myDay",
                    component: myDay,

                },
                {
                    path: 'importantAffairs',
                    name: "importantAffairs",
                    component: importantAffairs,
                },
                {
                    path: 'done',
                    name: "done",
                    component: done,
                },
                {
                    path: 'allItems',
                    name: 'allItems',
                    component: allItems,
                },
                {
                    path: 'fourQuadrant',
                    name: 'fourQuadrant',
                    component: FourQuadrant,
                },
                {
                    path: 'discountedConsumption',
                    name: 'discountedConsumption',
                    component: DiscountedConsumption,
                },
                {
                    path: 'classManagement',
                    name: 'classManagement',
                    component: classManagement,
                },
                {
                    path: 'ClassPage',
                    name: 'ClassPage',
                    component: ClassPage,
                },
                {
                    path: 'addProject',
                    name: 'addProject',
                    component: addProject,
                },
                {
                    path: 'allProject',
                    name: 'allProject',
                    component: allProject,
                },
            ],
        },
        {
            path: '/sign',
            name: "sign",
            component: Sign,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/todoDiolog',
            name: 'todoDiolog',
            component: todoDiolog,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isLogin = to.path === '/login' || to.path === '/sign';
    if (localStorage.getItem("todo_token")) {
        next();
    } else {
        if (isLogin) {
            next();
        } else {
            next('/login');
        }
    }
});




export default router;
