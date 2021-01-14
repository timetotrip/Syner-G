import Vue from 'vue'
let timeoutIdScl = 0
let timeoutIdRsz = 0
Vue.use({
  install (Vue) {
    const $window = Vue.observable({
      width: 0,
      height: 0,
      pageYOffset: 0
    })

    // SSR 時にエラーが出るため process.browser で分岐
    // Nuxt を使用しなければこの分岐は削除してください
    if (process.browser) {
      const onScroll = () => {
        if (timeoutIdScl) { return }
        timeoutIdScl = setTimeout(function () {
          timeoutIdScl = 0
          $window.pageYOffset = global.pageYOffset
        }, 500)
      }
      const onResize = () => {
        if (timeoutIdRsz) { return }
        timeoutIdRsz = setTimeout(function () {
          timeoutIdRsz = 0
          $window.width = document.documentElement.clientWidth
          $window.height = global.innerHeight
        }, 500)
      }
      global.addEventListener('scroll', onScroll)
      global.addEventListener('resize', onResize)
      // 一度だけスクロールハンドラとリサイズハンドラを直接呼んで初期値をセット
      onScroll()
      onResize()
    }

    Vue.prototype.$window = $window
  }
})
