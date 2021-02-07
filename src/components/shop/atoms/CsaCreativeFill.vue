<template>
  <div
    v-if="cid !== ''"
    :ref="'divArea'"
    :class="classes"
    :style="styles"
  >
    <div
      v-if="stylesets.includes('cGrad')"
      class="cfGrad"
    />
    <slot />
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
    },
    stylesets: {
      type: Array,
      default: () => { return ['undef'] }
    },
    settings: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    iObj: null,
    // aRate > 1 : landspape / aRate < 1 : port
    iaRate: 1,
    daRate: 1
  }),
  computed: {
    ...mapGetters('xd/shop/xdsshop', ['cCrePath']),
    // バインドするスタイルを生成
    styles () {
      const ret = {
        '--bgurl': `url(${this.cCrePath(this.$props.cid)})`
      }
      if (this.$props.settings.clGrad1) {
        ret['--cl-grad-1'] = this.$props.settings.clGrad1
      }
      if (this.$props.settings.clGrad2) {
        ret['--cl-grad-2'] = this.$props.settings.clGrad2
      }
      // X方向 L→大きいとき S→小さいとき
      if (this.$props.settings.mvZoomL) {
        ret['--mv-zoom-l'] = this.$props.settings.mvZoomL
        ret['--mv-zoom-s'] = this.$props.settings.mvZoomL
        if (this.$props.settings.mvZoomS) {
          ret['--mv-zoom-s'] = this.$props.settings.mvZoomS
        }
      }
      /* else if (this.$props.settings.mvZoomYL) {
        // Y方向 L→大きいとき S→小さいとき
        ret['--mv-zoom-yl'] = this.$props.settings.mvZoomYL
        ret['--mv-zoom-ys'] = this.$props.settings.mvZoomYL
        if (this.$props.settings.mvZoomYS) {
          ret['--mv-zoom-ys'] = this.$props.settings.mvZoomYS
        }
        ret['--mv-zoom-xl'] = 'auto'
        ret['--mv-zoom-xs'] = 'auto'
      }
      */
      if (this.$props.settings.mvAnimeTrans) {
        ret['--mv-anime-transition'] = this.$props.settings.mvAnimeTrans
      }
      return ret
    },
    classes () {
      const ret = ['cFill']
      if (this.$props.stylesets.includes('cGrad')) { ret.push('cfCol--grad') }
      if (this.$props.stylesets.includes('mZoom')) { ret.push('cfMov--Zoom') }
      /*
      if (this.$props.stylesets.includes('mSwin')) { ret.push('cfMov--Swin') }
      */
      if (this.iaRate > this.daRate) {
        // X cut Y fit
        ret.push('cf--XcYf')
      } else {
        // X fit Y cut
        ret.push('cf--XfYc')
      }
      return ret
    },
    cPath () {
      return this.cCrePath(this.$props.cid)
    }
  },
  watch: {
    cPath () {
      this.setImage()
    }
  },
  created () {
    this.iObj = new Image()
    this.iObj.addEventListener('load', () => {
      this.setImageAspect()
      this.setDivAspect()
      // drawImage を実行する文をここに置く
    }, false)
    this.setImage()
  },
  mounted () {
    this.$refs.divArea.addEventListener('load', () => {
      this.setDivAspect()
    })
    this.setDivAspect()
  },
  methods: {
    setImage () {
      if (this.cPath !== '') {
        this.iObj.src = this.cPath
      }
    },
    setImageAspect () {
      if (this.iObj.width === this.iObj.height) {
        this.iaRate = 1
      } else {
        this.iaRate = this.iObj.width / this.iObj.height
      }
    },
    setDivAspect () {
      if (this.$refs.divArea.clientWidth === this.$refs.divArea.clientHeight) {
        this.daRate = 1
      } else {
        this.daRate = this.$refs.divArea.clientWidth / this.$refs.divArea.clientHeight
      }
    }
  }
}
</script>
<style scoped lang="scss">
.cFill{
  --bgurl: '';
  --mv-zoom-l: 100%;
  --mv-zoom-s: auto;
  --mv-anime-transition: 30s;

  position:relative;
  background-image: var(--bgurl);
  background-position: center;

}
.cFill.cf--XcYf{
  background-size: auto var(--mv-zoom-l);
  &.cfMov--Swin{
    animation:cfBgSwigX var(--mv-anime-transition) linear infinite alternate both;
  }
  &.cfMov--Zoom{
    animation:cfBgZoomX var(--mv-anime-transition) linear infinite alternate both;
  }
}
.cFill.cf--XfYc{
  background-size: var(--mv-zoom-l) auto;
  &.cfMov--Swin{
    animation:cfBgSwigY var(--mv-anime-transition) linear infinite alternate both;
  }
  &.cfMov--Zoom{
    animation:cfBgZoomY var(--mv-anime-transition) linear infinite alternate both;
  }
}

@keyframes cfBgSwigY {
    0% { background-position-y: 100%;}
  100% { background-position-y:   0%;}
}
@keyframes cfBgSwigX {
    0% { background-position-x:   0%;}
  100% { background-position-x: 100%;}
}
@keyframes cfBgZoomY {
    0% { background-size: var(--mv-zoom-l) auto;}
  100% { background-size: var(--mv-zoom-s) auto;}
}
@keyframes cfBgZoomX {
    0% { background-size: auto var(--mv-zoom-l);}
  100% { background-size: auto var(--mv-zoom-s);}
}

.cFill.cfCol--grad{
  --cl-grad-1: #0000ff;
  --cl-grad-2: #000000;
  .cfGrad{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    mix-blend-mode: overlay;
    background: linear-gradient( 40deg,
      var(--cl-grad-1),
      var(--cl-grad-2) 30%,
      var(--cl-grad-2) 80%,
      var(--cl-grad-1)
    );
    backdrop-filter: grayscale(1);
  }
}

/*
@mixin bgPort () {
  background-size: auto 100%;
}
@mixin bgLand () {
  background-size: 100% auto;
}
.cFill{
  background-position: right;

  @include mq(SPtoTB){
    &.cfstyle--sp--land{ @include bgLand(); }
    &.cfstyle--sp--port{ @include bgPort(); }
  }
  @include mq(PCtoXL){
    &.cfstyle--pc--land{ @include bgLand(); }
    &.cfstyle--pc--port{ @include bgPort(); }
  }

  &.cfstyleset--puzzle {
    @include mq(SPtoTB){ animation:cfPuzzleSP 30s linear infinite alternate both; }
    @include mq(PCtoXL){ animation:cfPuzzlePC 30s linear infinite alternate both; }
  }
  .cfGrad{
    &.cfgrad--orange{
    }
  }
}
@keyframes cfPuzzleSP {
    0% { background-position: 80% 100%;background-size: auto 100%;}
  100% { background-position: 65%  65%;background-size: auto 200%;}
}
@keyframes cfPuzzlePC {
    0% { background-position: 80% 100%;background-size: 100% auto;}
  100% { background-position: 65%  65%;background-size: 200% auto;}
}
*/
/*
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
*/
</style>
