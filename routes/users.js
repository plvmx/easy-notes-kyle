const express = require('express')
const router = express.Router()

// middleware defined here will apply to all routes below
router.use(logger)

router.get('/', (req, res) => {
  res.send("User List")
})

router.get('/new', (req, res) => {
  res.render("users/new", { firstName: "Test" })
})

router.post('/', (req, res) => {
  console.log('in post /users/new')
  res.send("Create user")
})

const users = [{ name: 'Kyle' }, { name: 'Sally' }]

// note: dynamic routes need to be below static routes
router
  .route("/:id")
  .get((req, res) => {
    console.log(`User ${req.user.name} has been selected`)
    res.send(`Get User with ID ${req.params.id}`)
  })
  .put((req, res) => {
    console.log('in get User with ID')
    res.send(`Update User with ID ${req.params.id}`)
  })
  .delete((req, res) => {
    console.log('in get User with ID')
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