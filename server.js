const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log('Here we are')
  // res.download("server.js")
  res.render('index', { text123: 'World' })
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)

app.listen(3000)