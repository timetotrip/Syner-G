<template>
  <div class="csaDBar" :style="styles" />
</template>
<script>
export default {
  name: 'CsaDivisionBar',
  props: {
    widthper: {
      type: Number,
      default: 100
    },
    align: {
      type: String,
      default: 'center'
    },
    type: {
      type: String,
      default: 'grad'
    },
    color: {
      type: String,
      default: 'orange'
    }
  },
  computed: {
    styles () {
      let marginL = '0'
      let marginR = '0'
      let cl1 = 'black'
      let cl2 = 'white'
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
      switch (this.$props.color) {
        case 'orange':
          cl1 = 'orange'
          cl2 = 'red'
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
        '--margin-r': marginR,
        '--cl1': cl1,
        '--cl2': cl2
      }
    }
  }
}
</script>
<style scoped lang="scss">
.csaDBar{
  --witdhper: 100%;
  --margin-r: 0;
  --margin-l: 0;
  --cl1:black;
  --cl2:white;
  width: var(--witdhper);
  margin-left: var(--margin-l);
  margin-right: var(--margin-r);
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  height: 1px;
  border-radius: 0.2px;
  background-size: 300%;
  background-image:
  repeating-linear-gradient(
     90deg,
     var(--cl1) 0%,
     var(--cl2) 10%,
     var(--cl1) 25%
    );;
  animation: gradmove 5s infinite both;
}
@keyframes gradmove {
  0%{
    background-position: 0%;
  }
  100%{
    background-position: 100%;
  }
}
</style>
