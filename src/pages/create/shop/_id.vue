<template>
  <CctShopId
    :sid="$route.params.id"
  />
</template>
<script>
import CctShopId from '@/components/create/templates/CctShopId.vue'
export default {
  components: {
    CctShopId
  },
  layout: 'create'
}
</script>
<style lang="scss">
</style>
