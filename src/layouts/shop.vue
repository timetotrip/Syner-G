<template>
  <v-app id="app">
    <CgoLayoutBase>
      <template #header>
        <CsoHeader />
      </template>
      <template #content>
        <Nuxt id="Nuxt" />
      </template>
      <template #footer>
        <!--CsoFooter />-->
      </template>
      <template #navigation>
        <CsoNavi />
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
</style>
