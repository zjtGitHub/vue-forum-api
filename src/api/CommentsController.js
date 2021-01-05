import Comment from '../model/Comment'
// import Post from '../model/Post'
// import User from '@/model/User'
class CommentsController {
  async getComments (ctx) {
    const params = ctx.query
    const tid = params.tid
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    const result = await Comment.getCommentsList(tid, page, limit)
    const total = await Comment.queryCount(tid)
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: result,
      total: total
    }
  }
}

export default new CommentsController()
