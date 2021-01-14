<template>
  <div v-if="brand!==null">
    <h2>{{ brand.name }} ブランド トップ</h2>
    <p>詳細準備中</p>
    <CcoBrandsShopLink :brand="brand" />
  </div>
</template>
<script>
import CcoBrandsShopLink from '@/components/create/organisms/CcoBrandsShopLink.vue'
export default {
  name: 'CcoBrandTop',
  components: {
    CcoBrandsShopLink
  },
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
