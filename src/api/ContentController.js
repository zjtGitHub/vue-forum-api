import Post from '../model/Post'
import Link from '../model/Link'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import config from 'config'
// import { dirExists } from '@/common/Utils'
import mkdir from 'make-dir'
class ContentController {
  /**
   * 文章列表接口
   * @param {*} ctx
   */
  async getPostList (ctx) {
    const body = ctx.query
    // 测试数据
    // const post = new Post({
    //   title: 'test title',
    //   content: 'test content',
    //   catalog: 'ask',
    //   fav: 20,
    //   isEnd: '0',
    //   reads: '0',
    //   answer: '0',
    //   status: '0',
    //   isTop: '0',
    //   sort: '0',
    //   tags: [{
    //     name: '精华',
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

  // 上传图片
  async uploadImg (ctx) {
    // console.log(ctx.request.files)
    const file = ctx.request.files.file
    // 图片名称 图片格式 存储位置 返回前台可以读取的路径
    const ext = file.name.split('.').pop()
    // console.log('🚀 ~ file: ContentController.js ~ line 108 ~ ContentController ~ uploadImg ~ ext', ext)
    const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`
    // console.log('🚀 ~ file: ContentController.js ~ line 110 ~ ContentController ~ uploadImg ~ dir', dir)
    // 判断文件夹是否存在，不存在则创建
    await mkdir(dir)
    // 储存文件到指定路径，给一个唯一名称
    const picname = uuid()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`

    // 方法一
    reader.pipe(upStream)
    // 方法二
    // let totalLength = 0
    // reader.on('data', function (chunk) {
    //   totalLength += chunk.length
    //   console.log('🚀 ~ file: ContentController.js ~ line 127 ~ ContentController ~ totalLength', totalLength)
    //   if (upStream.write(chunk) === false) {
    //     reader.pause()
    //   }
    // })
    // reader.on('drain', (chunk) => {
    //   reader.resume()
    // })

    // reader.on('end', (chunk) => {
    //   reader.end()
    // })

    ctx.body = {
      code: 200,
      msg: '上传成功',
      path: filePath
    }
  }
}

export default new ContentController()
