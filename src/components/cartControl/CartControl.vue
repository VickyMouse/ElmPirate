<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease" @click="removeCart" v-show="food.count > 0">
        <transition name="rotate">
          <span class="rotate ic-remove_circle_outline" v-show="food.count > 0" />
        </transition>
      </div>
    </transition>
    <transition name="opacity">
      <div class="count" v-show="food.count > 0">{{food.count}}</div>
    </transition>
    <div class="increase ic-add_circle" @click="addCart"></div>
  </div>
</template>

<script scoped>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
    // console.log(this.food);
  },
  methods: {
    addCart() {
      // console.log("addCart");
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    removeCart() {
      // console.log("removeCart");
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
@import '../../common/css/icon.css';

.cart-control {
  .decrease, .increase {
    display: inline-block;
    padding: 6px;
    vertical-align: top;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    transition: all 0.4s linear;

    &.move-enter-active, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
    }

    &.move-enter, &.move-leave-to { /* .fade-leave-active, 2.1.8 版本以下 */
      opacity: 0;
      transform: translate3d(24px, 0, 0);
    }

    .increase {
    display: inline-block;
    padding: 6px;
    vertical-align: top;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    }

    .rotate {
      display: inline-block;
      transition: all 0.4s linear;

      &.rotate-enter-active, &.rotate-leave-active {
        transform: rotateZ(180deg);
      }

      /* .fade-leave-active, 2.1.8 版本以下 */
      &.rotate-enter, &.rotate-leave-to {
        transform: rotateZ(180deg);
      }
    }
  }

  .count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
    transition: all 0.4s linear;

    &.opacity-enter-active, &.opacity-leave-active {
      opacity: 0;
    }

    &.opacity-enter, &.opacity-leave-to { /* .fade-leave-active, 2.1.8 版本以下 */
      opacity: 0;
    }
  }
}
</style>
