<template>
  <div v-if="product !== null">
    <h2>{{ product.name }}</h2>
    <CgmCreativeBox
      :src="cProTopCrePath(product.id)"
    />
  </div>
</template>
<script>
import CgmCreativeBox from '@/components/general/molecules/CgmCreativeBox.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsmPBox',
  components: {
    CgmCreativeBox
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cProducts', 'cProTopCrePath'])
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
</style>
