import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '../components/HelloWorld'
import Test from '../pages/test'
import IndexPage from '../pages/index'
import MoviesList from '../pages/moviesList'

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
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
      meta: {
        title: 'home'
      }
    },
    {
      path: '/moviesList',
      name: 'MoviesList',
      component: MoviesList
    }
  ]
})
