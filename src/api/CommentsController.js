import Comment from '@/model/Comment'
import Post from '@/model/Post'
import User from '@/model/User'
import Hands from '@/model/CommentsHands'
import { getJWTPayload, checkCode } from '@/common/Utils'
class CommentsController {
  // 获取评论列表
  async getComments (ctx) {
    const params = ctx.query
    const tid = params.tid
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    let result = await Comment.getCommentsList(tid, page, limit)
    // 添加handed字段，判断当前用户是否给此条评论点赞
    let obj = {}
    if (typeof ctx.header.authorization !== 'undefined') {
      obj = await getJWTPayload(ctx.header.authorization)
    }

    if (typeof obj._id !== 'undefined') {
      result = result.map(item => item.toJSON())
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        item.handed = '0'
        const tmp = await Hands.findByCid(item._id, obj._id)
        if (tmp.length) {
          item.handed = '1'
        }
      }
    }
    const total = await Comment.queryCount(tid)
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: result,
      total: total
    }
  }

  // 获取用户最近的评论记录
  async getCommentPublic (ctx) {
    const params = ctx.query
    const result = await Comment.getCommetsPublic(params.uid, params.page, parseInt(params.limit))
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '查询最近的评论记录成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询评论记录失败！'
      }
    }
  }

  // 添加评论
  async addComment (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)

    if (result) {
      const newComment = new Comment(body)
      const obj = await getJWTPayload(ctx.header.authorization)
      newComment.cuid = obj._id
      const post = await Post.findOne({ _id: body.tid })
      newComment.uid = post.uid
      const comment = await newComment.save()
      const num = await Comment.getTotal(post.uid)
      global.ws.send(post.uid, JSON.stringify({
        event: 'message',
        message: num
      }))
      const res = await Post.updateOne({ _id: body.tid }, { $inc: { answer: 1 } })
      if (res.ok === 1 && comment._id) {
        ctx.body = {
          code: 200,
          msg: 'success',
          data: comment
        }
      } else {
        ctx.body = {
          code: 500,
          msg: 'failed'
        }
      }
    } else {
      // 图片验证码失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  // 编辑评论
  async editComment (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)

    if (result) {
      const result = await Comment.updateOne({ _id: body.cid }, { $set: body })
      ctx.body = {
        code: 200,
        msg: '修改成功',
        data: result
      }
    } else {
      // 图片验证码失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  // 采纳最佳答案
  async setBest (ctx) {
    // 对用户权限的判断，post uid -> header id
    const obj = await getJWTPayload(ctx.header.authorization)
    if (typeof obj === 'undefined' && obj._id !== '') {
      ctx.body = {
        code: '401',
        msg: '用户未登录，或者用户未受权'
      }
      return
    }
    const params = ctx.query
    const post = await Post.findOne({ _id: params.tid })
    // 说明这是作者本人，可以去设置isBest
    if (post.uid === obj._id && !post.isEnd) {
      // 设置文章为结贴状态
      const result = await Post.updateOne({ _id: params.tid }, {
        $set: {
          isEnd: 1
        }
      })
      // 设置评论为已采纳
      const result1 = await Comment.updateOne({ _id: params.cid }, { $set: { isBest: '1' } })
      ctx.body = {
        code: 200,
        msg: '设置成功'
      }
      // 为被采纳用户增加积分
      if (result.ok === 1 && result1.ok === 1) {
        // 先查评论，查出回复人id
        const comment = await Comment.findByCid(params.cid)
        const userId = comment.cuid
        const result2 = await User.updateOne({ _id: userId }, { $inc: { favs: parseInt(post.fav) } })
        if (result2.ok === 1) {
          ctx.body = {
            code: 200,
            msg: '设置成功',
            data: result2
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '设置最佳答案-更新用户失败'
          }
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '设置失败',
          data: { ...result, ...result1 }
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '帖子已结贴，无法重复设置'
      }
    }
  }

  // 设置点赞
  async setHands (ctx) {
    // 对用户权限的判断，post uid -> header id
    const obj = await getJWTPayload(ctx.header.authorization)
    if (typeof obj === 'undefined' && obj._id !== '') {
      ctx.body = {
        code: '401',
        msg: '用户未登录，或者用户未受权'
      }
      return
    }
    const params = ctx.query
    // 判断用户是否已经点赞
    const tmp = await Hands.findByCid(params.cid, obj._id)
    if (tmp.length > 0) {
      ctx.body = {
        code: 500,
        msg: '您已经点过赞，请勿重复点赞！'
      }
      return
    }
    // 新增一条点赞记录
    const newHands = new Hands({
      cid: params.cid,
      uid: obj._id
    })
    const data = await newHands.save()
    // 对应comment新增一个赞
    const result = await Comment.updateOne({ _id: params.cid }, { $inc: { hands: 1 } })
    if (result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: '点赞成功',
        data: data
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '点赞失败'
      }
    }
  }
}

export default new CommentsController()
