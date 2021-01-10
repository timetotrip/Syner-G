<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <slot />
      <v-btn @click="clickCancel()">
        Cancel
      </v-btn>
      <v-btn @click="clickOk()">
        OK
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'CgmOkCancelDialog',
  props: {
    okfunc: {
      type: Function,
      default: null
    },
    cancelfunc: {
      type: Function,
      default: null
    },
    isopen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialog: {
      get () {
        return this.$props.isopen
      },
      set (value) {
        //
      }
    }
  },
  methods: {
    clickOk () {
      console.log('CGM OK CANCEL - ok')
      if (typeof this.$props.okfunc === 'undefined') {
        //
      } else if (this.$props.okfunc === null) {
        //
      } else {
        this.$props.okfunc()
      }
    },
    clickCancel () {
      console.log('CGM OK CANCEL - cancel')
      if (typeof this.$props.cancelfunc === 'undefined') {
        //
      } else if (this.$props.cancelfunc === null) {
        //
      } else {
        this.$props.cancelfunc()
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
