<template>
  <CgmSlideshowPanel :pagenumber="pagenumber">
    <div class="Slide">
      <CgmSlideshowElem
        v-for="(cid, i) in storefront.creativeIds"
        :key="i"
        class="slElem"
        :enumber="1"
        :apdelay="(i) + 2"
        :apstyle="'RtoL'"
      >
        <CsaCreativeFill
          :cid="cid"
          :stylesets="['mSwin']"
          :class="['slCreative', `slCr--${i}`]"
        />
      </CgmSlideshowElem>
    </div>
  </CgmSlideshowPanel>
</template>
<script>
import CgmSlideshowPanel from '@/components/general/molecules/CgmSlideshowPanel.vue'
import CsaCreativeFill from '@/components/shop/atoms/CsaCreativeFill.vue'
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanelSlide',
  components: {
    CgmSlideshowPanel,
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
  created () {
    // setTimeout(() => { this.$store.dispatch('xd/general/xdslideshow/goNextStep') }, 2000)
    // console.log('CHECK TIMING created')
  },
  updated () {
    // setTimeout(() => { this.$store.dispatch('xd/general/xdslideshow/goNextStep') }, 2000)
    // console.log('CHECK TIMING UPDATED')
  }
}
</script>
<style scoped lang="scss">
.Slide{
  width: 100%;
  height: 100%;
  display: flex;
  @include mq(sp){ flex-direction: column; }
  @include mq(tb){ flex-direction: column; }
  @include mq(pc){ flex-direction: row; }
  @include mq(xl){ flex-direction: row; }
  .slElem{
    flex-grow: 1;
    .slCreative{
      height: 100%;
      width: 100%;
    }
  }
}
</style>
