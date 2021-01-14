<template>
  <CstShopId
    :sid="$route.params.id"
  />
</template>
<script>
import CstShopId from '@/components/shop/templates/CstShopId.vue'
export default {
  components: {
    CstShopId
  },
  layout: 'shop'
}
</script>
<style lang="scss">
</style>
