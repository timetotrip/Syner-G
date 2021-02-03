<template>
  <div v-if="cid !== ''" class="cFill cfLTtoRB" :style="styles" >
    <slot/>
  </div>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CsaCreativeFill',
  props: {
    cid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cCrePath']),
    // バインドするスタイルを生成
    styles () {
      return {
        '--bgurl': `url(${this.cCrePath(this.$props.cid)})`
      }
    }
  }

}
</script>
<style scoped lang="scss">
.cFill{
  --bgurl: '';
  background-image: var(--bgurl);
  background-position: right;
  background-size: auto 100%;
  &.cfZigZag{
    background-size: 200%;
    animation: cfBgZigZag 120s linear infinite;
  }
  &.cfLTtoRB {
    background-size: auto 100%;
    animation:
      cfBgLtoRs 30s linear infinite alternate both,
      cfBgTtoBs 30s linear infinite alternate both,
      cfBgHzoom 30s linear infinite alternate both;
  }
}
@keyframes cfBgTtoB {
    0% { background-position-y:   0%;}
  100% { background-position-y: 100%;}
}
@keyframes cfBgBtoT {
    0% { background-position-y: 100%;}
  100% { background-position-y:   0%;}
}
@keyframes cfBgLtoR {
    0% { background-position-x:   0%;}
  100% { background-position-x: 100%;}
}
@keyframes cfBgRtoL {
    0% { background-position-x: 100%;}
  100% { background-position-x:   0%;}
}
@keyframes cfBgLtoRs {
    0% { background-position-x:   20%;}
  100% { background-position-x:   80%;}
}
@keyframes cfBgRtoLs {
    0% { background-position-x:   80%;}
  100% { background-position-x:   20%;}
}
@keyframes cfBgHzoom {
    0% { background-size: auto 100%;}
  100% { background-size: auto 200%;}
}
@keyframes cfBgZigZag {
    0% { background-position: 0%    0%;}
   10% { background-position: 100% 20%;}
   20% { background-position: 0%   40%;}
   30% { background-position: 100% 60% ;}
   40% { background-position: 0%   80%;}
   50% { background-position: 100% 100%;}
   60% { background-position: 0%   80%;}
   70% { background-position: 100% 60%;}
   80% { background-position: 0%   40%;}
   90% { background-position: 100% 20%;}
  100% { background-position: 0%  100%;}
}
</style>
