<template>
  <div v-if="shop !== null">
    <h2>{{ shop.name }}</h2>
    <CsmPBox
      v-for="p in cProducts"
      :key="p.id"
      :product="cProducts[p.id]"
    />
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
      this.$store.dispatch('xd/shop/xdsshop/setCProducts', this.$props.shop.id)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
