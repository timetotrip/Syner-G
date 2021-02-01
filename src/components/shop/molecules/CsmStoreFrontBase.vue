<template>
  <CgmSlideshowPanel v-if="storefront!==null">
    <slot />
  </CgmSlideshowPanel>
</template>
<script>
import CgmSlideshowPanel from '@/components/general/molecules/CgmSlideshowPanel.vue'
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmStoreFrontBase',
  components: {
    CgmSlideshowPanel
  },
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
