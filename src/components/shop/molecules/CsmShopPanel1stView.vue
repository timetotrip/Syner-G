<template>
  <CgmSlideshowPanel
    :pagenumber="pagenumber"
    class="sp1v"
  >
    <CsaCreativeFill
      :cid="storefront.creativeMaps.background"
      :stylesets="['mZoom','cGrad']"
      :settings="{
        clGrad1: '#FF8000',
        clGrad2: '#A0A0A0',
        mvZoomL: '120%',
        mvZoomS: '180%',
        bgPosXY: '70% 70%'
      }"
      class="spBg"
    >
      <div class="spMain">
        <CgmSlideshowElem class="spSlide sps--title" :enumber="1" :apdelay="4">
          <CsaTitle v-if="storefront.settings.title">
            {{ storefront.settings.title }}
          </CsaTitle>
        </CgmSlideshowElem>
        <CgmSlideshowElem class="spSlide" :enumber="1" :apdelay="6">
          <CsaBoard
            :widthper="80"
            :align="'right'"
            class="spNews"
          >
            <h3>ニュース</h3>
            <CsaDivisionBar />
            <p>新商品 Tシャツ発売</p>
            <p>あの有名スノーボーダーとコラボ</p>
            <p>2021年新モデル続々登場</p>
            <p>年末決算セール</p>
          </CsaBoard>
        </CgmSlideshowElem>
      </div>
    </CsaCreativeFill>
  </CgmSlideshowPanel>
</template>
<script>
import CgmSlideshowPanel from '@/components/general/molecules/CgmSlideshowPanel.vue'
import CgmSlideshowElem from '@/components/general/molecules/CgmSlideshowElem.vue'
import CsaCreativeFill from '@/components/shop/atoms/CsaCreativeFill.vue'
import CsaTitle from '@/components/shop/atoms/CsaTitle.vue'
import CsaBoard from '@/components/shop/atoms/CsaBoard.vue'
import CsaDivisionBar from '@/components/shop/atoms/CsaDivisionBar.vue'
const { mapGetters } = require('vuex')
const cfShops = require('~/classes/cfShops.js')
export default {
  name: 'CsmShopPanel1stView',
  components: {
    CgmSlideshowPanel,
    CgmSlideshowElem,
    // CgmCreativeBox,
    CsaCreativeFill,
    CsaTitle,
    CsaBoard,
    CsaDivisionBar
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
    // setTimeout(() => { this.$store.dispatch('xd/general/xdslideshow/goNextStep') }, 2000)
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
    .spMain{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 10% 5%;
      > *{
        margin-top:2rem;
        width: 100%;
        // margin-bottom:2rem;
      }
      .spSlide.sps--title{
        mix-blend-mode: hard-light;
      }
      .spNews{
        h3{
          width: 100%;
          text-align: center;
          margin-bottom:0.4rem;
          font-family: "M PLUS 1p";
          line-height: 1rem;
        }
        p{
          font-size: 0.8rem;
          margin: 0;
        }
      }
    }
  }
}
</style>
