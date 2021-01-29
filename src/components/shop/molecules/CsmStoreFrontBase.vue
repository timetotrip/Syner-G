<template>
  <div v-if="storefront!==null">
    <slot />
  </div>
</template>
<script>
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmStoreFrontBase',
  props: {
    storefront: {
      type: cfShops.CsFront,
      default: () => { return new cfShops.CsFront('prAll') }
    }
  },
  mounted () {
    this.$store.dispatch('xd/shop/xdsshop/setCreativesByIds', this.$props.storefront.creativeIds)
  }
}
</script>
<style scoped lang="scss">
</style>
