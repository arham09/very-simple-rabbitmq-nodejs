const amqp = require('amqplib/callback_api')
const express = require('express')
const broker = require('./broker')

const app = express()
const port = 2009
const queue = 'FirstQueue'

broker.consumer(queue, (message, err) => {
  console.log(JSON.parse(message.content))
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

