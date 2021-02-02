<template>
  <div v-if="product !== null" class="pBox">
    <CgmCreativeBox
      :src="cCrePath(product.topimage)"
    />
    <h3 class="pbTitle">
      {{ product.name }}
    </h3>
    <CgaPrice :price="product.price" class="pbPrice" />
  </div>
</template>
<script>
import CgmCreativeBox from '@/components/general/molecules/CgmCreativeBox.vue'
import CgaPrice from '@/components/general/atoms/CgaPrice.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsaPBox',
  components: {
    CgmCreativeBox,
    CgaPrice
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cProducts', 'cCrePath'])
  },
  methods: {
    /*
    reqImgSrc (src) {
      return require(src)
    }
    */
  }
}
</script>
<style scoped lang="scss">
.pBox {
  width: 50%;
  .pbTitle{
    font-size: 0.8rem;
  }
}
</style>
