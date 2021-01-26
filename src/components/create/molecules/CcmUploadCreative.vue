<template>
  <div class="uploadCreative">
    <div
      class="ucGaralley"
    >
      <v-img
        v-for="(cObj, key) in getCRefUrls(creativerefs)"
        :key="key"
        class="ucImages"
        :src="cObj"
      />
    </div>
    <v-file-input
      v-if="inputView"
      accept="image/*"
      label="画像をアップロード"
      @change="onFileSelect"
    />
  </div>
</template>
<script>
const { mapGetters } = require('vuex')
const cfBrands = require('~/classes/cfBrands.js')
export default {
  name: 'CcmUploadCreative',
  props: {
    creativerefs: {
      type: Object,
      default: null
    },
    crfunc: {
      type: Function,
      default: null
    },
    code: {
      type: String,
      default: 'UNN'
    }
  },
  data: () => ({
    inputView: true
  }),
  computed: {
    ...mapGetters('xd/create/xdcbrand', ['getCRefUrls'])
  },
  methods: {
    onFileSelect (FILE) {
      if (this.$props.crfunc === null) {
        //
      } else if (typeof FILE === 'undefined') {
        //
      } if (FILE === null) {
        //
      } else {
        const cRef = new cfBrands.CCreativeRef()
        cRef.setFromFile(FILE, this.$props.code)
        this.$props.crfunc(cRef)
        this.inputView = false
        this.$nextTick(function () {
          this.inputView = true
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.uploadCreative{
  .ucGaralley{
    display: flex;
    flex-wrap: wrap;
    padding: 1rem!important;
    justify-content: space-around;
    .ucImages{
      width: 40%;
      flex-grow: 0;
    }
  }
}
</style>
