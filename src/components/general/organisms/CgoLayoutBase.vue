<template>
  <div class="layoutbase">
    <div id="Header">
      <slot name="header" />
    </div>
    <div id="Content">
      <slot name="content" />
    </div>
    <div id="Footer">
      <slot name="footer" />
    </div>
    <div id="Navigation">
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
  position: relative;
  widows: 100vw;
  height: 100vh;
  overflow: hidden;
  #Header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $b-height;
  }
  #Content{
    position: absolute;
    top: $b-height;
    left: 0;
    right: 0;
    bottom: $b-height;
    max-height: calc( 100% - 104px );
    overflow-y: scroll;
    #Nuxt{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      overflow-y: scroll;
      padding: 1rem;
    }
  }
  #Footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: $b-height;
  }
}
</style>
