import Router from 'koa-router'
import ContentController from '@/api/ContentController'

const router = new Router()

router.prefix('/content')

router.post('/uploadImg', ContentController.uploadImg)

export default router
