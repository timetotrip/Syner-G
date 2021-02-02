<template>
  <CgmSlideshowPanel
    :pagenumber="pagenumber"
    class="sp1v"
  >
    <CsaCreativeFill
      :cid="storefront.creativeMaps.background"
      class="spBg"
    >
      <CgmSlideshowElem class="spSlideElem" :enumber="1" :apdelay="0">
        <CgmCreativeBox
          :src="cCrePath(storefront.creativeMaps.logo)"
        />
      </CgmSlideshowElem>
    </CsaCreativeFill>
    <!--
    <template #background>
      <CgmSlideshowElem :enumber="0">
        <CgmCreativeBox
          :src="cCrePath(storefront.creativeMaps.background)"
        />
      </CgmSlideshowElem>
    </template>
    -->
  </CgmSlideshowPanel>
</template>
<script>
import CgmSlideshowPanel from '@/components/general/molecules/CgmSlideshowPanel.vue'
import CgmSlideshowElem from '@/components/general/molecules/CgmSlideshowElem.vue'
import CgmCreativeBox from '@/components/general/molecules/CgmCreativeBox.vue'
import CsaCreativeFill from '@/components/shop/atoms/CsaCreativeFill.vue'
const { mapGetters } = require('vuex')
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanel1stView',
  components: {
    CgmSlideshowPanel,
    CgmSlideshowElem,
    CgmCreativeBox,
    CsaCreativeFill
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
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cCrePath'])
  },
  mounted () {
    setTimeout(() => { this.$store.dispatch('xd/general/xdslideshow/goNextStep') }, 2000)
  }
}
</script>
<style scoped lang="scss">
.sp1v{
  .spBg{
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
