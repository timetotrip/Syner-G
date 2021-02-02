<template>
  <div
    class="HeaderBase"
  >
    <p v-if="logo !== ''">
      ロゴ
    </p>
    <v-app-bar-nav-icon v-if="navi" @click.stop="$nuxt.$emit('navigation-toggle')" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <slot />
  </div>
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
    },
    logo: {
      type: String,
      default: ''
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
.HeaderBase{
  // position: absolute;
  background: rgba(211, 211, 211, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
</style>
