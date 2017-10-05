<template>
  <div id="app">

    <async-wrapper :promise="promises.init">
      <div>{{$propOr('username', 'username', user)}}</div>
    </async-wrapper>

    <button class="btn" @click="reload">
      <async-loading :promise="promises.init"
                     :classes="['bh-bg-primary']">
        <div>{{$safeProp('username', user)}}</div>
      </async-loading>
    </button>
    
    <br>

    <button class="btn" @click="reload">
      <async-loading :promise="promises.init"
                     type="bounces"
                     :size="8"
                     :min-last="5000"
                     :classes="['bh-bg-primary']">
        <div>{{$safeProp('username', user)}}</div>
      </async-loading>
    </button>

  </div>
</template>
<script>
  import R from 'ramda'
  import { AsyncWrapper, AsyncLoading } from '../src'
  import { getUserInfo } from './utils.js'
  export default {
    data: () => ({
      promises: {
        init: null
      },
      user: null,
    }),
    methods: {
      getUserInfo() {
        this.promises.init = getUserInfo(1)
          .then(res => {
            this.user = res
          })
      },
      reload() {
        this.getUserInfo()
      }
    },
    created() {
      this.getUserInfo()
    },
    components: { AsyncWrapper, AsyncLoading }
  }
</script>
<style>
.btn {
  margin: 0;
  padding: 0;
  font-size: 16px;
  width: 86px;
  height: 26px;
  line-height: 26px;
}
.bh-bg-primary {
  background: #2d8cf0;
}
</style>

