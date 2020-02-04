<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}} / {{seller.deliveryTime}} 分钟送达</div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="ic-keyboard_arrow_right" />
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title" />
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="ic-keyboard_arrow_right" />
    </div>
    <div class="bg-blur">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-content">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score" />
            </div>
            <div class="title">
              <div class="line" />
              <div class="text">优惠信息</div>
              <div class="line" />
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" :key="index" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]" />
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line" />
              <div class="text">商家公告</div>
              <div class="line" />
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <div class="ic-close" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script scoped>
import Star from 'components/star/Star';

export default {
  components: {
    Star
  },
  props: {
    seller: {}
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
@import '../../common/css/icon.css';

.header {
  position: relative;
  color: #ffffff;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden; // 超出部分隐藏（blur 效果不会到 tab 中）

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      margin-left: 16px;

      .title {
        margin: 2px 0 8px 0;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .supports {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-right: 4px;
          background-size: 12px 12px;
          backgrount-repeat: no-repeat;

          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }

          &.invoice {
            bg-image('invoice_1');
          }

          &.special {
            bg-image('special_1');
          }
        }

        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }

    .supports-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        font-size: 10px;
      }

      .ic-keyboard_arrow_right {
        line-height: 24px; // 通用的样式里，把 line-height 设成了 1，要竖直方向居中对齐，必须写标注的真实尺寸
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 10px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      font-size: 10px;
      margin: 0 4px;
    }

    .ic-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      top: 8px;
      font-size: 10px;
    }
  }

  .bg-blur {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px); // 模糊效果
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100; // 浮层
    width: 100%; // 全屏，宽高和屏幕一致
    height: 100%;
    overflow: auto; // 不能用 hidden，hidden 的话，内容超出屏幕就不能滚动了
    background: rgba(7, 17, 27, 0.8);
    transition: all 0.5s;
    backdrop-filter: blur(10px); // 模糊透出来的下方页面：只有在 iOS 上才起效！！

    &.fade-enter-active, &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }

    &.fade-enter, &.fade-leave-to { /* .fade-leave-active, 2.1.8 版本以下 */
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }

    .detail-wrapper {
      min-height: 100%; // wrapper 撑满屏幕，即使内容很少
      width: 100%;

      .detail-content {
        margin-top: 64px;
        padding-bottom: 64px;

        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }

        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        .supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
          }

          &:last-child {
            margin-bottom: 0;
          }

          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 16px;
            background-size: 16px 16px;
            background-repeat: no-repeat;

            &.decrease {
              bg-image('decrease_2');
            }

            &.discount {
              bg-image('discount_2');
            }

            &.guarantee {
              bg-image('guarantee_2');
            }

            &.invoice {
              bg-image('invoice_2');
            }

            &.special {
              bg-image('special_2');
            }
          }

          .text {
            line-height: 16px;
            font-size: 12px;
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;

          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }

    .detail-close {
      position: relative; // 相对于（全屏的） wrapper
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto; // top 往上提，进入屏幕区域
      clear: both; // 清除左右两边浮动
      font-size: 32px;
    }
  }
}
</style>
