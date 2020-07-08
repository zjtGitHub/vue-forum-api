export default (ctx, next) => {
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: '用户无权限！！！'
      }
    } else {
      console.log(err)
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message
      }, process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    }
  })
}