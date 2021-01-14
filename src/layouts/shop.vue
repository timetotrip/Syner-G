<template>
  <v-app id="app">
    <CgoLayoutBase>
      <template #header>
        <CcoHeader />
      </template>
      <template #content>
        <Nuxt id="Nuxt" />
      </template>
      <template #footer>
        <CcoFooter />
      </template>
      <template #navigation>
        <CcoNavi />
      </template>
    </CgoLayoutBase>
  </v-app>
</template>

<script>
import CcoHeader from '@/components/create/organisms/CcoHeader.vue'
import CcoNavi from '@/components/create/organisms/CcoNavi.vue'
import CcoFooter from '@/components/create/organisms/CcoFooter.vue'
import CgoLayoutBase from '@/components/general/organisms/CgoLayoutBase.vue'

export default {
  name: 'LayoutCreate',
  components: {
    CcoHeader,
    CcoNavi,
    CcoFooter,
    CgoLayoutBase
  }
}

</script>

<style lang="scss">
</style>
