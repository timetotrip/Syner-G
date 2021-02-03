<template>
  <v-app id="app">
    <CgoLayoutBase>
      <template #header>
        <CcoHeader />
      </template>
      <template #main>
        <CgoUserOnly>
          <Nuxt id="Nuxt" />
        </CgoUserOnly>
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
import CgoUserOnly from '@/components/general/organisms/CgoUserOnly.vue'
import CgoLayoutBase from '@/components/general/organisms/CgoLayoutBase.vue'

export default {
  name: 'LayoutCreate',
  components: {
    CcoHeader,
    CcoNavi,
    CcoFooter,
    CgoUserOnly,
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
