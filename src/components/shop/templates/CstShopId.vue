<template>
  <CsmShopArea :v-if="cShop!==null">
    <CsmShopPanel
      v-for="(sf, index) in cShopStoreFronts"
      :key="index"
      :pagenumber="index"
      :storefront="sf"
    />
    <CsmFloatButtons
      :menus="[{
        key: 'next',
        title: '進む',
        icon: ['fas', 'forward'],
        clickfunc: nextClick
      },{
        key: 'share',
        title: 'シェア',
        icon: ['fas', 'share-alt'],
        clickfunc: () => { return null }
      },{
        key: 'cart',
        title: 'カート',
        icon: ['fas', 'shopping-cart'],
        clickfunc: () => { return null }
      }]"
    />
  </CsmShopArea>
</template>
<script>
// import CgmSlideshowBase from '@/components/general/molecules/CgmSlideshowBase.vue'
import CsmFloatButtons from '@/components/shop/molecules/CsmFloatButtons.vue'
import CsmShopArea from '@/components/shop/molecules/CsmShopArea.vue'
import CsmShopPanel from '@/components/shop/molecules/CsmShopPanel.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CstShopId',
  components: {
    CsmFloatButtons,
    CsmShopArea,
    CsmShopPanel
  },
  props: {
    sid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cShop', 'cShopStoreFronts'])
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
  },
  methods: {
    nextClick () {
      //
      this.$store.dispatch('xd/general/xdslideshow/goNextStep')
    }
  }
}
</script>
<style scoped lang="scss">
</style>
