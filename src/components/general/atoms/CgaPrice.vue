<template>
  <p>
    {{ priceToView() }}
  </p>
</template>
<script>
export default {
  name: 'CgaPrice',
  props: {
    price: {
      type: Number,
      default: 0
    }
  },
  methods: {
    priceToView () {
      return `￥ ${this.$props.price.toLocaleString()}`
    }
  }
}
</script>
<style scoped lang="scss">
</style>
