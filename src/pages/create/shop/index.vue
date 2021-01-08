<template>
  <div>
    <div />
  </div>
</template>
<script>
/*
import MBrands from '@/models/core/MBrands.vue'
// const cfBrands = require('~/classes/cfBrands.js')
export default {
  components: {
    MBrands
  },
  layout: 'create',
  data () {
    return {
      dfunc: []
    }
  },
  created () {
    console.log('VP CRT MYSTORE ')
    this.$store.dispatch('xdcurrentuser/forceLogin')
    this.$store.dispatch('xdmystore/initMystore')
  },
  mounted () {
    this.dfunc.push(this.$store.subscribe((mutation, state) => {
      // console.log('VP MNT MYSTORE Vuex Mutation ' + mutation.type)
      switch (mutation.type) {
        case 'xdcurrentuser/sCurrentUser':
          console.log('VP MNT MYSTORE CHANGE cUSER ' + mutation.type)
          this.$store.dispatch('xdmystore/refreshOwnBrands')
          break
      }
    }))
  },
  beforeDestroy () {
    console.log('VP DST MYSTORE ')
    this.dfunc.forEach((f) => { f() })
    this.dfunc = []
    this.$store.dispatch('xdmystore/destroyMystore')
  }
} */
</script>
<style lang="scss">
</style>
