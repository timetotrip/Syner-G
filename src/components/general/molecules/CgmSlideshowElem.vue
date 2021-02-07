<template>
  <transition>
    <div
      :class="[
        'slideElem',
        apstyle,
        isVisible === true ? 'seVis' : 'seInv'
      ]"
      :style="delayStyle"
    >
      <slot />
    </div>
  </transition>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CgmSlideshowElem',
  props: {
    enumber: {
      type: Number,
      default: 0
    },
    apstyle: {
      type: String,
      default: 'basicFade'
    },
    apdelay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isVisible () {
      if (this.$store.getters['xd/general/xdslideshow/nElem'] >= this.$props.enumber) {
        return true
      } else {
        return false
      }
    },
    delayStyle () {
      return {
        transitionDelay: `${0.2 * this.$props.apdelay}s`
      }
    }
  },
  mounted () {
    console.log('CmSlideElem mounted  enum-> ' + this.$props.enumber.toString())
    this.$store.dispatch('xd/general/xdslideshow/addEMaxNum', this.$props.enumber)
  }
}
</script>
<style scoped lang="scss">
.slideElem{
  transition: 0.4s;
  &.basicFade{
    opacity: 0;
    transform: translateY(3rem);
    &.seVis{
      opacity: 1;
      transform: translateY(0);
    }
  }
  &.RtoL{
    transform: translateX(100%);
    &.seVis{
      transform: translateX(0);
    }
  }
}
</style>
