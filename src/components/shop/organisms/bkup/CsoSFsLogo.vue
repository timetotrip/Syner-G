<template>
  <CsmStoreFrontBase
    :storefront="storefront"
    class="productsAll"
  >
    <CgmCreativeBox
      v-for="cid in storefront.creativeIds"
      :key="cid"
      :src="cCrePath(cid)"
    />
  </CsmStoreFrontBase>
</template>
<script>
import CsmStoreFrontBase from '@/components/shop/molecules/CsmStoreFrontBase.vue'
import CgmCreativeBox from '@/components/general/molecules/CgmCreativeBox.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsoSFsLogo',
  compornents: {
    CsmStoreFrontBase,
    CgmCreativeBox
  },
  props: {
    storefront: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cCrePath'])
  }
}
</script>
<style scoped lang="scss">
</style>
