const amqp = require('amqplib/callback_api')
const express = require('express')

const app = express()
const port = 2008

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, channel) => {
    let queue = 'FirstQueue'
    let message = { id: 1, content: 'Hello Rabbit' }

    channel.assertQueue(queue, { durable: false })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    console.log('Message was sent')
  })
  setTimeout(() => {
    conn.close()
    process.exit(0)
  }, 500)
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

