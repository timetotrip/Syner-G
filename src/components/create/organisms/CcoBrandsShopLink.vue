<template>
  <div @click="onClickCreateShop()">
    ブランドショップを作ろう
  </div>
</template>
<script>
// const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandsShopLink',
  props: {
    brand: {
      type: Object,
      default: null
    }
  },
  methods: {
    onClickCreateShop () {
      console.log('click')
      if (this.$props.brand !== null) {
        if (this.$props.brand.shop !== '') {
          this.$router.push(`/create/shop/${this.$props.brand.shop}/`)
        }
        else {
          this.$router.push(`/create/shop/?id=${this.$props.brand.id}&name=${this.$props.brand.name}&brand=${this.$props.brand.id}`)
        }
      }
    }
  }
  /*
  computed: {
    ...mapGetters('xd/general/xdgcuser', ['myBrands'])
  },
  */
}
</script>
<style scoped lang="scss">
/*
.CcoBrandsList{
  margin:0;
  padding: 0.5rem;
  .CcoBrandsList--item{
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
}*/
</style>
