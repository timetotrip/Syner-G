<template>
  <div
    class="CgmLoading"
    :style="styleVariables"
  >
    <div class="CgmLoading--base">
      <div class="CgmLoading--elem" />
      <div class="CgmLoading--elem" />
      <div class="CgmLoading--elem" />
      <div class="CgmLoading--elem" />
      <div class="CgmLoading--elem" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CgmLoading',
  data: () => ({
    // drawer: false
  }),
  computed: {
    /**
     * このコンポーネント中で用いるCSS変数をまとめる.
     * @return {object}
     */
    styleVariables () {
      return {
        '--base-width': '200px',
        '--base-height': '200px'
      }
    }
  }
}
</script>
<style scoped lang="scss">
$col-gray: rgba(180,180,180,0.5);
$col-white  : rgba(180,180,180,0.5);
.CgmLoading {
  width: var(--base-width);
  height: var(--base-height);
  display: inline-block;
  overflow: hidden;
  background: none;
  .CgmLoading--base{
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
    .CgmLoading--elem{
      box-sizing: content-box;
      position: absolute;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      transform: translate(50%,50%) scale(1);
      background: $col-gray;
      animation:
        elemall-step 2s infinite cubic-bezier(0,0.5,0.5,1);
      /*
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transform: translate(80px,80px) scale(1);
      background: rgba(170, 170, 170, 0.5203686818768901);
      animation: ldio-8k3f8iml9lp 2s infinite cubic-bezier(0,0.5,0.5,1);
      */
    }
    .CgmLoading--elem:nth-child(1) {
      background: $col-gray;
      transform: translate(75%,25%) scale(1);
      animation:
        elem1st-move 0.5s infinite cubic-bezier(0,0.5,0.5,1),
        elem1st-color 2s infinite step-start;
    }
    .CgmLoading--elem:nth-child(2) {
      animation-delay: -0.5s;
      background: $col-gray;
    }
    .CgmLoading--elem:nth-child(3) {
      animation-delay: -1s;
      background: $col-gray;
    }
    .CgmLoading--elem:nth-child(4) {
      animation-delay: -1.5s;
      background: $col-white;
    }
    .CgmLoading--elem:nth-child(5) {
      animation-delay: -2s;
      background: $col-gray;
    }
  }
}
@keyframes elemall-step {
   0% { transform: translate(12px,80px) scale(0); }
  25% { transform: translate(12px,80px) scale(0); }
  50% { transform: translate(12px,80px) scale(1); }
  75% { transform: translate(80px,80px) scale(1); }
 100% { transform: translate(148px,80px) scale(1); }
}
@keyframes elem1st-move {
   0% { transform: translate(148px,80px) scale(1); }
 100% { transform: translate(148px,80px) scale(0); }
}
@keyframes elem1st-color {
   0% { background: rgba(170, 170, 170, 0.5203686818768901) }
  25% { background: rgba(170, 170, 170, 0.5203686818768901) }
  50% { background: rgba(255, 255, 255, 0.5203686818768901) }
  75% { background: rgba(170, 170, 170, 0.5203686818768901) }
 100% { background: rgba(170, 170, 170, 0.5203686818768901) }
}
</style>
