import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddHouse from '../views/AddHouse.vue'
import Map from '../components/HereMap.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    props: true
  },
  {
    path: '/add-house',
    name: 'add-house',
    component: AddHouse
  },
  {
    path: '/search-all',
    name: 'search-all',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
