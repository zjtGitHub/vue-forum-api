import Koa from 'koa'
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
import WebSocketServer from './config/WebSocket'

const app = new Koa()
const ws = new WebSocketServer()
ws.init()
global.ws = ws

const isDevMode = process.env.NODE_ENV === 'production'

// 定义公共路径,不需要jwt鉴权
// 这两个路径不需要鉴权就可以访问
const jwt = JWT({ secret: config.JWT_SECRET })
  .unless({ path: [/^\/public/, /^\/auth/] })
/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 5 * 1024 * 1024
    },
    onError: err => {
      console.log('koabody err', err)
    }
  }),
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

app.listen(4396)
console.log('server running at 4396')
