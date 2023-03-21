import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

//后台
const Manage = () => import('../views/Manage.vue');
const Home = () => import('../views/Home.vue');
const User = () => import('../views/User.vue');
const Goods = () => import('../views/Goods.vue');
const Orders = () => import('../views/Orders.vue');
const Person = () => import('../views/Person.vue');
const Password = () => import('../views/Password.vue');
const Lun = () => import('../views/Lun.vue');
const OnShelves =() => import('../views/OnShelves.vue');
const UpShelves =() => import('../views/UpShelves.vue');
const CompletedOrder =() => import('../views/CompletedOrder.vue');
const NoSend =() => import('../views/NoSend.vue');
const NoReceived =() => import('../views/NoReceived.vue');
const Unpaid =() => import('../views/Unpaid.vue');


//前台
const Front = () => import('../views/front/Front.vue');
const FrontHome = () => import('../views/front/Home.vue');
const FrontPassword = () => import('../views/front/Password.vue');
const FrontPerson = () => import('../views/front/Person.vue');
const FrontDetail = () => import('../views/front/Detail.vue');
const FrontCart = () => import('../views/front/Cart.vue');
const FrontOrders = () => import('../views/front/Orders.vue');
const FrontCollection = () => import('../views/front/Collection');
const FrontNoSend =() => import('../views/front/NoSend.vue');
const FrontNoReceived =() => import('../views/front/NoReceived.vue');
const FrontNoComment =() => import('../views/front/NoComment.vue');

const About = () => import('../views/About.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const NO = () => import('../views/404.vue');


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Manage,
        redirect: "/front/home",
        children: [
            {path: 'home', name: '首页', component: Home},
            {path: 'user', name: '用户管理', component: User},
            {path: 'goods', name: '商品管理', component: Goods},
            {path: 'orders', name: '订单管理', component: Orders},
            {path: 'person', name: '个人信息', component: Person},
            {path: 'password', name: '修改密码', component: Password},
            {path: 'lun', name: '轮播图管理', component: Lun},
            {path: 'onshelves', name: '已上架商品', component: OnShelves},
            {path: 'upshelves', name: '已下架商品', component: UpShelves},
            {path: 'completedorder', name: '已完成订单', component: CompletedOrder},
            {path: 'nosend', name: '待发货订单', component: NoSend},
            {path: 'noreceived', name: '待收货订单', component: NoReceived},
            {path: 'unpaid', name: '待收货订单', component: Unpaid},
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/404',
        name: '404',
        component: NO
    },
    {
        path: '/front',
        name: 'Front',
        component: Front,
        children: [
            {
                path: 'home',
                name: 'FrontHome',
                component: FrontHome
            },
            {
                path: 'password',
                name: 'Password',
                component: FrontPassword
            },
            {
                path: 'person',
                name: 'Person',
                component: FrontPerson
            },
            {
                path: 'detail',
                name: 'Detail',
                component: FrontDetail
            },
            {
                path: 'cart',
                name: 'Cart',
                component: FrontCart
            },
            {
                path: 'orders',
                name: 'Orders',
                component: FrontOrders
            },
            {
                path: 'collection',
                name: 'FrontCollection',
                component: FrontCollection
            },
            {
                path: 'noSend',
                name: 'FrontNoSend',
                component: FrontNoSend
            },
            {
                path: 'noReceived',
                name: 'FrontNoReceived',
                component: FrontNoReceived
            },
            {
                path: 'noComment',
                name: 'FrontNoComment',
                component: FrontNoComment
            },

        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 重置路由
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        routes
    })
}


// 路由守卫
router.beforeEach((to, from, next) => {
    let user = localStorage.getItem('user')       //获取点击登录按钮时所设置的 localStorage

    if (to.path === '/home') {        //如果想要跳转home或页面必须判断有没有localStorage
        if (user) {              //如果有localStorage
            next();				//跳转
        } else {
            alert('您还没有登录，请先登录账户');   //没有就先登录
            next('/login')							//还在登录页
        }
    }
    if (to.path === '/login') {				//如果跳转到了登录页面必须清空localStorage，否则在地址栏输入路径还是会跳转
        localStorage.clear();				//清空localStorage
    }
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新
    next()  // 放行路由
})

export default router
