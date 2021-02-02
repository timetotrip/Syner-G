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
    }
  },
  computed: {
    ...mapGetters('xd/general/xdslideshow', ['nPanel']),
    isVisible () {
      if (this.$store.getters['xd/general/xdslideshow/nPanel'] === this.$props.pagenumber) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    '$window.height' () {
      document.querySelector('.slidePanel').setAttribute('style', `height: ${this.$window.height}px;`)
      document.querySelector('.spBase').setAttribute('style', `height: ${this.$window.height}px;`)
    }
  },
  created () {
    console.log('CmSlidePanel Created ')
    this.$store.dispatch('xd/general/xdslideshow/addPMax')
  },
  methods: {
    click () {
      console.log('click')
      this.$store.dispatch('xd/general/xdslideshow/goNextStep')
    } /*,
    dClass () {
      switch (this.$props.dtype) {
        case 'vlist':
          return 'spVlist'
        case 'hlist':
          return 'spHlist'
        default:
          return ''
      }
    },
    aClass () {
      switch (this.$props.areastyle) {
        case 'white':
          return 'spaWhite'
        case 'grass':
          return 'spaGrass'
        default:
          return ''
      }
    } */
  }
}
</script>
<style scoped lang="scss">
.slidePanel{
  width: 100%;
  height: 100%;
  // height: 100vh;
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
    // padding:20% 10%;
    position: relative;
    z-index: 0;
    /*
    .spBack{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }
    .spSlideElem{
        width: 100%;
        height: 100%;
      .spArea{
        //margin: 10%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 5%;
        border-radius: 5px;
        /*
        &.spaWhite{
          background: white;
        }
        &.spaGrass{
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
          border: 1px solid #a1a1a144;
          filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.15));
        }
        .spDetails{
          display: flex;
          justify-content: space-around;
          width: 100%;
        }
        .spDetails.spVlist{
          flex-direction: column;
          align-items: center;
        }
        .spDetails.spHlist{
        }
      }
    }
    */
  }
}
</style>
