<template>
  <CsmStoreFrontBase
    v-if="shop !== null"
    :storefront="storefront"
    class="productsAll"
  >
    <h2 class="paTitle">
      Products
    </h2>
    <div class="paList">
      <CsmPBox
        v-for="( pobj, pid ) in cProducts"
        :key="pid"
        :product="pobj"
      />
    </div>
  </CsmStoreFrontBase>
</template>
<script>
import CsmPBox from '@/components/shop/molecules/CsmPBox.vue'
import CsmStoreFrontBase from '@/components/shop/molecules/CsmStoreFrontBase.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsoSfProductsAll',
  components: {
    CsmPBox,
    CsmStoreFrontBase
  },
  props: {
    shop: {
      type: Object,
      default: null
    },
    storefront: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cProducts'])
  },
  mounted () {
    console.log('Cso Shop Products all mounted')
    this.SetProductsBySid()
  },
  updated () {
    console.log('Cso Shop Products all updated')
    // this.SetProductsBySid()
  },
  methods: {
    SetProductsBySid () {
      if (typeof this.$props.shop === 'undefined') {
        //
      } else if (this.$props.shop === null) {
        //
      } else {
        this.$store.dispatch('xd/shop/xdsshop/setCProductsBySid', this.$props.shop.id)
      }
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
