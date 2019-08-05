const path = require('path')
const express = require('express')
//require('./src/db/db-connect')
const getpopular = require('./src/apicalls/get-popular')
const getSerie = require('./src/apicalls/get-serie')
const getSeason = require('./src/apicalls/get-season')
const searchSeries = require('./src/apicalls/search-series')
const getOnAir = require('./src/apicalls/get-onair')

const port = process.env.PORT || 3000

const app = express()

// Setting public directory access for express
const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
    const result_numbers = data.length
    if (data === undefined || data.length == 0) {
        return res.status(404).send({error: 'No results'})
    }
    res.status(200).render('search_screen', {data, results: result_numbers})
})

app.get('/sample', (req, res) => {
    res.render('index')
})

app.post('/register', (req, res) => {
    console.log(req.body)
    res.status(200).send(req.body)
})

app.post('/login', async (req, res) => {

})

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND')
})

app.listen(port, () => {
    console.log('Server is running on port', port)
})