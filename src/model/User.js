import mongoose from '@/config/DBhelper'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  'username': { type: String },
  'nickname': { type: String },
  'password': { type: String },
});

const UserModel = mongoose.model('users', UserSchema)

export default UserModel