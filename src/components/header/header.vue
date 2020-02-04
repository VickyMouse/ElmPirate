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
      <div v-if="seller.supports" class="supports-count">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="ic-keyboard_arrow_right" />
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title" />
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="ic-keyboard_arrow_right" />
    </div>
    <div class="bg-blur">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {}
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
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
}
</style>
