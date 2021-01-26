import CreativeView from '~/store/xp/xdpcreativeview.js'
const creativeView = new CreativeView()

export default class {
  constructor () {
    this.state = {
      ...creativeView.state
    }

    this.mutations = {
      ...creativeView.mutations
    }

    this.actions = {
      ...creativeView.actions
    }

    this.getters = {
      ...creativeView.getters
    }
  }
}
