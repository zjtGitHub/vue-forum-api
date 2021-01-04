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

    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: result
    }
  }
}

export default new CommentsController()
