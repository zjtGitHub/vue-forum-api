import koa from 'koa'
import JWT from 'koa-jwt'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonUtil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'
import config from './config/index'
import errorHandle from './common/ErrorHandle'

const app = new koa()

const isDevMode = process.env.NODE_ENV === 'production'

// 定义公共路径,不需要jwt鉴权
// 这两个路径不需要鉴权就可以访问
const jwt = JWT({secret: config.JWT_SECRET})
    .unless({ path: [/^\/public/, /^\/auth/]})
/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonUtil({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
])

if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000)
