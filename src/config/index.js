import path from 'path'
const DB_URL = 'mongodb://zjtmongo:Zjt-950408@82.156.79.113:4396/admin'
const REDIS = {
  host: '82.156.79.113',
  port: 15001,
  password: 'Zjt-950408'
}
const JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'
const wsPort = 3001
const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8080'

const uploadPath = process.env.NODE_ENV === 'production' ? '/app/public' : path.join(path.resolve(__dirname), '../../public')
export default {
  DB_URL,
  REDIS,
  JWT_SECRET,
  baseUrl,
  uploadPath,
  wsPort
}
