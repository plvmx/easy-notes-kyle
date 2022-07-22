const express = require('express')
const router = express.Router()

// middleware defined here will apply to all routes below
router.use(logger)

router.get('/', (req, res) => {
  console.log(req.query.name)
  res.send("User List")
})

router.get('/new', (req, res) => {
  res.render("users/new")
})

router.post('/', (req, res) => {
  const isValid = true
  if (isValid) {
    users.push({ firstName: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log("Error")
    res.render('users/new', { firstName: req.body.firstName })
  }
  console.log(req.body.firstName)
  res.send(`Hi ${req.body.firstName}`)
})

const users = [{ name: 'Kyle' }, { name: 'Sally' }]

// note: dynamic routes need to be below static routes
router
  .route("/:id")
  .get((req, res) => {
    console.log(`User ${req.user.firstName} has been selected`)
    res.send(`Get User with ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update User with ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete User with ID ${req.params.id}`)
  })


// note: param is a middleware between server and screen
router.param("id", (req, res, next, id) => {
  req.user = users[id]
  next()
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router