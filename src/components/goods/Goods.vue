<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          :class="{'current' : currentIndex === index}"
          @click="selectMenu(index)"
        >
          <span class="text border-1px">
            <SupportsIcon class="icon" :type="item.type" :size="3" />
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(cate, index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{cate.name}}</h1>
          <ul>
            <li v-for="(food, i) in cate.foods" :key="i" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{food.sellCount}} 份</span>
                  <span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"/>
  </div>
</template>

<script scoped>
import axios from 'axios';
import SupportsIcon from 'components/supportsIcon/SupportsIcon';
import Shopcart from 'components/shopcart/Shopcart';
import BScroll from 'better-scroll';

const ERR_OK = 0;

export default {
  props: {
    seller: {}
  },
  components: {
    SupportsIcon,
    Shopcart
  },
  data() {
    return {
      goods: [],
      heightList: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heightList.length - 1; i++) {
        let heightStart = this.heightList[i];
        let heightEnd = this.heightList[i + 1];
        if (this.scrollY >= heightStart && this.scrollY < heightEnd) {
          // console.log('currentIndex: ' + i);
          return i;
        }
      }
      // console.log('currentIndex: ' + 0);
      return 0;
    }
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
            /* 这里虽然更新了数据，但是 Vue 是异步更新 DOM，此时 DOM 还没有更新，
             * 此时初始化 better-scroll 的话，计算出来的高度是有问题的，
             * 要等 DOM 更新完毕，再初始化 better-scroll！
             */
            this.$nextTick(() => {
              // 此时才能拿到正确的高度
              this._initBScroll();
              this._calculateHeight();
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    selectMenu(index) {
      // console.log('Menu selected: ' + index);
      let foodList = this.foodsWrapper.querySelectorAll('.food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initBScroll() {
      this.menuWrapper = document.querySelector('.menu-wrapper');
      this.menuScroll = new BScroll(this.menuWrapper, {
        click: true // 禁掉默认的点击事件
      });
      this.foodsWrapper = document.querySelector('.foods-wrapper');
      this.foodsScroll = new BScroll(this.foodsWrapper, {
        probeType: 3 // 表示滚动的时候，实时监听滚动的位置
      });

      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      // 使用原生 DOM 的一些方法获取高度
      let foodList = this.foodsWrapper.querySelectorAll('.food-list-hook');
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.heightList.push(height);
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
@import '../../common/css/icon.css';

.goods {
  display: flex;
  position: absolute; // 父元素是 App.vue
  top: 174px;
  bottom: 46px; // 购物车的高度
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px; // 不写 width 的话，在 android 浏览器上会有问题
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      font-size: 0;
      border-1px-bottom(rgba(7, 17, 27, 0.1));

      &.current {
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background: #fff;
        border-none();

        .text {
          font-weight: 700;
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;

        .icon {
          margin-right: 2px;
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px-bottom(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }

        .extra {
          line-height: 10px;
          font-size: 10px;

          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
            font-weight: 700;
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>
