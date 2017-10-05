<template>
  <div class="async-wrapper">
    <div class="async-wrapper-pending" v-if="pending">
      <template v-if="$slots.pending">
        <slot name="pending"></slot>
      </template>
      <template v-else>
        <slot></slot>
      </template>
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
function _state(vm, status) {
  if (status === 'pending') {
    vm.status = 'pending'
    vm.pending = true
    vm.done = false
    vm.fail = false
  } else if (status === 'done') {
    vm.status = 'done'
    vm.pending = false
    vm.done = true
    vm.fail = false
  } else if (status === 'fail') {
    vm.status = 'fail'
    vm.pending = false
    vm.done = false
    vm.fail = true
  } else {
    vm.status = 'init'
    vm.pending = false
    vm.done = false
    vm.fail = false
  } 
}
function _sync(vm, promise) {
  if (vm.status === 'pending' && vm.throttle) {
    console.warn('current promise is pending')
    return
  }

  _state(vm, 'pending')
  const startTime = new Date()

  if (vm.promise === null) return
  vm.promise.then(res => {
    const alredayTime = new Date() - startTime
    setTimeout(function() {
      _state(vm, 'done')
    }, vm.minLast - alredayTime)
  }, ex => {
    const alredayTime = new Date() - startTime
    setTimeout(function() {
      _state(vm, 'fail')
    }, vm.minLast - alredayTime)
    throw ex
  })
}
export default {
  props: {
    promise: {
      type: Promise,
      default: () => Promise.resolve()
    },
    throttle: {
      type: Boolean,
      default: true
    },
    minLast: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    pending: false,
    done: false,
    fail: false,
    status: 'init',
  }),
  methods: {
    getCurrentStatus() {
      return this.status
    }
  },
  watch: {
    promise() {
      _sync(this)
    }
  },
  mounted() {
    _sync(this)
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


