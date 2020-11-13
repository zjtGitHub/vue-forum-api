import combineRoutes from 'koa-combine-routers'

import PublicRouter from './PublicRouter'
import LoginRouter from './LoginRouter'
import UserRouter from './UserRouter'

export default combineRoutes(
  PublicRouter,
  LoginRouter,
  UserRouter
)
