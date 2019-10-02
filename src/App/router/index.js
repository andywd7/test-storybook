import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/App/views/Home'
import About from '@/App/views/About'

Vue.use(Router)

// Routes
export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    }
  ]
})
