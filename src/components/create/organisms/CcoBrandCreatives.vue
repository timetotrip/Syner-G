<template>
  <div>
    ブランドイメージ
  </div>
</template>
<script>
// const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandCreatives',
  props: {
    brand: {
      type: Object,
      default: null
    }
  }
  /*
  methods: {
    onClickCreateShop () {
      console.log('click')
      if (this.$props.brand !== null) {
        if (this.$props.brand.shop !== '') {
          this.$router.push(`/create/shop/${this.$props.brand.shop}/`)
        } else {
          this.$router.push(`/create/shop/?id=${this.$props.brand.id}&name=${this.$props.brand.name}&brand=${this.$props.brand.id}`)
        }
      }
    }
  }
  computed: {
    ...mapGetters('xd/general/xdgcuser', ['myBrands'])
  },
  */
}
</script>
<style scoped lang="scss">
</style>
