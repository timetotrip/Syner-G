<template>
  <v-app id="app" class="layoutcreate">
    <CcoHeader id="Header" />
    <CgoUserOnly id="Content">
      <Nuxt id="Nuxt" />
    </CgoUserOnly>
    <CcoFooter id="Footer" />
    <CcoNavi id="Navigation" />
  </v-app>
</template>

<script>
import CcoHeader from '@/components/create/organisms/CcoHeader.vue'
import CcoNavi from '@/components/create/organisms/CcoNavi.vue'
import CcoFooter from '@/components/create/organisms/CcoFooter.vue'
import CgoUserOnly from '@/components/general/organisms/CgoUserOnly.vue'

export default {
  name: 'LayoutCreate',
  components: {
    CcoHeader,
    CcoNavi,
    CcoFooter,
    CgoUserOnly
  }
}

</script>

<style lang="scss">
$b-height: 60px;
#app.layoutcreate{
  position: relative;
  widows: 100vw;
  height: 100vh;
  overflow: hidden;
  #Header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $b-height;
  }
  #Content{
    position: absolute;
    top: $b-height;
    left: 0;
    right: 0;
    bottom: $b-height;
    max-height: calc( 100% - 104px );
    overflow-y: scroll;
    #Nuxt{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      overflow-y: scroll;
      padding: 1rem;
    }
  }
  #Footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: $b-height;
  }
}
</style>
