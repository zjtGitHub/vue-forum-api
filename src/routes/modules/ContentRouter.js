import Router from 'koa-router'
import ContentController from '@/api/ContentController'

const router = new Router()

router.prefix('/content')

// 上传图片
router.post('/uploadImg', ContentController.uploadImg)

// 发表新帖
router.post('/add', ContentController.addPost)
// 编辑帖子
router.post('/edit', ContentController.editPost)
export default router
