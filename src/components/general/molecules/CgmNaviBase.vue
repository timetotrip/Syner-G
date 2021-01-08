<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <v-list nav>
      <v-list-item><p>popop</p></v-list-item>
      <v-list-item><p>popop</p></v-list-item>
      <v-list-item><p>popop</p></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'CgmNaviBase',
  data: () => ({
    drawer: false
  }),
  created () {
    this.$nuxt.$on('navigation-toggle', () => {
      this.drawer = !this.drawer
    })
  }
}
</script>
<style scoped lang="scss">
</style>
