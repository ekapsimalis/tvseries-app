const path = require('path')
const express = require('express')
const getpopular = require('./src/apicalls/get-popular')
const getSerie = require('./src/apicalls/get-serie')
const getSeason = require('./src/apicalls/get-season')
const searchSeries = require('./src/apicalls/search-series')

const port = process.env.PORT || 3000

const app = express()

// Setting public directory access for express
const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))

app.get('', async (req, res) => {
    try {
        const data = await getSerie(1399)
        res.send(data)
    } catch (e) {
        res.send({"Error": e})
    }
})

app.get('/movies/:id', async (req, res) => {
    //print the passing param {{id}}
    const param = req.params
    // Sending back the params...
    res.send(param)
})

app.get('/series/:id/:seasonNumber', async (req, res) => {
    // The request to get more detailed information about each season
    //TODO
})



app.listen(port, () => {
    console.log('Server is running on port ' + port)
})