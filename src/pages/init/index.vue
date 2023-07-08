<template>
  <view class='content'>
    <image class='logo' src='/static/logo.png' />
    <view class='text-area'>
      <text class='title'>{{ title }}引导页</text>
    </view>
  </view>
</template>


<script setup lang='ts'>
import { nav } from '@/utils'

const title = ref('Hello')
onLoad(() => {
  setTimeout(() => {
    nav('switch:pages/index/index')
  }, 2000)
})
</script>

<style lang='scss'>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: #333 2px 1px;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
