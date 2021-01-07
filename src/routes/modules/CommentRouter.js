import Router from 'koa-router'
import CommentsController from '@/api/CommentsController'

const router = new Router()

router.prefix('/comment')

// 添加评论
router.post('/reply', CommentsController.addComment)
// 更新评论
router.post('/update', CommentsController.editComment)
// 采纳评论
router.get('/accept', CommentsController.setBest)
export default router
