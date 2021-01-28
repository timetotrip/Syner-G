<template>
  <CgoUserShopPermmit
    :sid="sid"
    :need="'MNG'"
  >
    <CgmFloatActMenu
      :v-if="cShop!==null"
      :defaultkey="'top'"
      :menus="[{
        key: 'top',
        title: 'ショップ',
        icon: ['fas', 'table']
      }]"
    >
      <template #top>
        <!--<CcoShopTop :brand="cBrand" />-->
      </template>
    </CgmFloatActMenu>
  </CgoUserShopPermmit>
</template>
<script>
import CgoUserShopPermmit from '@/components/general/organisms/CgoUserShopPermmit.vue'
import CgmFloatActMenu from '@/components/general/molecules/CgmFloatActMenu.vue'
// import CcoBrandTop from '@/components/create/organisms/CcoBrandTop.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CctBrandId',
  components: {
    CgoUserShopPermmit,
    CgmFloatActMenu
  },
  props: {
    sid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('xd/create/xdcshop', ['cShop'])
  },
  mounted () {
    console.log('Cct Shop id mounted')
    this.$store.dispatch('xd/create/xdcshop/resetCShop')
    this.$store.dispatch('xd/create/xdcshop/resetCBrand')
    this.$store.dispatch('xd/create/xdcshop/resetCProducts')
    this.$store.dispatch('xd/create/xdcshop/resetCCreatives')
    this.$store.dispatch('xd/create/xdcshop/setCShop', this.$props.sid)
  },
  beforeDestroy () {
    console.log('Cct Shop id beforeDestroy')
    this.$store.dispatch('xd/create/xdcshop/resetCShop')
    this.$store.dispatch('xd/create/xdcshop/resetCBrand')
    this.$store.dispatch('xd/create/xdcshop/resetCProducts')
    this.$store.dispatch('xd/create/xdcshop/resetCCreatives')
  }
}
</script>
<style scoped lang="scss">
</style>
