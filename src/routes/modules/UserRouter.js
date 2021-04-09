import Router from 'koa-router'
import UserController from '@/api/UserController'
import ContentController from '@/api/ContentController'
const router = new Router()

router.prefix('/user')

router.get('/fav', UserController.userSign)
router.get('/getUserInfo', UserController.getUserInfo)
router.post('/basic', UserController.updateUserInfo)
router.post('/updatePassword', UserController.updatePassword)
// 取消 设置收藏
router.get('/setCollect', UserController.setCollect)

// 获取收藏列表
router.get('/collect', UserController.getCollectByUid)

// 获取用户发贴记录
router.get('/post', ContentController.getPostByUid)

// 删除发贴记录
router.get('/deletePost', ContentController.deletePostByUid)

// 获取用户未读消息
router.get('/getMsg', UserController.getMsg)

// 设置消息状态
router.get('/setmsg', UserController.setMsg)
export default router
