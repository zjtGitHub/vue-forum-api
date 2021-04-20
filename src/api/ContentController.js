import Post from '../model/Post'
import Link from '../model/Link'
import UserCollect from '../model/UserCollect'
import PostTags from '@/model/PostTags'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import config from 'config'
import { getJWTPayload, checkCode, rename } from '../common/Utils'
import User from '@/model/User'
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
    const result = await Post.getList(options, sort, page, limit)
    const total = await Post.countList(options)
    ctx.body = {
      code: 200,
      data: result,
      msg: 'success',
      total
    }
  }

  // 文章详情接口
  async getPostDetail (ctx) {
    const id = ctx.query.tid
    const params = ctx.query
    if (id !== 'undefined' && id !== '') {
      const result = await Post.findOne({ _id: id }).populate({
        path: 'uid',
        select: 'name isVip pic'
      })
      const obj = rename(result.toJSON(), 'uid', 'user')
      let isFav = 0
      // 判断用户是否传递Authorization的数据，即是否登录
      if (
        typeof ctx.header.authorization !== 'undefined' &&
      ctx.header.authorization !== ''
      ) {
        const obj = await getJWTPayload(ctx.header.authorization)
        const userCollect = await UserCollect.findOne({
          uid: obj._id,
          tid: params.tid
        })
        if (userCollect && userCollect.tid) {
          isFav = 1
        }
      }
      // const newPost = result.toJSON()
      obj.isFav = isFav
      const res = await Post.updateOne({ _id: id }, { $inc: { reads: 1 } })
      if (res.ok === 1 && obj._id) {
        ctx.body = {
          code: 200,
          data: obj,
          msg: 'success'
        }
      }
    } else {
      ctx.body = {
        code: 404,
        msg: '帖子不存在'
      }
    }
  }

  /**
   * 查询友链
   * @param {*} ctx
   */
  async getLinks (ctx) {
    const result = await Link.find({ type: 'link' })
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
    await reader.pipe(upStream)
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

  // 发帖
  async addPost (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      //  先判断用户积分是否 > fav,否则提示用户积分不足
      // 用户积分足够,新建post,减去积分
      const user = await User.findByID({ _id: obj._id })
      if (user.favs < body.fav) {
        ctx.body = {
          code: 501,
          msg: '积分不足'
        }
        return
      } else {
        await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.fav } })
      }
      const newPost = new Post(body)
      newPost.uid = obj._id
      const result = await newPost.save()
      ctx.body = {
        code: 200,
        msg: '发表成功',
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

  // 编辑帖子
  async editPost (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      const post = await Post.findOne({ _id: body.tid })
      // 判断是否是楼主 是否结贴
      if (obj._id === post.uid && !post.isEnd) {
        const result = await Post.updateOne({ _id: body.tid }, body)
        if (result.ok === 1) {
          ctx.body = {
            code: 200,
            msg: '更新成功',
            data: result
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '更新失败'
          }
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '用户无权限！'
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

  // 获取用户发贴记录
  async getPostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await Post.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(obj._id)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  // 获取用户发贴记录
  async getPostPublic (ctx) {
    const params = ctx.query
    const result = await Post.getListByUid(
      params.uid,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(params.uid)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  // 删除发贴记录
  async deletePostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const post = await Post.findOne({ uid: obj._id, _id: params.tid })
    // post._id是object类型，id是string类型
    if (post.id === params.tid && !post.isEnd) {
      const result = await Post.deleteOne({ _id: params.tid })
      if (result.ok === 1) {
        ctx.body = {
          code: 200,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '执行删除失败！'
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '删除失败，无权限！'
      }
    }
  }

  // 添加标签
  async addTag (ctx) {
    const { body } = ctx.request
    const tag = new PostTags(body)
    await tag.save()
    ctx.body = {
      code: 200,
      msg: '标签保存成功'
    }
  }

  // 获取标签
  async getTags (ctx) {
    const params = ctx.query
    const page = params.page ? parseInt(params.page) : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    const result = await PostTags.getList({}, page, limit)
    const total = await PostTags.countList({})
    ctx.body = {
      code: 200,
      data: result,
      total,
      msg: '查询tags成功！'
    }
  }

  // 删除标签
  async removeTag (ctx) {
    const params = ctx.query
    const result = await PostTags.deleteOne({ id: params.ptid })

    ctx.body = {
      code: 200,
      data: result,
      msg: '删除成功'
    }
  }

  // 修改标签
  async updateTag (ctx) {
    const { body } = ctx.request
    const result = await PostTags.updateOne({ _id: body._id }, body)

    ctx.body = {
      code: 200,
      data: result,
      msg: '更新成功'
    }
  }
}

export default new ContentController()
