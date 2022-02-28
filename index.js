const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + "/register.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})