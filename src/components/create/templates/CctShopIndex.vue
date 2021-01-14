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
  }
}
</script>
<style scoped lang="scss">
</style>
