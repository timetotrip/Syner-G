<template>
  <h2 class="csaTitle">
    <slot />
  </h2>
</template>
<script>
export default {
  name: 'CsaTitle',
  props: {
  },
  data: () => ({
    cvs: null
  }),
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.csaTitle {
  font-size: 3.2rem;
  word-break: keep-all;
  font-family: "Yusei Magic";
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  text-shadow: 4px 4px rgb(255, 123, 0), 8px 8px #000000;
  letter-spacing: 0.4rem;
  line-height: 1.2;
  .csaCanvas{
    width: 100%;
  }
}
</style>
