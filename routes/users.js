const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('in /users')
  res.send("User List")
})

router.get('/new', (req, res) => {
  console.log('in get /users/new')
  res.send("User New Form")
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
    console.log(req.user)
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

/* router.get('/:id', (req, res) => {
  console.log('in get User with ID')
  res.send(`Get User with ID ${req.params.id}`)
})

router.put('/:id', (req, res) => {
  console.log('in get User with ID')
  res.send(`Update User with ID ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  console.log('in get User with ID')
  res.send(`Delete User with ID ${req.params.id}`)
}) */

module.exports = router