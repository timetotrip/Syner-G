<template>
  <div
    :class="['CgaFtrBtn', { 'CgaFtrBtn--active': isActive }]"
    @click="iconClick()"
  >
    <font-awesome-icon
      class="CgaFtrBtn--icon"
      :icon="icon"
    />
    <p class="CgaFtrBtn--label">
      {{ label }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'CgaFooterBtn',
  props: {
    label: {
      type: String,
      default: 'ラベル'
    },
    icon: {
      type: Array,
      default: () => { return ['fas', 'location-arrow'] }
    },
    activechecker: {
      type: Object,
      default: null
    },
    clickfunc: {
      type: Function,
      default: null
    }
  },
  computed: {
    isActive () {
      if (this.$props.activechecker === null) {
        // NTD
        return false
      } else if (typeof this.$props.activechecker.dist !== 'undefined' && typeof this.$props.activechecker.dir !== 'undefined') {
        //
        const dist = this.$props.activechecker.dist
        const dir = this.$props.activechecker.dir
        const path = this.$route.path
        switch (dist) {
          case 'lowwer':
            if (path.indexOf(dir) === 0) {
              return true
            }
            break
          case 'current':
            if (path === dir || path === (dir + '/')) {
              return true
            }
            break
          default:
            return false
        }
      }
      return false
    }
  },
  mounted () {
    console.log('CGA FtrBtn mounted ' + this.$route.path)
  },
  methods: {
    iconClick () {
      if (this.$props.clickFunc !== null) {
        this.$props.clickfunc(this.$props.label)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.CgaFtrBtn{
  text-align: center;
  color: gray;
  &.CgaFtrBtn--active{
    color: black;
  }
  .CgaFtrBtn--icon{
    margin: 0;
    padding: 0;
    font-size: 2rem;
    width: 3.4rem;
  }
  .CgaFtrBtn--label{
    margin: 0.2rem 0 0 0;
    padding: 0;
    font-size: 0.4rem;
    font-weight: bold;
    letter-spacing: 0;
  }
  .CgaFtrBtn--sheet{
    padding: 1rem;
    *{
      margin: 0
    }
  }
}
</style>
