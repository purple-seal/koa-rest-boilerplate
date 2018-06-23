const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')

const app = new Koa()
const router = new Router()

const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const serve = require('koa-static')

const routes = require('./api/routes')

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(routes.routes())
  .use(router.allowedMethods())
  .use(serve('./client/dist', {}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

const port = config.get('port') || 3000
module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
