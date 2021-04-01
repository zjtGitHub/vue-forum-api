import mongoose from '@/config/DBhelper'
import moment from 'moment'
const Schema = mongoose.Schema

const CommentsHandsSchema = new Schema({
  cid: { type: String }, // 评论id
  uid: { type: String, ref: 'users' }, // 用户id
  created: { type: Date } // 关联评论用户的ID
})

// 每次保存时设置created时间
CommentsHandsSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})
CommentsHandsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

CommentsHandsSchema.statics = {
  findByCid: function (cid, uid) {
    return this.find({ cid: cid, uid: uid })
  }
}

const CommentHandsModel = mongoose.model('comment_hands', CommentsHandsSchema)

export default CommentHandsModel
