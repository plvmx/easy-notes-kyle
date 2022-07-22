const express = require('express')
const app = express()

// middleware static serves all our pages from the public folder
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

/* app.get('/', (req, res) => {
  // res.download("server.js")
  res.render('index', { text: 'World' })
}) */

const userRouter = require('./routes/users')

app.use('/users', userRouter)

app.listen(3000)