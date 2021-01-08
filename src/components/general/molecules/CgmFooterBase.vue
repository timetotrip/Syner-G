<template>
  <v-footer
    class="CgmFtrBase"
  >
    <v-bottom-navigation
      class="d-flex justify-space-around align-center elevation-0 CgmFtrBase--navi"
      height="auto"
    >
      <slot />
    </v-bottom-navigation>
  </v-footer>
</template>
<script>
export default {
  name: 'CgmFooterBase'
}
</script>
<style scoped lang="scss">
.CgmFtrBase{
  margin: 0;
  padding: 0.2rem;
}
</style>
