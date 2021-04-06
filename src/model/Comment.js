import mongoose from '@/config/DBhelper'
import moment from 'moment'
const Schema = mongoose.Schema

const CommentsSchema = new Schema({
  tid: { type: String, ref: 'post' }, // 关联文章id
  uid: { type: String, ref: 'users' }, // 关联文章作者ID
  cuid: { type: String, ref: 'users' }, // 关联评论用户的ID
  content: { type: String },
  created: { type: Date },
  hands: { type: Number, default: 0 },
  status: { type: String, default: '1' },
  isRead: { type: String, default: '0' },
  isBest: { type: String, default: '0' }
})

// 每次保存时设置created时间
CommentsSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})
CommentsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

CommentsSchema.statics = {
  // 查找某个帖子中的所有评论
  findByTid: function (id) {
    return this.findByTid({ tid: id })
  },
  // 查找单条评论
  findByCid: function (id) {
    return this.findOne({ _id: id })
  },
  getCommentsList: function (id, page, limit) {
    return this.find({ tid: id }).populate({
      path: 'cuid',
      select: 'name pic isVip',
      match: { status: { $eq: '0' } }
    }).populate({
      path: 'tid',
      select: 'title status'
    }).skip(page * limit).limit(limit)
  },
  queryCount: function (id) {
    return this.find({ tid: id }).countDocuments()
  },
  getCommetsPublic: function (id, page, limit) {
    return this.find({ cuid: id })
      .populate({
        path: 'tid',
        select: '_id title'
      })
      .skip(page * limit)
      .limit(limit)
      .sort({ created: -1 })
  }
}

const CommentModel = mongoose.model('comment', CommentsSchema)

export default CommentModel
