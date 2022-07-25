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
    notes.push({ id: notes.length, timestamp: new Date(), note: req.body.note })
    res.redirect(`/notes/${notes.length - 1}`)
  } else {
    console.log("Error")
    res.render('notes/new', { Note: req.body.Note })
  }
})

router.route("/update").get((req, res) => {
  // note: this works but don't know why this is a GET when in the form it's a PUT
  console.log('in put update '+req.query.unote+' '+req.query.uid)
  notes[req.query.uid].note = req.query.unote
  res.render("notes/list", { notes: notes })
})

router.route("/delete").get((req, res) => {
  // note: this works but don't know why this is a GET when in the form it's a DELETE
  console.log('in delete '+req.query.dnote+' '+req.query.did)
  var new_notes = notes.splice(req.query.did, 1)
  res.render("notes/list", { notes: new_notes })
})

const notes = [{ 
  id: 0,
  timestamp: new Date(),
  note: 'First test note' 
}]

// note: dynamic routes need to be below static routes
router.route("/:id").get((req, res) => {
  if (req.note) {
    console.log(JSON.stringify(req.note))
    res.send(`Here is Note ${req.params.id} - ${req.note.note}`)
  } else {
    res.send(`Note with ID ${req.params.id} Not Found - in /:id`)
  }
})

router.route("/update/:id").get((req, res) => {
  if (req.note) {
    res.render("notes/update", { note: req.note })
  } else {
    res.send(`Note with ID ${req.params.id} Not Found - in /update`)
  }
})

router.route("/delete/:id").get((req, res) => {
  if (req.note) {
    res.render("notes/delete", { note: req.note })
  } else {
    res.send(`Note with ID ${req.params.id} Not Found - in /delete`)
  }
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