<template>
  <div class="csaBoard" :style="styles">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'CsaBoard',
  props: {
    widthper: {
      type: Number,
      default: 100
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    styles () {
      let marginL = '0'
      let marginR = '0'
      switch (this.$props.align) {
        case 'center':
          marginL = 'auto'
          marginR = 'auto'
          break
        case 'right':
          marginL = 'auto'
          break
        case 'left':
          marginR = 'auto'
          break
      }
      return {
        '--witdhper': `${this.$props.widthper}%`,
        '--margin-l': marginL,
        '--margin-r': marginR
      }
    }
  }
}
</script>
<style scoped lang="scss">
.csaBoard{
  --witdhper: 100%;
  --margin-r: 0;
  --margin-l: 0;
  padding: 1rem;
  width: var(--witdhper);
  margin-left: var(--margin-l);
  margin-right: var(--margin-r);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
}
</style>
