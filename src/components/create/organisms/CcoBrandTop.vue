<template>
  <div v-if="brand!==null">
    <h2>{{ brand.name }} ブランド サマリー</h2>
    <CcoBrandImages :brand="brand" />
    <CcoBrandsShopLink :brand="brand" />
  </div>
</template>
<script>
import CcoBrandsShopLink from '@/components/create/organisms/CcoBrandsShopLink.vue'
import CcoBrandImages from '@/components/create/organisms/CcoBrandImages.vue'
export default {
  name: 'CcoBrandTop',
  components: {
    CcoBrandsShopLink,
    CcoBrandImages
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
