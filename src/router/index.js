import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/system/User.vue'
import Menu from '../views/system/Menu.vue'
import Role from '../views/system/Role.vue'
// const Login = () => import('../views/Login.vue')
Vue.use(VueRouter)
const routes = [
  {
    path: '/person',
    name: 'Person',
    component: () => import('../views/person.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/newLogin.vue')
  },
  {
    path: '/register',
    name: "Register",
    component: () => import('../views/register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/system/users',
        name: "SysUser",
        component: User
      },
      {
        path: '/system/menu',
        name: "SysMenu",
        component: Menu,
      }, {
        path: '/system/roles',
        name: "SysRole",
        component: Role,
      },
      {
        path: '/system/userCenter',
        name: 'SysUserCenter',
        component: () => import('../views/system/userCenter.vue')
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {

  // to and from are both route objects. must call `next`.
  next()
})
export default router
