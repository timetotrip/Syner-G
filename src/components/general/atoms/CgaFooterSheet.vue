<template>
  <v-bottom-sheet
    v-model="sheet"
    class="CgaFtrSheet--bottom"
  >
    <v-sheet class="CgaFtrSheet--sheet">
      <slot>
        default sheets
      </slot>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script>
export default {
  name: 'CgaFooterSheet',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disablefunc: {
      type: Function,
      default: null
    }
  },
  computed: {
    sheet: {
      get () {
        return this.$props.active
      },
      set (value) {
        if (value === false) {
          if (this.$props.disablefunc !== null) {
            this.$props.disablefunc('')
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.CgaFtrSheet--sheet{
  border-radius: 5px 5px 0 0;
  padding: 1rem;
}
</style>
