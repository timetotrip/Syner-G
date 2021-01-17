<template>
  <div v-if="product !== null">
    <h2>{{ product.name }}</h2>
  </div>
</template>
<script>
export default {
  name: 'CsmPBox',
  props: {
    product: {
      type: Object,
      default: null
    }
  }
}
</script>
<style scoped lang="scss">
</style>
