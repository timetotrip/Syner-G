<template>
  <v-sheet
    outlined
    :v-if="myBrands!==null"
    class="CcoBrandsList"
  >
    <p
      v-for="(bname, bid) in myBrands"
      :key="bid"
      class="CcoBrandsList--item"
      @click="onClick(bid)"
    >
      {{ bid }} 編集
    </p>
    <p
      class="CcoBrandsList--item"
      @click="onClick('')"
    >
      ＋ ブランド新規作成
    </p>
  </v-sheet>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandsList',
  props: {
    clickfunc: {
      type: Function,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/general/xdgcuser', ['myBrands'])
  },
  methods: {
    onClick (bid) {
      if (this.$props.clickFunc !== null) {
        this.$props.clickfunc(bid)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.CcoBrandsList{
  margin:0;
  padding: 0.5rem;
  .CcoBrandsList--item{
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
}
</style>
