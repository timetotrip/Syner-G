<template>
  <CctBrandId
    :bid="$route.params.id"
  />
</template>
<script>
import CctBrandId from '@/components/create/templates/CctBrandId.vue'
export default {
  components: {
    CctBrandId
  },
  layout: 'create'
}
</script>
<style lang="scss">
</style>
