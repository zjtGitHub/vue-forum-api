import combineRoutes from 'koa-combine-routers'

import PublicRouter from './PublicRouter'
import LoginRouter from './LoginRouter'


export default combineRoutes(PublicRouter, LoginRouter)
