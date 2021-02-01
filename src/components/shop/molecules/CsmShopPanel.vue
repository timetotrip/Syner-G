<template>
  <CsmShopPanel1stView
    v-if="storefront.type==='1stView'"
    :pagenumber="pagenumber"
  />
  <CsmShopPanel1stView
    v-else
    :pagenumber="pagenumber"
  >
    <p>{{ storefront.type }} 今後変更予定</p>
  </CsmShopPanel1stView>
</template>
<script>
import CsmShopPanel1stView from '@/components/shop/molecules/CsmShopPanel1stView.vue'
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanel',
  components: {
    CsmShopPanel1stView
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
    this.$store.dispatch('xd/shop/xdsshop/setCreativesByIds', this.$props.storefront.creativeIds)
  }
}
</script>
<style scoped lang="scss">
</style>
