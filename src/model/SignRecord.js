import mongoose from '@/config/DBhelper'
import moment from 'moment'
const Schema = mongoose.Schema

const SignRecordSchema = new Schema({
  uid: { type: String, ref: 'users' },
  created: { type: Date },
  favs: { type: Number },
  lastSign: { type: Date }
})

SignRecordSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

SignRecordSchema.pre('update', function (next) {
  this.updated = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

SignRecordSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error: Mongoose has a duplicate key.'))
  } else {
    next(error)
  }
})

SignRecordSchema.statics = {
  findByID: function (id) {
    return this.findOne({ _id: id }, {
      password: 0,
      username: 0,
      mobile: 0
    })
  },
  findByName: function (name) {
    console.log(name)
    return this.findOne({ username: name })
  }
}

const UserModel = mongoose.model('users', SignRecordSchema)

export default UserModel
