<template>
  <CgmHeaderBase
    class="ShopHeader"
    :navi="false"
    :title="`${cShopName} ONLINE SHOP`"
  >
    <div
      class="shMngButton"
      @click="onMngBtnClick"
    >
      管理者
    </div>
  </CgmHeaderBase>
</template>
<script>
import CgmHeaderBase from '@/components/general/molecules/CgmHeaderBase.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CsoHeader',
  components: {
    CgmHeaderBase
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cShopName', 'cLinkShopCreate'])
  },
  methods: {
    onMngBtnClick () {
      this.$router.push(this.cLinkShopCreate)
    }
  }
}
</script>
<style scoped lang="scss">
.ShopHeader{
  .shMngButton{
    background: orange;
    color: white;
    font-size: 0.6rem;
    padding: 0.5rem;
    border-radius: 3px;
    filter: drop-shadow(1px 1px 1px black);
  }
}
</style>
