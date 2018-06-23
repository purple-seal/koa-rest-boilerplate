const Router = require('koa-router')

const controller = require('../controller/api')

const router = new Router({
  prefix: '/api'
})

router.get('/', async function (ctx) {
  ctx.body = await controller.get(ctx.query)
})

module.exports = router
