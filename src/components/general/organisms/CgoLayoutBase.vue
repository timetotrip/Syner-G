<template>
  <div class="layoutbase">
    <div v-if="this.$slots.header" id="Header">
      <slot name="header" />
    </div>
    <div id="Content">
      <div v-if="this.$slots.main" id="Main">
        <slot name="main" />
      </div>
      <div v-if="this.$slots.footer" id="Footer">
        <slot name="footer" />
      </div>
    </div>
    <div v-if="this.$slots.navigation" id="Navigation">
      <slot name="navigation" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CgoLayoutBase',
  watch: {
    '$window.height' () {
      document.querySelector('.layoutbase').setAttribute('style', `height: ${this.$window.height}px;`)
    }
  }
}
</script>
<style scoped lang="scss">
$b-height: 60px;
.layoutbase{
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  #Header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: $b-height;
  }
  #Content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    #Main{
      overflow-y: scroll;
      flex-grow: 1;
      position: relative;
    }
    #Footer{
      flex-grow: 0;
      height: $b-height;
    }
  }
}
</style>
