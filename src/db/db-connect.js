const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// MongoDB local server for development env
// Switch to altas 

const logPath = path.join(__dirname, '../../logs/report.txt')

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true

}).catch((e) => {
    console.log('Cant connect to database!')
    console.log(e.toString())
    fs.appendFileSync(logPath, date.toLocaleDateString() + '-->' + e.toString() + ' || ')
    process.exit(1)
})

