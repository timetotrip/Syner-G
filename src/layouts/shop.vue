<template>
  <v-app id="app">
    <CgoLayoutBase>
      <template #header>
        <CsoHeader />
      </template>
      <template #main>
        <Nuxt id="Nuxt" />
      </template>
    </CgoLayoutBase>
  </v-app>
</template>

<script>
import CsoHeader from '@/components/shop/organisms/CsoHeader.vue'
import CsoNavi from '@/components/shop/organisms/CsoNavi.vue'
// import CsoFooter from '@/components/shop/organisms/CsoFooter.vue'
import CgoLayoutBase from '@/components/general/organisms/CgoLayoutBase.vue'

export default {
  name: 'LayoutCreate',
  components: {
    CsoHeader,
    CsoNavi,
    // CsoFooter,
    CgoLayoutBase
  }
}

</script>

<style lang="scss">
#Nuxt{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
