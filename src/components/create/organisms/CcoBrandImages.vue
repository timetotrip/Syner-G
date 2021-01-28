<template>
  <div v-if="brand !== null">
    <h3>
      ロゴやブランドを印象づける画像を投稿しよう
    </h3>
    <CcmUploadCreative
      :cids="brand.creativeIds"
      :pickups="{ [brand.logo]: 'LOGO' }"
      :selectfunc="onCrSelect"
      :clickfunc="onCrClick"
    />
  </div>
</template>
<script>
export default {
  name: 'CcoBrandImages',
  props: {
    brand: {
      type: Object,
      default: null
    }
  },
  methods: {
    onCrSelect (FILE) {
      console.log('CCO brand image select file')
      const bid = this.$props.brand.id
      const cid = `B-${this.$props.brand.id}-${Math.random().toString(32).substring(4)}`
      this.$store.dispatch('xd/create/xdcbrand/pushBrandCreative', { cid, FILE })
      if (this.$props.brand.logo === '') {
        this.$store.dispatch('xd/create/xdcbrand/updateBrandLogo', { bid, cid })
      }
    },
    onCrClick (cid) {
      console.log('CCO brand image click ' + cid)
      const bid = this.$props.brand.id
      this.$store.dispatch('xd/create/xdcbrand/updateBrandLogo', { bid, cid })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
