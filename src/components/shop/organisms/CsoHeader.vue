<template>
  <CgmHeaderBase
    :navi="false"
    :title="`${cShopName} ONLINE SHOP`"
  />
</template>
<script>
import CgmHeaderBase from '@/components/general/molecules/CgmHeaderBase.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsoHeader',
  components: {
    CgmHeaderBase
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cShopName'])
  }
}
</script>
<style scoped lang="scss">
</style>
