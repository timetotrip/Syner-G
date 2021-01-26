<template>
  <v-sheet
    outlined
    :v-if="myShops!==null"
    class="CcoShopsList"
  >
    <p
      v-for="(bname, bid) in myShops"
      :key="bid"
      class="CcoShopsList--item"
      @click="onClick(bid)"
    >
      {{ bid }} 編集
    </p>
    <!--
    <p
      class="CcoShopsList--item"
      @click="onClick('')"
    >
      ＋ ブランド新規作成
    </p>
    -->
  </v-sheet>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CcoShopsList',
  props: {
    clickfunc: {
      type: Function,
      default: null
    }
  },
  computed: {
    ...mapGetters('xd/general/xdgcuser', ['myShops'])
  },
  methods: {
    onClick (sid) {
      if (this.$props.clickFunc !== null) {
        this.$props.clickfunc(sid)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.CcoShopsList{
  margin:0;
  padding: 0.5rem;
  .CcoShopsList--item{
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
}
</style>
