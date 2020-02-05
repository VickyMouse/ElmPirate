<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <!-- <li v-for="(item, index) in goods" :key="index">
          <span class="text">
            <span class="icon" v-show="item.type > 0"></span>
            {{item.name}}
          </span>
        </li> -->
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script scoped>
import axios from 'axios';

const ERR_OK = 0;

export default {
  props: {
    seller: {}
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    axios
      .get('/api/goods')
      .then(res => {
        if (res.status === 200) {
          console.log('/api/goods: ' + res.data.errno);
          if (res.data.errno === ERR_OK) {
            this.goods = res.data.data;
            console.log(this.goods);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// @import '../../common/stylus/mixin.styl';
// @import '../../common/css/icon.css';

// .goods {
//   display: flex;
//   position: absolute; // 父元素是 App.vue
//   top: 174px;
//   bottom: 46px; // 购物车的高度
//   width: 100%;
//   overflow: hidden;

//   .menu-wrapper {
//     flex: 0 0 80px;
//     width: 80px; // 不写 width 的话，在 android 浏览器上会有问题
//     background: #f3f5f7;
//   }

//   .foods-wrapper {
//     flex: 1;
//   }
// }
</style>
