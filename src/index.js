const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '/public/')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => res.send('Werkt'))

app.get('/books/:frabl/img/:img', function(req, res) {
  res.send(req.params)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
