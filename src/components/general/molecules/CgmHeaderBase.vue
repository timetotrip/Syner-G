<template>
  <div
    class="HeaderBase"
  >
    <v-toolbar-title class="hbTitle">
      <h1 v-if="logo!==''">
        <CgmCreativeBox
          :src="cCrePath(logo)"
        />
      </h1>
      <h1 v-else-if="title!==''">
        {{ title }}
      </h1>
      <h1 v-else>
        Syner-G オンラインショップ
      </h1>
    </v-toolbar-title>
    <div>
      <slot />
      <v-app-bar-nav-icon v-if="navi" @click.stop="$nuxt.$emit('navigation-toggle')" />
    </div>
  </div>
</template>
<script>
import CgmCreativeBox from '@/components/general/molecules/CgmCreativeBox.vue'
const { mapGetters } = require('vuex')
export default {
  name: 'CgmHeaderBase',
  components: {
    CgmCreativeBox
  },
  props: {
    logo: {
      type: String,
      default: ''
    },
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
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cCrePath'])
  },
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
  // background: rgba(211, 211, 211, 0.5);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  .hbTitle{
    max-width: 30%;
    max-height: 100%;
  }
}
</style>
