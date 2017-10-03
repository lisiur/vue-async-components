<template>
  <div class="spinner" :style="style.spinner">
    <div class="bounce1" :class="classes" :style="style.bounce"></div>
    <div class="bounce2" :class="classes" :style="style.bounce"></div>
    <div class="bounce3" :class="classes" :style="style.bounce"></div>
  </div>
</template>
<script>
  export default {
    props: {
      color: {
        type: String,
        default: ''
      },
      classes: {
        type: Array,
        default: () => []
      },
      size: {
        type: Number,
        default: 20
      }
    },
    data: function() {
      return {
        style: {
          spinner: {
          },
          bounce: {
            background: this.color,
            width: this.size + 'px',
            height: this.size + 'px'
          }
        }
      }
    }
  }
</script>
<style scoped>
.spinner {
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.spinner > div {
  max-width: 100%;
  max-height: 100%;
  width: 12px;
  height: 12px;

  border-radius: 50%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>

