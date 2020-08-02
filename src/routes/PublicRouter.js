import Router from 'koa-router'
import publicController from '../api/PublicController'
import contentController from '../api/ContentController'

const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', publicController.getCaptcha)
router.get('/list', contentController.getPostList)
export default router
