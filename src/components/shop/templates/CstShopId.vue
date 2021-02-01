<template>
  <CgmFloatActMenu
    :v-if="cShop!==null"
    :defaultkey="'top'"
    :menus="[{
      key: 'top',
      title: 'ブランド',
      icon: ['fas', 'table']
    }]"
  >
    <template #top>
      <CgmSlideshowBase>
        <!--
        <div
          v-for="sf in cShopStoreFronts"
          :key="sf.type"
        >
          <CsoSFsLogo
            v-if="sf.type==='Logo'"
            :storefront="sf"
          />
          <CsoSFsSlide
            v-if="sf.type==='Slide'"
            :storefront="sf"
          />
          <CsoSfProductsAll
            v-if="sf.type==='productAll'"
            :shop="cShop"
            :storefront="sf"
          />
        </div>
        -->
        <v-window-item>
          1
        </v-window-item>
        <v-window-item>
          2
        </v-window-item>
        <v-window-item>
          3
        </v-window-item>
      </CgmSlideshowBase>
    </template>
  </CgmFloatActMenu>
</template>
<script>
import CgmSlideshowBase from '@/components/general/molecules/CgmSlideshowBase.vue'
import CgmFloatActMenu from '@/components/general/molecules/CgmFloatActMenu.vue'
import CsoSFsLogo from '@/components/shop/organisms/CsoSFsLogo.vue'
import CsoSFsSlide from '@/components/shop/organisms/CsoSFsSlide.vue'
import CsoSfProductsAll from '@/components/shop/organisms/CsoSfProductsAll.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CstShopId',
  components: {
    CgmSlideshowBase,
    CgmFloatActMenu,
    CsoSFsLogo,
    CsoSFsSlide,
    CsoSfProductsAll
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
  }
}
</script>
<style scoped lang="scss">
</style>
