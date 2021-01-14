<template>
  <CgmFooterBase>
    <CgaFooterBtn
      :label="'TOP'"
      :icon="['fas', 'table']"
      :activechecker="{ dist: 'current', dir: '/create' }"
      :clickfunc="gotoNextTab"
    />
    <!--
    <CgaFooterBtn
      :label="'CRIATIVE'"
      :icon="['fas', 'images']"
      :activechecker="{ dist: 'lowwer', dir: '/create/criative' }"
      :clickfunc="changeActiveSheet"
    />
    <CgaFooterSheet :active="activeSheet==='CRIATIVE'" :disablefunc="changeActiveSheet">
      クリエイティブ準備中
    </CgaFooterSheet>
    <CgaFooterBtn
      :label="'MYBRAND'"
      :icon="['fas', 'tags']"
      :activechecker="{ dist: 'lowwer', dir: '/create/brand' }"
      :clickfunc="changeActiveSheet"
    />
    <CgaFooterSheet :active="activeSheet==='MYBRAND'" :disablefunc="changeActiveSheet">
      <CcoBrandsList :clickfunc="gotoNextBrand" />
    </CgaFooterSheet>
    <CgaFooterBtn
      :label="'MYSHOP'"
      :icon="['fas', 'store']"
      :activechecker="{ dist: 'lowwer', dir: '/create/shop' }"
      :clickfunc="changeActiveSheet"
    />
    -->
    <CgaFooterSheet :active="activeSheet==='MYSHOP'" :disablefunc="changeActiveSheet">
      マイショップ準備中
    </CgaFooterSheet>
    <CgaFooterBtn
      :label="'SHOPING'"
      :icon="['fas', 'shopping-bag']"
      :clickfunc="changeActiveSheet"
    />
    <CgaFooterSheet :active="activeSheet==='SHOPING'" :disablefunc="changeActiveSheet">
      マイショップ準備中
    </CgaFooterSheet>
  </CgmFooterBase>
</template>
<script>
import CgmFooterBase from '@/components/general/molecules/CgmFooterBase.vue'
import CgaFooterBtn from '@/components/general/atoms/CgaFooterBtn.vue'
import CgaFooterSheet from '@/components/general/atoms/CgaFooterSheet.vue'
export default {
  name: 'CsoFooter',
  components: {
    CgmFooterBase,
    CgaFooterBtn,
    CgaFooterSheet
  },
  data: () => ({
    activeSheet: ''
  }),
  methods: {
    changeActiveSheet (key) {
      this.activeSheet = key
    },
    gotoNextTab (key) {
      this.activeSheet = ''
      let next = ''
      switch (key) {
        case 'TOP':
          next = '/create'
      }
      this.$router.push(next)
    },
    gotoNextBrand (bid) {
      console.log('goto next')
      this.activeSheet = ''
      this.$router.push(`/create/brand/${bid}`)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
