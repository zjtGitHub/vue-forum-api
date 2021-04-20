import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/Utils'
import User from '../model/User'
import Comments from '../model/Comment'
import UserCollect from '../model/UserCollect'
import send from '../config/MailConfig'
import { v4 as uuid } from 'uuid'
import config from '@/config'
import jwt from 'jsonwebtoken'
import * as moment from 'moment'
import qs from 'qs'
import { setValue, getValue } from '@/config/RedisConfig'
import bcrypt from 'bcrypt'
class UserController {
  /**
   * 签到接口
   * @param {
   *    favs: 总积分,
   *    count: 连续签到天数,
   *    score: 签到积分
   * }
   */
  async userSign (ctx) {
    // 通过token获取用户id
    const obj = await getJWTPayload(ctx.header.authorization)
    // 从sign_record表中查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id)
    const user = await User.findByID(obj._id)
    let result = {}
    let newRecord = {}
    // 判断签到逻辑
    if (record !== null) {
      // 有历史签到记录
      // 判断用户上一次签到记录时间于今天是否相同
      // 如果不相同并且就少一天 说明连续签到
      // 如果相同 说明已经签到
      if (moment(record.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        ctx.body = {
          code: 500,
          favs: user.favs,
          count: user.count,
          lastSign: record.created,
          msg: '用户已经签到'
        }
        return
      } else {
        // 有签到记录并且不与今天相同, 判断是否是连续签到
        let count = user.count
        // 签到积分
        let score = 0
        if (moment(record.created).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
          count += 1
          // 连续签到
          if (count < 5) {
            score = 5
          } else if (count >= 5 && count < 15) {
            score = 10
          } else if (count >= 15 && count < 30) {
            score = 15
          } else if (count >= 30 && count < 100) {
            score = 20
          } else if (count >= 100 && count < 365) {
            score = 30
          } else if (count >= 365) {
            score = 50
          }
          // 更新用户表中的积分信息
          await User.updateOne({ _id: obj._id }, { $inc: { favs: score, count: 1 } })
          result = {
            favs: user.favs + score,
            count: user.count + 1,
            score: score
          }
        } else {
          // 中断签到
          score = 5
          await User.updateOne({ _id: obj._id }, { $inc: { favs: score }, $set: { count: 1 } })
          result = {
            favs: user.favs + score,
            score: 5,
            count: 1
          }
        }
        // 向签到记录表中添加签到记录
        newRecord = new SignRecord({
          uid: obj._id,
          favs: score,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        await newRecord.save()
      }
    } else {
      // record为空说明是第一次签到
      await User.updateOne({
        _id: obj._id
      },
      {
        $set: { count: 1 },
        $inc: { favs: 5 }
      })
      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5,
        lastSign: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      await newRecord.save()
      result = {
        favs: user.favs + 5,
        score: 5,
        count: 1
      }
    }
    ctx.body = {
      code: 200,
      msg: 'success',
      ...result,
      lastSign: newRecord.created
    }
  }

  // 修改用户信息接口
  async updateUserInfo (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id })
    let msg = ''
    if (body.username && body.username !== user.username) {
      const key = uuid()
      setValue(key, jwt.sign({ _id: obj._id }, config.JWT_SECRET, { expiresIn: '30m' }))
      // 用户修改了邮箱，发送邮件通知
      // 判断用户的新邮箱是否有人注册
      const tmpUser = await User.findOne({ username: body.username })
      if (tmpUser && tmpUser.password) {
        ctx.body = {
          code: 501,
          msg: '邮箱已注册'
        }
        return
      }
      const result = await send({
        type: 'email',
        data: {
          key: key,
          username: body.username
        },
        code: '',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: user.username,
        user: user.name
      })
      ctx.body = {
        code: 200,
        data: result
      }
      msg = '更新基本资料成功，账号修改需要邮件确认，请查收邮件！'
    }
    const arr = ['username', 'password', 'mobile']
    arr.map(item => {
      delete body[item]
    })
    const result = await User.updateOne({ _id: obj._id }, body)
    if (result.n === 1 && result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: msg === '' ? '更新成功' : msg
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新失败'
      }
    }
  }

  // 获取用户信息接口
  async getUserInfo (ctx) {
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id })

    ctx.body = {
      code: 200,
      data: {
        username: user.username,
        name: user.name,
        gender: user.gender,
        location: user.location,
        regmark: user.regmark
      }
    }
  }

  // 确认修改用户邮箱
  async updateUsername (ctx) {
    const body = ctx.query
    if (body.key) {
      const token = await getValue(body.key)
      const obj = getJWTPayload('Bearer ' + token)
      await User.updateOne({ _id: obj._id }, {
        username: body.username
      })
      ctx.body = {
        code: 200,
        msg: '更新用户名成功'
      }
    }
  }

  // 修改密码接口
  async updatePassword (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id })
    if (await bcrypt.compare(body.oldpwd, user.password)) {
      const newpwd = await bcrypt.hash(body.newpwd, 5)
      await User.updateOne(
        { _id: obj._id },
        { $set: { password: newpwd } }
      )
      ctx.body = {
        code: 200,
        msg: '更新密码成功！'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新密码失败，请重试！'
      }
    }
  }

  // 设置收藏
  async setCollect (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    if (parseInt(params.isFav)) {
      // 说明用户已经收藏了帖子
      await UserCollect.deleteOne({ uid: obj._id, tid: params.tid })
      ctx.body = {
        code: 200,
        msg: '取消收藏成功'
      }
    } else {
      const newCollect = new UserCollect({
        uid: obj._id,
        tid: params.tid,
        title: params.title
      })
      const result = await newCollect.save()
      if (result.uid) {
        ctx.body = {
          code: 200,
          data: result,
          msg: '收藏成功'
        }
      }
    }
  }

  // 获取收藏列表
  async getCollectByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await UserCollect.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await UserCollect.countByUid(obj._id)
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

  // 获取用户基本信息
  async getBasicInfo (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const uid = params.uid || obj._id
    let user = await User.findByID(uid)
    // 取得用户的签到记录 有没有 > today 0:00:00
    user = user.toJSON()
    const date = moment().format('YYYY-MM-DD')
    const result = await SignRecord.findOne({ uid: uid, created: { $gte: date + ' 00:00:00' } })
    if (result && result.uid) {
      user.isSign = true
    } else {
      user.isSign = false
    }
    ctx.body = {
      code: 200,
      data: user,
      msg: '查询成功！'
    }
  }

  // 获取用户未读消息
  async getMsg (ctx) {
    const params = ctx.query
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    // 方法一： 嵌套查询 -> aggregate
    // 方法二： 通过冗余换时间
    const obj = await getJWTPayload(ctx.header.authorization)
    const num = await Comments.getTotal(obj._id)
    const result = await Comments.getMsgList(obj._id, page, limit)

    ctx.body = {
      code: 200,
      data: result,
      total: num
    }
  }

  // 设置已读消息
  async setMsg (ctx) {
    const params = ctx.query
    if (params.id) {
      const result = await Comments.updateOne(
        { _id: params.id },
        { isRead: '1' }
      )
      if (result.ok === 1) {
        ctx.body = {
          code: 200
        }
      }
    } else {
      const obj = await getJWTPayload(ctx.header.authorization)
      const result = await Comments.updateMany(
        { uid: obj._id },
        { isRead: '1' }
      )
      if (result.ok === 1) {
        ctx.body = {
          code: 200
        }
      }
    }
  }

  // 获取用户列表
  async getUsers (ctx) {
    let params = ctx.query
    params = qs.parse(params)
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    const sort = params.sort || 'created'
    const option = params.option || {}
    const result = await User.getList(option, sort, page, limit)
    const total = await User.countList(option)
    ctx.body = {
      code: 200,
      data: result,
      total: total
    }
  }

  // 管理员删除用户
  async deleteUserById (ctx) {
    const { body } = ctx.request
    // const user = await User.findOne({ _id: params.id })
    // if (user) {
    const result = await User.deleteMany({ _id: { $in: body.ids } })
    ctx.body = {
      code: 200,
      msg: '删除成功',
      data: result
    }
    // } else {
    //   ctx.body = {
    //     code: 500,
    //     msg: '用户不存在或者id信息错误！'
    //   }
    // }
  }

  // 管理员更新用户
  async updateUserById (ctx) {
    const { body } = ctx.request

    const user = await User.findOne({ _id: body._id })
    // 1.校验用户是否存在 -> 用户名是否冲突
    if (!user) {
      ctx.body = {
        code: 500,
        msg: '用户不存在或者id信息错误！'
      }
      return
    }
    // if (body.username !== user.username) {
    //   const userCheckName = await User.findOne({ username: body.username })
    //   if (userCheckName) {
    //     ctx.body = {
    //       code: 501,
    //       msg: '用户名已经存在，更新失败！'
    //     }
    //     return
    //   }
    // }

    // 2.判断密码是否传递 -> 进行加密保存
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5)
    }
    const result = await User.updateOne({ _id: body._id }, body)
    if (result.ok === 1 && result.nModified === 1) {
      ctx.body = {
        code: 200,
        msg: '更新成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '服务异常，更新失败'
      }
    }
  }

  // 批量设置用户属性
  // 方法一：新增一个接口 方法二： options -> action 'one' 'many'
  async updateUserBatch (ctx) {
    const { body } = ctx.request
    const result = await User.updateMany(
      { _id: { $in: body.ids } },
      { $set: { ...body.settings } }
    )
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async checkUsername (ctx) {
    const params = ctx.query
    const user = await User.findOne({ username: params.username })
    // 默认是 1 - 校验通过， 0 - 校验失败
    let result = 1
    if (user && user.username) {
      result = 0
    }
    ctx.body = {
      code: 200,
      data: result,
      msg: '用户名已经存在，更新失败！'
    }
  }

  async addUser (ctx) {
    const { body } = ctx.request
    body.password = await bcrypt.hash(body.password, 5)
    const user = new User(body)
    const result = await user.save()
    const userObj = result.toJSON()
    const arr = ['password']
    arr.map(item => {
      delete userObj[item]
    })
    if (result) {
      ctx.body = {
        code: 200,
        data: userObj,
        msg: '添加用户成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '服务接口异常'
      }
    }
  }
}

export default new UserController()
