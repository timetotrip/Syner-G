<template>
  <div v-if="brand!==null">
    <h2>{{ brand.name }} ブランド プロダクト</h2>
    <CcoProductCreate />
    <CcoProductEdit
      v-for="(product, pid) in pList"
      :key="pid"
      :product="product"
      :isopen="openProduct===pid"
      :openfunc="productOpen"
      :closefunc="productClose"
    />
  </div>
</template>
<script>
import CcoProductCreate from '@/components/create/organisms/CcoProductCreate.vue'
import CcoProductEdit from '@/components/create/organisms/CcoProductEdit.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandProducts',
  components: {
    CcoProductCreate,
    CcoProductEdit
  },
  props: {
    brand: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      openProduct: ''
    }
  },
  computed: {
    ...mapGetters('xd/create/xdcproducts', ['pList'])
  },
  mounted () {
    console.log('Cct brand products mounted')
    if (typeof this.$props.brand === 'undefined') {
      //
    } else if (this.$props.brand === null) {
      //
    } else {
      this.$store.dispatch('xd/create/xdcproducts/setPList', this.$props.brand.id)
    }
  },
  beforeDestroy () {
    console.log('Cct brand products beforeDestroy')
    this.$store.dispatch('xd/create/xdcproducts/resetPList')
  },
  methods: {
    productOpen (pid) {
      this.openProduct = pid
    },
    productClose () {
      this.openProduct = ''
    }
  }
}
</script>
<style scoped lang="scss">
</style>
