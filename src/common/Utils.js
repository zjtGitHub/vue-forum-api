import { getValue } from '@/config/RedisConfig'
import config from '../config/index'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const getJWTPayload = token => {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET)
}

const checkCode = async (key, value) => {
  const redisData = await getValue(key)
  if (redisData !== null) {
    return redisData.toLowerCase() === value.toLowerCase()
  } else {
    return false
  }
}

// 获取文件信息
const getStats = (path) => {
  return new Promise((resolve) => {
    fs.stat(path, (err, stats) => err ? resolve(false) : resolve(stats))
  })
}

const mkdir = (dir) => {
  return new Promise((resolve) => {
    fs.mkdir(dir, err => err ? resolve(false) : resolve(true))
  })
}

// 文件工具类 判断文件夹是否存在
const dirExists = async (dir) => {
  const isExists = await getStats(dir)
  console.log('🚀 ~ file: Utils.js ~ line 36 ~ dirExists ~ isExists', isExists)
  // 存在且是文件夹
  if (isExists && isExists.isDirectory()) {
    return true
  } else if (isExists) { // 存在但是是文件
    return false
  }
  // 路径不存在
  const tempDir = path.parse(dir).dir
  console.log(path.parse(dir), 66666666666)
  // 循环遍历，递归判断如果上级目录不存在，则产生上级目录
  const status = await dirExists(tempDir)
  console.log('🚀 ~ file: Utils.js ~ line 48 ~ dirExists ~ status', status)

  if (status) {
    const result = await mkdir(dir)
    console.log('🚀 ~ file: Utils.js ~ line 52 ~ dirExists ~ result', result)

    return result
  } else {
    return false
  }
}

// 重命名方法
const rename = (obj, key, newkey) => {
  if (Object.keys(obj).indexOf(key) !== -1) {
    obj[newkey] = obj[key]
    delete obj[key]
  }
  return obj
}

export {
  checkCode,
  getJWTPayload,
  getStats,
  dirExists,
  rename
}
