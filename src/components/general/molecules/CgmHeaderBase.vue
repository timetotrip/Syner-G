<template>
  <v-app-bar
    class="d-flex justify-space-between elevation-0"
  >
    <v-app-bar-nav-icon @click.stop="$nuxt.$emit('navigation-toggle')" />
    <v-toolbar-title>Syner-G α版</v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  name: 'CgmHeaderBase',
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
<style scoped lang="scss">
</style>
