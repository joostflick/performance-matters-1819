const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const shrinkRay = require('shrink-ray-current')

app.use(express.static(path.join(__dirname, '/public/')))

// app.use(function(request, response) {
//   if (!request.secure) {
//     response.redirect('https://' + request.headers.host + request.url)
//   }
// })
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60)
//   next()
// })

app.use(
  shrinkRay({
    cache: () => true,
    cacheSize: '128mb',
    filter: () => true,
    brotli: { quality: 4 },
    zlib: { level: 6 }
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/public/views'))
app.get('/', (req, res) =>
  api.getAll().then(data => {
    const names = data[0]
    const insults = data[1]
    for (let i = 0; i < insults.length; i++) {
      names[i].insult = insults[i]
      names[i].id = i
    }
    res.render('pages/index', { names: names })
  })
)
app.get('/clearfavorites', (req, res) => {
  favorites.clear()
  var fav = favorites.display()
  api.getAll().then(data => {
    const names = data[0]
    const insults = data[1]
    for (let i = 0; i < insults.length; i++) {
      names[i].insult = insults[i]
      names[i].id = i
    }
    res.render('pages/favorites', { favorites: fav, names: names })
  })
})

app.get('/details/:id', (req, res) =>
  api
    .getDetails(req.params.id)
    .then(data => res.render('pages/details', { data: data[req.params.id] }))
)
app.get('/offline', (req, res) => res.render('pages/offline'))

app.get('/favorites', (req, res) => {
  var fav = favorites.display()
  api.getAll().then(data => {
    const names = data[0]
    const insults = data[1]
    for (let i = 0; i < insults.length; i++) {
      names[i].insult = insults[i]
      names[i].id = i
    }
    res.render('pages/favorites', { favorites: fav, names: names })
  })
})
app.get('/favorites/:id', (req, res) => {
  var fav = favorites.add(req.params.id)
  api.getAll().then(data => {
    const names = data[0]
    const insults = data[1]
    for (let i = 0; i < insults.length; i++) {
      names[i].insult = insults[i]
      names[i].id = i
    }
    res.render('pages/favorites', { favorites: fav, names: names })
  })
})

app.get('/about', (req, res) => {
  res.render('pages/about')
})

app.get('*', function(req, res) {
  res
    .status(404)
    .send('404 - This page can not be found, maybe try something else?')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const api = {
  getAll: () => {
    return Promise.all([api.loadNames, api.loadInsults])
  },
  getDetails: () => {
    return api.loadNames
  },
  loadInsults: new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest()
    const link = 'https://api.whatdoestrumpthink.com/api/v1/quotes'
    request.open('GET', link, true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = JSON.parse(request.responseText)
        resolve(data.messages.personalized)
      } else {
        // We reached our target server, but it returned an err
        reject(error)
      }
    }

    request.onerror = () => {
      // There was a connection error of some sort
      console.log('insults gaat fout')
    }

    request.send()
  }),
  loadNames: new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest()
    const linkNames = 'https://randomuser.me/api/?results=573'
    request.open('GET', linkNames, true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = JSON.parse(request.responseText)
        // const randomNames = []
        // data.results.forEach(element => {
        //   randomNames.push(element.name.first)
        // })
        const users = data.results.map(user => ({
          name:
            user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1),
          lastName:
            user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1),
          title: user.name.title,
          email: user.email,
          cellphone: user.cell,
          gender: user.gender,
          picture: user.picture,
          location: user.location
        }))
        resolve(users)
      } else {
        // We reached our target server, but it returned an error
        reject(error)
        console.log('names gaat fout')
      }
    }

    request.onerror = () => {
      // There was a connection error of some sort
    }

    request.send()
  })
}

const favoritesArray = []
const favorites = {
  add: id => {
    if (favoritesArray.includes(id)) {
      return favoritesArray
    } else {
      favoritesArray.push(id)
      return favoritesArray
    }
  },
  display: () => {
    return favoritesArray
  },
  clear: () => {
    favoritesArray.length = 0
    return favoritesArray
  }
}
