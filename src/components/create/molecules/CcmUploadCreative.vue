<template>
  <div class="uploadCreative">
    <div
      class="ucGaralley"
    >
      <div
        v-for="cid in cids"
        :key="cid"
        :class="['ucArea',{ 'uc--pickup': pickUp(cid) !== '' }]"
      >
        <v-img
          :class="['ucImage']"
          :src="cCrePath(cid)"
          @click="onClick(cid)"
        />
        <p
          v-if="pickUp(cid) !== ''"
          :class="['ucPickUp']"
        >
          {{ pickUp(cid) }}
        </p>
      </div>
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
    cids: {
      type: Array,
      default: null
    },
    code: {
      type: String,
      default: 'UNN'
    },
    pickups: {
      type: Object,
      default: () => { return {} }
    },
    selectfunc: {
      type: Function,
      default: (FILE) => { return FILE }
    },
    clickfunc: {
      type: Function,
      default: (cid) => { return cid }
    },
    canupload: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    inputView: true
  }),
  computed: {
    ...mapGetters('xd/create/xdcbrand', ['cCrePath'])
  },
  mounted () {
    console.log('UP CRE MOUNTED')
    this.inputView = this.$props.canupload
  },
  methods: {
    onFileSelect (FILE) {
      this.$props.selectfunc(FILE)
    },
    onClick (cid) {
      this.$props.clickfunc(cid)
    },
    pickUp (cid) {
      if (typeof this.$props.pickups[cid] === 'undefined') {
        return ''
      } else {
        return this.$props.pickups[cid]
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
    .ucArea{
      position: relative;
      width: 40%;
      flex-grow: 0;
      .ucImage{
        width: 100%;
      }
    }
    .ucArea.uc--pickup{
      border: red solid 3px;
      .ucPickUp{
        position:absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
