import Router from 'koa-router'
import UserController from '@/api/UserController'
const router = new Router()

router.prefix('/user')

router.get('/fav', UserController.userSign)
router.get('/getUserInfo', UserController.getUserInfo)
router.post('/basic', UserController.updateUserInfo)
router.post('/updatePassword', UserController.updatePassword)
export default router
