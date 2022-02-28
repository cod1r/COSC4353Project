const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

app.get('/', (req, res) => {
})

app.post('/login', (req, res) => {
  if (req.body.email && req.body.pass) {
    res.redirect('/profile.html');
  }
})

app.post('/register', (req, res) => {
  if (req.body.email && req.body.pass) {
    res.redirect('/profile.html');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})