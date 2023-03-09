import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    redirect: "/front/home",
    children: [
      { path: 'home', name: '首页', component: () => import('../views/Home.vue')},
      { path: 'user', name: '用户管理', component: () => import('../views/User.vue')},
      { path: 'goods', name: '商品管理', component: () => import('../views/Goods.vue')},
      { path: 'orders', name: '订单管理', component: () => import('../views/Orders.vue')},
      { path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
      { path: 'password', name: '修改密码', component: () => import('../views/Password.vue')},
      { path: 'lun', name: '轮播图管理', component: () => import('../views/Lun.vue')},
      { path: 'file', name: '文件管理', component: () => import('../views/File.vue')}
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/front/Front.vue'),
    children: [
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('../views/front/Home.vue')
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import('../views/front/Password.vue')
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('../views/front/Person.vue')
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('../views/front/Detail.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/front/Cart.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/front/Orders.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  next()  // 放行路由
})

export default router
