<template>
  <div>
    <h3>
      ロゴやブランドを印象づける画像を投稿しよう
    </h3>
    <CcmUploadCreative
      :creativerefs="cRefs"
      :crfunc="onCrSelect"
      :code="`B-${brand.id}`"
      :clickfunc="onCrClick"
      :pickups="{ [bt_logo]: 'LOGO' }"
    />
    <v-btn
      :disabled="!isEdited"
      @click="updateImages()"
    >
      更新
    </v-btn>
  </div>
</template>
<script>
// const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandImages',
  props: {
    brand: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    bt_creativeRefs: {},
    bt_logo: ''
  }),
  computed: {
    isEdited () {
      if (!this.$props.brand.isEqualCreatives(this.bt_creativeRefs)) {
        return true
      } else if (this.bt_logo !== this.$props.brand.logo) {
        return true
      }
      return false
    },
    cRefs () {
      if (typeof this.$props.brand === 'undefined') {
        return {}
      } else if (this.$props.brand === null) {
        return {}
      } else {
        return Object.assign({}, this.$props.brand.creatives)
      }
    }
  },
  mounted () {
    this.bt_creativeRefs = this.$props.brand.creatives
    this.bt_logo = this.$props.brand.logo
  },
  methods: {
    onCrSelect (cRef) {
      console.log('CCO brand image select file')
      this.$set(this.bt_creativeRefs, cRef.id, cRef)
    },
    onCrClick (cid) {
      console.log('CCO brand image click ' + cid)
      this.bt_logo = cid
    },
    updateImages () {
      console.log('CCO brand image update ' + this.$props.brand.id)
      if (!this.$props.brand.isEqualCreatives(this.bt_creativeRefs)) {
        this.$store.dispatch('xd/create/xdcbrand/updateBrandImage', this.bt_creativeRefs)
      }
      if (this.bt_logo !== this.$props.brand.logo) {
        this.$store.dispatch('xd/create/xdcbrand/updateBrandLogo', { bid: this.$props.brand.id, cid: this.bt_logo})
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
