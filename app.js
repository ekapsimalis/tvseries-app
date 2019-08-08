const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('./src/db/db-connect')
const getpopular = require('./src/apicalls/get-popular')
const getSerie = require('./src/apicalls/get-serie')
const getSeason = require('./src/apicalls/get-season')
const searchSeries = require('./src/apicalls/search-series')
const getOnAir = require('./src/apicalls/get-onair')
const User = require('./src/models/user')

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, '/public')

const app = express()

// Setting up  global middleware
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    key: 'user',
    secret: 'randomsecret12!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid')
    }
    next()
})

// Setting up other middlware
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home')
    }
    next()
}
//Setting ejs templating engine
app.set('view engine', 'ejs');

app.get('', async (req, res) => {
    try {
        const data = await getpopular()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/series/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await getSerie(id)
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send({error: e})
    }
})

app.get('/series/:id/:seasonNumber', async (req, res) => {
    const id = req.params.id
    const season = req.params.seasonNumber
    try {
        const data = await getSeason(id, season)
        res.status(200).send(data)
    } catch (e) {
        res.status(404).send({error: e})
    }
})

app.get('/search', async (req, res) => {
    const text = req.query.text
    const data = await searchSeries(text)
    if (data === undefined || data.length == 0) {
        return res.status(404).send({error: 'No results'})
    }
    res.status(200).render('search_screen', {data})
})

app.get('/sample', (req, res) => {
    res.render('index')
})

app.get('/register', sessionChecker, (req, res) => {
    res.status(200).render('register')
})

app.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    const data = await user.save()
    req.session.user = {username: data.username}
    res.redirect('/home')

    // user.save().then((user) => {
    //     req.session.user = {
    //         username: user.username,
    //         password: user.password
    //     }
    //     res.redirect('/home')
    // }).catch((e) => {
    //     res.send(e)
    // })
})

app.get('/login', sessionChecker, (req, res) => {
    res.status(200).render('login', {error: null})
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.verifyUser(req.body.email, req.body.password)
        req.session.user = {username: user.username}
        res.redirect('/home')
    }catch (e) {
        res.render('login', {error: e})
    }
})

app.get('/home', async (req, res) => {
    const user = req.session.user
    res.send('Hello ' + user.username)
})

app.get('/logout', (req, res) => {
    if (req.session.user) {
        res.clearCookie('user')
        res.redirect('/')
    } else {
        res.redirect('/login');
    }
})

app.get('/test', async (req, res) => {
    const gameOfThrones = await getSerie(63639)
    const serieToSave = {
        id: gameOfThrones.id,
        name: gameOfThrones.name,
        original_name: gameOfThrones.original_name,
        overview: gameOfThrones.overview,
        poster: gameOfThrones.poster,
        genres: gameOfThrones.genres
    }
    const querry = {username: 'lefteris'}
    await User.findOneAndUpdate(querry, {$push: {series: serieToSave}}, {useFindAndModify: false})
 
    res.send('OK')
})

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND')
})

app.listen(port, () => {
    console.log('Server is running on port', port)
})