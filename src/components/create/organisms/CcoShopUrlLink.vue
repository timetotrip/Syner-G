<template>
  <div v-if="shop !== null">
    <router-link :to="`/${shop.id}/`">
      あなたのショップ
    </router-link>
    <p>
      商品はブランドメニューから作ろう
    </p>
  </div>
</template>
<script>
// const { mapGetters } = require('vuex')
export default {
  name: 'CcoShopUrlLink',
  props: {
    shop: {
      type: Object,
      default: null
    }
  }
}
</script>
<style scoped lang="scss">
</style>
