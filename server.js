'use strict'

const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/upload', upload.single('upload'), function (req, res) {
  console.log(req.file.size)
  const fileSize = { 'size': req.file.size }
  res.send(fileSize)
})

// Respond not found to all the wrong routes
app.use(function (req, res, next) {
  res.status(404)
  res.type('txt').send('Not found')
})

// Error Middleware
app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR')
  }
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening on port ' + process.env.PORT)
})
