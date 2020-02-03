import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'components/goods/Goods';
import Seller from 'components/seller/Seller';
import Ratings from 'components/ratings/Ratings';

import 'common/stylus/index.styl';

Vue.use(Router); // 引入 vue-router

export default new Router({
  linkActiveClass: 'active', // 原来点击 a 标签自动加上的 class 太长啦，缩短一下
  mode: 'history', // 默认为 HASH 模式，会在 url 后面加上 #
  routes: [{
    path: '/',
    name: 'index',
    redirect: '/goods' // 默认打开商品页
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: Ratings
  }]
});
