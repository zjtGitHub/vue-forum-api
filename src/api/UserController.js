import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/Utils'
import User from '../model/User'
import * as moment from 'moment'

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
      ...result
    }
  }
}

export default new UserController()
