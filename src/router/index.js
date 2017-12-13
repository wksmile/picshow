import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ReGallery from '@/components/ReGallery'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/regallery',
      name: 'ReGallery',
      component: ReGallery
    }
  ]
})
