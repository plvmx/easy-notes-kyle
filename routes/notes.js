const express = require('express')
const router = express.Router()

// middleware defined here will apply to all routes below
router.use(logger)

router.get('/', (req, res) => {
  console.log(req.query.name)
  res.send("Note List")
})

router.get('/new', (req, res) => {
  res.render("notes/new")
})

router.post('/', (req, res) => {
  const isValid = true
  if (isValid) {
    notes.push({ text: req.body.text })
    res.redirect(`/notes/${notes.length - 1}`)
  } else {
    console.log("Error")
    res.render('notes/new', { text: req.body.text })
  }
  console.log(req.body.text)
  res.send(`Hi ${req.body.text}`)
})

const notes = [{ text: 'First test note' }]

// note: dynamic routes need to be below static routes
router
  .route("/:id")
  .get((req, res) => {
    console.log(`Note ${req.note.text} has been selected`)
    res.send(`Get Note with ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update Note with ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete Note with ID ${req.params.id}`)
  })


// note: param is a middleware between server and screen
router.param("id", (req, res, next, id) => {
  req.note = notes[id]
  next()
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router