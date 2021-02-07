<template>
  <v-window
    v-model="numSlide"
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
    :touchless="true"
    class="slideBase"
    @click="click()"
  >
    <slot />
  </v-window>
</template>
<script>
export default {
  name: 'CgmSlideshowBase',
  computed: {
    numSlide: {
      get () {
        return this.$store.getters['xd/general/xdslideshow/nPanel']
      },
      set (value) {
      }
    }
  },
  created () {
    this.$store.dispatch('xd/general/xdslideshow/nPanelReset')
  },
  methods: {
    click () {
      console.log('click')
      this.$store.dispatch('xd/general/xdslideshow/goNextStep')
    },
    swipe (direction) {
      console.log(direction)
      switch (direction) {
        case 'Left':
        case 'Up':
          this.$store.dispatch('xd/general/xdslideshow/goNextStep')
          break
        case 'Right':
        case 'Down':
          this.$store.dispatch('xd/general/xdslideshow/goPrevOnce')
          break
      }
    }
  }
}
</script>
<style scoped lang="scss">
.slideBase{
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  position: absolute;
}
</style>
