<template>
  <div>
    <slot v-if="hasPermit" />
    <div v-else>
      <h2>権限がありません</h2>
    </div>
  </div>
</template>
<script>
// const { mapGetters } = require('vuex')
export default {
  name: 'CgoUserBrandPermmit',
  props: {
    bid: {
      type: String,
      default: ''
    },
    need: {
      type: String,
      default: 'MNG'
    }
  },
  computed: {
    hasPermit () {
      return this.$store.getters['xd/general/xdgcuser/hasBrandPermit'](this.$props.bid, this.$props.need)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
