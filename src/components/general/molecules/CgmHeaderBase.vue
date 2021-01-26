<template>
  <v-app-bar
    class="d-flex justify-space-between elevation-0"
  >
    <v-app-bar-nav-icon v-if="navi" @click.stop="$nuxt.$emit('navigation-toggle')" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  name: 'CgmHeaderBase',
  props: {
    title: {
      type: String,
      default: 'Syner-G α版'
    },
    navi: {
      type: Boolean,
      default: true
    }
  },
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
