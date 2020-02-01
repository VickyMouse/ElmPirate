import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history', // 默认为 HASH 模式，会在 url 后面加上 #
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }]
})
