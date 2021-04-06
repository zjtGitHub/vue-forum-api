import mongoose from '@/config/DBhelper'
import moment from 'moment'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  uid: { type: String, ref: 'users' },
  title: { type: String },
  content: { type: String },
  created: { type: Date },
  catalog: { type: String },
  fav: { type: String },
  isEnd: { type: Number, default: 0 },
  reads: { type: Number, default: 0 },
  answer: { type: Number, default: 0 },
  status: { type: String, default: '0' },
  isTop: { type: String, default: '0' },
  sort: { type: Number, default: 100 },
  tags: {
    type: Array,
    default: {
      name: '',
      class: ''
    }
  }
})

PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})
PostSchema.statics = {
  /**
   * 获取文章列表数据
   * @param {Object} options 筛选条件
   * @param {String} sort 排序方式
   * @param {Number} page 分页页数
   * @param {Number} limit 分页条数
   */
  getList: function (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate({
        path: 'uid',
        select: 'username isVip pic'
      })
  },

  /**
   * 获取本周热议
   * @param {Object} options 筛选条件
   * @param {String} sort 排序方式
   * @param {Number} page 分页页数
   * @param {Number} limit 分页条数
   */
  getTopWeek: function (options, sort, page, limit) {
    return this.find({
      created: {
        $gte: moment().subtract(7, 'days')
      }
    }, {
      answer: 1,
      title: 1
    }).sort({ answer: -1 })
      .limit(15)
  },

  countList: function (options) {
    return this.find(options).countDocuments()
  },
  // 根据uid获取帖子列表
  getListByUid: function (id, page, limit) {
    return this.find({ uid: id })
      .skip(page * limit)
      .limit(limit)
      .sort({ created: -1 })
  },
  // 根据uid获取帖子总数
  countByUid: function (id) {
    return this.find({ uid: id }).countDocuments()
  }

}

const PostModel = mongoose.model('post', PostSchema)

export default PostModel
