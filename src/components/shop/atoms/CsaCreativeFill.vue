<template>
  <div v-if="cid !== ''" class="cFill" :style="styles" >
    <slot/>
  </div>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CsaCreativeFill',
  props: {
    cid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cCrePath']),
    // バインドするスタイルを生成
    styles () {
      return {
        '--bgurl': `url(${this.cCrePath(this.$props.cid)})`
      }
    }
  }

}
</script>
<style scoped lang="scss">
.cFill{
  --bgurl: '';
  background-image: var(--bgurl);
  background-position: right;
  background-size: auto 100%;
}
</style>
