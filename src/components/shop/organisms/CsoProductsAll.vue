<template>
  <div v-if="shop !== null" class="productsAll">
    <h2 class="paTitle">
      Products
    </h2>
    <div class="paList">
      <CsmPBox
        v-for="p in cProducts"
        :key="p.id"
        :product="cProducts[p.id]"
      />
    </div>
  </div>
</template>
<script>
import CsmPBox from '@/components/shop/molecules/CsmPBox.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsoProductsAll',
  components: {
    CsmPBox
  },
  props: {
    shop: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cProducts'])
  },
  updated () {
    console.log('Cso Shop Products all mounted')
    if (typeof this.$props.shop === 'undefined') {
      //
    } else if (this.$props.shop === null) {
      //
    } else {
      this.$store.dispatch('xd/shop/xdsshop/setCProductsBySid', this.$props.shop.id)
    }
  }
}
</script>
<style scoped lang="scss">
.productsAll {
  .paTitle{
    width:100%;
    text-align: center;
  }
  .paList{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
