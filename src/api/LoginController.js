import send from '../config/MailConfig'
import bcrypt from 'bcrypt'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode } from '../common/Utils'
import User from '../model/User'

class LoginController {
    constructor() { }

    /**
     * 忘记密码邮件发送
     * @param {*} ctx 
     */
    async forget(ctx) {
        const { body } = ctx.request
        console.log(body)
        try {
            // body.username -> database -> email
            let result = await send({
                code: '1234',
                expire: moment()
                    .add(30, 'minutes')
                    .format('YYYY-MM-DD HH:mm:ss'),
                email: body.username,
                user: 'zjt',
            })
            ctx.body = {
                code: 200,
                data: result,
                msg: '邮件发送成功',
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 登录接口
     * @param {*} ctx 
     */
    async login(ctx) {
        // 接收用户的数据
        // 返回token
        const { body } = ctx.request
        let sid = body.sid
        let code = body.code
        // 验证图片验证码的时效性、正确性
        let result = await checkCode(sid, code)
        if (result) {
            // 验证用户账号密码是否正确
            let checkUserPasswd = false
            let user = await User.findOne({ username: body.username })
            if (await bcrypt.compare(body.password, user.password)) {
                checkUserPasswd = true
            }
            // mongoDB查库
            if (checkUserPasswd) {
                // 验证通过，返回Token数据
                let token = jsonwebtoken.sign({ _id: 'zjt' }, config.JWT_SECRET, {
                    expiresIn: '1d'
                })
                ctx.body = {
                    code: 200,
                    token: token
                }
            } else {
                // 用户名 密码验证失败，返回提示
                ctx.body = {
                    code: 404,
                    msg: '用户名或者密码错误'
                }
            }
        } else {
            // 图片验证码校验失败
            ctx.body = {
                code: 401,
                msg: '图片验证码不正确,请检查！'
            }
        }
    }


    /**
     * 注册接口
     * @param {*} ctx 
     */
    async reg(ctx) {
        // 接收客户端的数据
        const { body } = ctx.request
        // 校验验证码的内容（时效性、有效性）
        let sid = body.sid
        let code = body.code
        let msg = {}
        // 验证图片验证码的时效性、正确性
        let result = await checkCode(sid, code)
        let check = true
        if (result) {
            // 查库，看username是否被注册
            let user1 = await User.findOne({ username: body.username })
            console.log(user1)
            if (user1 !== null && typeof user1.username !== 'undefined') {
                msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']
                check = false
            }
            let user2 = await User.findOne({ nickname: body.nickname })
            // 查库，看name是否被注册
            if (user2 !== null && typeof user2.nickname !== 'undefined') {
                msg.nickname = ['此昵称已经被注册，请修改']
                check = false
            }
            // 写入数据到数据库
            if (check) {
                body.password = await bcrypt.hash(body.password, 5)
                let user = new User({
                    username: body.username,
                    nickname: body.nickname,
                    password: body.password,
                    created: moment().format('YYYY-MM-DD HH:mm:ss')
                })
                let result = await user.save()
                ctx.body = {
                    code: 200,
                    data: result,
                    msg: '注册成功'
                }
                return
            }
        } else {
            // veevalidate 显示的错误
            msg.code = ['验证码已经失效，请重新获取！']
        }
        ctx.body = {
            code: 500,
            msg: msg
        }
    }
}

export default new LoginController()
