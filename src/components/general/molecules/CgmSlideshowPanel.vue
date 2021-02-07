<template>
  <v-window-item
    :class="[ 'slidePanel', isVisible === true ? 'seVis' : 'seInv' ]"
    @click="click()"
  >
    <transition>
      <div
        v-if="nPanel===pagenumber"
        class="spBase"
      >
        <slot />
      </div>
    </transition>
  </v-window-item>
</template>
<script>
// import CgmSlideshowElem from '@/components/general/molecules/CgmSlideshowElem.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CgmSlideshowPanel',
  components: {
    // CgmSlideshowElem
  },
  props: {
    pagenumber: {
      type: Number,
      default: 0
    },
    areanumber: {
      type: Number,
      default: 0
    },
    areadelay: {
      type: Number,
      default: 0
    },
    visiblefunc: {
      type: Function,
      default: () => { return null }
    }
  },
  data: () => ({
    visstate: false
  }),
  computed: {
    ...mapGetters('xd/general/xdslideshow', ['nPanel']),
    isVisible () {
      if (this.$store.getters['xd/general/xdslideshow/nPanel'] === this.$props.pagenumber) {
        // console.log('CHECK TIMING')
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    isVisible () {
      if (this.isVisible && this.$store.getters['xd/general/xdslideshow/nElem'] === 0) {
        this.$props.visiblefunc()
        setTimeout(() => {
          this.$nuxt.$store.dispatch('xd/general/xdslideshow/goNextStep')
        }, 1000)
      }
    }
  },
  created () {
    this.$store.dispatch('xd/general/xdslideshow/addPMax')
  },
  methods: {
    click () {
      this.$store.dispatch('xd/general/xdslideshow/goNextStep')
    }
  }
}
</script>
<style scoped lang="scss">
.slidePanel{
  width: 100%;
  height: 100%;
  transition: 2s;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &.seInv{
    opacity: 0;
  }
  &.seVis{
    opacity: 1;
  }
  .v-enter-active, .v-leave-active {
    transition: opacity 1s
  }
  .v-enter, .v-leave-to{
      opacity: 0;
  }
  .spBase{
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    position: relative;
    z-index: 0;
  }
}
</style>
