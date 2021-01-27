<template>
  <div>
    <h3>
      ロゴやブランドを印象づける画像を投稿しよう
    </h3>
    <CcmUploadCreative
      :creativerefs="pe_creativeRefs"
      :crfunc="onCrSelect"
      :code="`P-${product.id}`"
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
  name: 'CcoBrandCreatives',
  props: {
    brand: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    bt_creativeRefs: {}
  }),
  computed: {
    isEdited () {
      if (!this.$props.brand.isEqualCreatives(this.bt_creativeRefs)) {
        return true
      }
      return false
    }
  },
  mounted () {
    if (typeof this.$props.brand === 'undefined') {
      //
    } else if (this.$props.brand === null) {
      //
    } else {
      this.bt_creativeRefs = this.$props.brand.creatives
    }
  },
  methods: {
    onCrSelect (cRef) {
      console.log('CCO brand image select file')
      this.$set(this.pe_creativeRefs, cRef.id, cRef)
    },
    updateImages () {
      console.log('CCO brand image update ' + this.$props.brand.id)
      if (this.isEdited) {
        this.$store.dispatch('xd/create/xdcbrand/updateBrandImage', this.bt_creativeRefs)
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
