import svgCaptcha from 'svg-captcha'
import { getValue, setValue } from '@/config/RedisConfig'

class PublicController {
  async getCaptcha (ctx) {
    const body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0oli1O',
      color: true,
      noise: Math.floor(Math.random() * 1),
      width: 150,
      height: 60
    })
    // 保存图片验证码
    // 设置超时时间10分钟
    setValue(body.sid, newCaptcha.text, 10 * 60)
    getValue(body.sid).then(() => {
      // console.log(body.sid)
    })
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}

export default new PublicController()
