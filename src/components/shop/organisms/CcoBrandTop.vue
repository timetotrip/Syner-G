<template>
  <div v-if="brand!==null">
    <h2>{{ brand.name }} ブランド トップ</h2>
    <p>詳細準備中</p>
  </div>
</template>
<script>
export default {
  name: 'CcoBrandTop',
  props: {
    brand: {
      type: Object,
      default: null
    }
  }
}
</script>
<style scoped lang="scss">
</style>
