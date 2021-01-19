<template>
  <div>
    <v-img
      v-if="src !== ''"
      :src="src"
    />
    <CgmLoading
      v-if="src === ''"
    />
  </div>
</template>
<script>
import CgmLoading from '@/components/general/molecules/CgmLoading.vue'
export default {
  name: 'CgmCreativeBox',
  components: {
    CgmLoading
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
</style>
