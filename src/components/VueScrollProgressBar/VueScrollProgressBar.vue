<template>
  <div
    :class="containerClass"
    :style="{
      background: containerColor,
      zIndex: zIndex
    }"
  >
    <div
      :class="barClass"
      :style="{
        width: `${width}%`,
        height: height,
        background: backgroundColor
      }"
    />
  </div>
</template>

<script>
import throttle from 'lodash.throttle'
export default {
  name: 'VueScrollProgressBar',
  props: {
    height: {
      type: String,
      default: '.3rem'
    },
    zIndex: {
      type: String,
      default: '50'
    },
    backgroundColor: {
      type: String,
      default: 'linear-gradient(to right, #e66465, #9198e5)'
    },
    containerColor: {
      type: String,
      default: 'transparent'
    },
    barClass: {
      type: Object,
      default: () => {}
    },
    containerClass: {
      type: Object,
      default: () => {
        return {
          'progress-bar-container--container': true
        }
      }
    }
  },
  data () {
    return {
      width: 0
    }
  },
  mounted () {
    let passiveIfSupported = false
    try {
      const options = {
        get passive () {
          passiveIfSupported = { passive: true }
          return false
        }
      }
      window.addEventListener('test', null, options)
      window.removeEventListener('test', null, options)
    } catch (error) {}
    window.addEventListener('scroll', throttle(this.handleScroll, 15), passiveIfSupported)
    window.dispatchEvent(new Event('scroll'))
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      this.width = (window.scrollY / height) * 100
      const eventWidth = Math.ceil(this.width)
      if (eventWidth === 0) {
        this.$emit('begin')
      }
      if (eventWidth === 100) {
        this.$emit('complete')
      }
    }
  }
}
</script>

<style scoped>
.progress-bar-container--container {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
</style>