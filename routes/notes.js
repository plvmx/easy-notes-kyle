const express = require('express')
const router = express.Router()

// middleware defined here will apply to all routes below
router.use(logger)

router.get('/', (req, res) => {
  res.render("notes/list", { notes: notes })
})

router.get('/new', (req, res) => {
  res.render("notes/new")
})

router.post('/', (req, res) => {
  const isValid = true
  if (isValid) {
    notes.push({ Note: req.body.Note })
    res.redirect(`/notes/${notes.length - 1}`)
  } else {
    console.log("Error")
    res.render('notes/new', { Note: req.body.Note })
  }
})

const notes = [{ Note: 'First test note' }]

// note: dynamic routes need to be below static routes
router
  .route("/:id")
  .get((req, res) => {
    if (req.note) {
      console.log(JSON.stringify(req.note))
      res.send(`Here is Note ${req.params.id} - ${req.note.Note}`)
    } else {
      res.send(`Note with ID ${req.params.id} Not Found`)
    }
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
  console.log(`${new Date()} Running URL ${req.originalUrl}`)
  next()
}

module.exports = router