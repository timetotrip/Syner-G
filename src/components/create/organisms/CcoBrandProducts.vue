<template>
  <div v-if="brand!==null">
    <h2>{{ brand.name }} ブランド プロダクト</h2>
    <p>詳細準備中</p>
    <CcoProductCreate />
  </div>
</template>
<script>
import CcoProductCreate from '@/components/create/organisms/CcoProductCreate.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandProducts',
  components: {
    CcoProductCreate
  },
  props: {
    brand: {
      type: Object,
      default: null
    },
    ppp: { // products per page
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      pPerPage: 5,
      page: 0
    }
  },
  computed: {
    ...mapGetters('xd/create/xdcproducts', ['cProduct', 'pList'])
  },
  mounted () {
    this.page = 0
    this.pPerPage = this.$props.ppp
    console.log('Cct brand products mounted')
    this.$store.dispatch('xd/create/xdcproducts/setPList', this.page, this.pPerPage)
  },
  beforeDestroy () {
    console.log('Cct brand products beforeDestroy')
    this.$store.dispatch('xd/create/xdcproducts/resetPList')
  }
}
</script>
<style scoped lang="scss">
</style>
