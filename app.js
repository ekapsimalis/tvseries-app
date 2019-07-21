const express = require('express')
const getpopular = require('./src/apicalls/get-popular')

const port = process.env.PORT || 3000

const app = express()

app.get('', async (req, res) => {
    const data = await getpopular()
    res.send(data)
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})