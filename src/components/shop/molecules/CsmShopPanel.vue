<template>
  <CsmShopPanel1stView
    v-if="storefront.type==='1stView'"
    :storefront="storefront"
    :pagenumber="pagenumber"
  />
  <CsmShopPanelSlide
    v-else-if="storefront.type==='Slide'"
    :storefront="storefront"
    :pagenumber="pagenumber"
  />
  <CsmShopPanelProductsAll
    v-else-if="storefront.type==='productsAll'"
    :storefront="storefront"
    :pagenumber="pagenumber"
  />
  <CsmShopPanelDefault
    v-else
    :pagenumber="pagenumber"
    :storefront="storefront"
  >
    <p>{{ storefront.type }} 今後変更予定</p>
  </CsmShopPanelDefault>
</template>
<script>
import CsmShopPanel1stView from '@/components/shop/molecules/CsmShopPanel1stView.vue'
import CsmShopPanelSlide from '@/components/shop/molecules/CsmShopPanelSlide.vue'
import CsmShopPanelProductsAll from '@/components/shop/molecules/CsmShopPanelProductsAll.vue'
import CsmShopPanelDefault from '@/components/shop/molecules/CsmShopPanelDefault.vue'
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanel',
  components: {
    CsmShopPanel1stView,
    CsmShopPanelSlide,
    CsmShopPanelProductsAll,
    CsmShopPanelDefault
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
    this.$store.dispatch('xd/general/xdslideshow/nPanelStart')
  }
}
</script>
<style scoped lang="scss">
</style>
