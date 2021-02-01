<template>
  <CgmSlideshowPanel :pagenumber="pagenumber">
    <p>CsmShopPanelSlideのページです</p>
    <slot />
  </CgmSlideshowPanel>
</template>
<script>
import CgmSlideshowPanel from '@/components/general/molecules/CgmSlideshowPanel.vue'
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanelSlide',
  components: {
    CgmSlideshowPanel
  },
  props: {
    storefront: {
      type: cfShops.CsFront,
      default: () => { return new cfShops.CsFront('undef') }
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
