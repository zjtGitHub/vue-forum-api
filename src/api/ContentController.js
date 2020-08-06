import Post from '../model/Post'
import Link from '../model/Link'

class ContentController {
  /**
   * 文章列表接口
   * @param {*} ctx
   */
  async getPostList (ctx) {
    const body = ctx.query
    const sort = body.sort ? body.sort : 'created'
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.limit ? parseInt(body.limit) : 20
    const options = {}
    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog
    }
    if (typeof body.isTop !== 'undefined' && body.isTop !== '') {
      options.isTop = body.isTop
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.status = body.status
    }
    if (typeof body.isEnd !== 'undefined' && body.isEnd !== '') {
      options.isEnd = body.isEnd
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } }
    }
    console.log(options)
    const result = await Post.getList(options, sort, page, limit)
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success'
    }
  }

  /**
   * 查询友链
   * @param {*} ctx
   */
  async getLinks (ctx) {
    const result = await Link.find({ type: 'link' })
    console.log(result)
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success'
    }
  }

  /**
   * 温馨提醒
   * @param {*} ctx
   */
  async getTips (ctx) {
    const result = await Link.find({ type: 'tip' })
    console.log(result)
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success'
    }
  }

  /**
   * 本周热议
   * @param {*} ctx
   */
  async getTopWeek (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success'
    }
  }
}

export default new ContentController()
