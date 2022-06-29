/*
 * @Author: zhangjintong
 * @Date: 2021-03-10 23:18:42
 * @LastEditTime: 2022-06-29 23:37:27
 * @LastEditors: zhangjintong
 * @FilePath: \vue-forum-api\src\routes\modules\PublicRouter.js
 */
import Router from 'koa-router'
import publicController from '@/api/PublicController'
import contentController from '@/api/ContentController'
import userController from '@/api/UserController'
import commentsController from '@/api/CommentsController'
const router = new Router()

router.prefix('/public')

// 获取验证码
router.get('/getCaptcha', publicController.getCaptcha)

// 获取文章列表
router.get('/list', contentController.getPostList)

// 获取文章详情
router.get('/detail', contentController.getPostDetail)

// 获取评论列表
router.get('/comment', commentsController.getComments)

// 获取友链
router.get('/links', contentController.getLinks)

// 温馨提醒
router.get('/tips', contentController.getTips)

// 本周热议
router.get('/topWeek', contentController.getTopWeek)

// 获取头条
router.get('/getHeadlines', contentController.getHeadlines)

// 获取头条详情
router.get('/getHeadlinesDetail', contentController.getHeadlinesDetail)

// 确认修改邮件
router.get('/reset-email', userController.updateUsername)

// 获取用户基本信息
router.get('/info', userController.getBasicInfo)

// 获取用户最近的发贴记录
router.get('/latestPost', contentController.getPostPublic)

// 获取用户最近的评论记录
router.get('/latestComment', commentsController.getCommentPublic)

export default router
