const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
const qs = require('qs')
const http = require('http')
const mp3FilePath = require('./config').mp3FilePath
const resUrl = require('./config').resUrl
const fs = require('fs')
const ws = require('ws')


function createVoice (req, res) {
  // const text = req.query.text
  // const lang = req.query.lang

  const text = '测试数据，来长一点吧，水水的'
  const lang = 'cn'
  let engineType = 'intp65'
  if (lang.toLowerCase() === 'en') {
    engineType = 'intp65_en'
  }
  const voiceParam = {
    auf: 'audio/L16;rate=16000',
    aue: 'lame',
    voice_name: 'xiaoyan',
    speed: '30',
    pitch: '50',
    volume: '50',
    engine_type: engineType,
    text_type: 'text'
  }

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const apiKey = 'ce6040dfc530cd3f11fb675cb396f50c'
  const appId = '5fad6406'
  const xParam = Base64.encode(JSON.stringify(voiceParam))
  const checkSum = md5(apiKey + currentTime + xParam)
  const headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
  headers['X-Param'] = xParam
  headers['X-Appid'] = appId
  headers['X-CurTime'] = currentTime
  headers['X-CheckSum'] = checkSum
  headers['X-Real-Ip'] = '127.0.0.1'
  const data = qs.stringify({
    text: text
  })
  const options = {
    host: 'tts-api.xfyun.cn',
    path: '/v2/tts',
    method: 'POST',
    headers
  }
  const request = http.request(options, response => {
    const contentLength = response.headers['content-length']
    let mp3 = ''
    response.setEncoding('binary')
    response.on('data', data => {
      mp3 += data
      // 如果结果很长将会多次调用response.on()
      const progress = data.length / contentLength * 100
      const percent = progress.toFixed(2)
      console.log(percent)
    })
    response.on('end', () => {
      const filename = new Date().getTime()
      const filePath = `${mp3FilePath}/${filename}.mp3`
      const downloadUrl = `${resUrl}/mp3/${filename}.mp3`
      const contentType = response.headers['content-type']
      if (contentType === 'test/plain') {
        response.send(mp3)
      } else {
        fs.writeFile(filePath, mp3, 'binary', err => {
          if (err) {
            console.log(err)
            res.json({
              error: 1,
              msg: '下载失败'
            })
          } else {
            res.json({
              error: 0,
              msg: '下载成功',
              path: downloadUrl
            })
          }
        })
      }
    })
  })
  request.write(data)
  request.end()
}

module.exports = createVoice