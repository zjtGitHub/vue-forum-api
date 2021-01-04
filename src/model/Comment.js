import mongoose from '@/config/DBhelper'

const Schema = mongoose.Schema

const CommentsSchema = new Schema({
  tid: { type: String, ref: 'post' },
  uid: { type: String, ref: 'users' }, // 文章作者ID
  cuid: { type: String, ref: 'users' }, // 评论用户的ID
  content: { type: String },
  created: { type: Date },
  hands: { type: Number, default: 0 },
  status: { type: String, default: '1' },
  isRead: { type: String, default: '0' },
  isBest: { type: String, default: '0' }
})

CommentsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

CommentsSchema.statics = {
  findByTid: function (id) {
    return this.findByTid({ tid: id })
  },
  // getCommentsList: function (id, page, limit) {
  //   return this.find({})
  // },
  getCommentsList: function (id, page, limit) {
    return this.find({})
  }
}

const CommentModel = mongoose.model('comment', CommentsSchema)

export default CommentModel
