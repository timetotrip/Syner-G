
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLocationArrow, faTable, faTshirt, faSearchDollar, faUsers, faRandom, faImages, faTags, faShoppingBag, faStore, faShareAlt, faShoppingCart, faForward } from '@fortawesome/free-solid-svg-icons'

library.add(faLocationArrow, faTable, faTshirt, faSearchDollar, faUsers, faRandom, faImages, faTags, faShoppingBag, faStore, faShareAlt, faShoppingCart, faForward)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
