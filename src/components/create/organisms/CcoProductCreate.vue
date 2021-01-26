<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>オリジナルプロダクトを作ろう</h2>
    <v-text-field
      ref="pnamefield"
      v-model="pname"
      label="プロダクト名"
      outlined
    />
    <v-btn
      :disabled="pname===''"
      depressed
      @click="addProduct()"
    >
      追加
    </v-btn>
  </v-form>
</template>
<script>
// const { mapGetters } = require('vuex')
export default {
  name: 'CcoProductCreate',
  data () {
    return {
      valid: true,
      pname: ''
    }
  },
  methods: {
    addProduct () {
      console.log('CCO product addProduct ' + this.pname)
      this.$store.dispatch('xd/create/xdcbrand/addProduct', this.pname)
      this.pname = ''
    }
  }
}
</script>
<style scoped lang="scss">
</style>
