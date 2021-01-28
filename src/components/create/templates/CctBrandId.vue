<template>
  <CgoUserBrandPermmit
    :bid="bid"
    :need="'VEW'"
  >
    <CgmFloatActMenu
      :v-if="cBrand!==null"
      :defaultkey="'top'"
      :menus="[{
        key: 'top',
        title: 'ブランド',
        icon: ['fas', 'table']
      },{
        key: 'product',
        title: 'プロダクト',
        icon: ['fas', 'tshirt']
      },{
        key: 'selles',
        title: '売上管理',
        icon: ['fas', 'search-dollar']
      },{
        key: 'staff',
        title: 'スタッフ',
        icon: ['fas', 'users']
      },{
        key: 'sg',
        title: 'シナジー',
        icon: ['fas', 'random']
      }]"
    >
      <template #top>
        <CcoBrandTop :brand="cBrand" />
      </template>
      <template #product>
        <CcoBrandProducts :brand="cBrand" />
      </template>
      <template #selles>
        売上管理
        準備中
      </template>
      <template #staff>
        スタッフ
        準備中
      </template>
      <template #sg>
        シナジー
        準備中
      </template>
    </CgmFloatActMenu>
  </CgoUserBrandPermmit>
</template>
<script>
import CgoUserBrandPermmit from '@/components/general/organisms/CgoUserBrandPermmit.vue'
import CgmFloatActMenu from '@/components/general/molecules/CgmFloatActMenu.vue'
import CcoBrandTop from '@/components/create/organisms/CcoBrandTop.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CctBrandId',
  components: {
    CgoUserBrandPermmit,
    CgmFloatActMenu,
    CcoBrandTop
  },
  props: {
    bid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('xd/create/xdcbrand', ['cBrand'])
  },
  mounted () {
    console.log('Cct brand id mounted')
    this.$store.dispatch('xd/create/xdcbrand/setCBrand', this.$props.bid)
    this.$store.dispatch('xd/create/xdcbrand/setCProductsByBid', this.$props.bid)
  },
  beforeDestroy () {
    console.log('Cct brand id beforeDestroy')
    this.$store.dispatch('xd/create/xdcbrand/resetCBrand')
    this.$store.dispatch('xd/create/xdcbrand/resetCProducts')
  }
}
</script>
<style scoped lang="scss">
</style>
