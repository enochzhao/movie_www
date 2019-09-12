import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/pages/Index'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/hello_world/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'IndexPage',
      component: resolve => require(['@/pages/Index'], resolve),
      meta: {
        title: 'home'
      }
    }
  ]
})
