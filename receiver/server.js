const amqp = require('amqplib/callback_api')
const express = require('express')

const app = express()
const port = 2009

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, channel) => {
    let queue = 'FirstQueue'

    channel.assertQueue(queue, { durable: false })
    console.log(`Waiting for message from ${queue}`)
    channel.consume(queue, (message) => {
      console.log(`Received ${message.content}`)
    }, { noAck: true })
  })
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

