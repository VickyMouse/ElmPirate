<template>
  <div id="app">
    <div class="tab">
      <div class="tab-item">
        <router-link class="tab-link" to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link class="tab-link" to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link class="tab-link" to="/seller">商家</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .tab-item
    flex: 1
    text-align: center
    & > a // & 表示父元素，此处为 .tab-item
      display: block // block 则子元素自动撑满父元素，点击整块都有效， inline 的话，则只有点击文字才有效
      color: rgb(77, 85, 93)
      font-size: 14px
      &.active // 表示元素 active 的时候（原来是 router-link-active 已经在 new router 时将其配短了）
        color: rgb(240, 20, 20)
</style>
