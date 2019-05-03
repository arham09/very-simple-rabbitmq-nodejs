const amqp = require('amqplib/callback_api')

module.exports = {
  producer: (queue, message) => {
    amqp.connect('amqp://localhost', (err, conn) => {
      conn.createChannel((err, channel) => {

        channel.assertQueue(queue, { durable: false })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
        console.log('Message was sent')
      })
      setTimeout(() => {
        conn.close()
      }, 500)
    })
  },
  consumer: (queue, callback) => {
    amqp.connect('amqp://localhost', (err, conn) => {
      conn.createChannel((err, channel) => {

        channel.assertQueue(queue, { durable: false })
        console.log(`Waiting for message from ${queue}`)
        channel.consume(queue, (message) => {
          callback(message)
        }, { noAck: true })
      })
    })
  }
}