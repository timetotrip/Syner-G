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
  name: 'CgoUserShopPermmit',
  props: {
    sid: {
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
      return this.$store.getters['xd/general/xdgcuser/hasShopPermit'](this.$props.sid, this.$props.need)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
