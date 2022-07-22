const express = require('express')
const app = express()

// middleware static serves all our pages from the public folder
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

const userRouter = require('./routes/users')
const noteRouter = require('./routes/notes')

app.use('/users', userRouter)
app.use('/notes', noteRouter)

app.listen(3000)