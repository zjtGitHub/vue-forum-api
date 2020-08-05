import Post from '../model/Post'

class ContentController {
  /**
   * 文章列表接口
   * @param {*} ctx
   */
  async getPostList (ctx) {
    const body = ctx.query
    // 测试数据
    // const post = new Post({
    //   title: 'title11111',
    //   content: 'contentsdfsdfsdfsdfsfsdfsdf',
    //   catalog: '',
    //   fav: 20,
    //   isEnd: '0',
    //   reads: 10,
    //   answer: 20,
    //   status: '0',
    //   isTop: '0',
    //   sort: 'created',
    //   tags: [{
    //     name: '',
    //     class: ''
    //   }]
    // })

    // const tmp = await post.save()

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
}

export default new ContentController()
