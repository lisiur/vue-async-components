<template>
  <async-wrapper :promise="promise" :min-last="minLast">
    <div slot="pending" class="loading-wrapper-outer">
      <div class="loading-wrapper-inner">
        <div :is="type" 
             :size="size" 
             :color="color"
             :classes="classes"></div>
      </div>
    </div>
    <slot></slot>
    <slot name="fail" slot="fail"></slot>

  </async-wrapper>
</template>
<script>
  import AsyncWrapper from '../async-wrapper'
  import { Rainbow, Bounces, CircleBounces } from '../loading-styles'
  export default {
    props: {
      // loading style 
      type: {
        type: String,
        default: 'circle-bounces'
      },
      // loading size
      size: {
        type: Number,
        default: 20,
      },
      // loading color
      color: {
        type: String,
        default: ''
      },
      // loading class
      classes: {
        type: Array,
        default: () => []
      },
      // pending status lasts at least minLast
      minLast: {
        type: Number,
        default: 0
      },
      // promise
      promise: {
        type: Promise,
        default: () => Promise.resolve()
      }
    },
    methods: {
    },
    components: { AsyncWrapper, Rainbow, Bounces, CircleBounces }
  }
</script>
<style scoped>
  .loading-wrapper-outer {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .loading-wrapper-inner {
    display: flex;
    align-items: center;
    justify-content: center;

    /* 兼容 IE9 */
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: auto;
  }
</style>

