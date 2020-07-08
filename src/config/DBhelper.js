import mongoose from 'mongoose'
import config from './index'

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('连接成功')
})
mongoose.connection.on('error', () => {
  console.log('连接失败')
})
mongoose.connection.on('disconnected', () => {
  console.log('断线')
})

export default mongoose