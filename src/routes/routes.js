import combineRoutes from 'koa-combine-routers'

// 遍历modules下的所有js文件，
const moduleFiles = require.context('./modules', true, /\.js$/)
// 使用reduce拼接combineRoutes需要的数据结构
const modules = moduleFiles.keys().reduce((items, path) => {
  const value = moduleFiles(path)
  items.push(value.default)
  return items
}, [])

export default combineRoutes(
  modules
)
