<template>
  <CgmSlideshowPanel :pagenumber="pagenumber">
    <p>1st Viewのページです</p>
    <slot />
  </CgmSlideshowPanel>
</template>
<script>
import CgmSlideshowPanel from '@/components/general/molecules/CgmSlideshowPanel.vue'
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanel1stView',
  components: {
    CgmSlideshowPanel
  },
  props: {
    storefront: {
      type: cfShops.CsFront,
      default: () => { return new cfShops.CsFront('prAll') }
    },
    pagenumber: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    // this.$store.dispatch('xd/shop/xdsshop/setCreativesByIds', this.$props.storefront.creativeIds)
  }
}
</script>
<style scoped lang="scss">
</style>
