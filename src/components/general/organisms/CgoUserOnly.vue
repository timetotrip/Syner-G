<template>
  <div>
    <slot v-if="cUser !== null" />
    <div v-else>
      <h2>ログインしてください</h2>
    </div>
  </div>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CgoUserOnly',
  computed: {
    ...mapGetters('xd/general/xdgcuser', ['cUser'])
  },
  /* ログインユーザー状態に起因する処理 */
  created () {
    console.log('CGO userOnly create')
    // ログイン強制 CURRENT USER が決まる **LATER
    this.$store.dispatch('xd/general/xdgcuser/forceLogin')
  },
  beforeDestroy () {
    console.log('CGO userOnly beforeDestroy')
  }
}
</script>
<style scoped lang="scss">
</style>
