export default /* async */ ({ app, store }) => {
  app.router.afterEach((context, to, from) => {
    // ページ遷移ごとに行いたい処理
    console.log('RT ACT STRAT')
    // console.log(context)
    switch (context.name) {
      case 'mystore':
        console.log('RT ACT STRAT GO TO MYPAGE')
        break
      default:
        console.log(`RT ACT STRAT GO TO ?? ${context.name}`)
    }
  })
}
