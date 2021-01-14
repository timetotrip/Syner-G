<template>
  <CgmFloatActMenu
    :v-if="true/*cBrand!==null*/"
    :defaultkey="'top'"
    :menus="[{
      key: 'top',
      title: 'ブランド',
      icon: ['fas', 'table']
    } /*,{
      key: 'product',
      title: 'プロダクト',
      icon: ['fas', 'tshirt']
    } */]"
  >
    <template #top>
      <Cso1stView />
      <CsoProductsAll />
    </template>
    <!--
    <template #product>
      <CcoBrandProducts :brand="cBrand" />
    </template>
    -->
  </CgmFloatActMenu>
</template>
<script>
import CgmFloatActMenu from '@/components/general/molecules/CgmFloatActMenu.vue'
import Cso1stView from '@/components/shop/organisms/Cso1stView.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CstShopId',
  components: {
    CgmFloatActMenu,
    Cso1stView
  },
  props: {
    sid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdcshop', ['cShop'])
  },
  mounted () {
    console.log('Cst shop id mounted')
    this.$store.dispatch('xd/shop/xdcshop/setCShop', this.$props.sid)
  },
  beforeDestroy () {
    console.log('Cst shop id beforeDestroy')
    this.$store.dispatch('xd/shop/xdcshop/resetCShop')
  }
}
</script>
<style scoped lang="scss">
</style>
