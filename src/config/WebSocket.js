import WebSocket from 'ws'
import { getJWTPayload } from '@/common/Utils'
import Comments from '@/model/Comment'
import wsConfig from './index'
class WebSocketServer {
  constructor (config = {}) {
    const defaultConfig = {
      port: wsConfig.wsPort,
      timeInterval: 5 * 1000,
      isAuth: true
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.wss = {}
    this.timeInterval = finalConfig.timeInterval
    this.isAuth = finalConfig.isAuth
    this.port = finalConfig.port
    this.options = config.options || {}
  }

  init () {
    this.wss = new WebSocket.Server({ port: this.port, ...this.options })
    this.wss.on('connection', (ws) => {
      // 连接上立即发送一次心跳检测
      ws.isAlive = true
      ws.send(JSON.stringify({
        event: 'heartbeat',
        message: 'ping'
      }))

      ws.on('message', (msg) => this.onMessage(ws, msg))
      // ws.on('close', () => this.onClose(ws))
    })
    this.heartbeat()
  }

  onMessage (ws, msg) {
    const msgObj = JSON.parse(msg)

    const events = {
      auth: async () => {
        try {
          const obj = await getJWTPayload(msgObj.message)
          if (obj) {
            ws.isAuth = true
            ws._id = obj._id
            const num = await Comments.getTotal(obj._id)
            ws.send(JSON.stringify({
              event: 'message',
              message: num
            }))
          }
        } catch (error) {
          ws.send(JSON.stringify({
            event: 'noauth',
            message: '没有权限'
          }))
        }
      },
      heartbeat: () => {
        if (msgObj.message === 'pong') {
          ws.isAlive = true
        }
      }

    }
    events[msgObj.event]()
  }

  send (uid, msg) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && client._id === uid) {
        client.send(msg)
      }
    })
  }

  // 广播消息 -> 推送系统消息
  broadcast (msg) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    })
  }

  heartbeat () {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (!ws.isAlive) {
          return ws.terminate()
        }
        // 主动发送心跳检测
        // 当客户端返回消息后 设置flag为在线
        ws.isAlive = false
        ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'ping'
        }))
      })
    }, this.timeInterval)
  }
}
export default WebSocketServer
