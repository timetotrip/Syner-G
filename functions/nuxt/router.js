import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _788555da = () => interopDefault(import('..\\pages\\create\\index.vue' /* webpackChunkName: "pages/create/index" */))
const _73651f93 = () => interopDefault(import('..\\pages\\create\\brand\\index.vue' /* webpackChunkName: "pages/create/brand/index" */))
const _45d4b5a4 = () => interopDefault(import('..\\pages\\create\\shop\\index.vue' /* webpackChunkName: "pages/create/shop/index" */))
const _72682a8a = () => interopDefault(import('..\\pages\\create\\brand\\_id.vue' /* webpackChunkName: "pages/create/brand/_id" */))
const _0d9bd10c = () => interopDefault(import('..\\pages\\create\\shop\\_id.vue' /* webpackChunkName: "pages/create/shop/_id" */))
const _c3851854 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _2d2273be = () => interopDefault(import('..\\pages\\_id.vue' /* webpackChunkName: "pages/_id" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/create",
    component: _788555da,
    name: "create"
  }, {
    path: "/create/brand",
    component: _73651f93,
    name: "create-brand"
  }, {
    path: "/create/shop",
    component: _45d4b5a4,
    name: "create-shop"
  }, {
    path: "/create/brand/:id",
    component: _72682a8a,
    name: "create-brand-id"
  }, {
    path: "/create/shop/:id",
    component: _0d9bd10c,
    name: "create-shop-id"
  }, {
    path: "/",
    component: _c3851854,
    name: "index"
  }, {
    path: "/:id",
    component: _2d2273be,
    name: "id"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
