const amqp = require('amqplib/callback_api')
const express = require('express')
const broker = require('./broker')

const app = express()
const port = 2008

let queue = 'FirstQueue'
let message = [
  { id: 1, content: 'Hello Rabbit', date: new Date() },
  { id: 2, content: 'Hello Rabbit 2', date: new Date() },
  { id: 3, content: 'Hello Rabbit 3', date: new Date() }]

broker.producer(queue, message)

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

