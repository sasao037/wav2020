import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/components/pages/Auth'
import WavHome from '@/components/pages/WavHome'
//import HedgeHogs from '@/components/pages/HedgeHogs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'WavHome',
    component: WavHome
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
