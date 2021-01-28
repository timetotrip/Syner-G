<template>
  <CgmFloatActMenu
    :v-if="cShop!==null"
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
      <CsoProductsAll :v-if="cShop!==null" :shop="cShop" />
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
    ...mapGetters('xd/shop/xdsshop', ['cShop'])
  },
  mounted () {
    console.log('Cst shop id mounted')
    this.$store.dispatch('xd/shop/xdsshop/resetCShop')
    this.$store.dispatch('xd/shop/xdsshop/resetCBrand')
    this.$store.dispatch('xd/shop/xdsshop/resetCProducts')
    this.$store.dispatch('xd/shop/xdsshop/resetCCreatives')
    this.$store.dispatch('xd/shop/xdsshop/setCShop', this.$props.sid)
  },
  beforeDestroy () {
    console.log('Cst shop id beforeDestroy')
    this.$store.dispatch('xd/shop/xdsshop/resetCShop')
    this.$store.dispatch('xd/shop/xdsshop/resetCBrand')
    this.$store.dispatch('xd/shop/xdsshop/resetCProducts')
    this.$store.dispatch('xd/shop/xdsshop/resetCCreatives')
  }
}
</script>
<style scoped lang="scss">
</style>
