<template>
  <div class="async-wrapper">
    <div class="async-wrapper-pending" v-if="pending">
      <slot name="pending"></slot>
    </div>
    <div class="async-wrapper-finished" v-if="!pending">
      <div class="async-wrapper-done" v-if="done">
        <slot></slot>
        <slot name="done"></slot>
      </div>
      <div class="async-wrapper-fail" v-if="fail">
        <slot name="fail"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    promise: {
      type: Promise,
      default: () => Promise.resolve()
    }
  },
  data: () => ({
    pending: false,
    done: false,
    fail: false,
  }),
  methods: {
    state(status) {
      if (status === 'pending') {
        this.pending = true
        this.done = false
        this.fail = false
      } else if (status === 'done') {
        this.pending = false
        this.done = true
        this.fail = false
      } else if (status === 'fail') {
        this.pending = false
        this.done = false
        this.fail = true
      } else {
        this.pending = false
        this.done = false
        this.fail = false
      }
    },
    sync() {
      this.state('pending')
      if (this.promise === null) return
      this.promise.then(res => {
        this.state('done')
      }, ex => {
        this.state('fail')
        throw ex
      })
    }
  },
  watch: {
    promise() {
      this.sync()
    }
  },
  mounted() {
    this.sync()
  }
}
</script>
<style scoped>
.async-wrapper, 
.async-wrapper-pending, 
.async-wrapper-finished,
.async-wrapper-done,
.async-wrapper-fail {
  width: 100%;
  height: 100%;
}
</style>


