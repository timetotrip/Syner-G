<template>
  <div class="CsmFbs">
    <v-btn
      v-for="menu in menus"
      :key="menu.key"
      class="fbsButton"
      fab
      dark
      middium
      @click="menu.clickfunc()"
    >
      <font-awesome-icon
        class="fbsIcon"
        :icon="menu.icon"
      />
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'CsmFloatButtons',
  props: {
    menus: {
      type: Array,
      default: () => [{
        key: 'basic',
        title: '基本',
        icon: '',
        clickfunc: () => { return null }
      }]
    }
  },
  data () {
    return {
      // appeared: ''
    }
  },
  mounted () {
    // this.appeared = this.$props.defaultkey
  },
  methods: {
    // setAppeared (key) {
    // this.appeared = key
    // }
  }
}
</script>
<style scoped lang="scss">
.CsmFbs{
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column-reverse;
  .fbsButton{
    margin-top: 1rem;
    background:
      repeating-conic-gradient(
        rgba(0, 0, 0, 0.7) 0,
        rgba(0, 0, 0, 0.7) 4%,
        rgba(40, 40, 40, 0.7) 5%,
        rgba(0, 0, 0, 0.7) 6%,
        rgba(0, 0, 0, 0.7) 50%
      ),
      repeating-radial-gradient(
        rgba(0, 0, 0, 1) 0%,
        rgba(220, 220, 220, 1) 1%,
        rgba(0, 0, 0, 1) 2%,
        rgba(0, 0, 0, 1) 3%,
        rgba(0, 0, 0, 1) 5%
      );
    box-shadow: 2px 2px 0px 0px  rgba(0, 0, 0, 0.3);
    font-size: 1.6rem;
    /*
    animation: neon 3s infinite;
    --shadow-color: #ffeecd;
    --shadow-color-light: white;
    */
    .fbsIcon{
      font-size: 1.6rem;
      animation: neon 10s infinite both;
      --shadow-color: rgb(255, 255, 255);
      --shadow-color-light:  rgba(255, 255, 255, 0.4);
      color: var(--shadow-color);
    }
  }
  .fbsButton:first-child{
    .fbsIcon{
      --shadow-color: rgba(255, 145, 0, 1);
    }
  }
}
@keyframes neon {
  0%, 60% {
    filter:
      drop-shadow(0px 0px 1px var(--shadow-color))
      drop-shadow(0px 0px 3px var(--shadow-color-light));
  }
  40%{
    filter:
      drop-shadow(0px 0px 1px var(--shadow-color))
      drop-shadow(0px 0px 3px var(--shadow-color-light))
      drop-shadow(0px 0px 1px var(--shadow-color-light));
  }
  70% {
    filter:
      drop-shadow(0px 0px 1px var(--shadow-color))
      drop-shadow(0px 0px 3px var(--shadow-color-light))
      drop-shadow(0px 0px 1px var(--shadow-color-light))
      drop-shadow(0px 1px 1px var(--shadow-color-light))
      drop-shadow(1px 0px 1px var(--shadow-color-light))
      drop-shadow(1px 1px 1px var(--shadow-color-light)) ;
  }
  80%,100% {
    filter:
      drop-shadow(0px 0px 1px var(--shadow-color))
      drop-shadow(0px 0px 3px var(--shadow-color-light));
  }
}
</style>
