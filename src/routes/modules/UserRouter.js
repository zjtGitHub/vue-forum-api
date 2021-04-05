import Router from 'koa-router'
import UserController from '@/api/UserController'
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
export default router
