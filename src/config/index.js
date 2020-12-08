const DB_URL = 'mongodb://root:example@192.168.0.128/admin'
const REDIS = {
  host: '192.168.0.128',
  port: 15001,
  password: '123456'
}
const JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8081'
export default {
  DB_URL,
  REDIS,
  JWT_SECRET,
  baseUrl
}
