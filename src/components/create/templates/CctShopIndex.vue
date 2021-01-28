<template>
  <CcoShopCreate
    :defid="defSid"
    :defname="defSname"
    :defbrand="defSbrand"
  />
</template>
<script>
import CcoShopCreate from '@/components/create/organisms/CcoShopCreate.vue'
export default {
  name: 'CctShopIndex',
  components: {
    CcoShopCreate
  },
  data: () => ({
    def_sid: '',
    def_sname: '',
    def_brand: ''
  }),
  computed: {
    defSid () {
      if (typeof this.$route.query.id !== 'undefined') {
        return this.$route.query.id
      }
      return ''
    },
    defSname () {
      if (typeof this.$route.query.name !== 'undefined') {
        return this.$route.query.name
      }
      return ''
    },
    defSbrand () {
      if (typeof this.$route.query.brand !== 'undefined') {
        return this.$route.query.brand
      }
      return ''
    }
  },
  mounted () {
    console.log('Cct Shop index mounted')
    this.$store.dispatch('xd/create/xdcshop/resetCBrand')
    this.$store.dispatch('xd/create/xdcshop/setCBrand', this.defSbrand)
  },
  beforeDestroy () {
    console.log('Cct Shop index beforeDestroy')
    this.$store.dispatch('xd/create/xdcshop/resetCBrand')
  }
}
</script>
<style scoped lang="scss">
</style>
